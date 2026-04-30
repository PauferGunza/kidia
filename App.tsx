import React, { useState, useCallback, useRef, useEffect } from 'react';
import { UserProfile, ScanResult, AppView } from './types';
import { analyzeImage } from './services/geminiService';
import { HomeView } from './views/HomeView';
import { ProfileView } from './views/ProfileView';
import { ScanningView } from './views/ScanningView';
import { ResultsView } from './views/ResultsView';
import { MealPlanView } from './views/MealPlanView';
import { HistoryView } from './views/HistoryView';
import { PremiumView } from './views/PremiumView';
import { LoginView } from './views/LoginView';
import { SignupView } from './views/SignupView';
import { ChatView } from './views/ChatView';
import { SettingsView } from './views/SettingsView';
import { Home, User, Plus, Calendar, BarChart2, MessageCircle, Settings, Camera as CameraIcon, Image as ImageIcon } from './components/Icons';
import { db } from './db';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    diabetes: false,
    hypertension: false,
    weightLoss: false,
    weeklyGoal: 'control',
    currentWeight: 75,
    targetWeight: 70
  });
  
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [showScanOptions, setShowScanOptions] = useState(false);

  // Load session and profile from DB on mount
  useEffect(() => {
    const loadSession = async () => {
      try {
        const lastEmail = localStorage.getItem('kidia_last_user');
        if (lastEmail) {
          const storedProfile = await db.profile.where('email').equals(lastEmail).first();
          if (storedProfile) {
            setProfile(storedProfile);
            setIsAuthenticated(true);
            setHasCompletedOnboarding(true);
            setCurrentView('dashboard');
          }
        }
      } catch (err) {
        console.error("Failed to load session:", err);
      } finally {
        setIsLoadingProfile(false);
      }
    };
    loadSession();
  }, []);

  // Save profile to DB whenever it changes
  useEffect(() => {
    if (!isLoadingProfile && profile.email && isAuthenticated) {
      const saveProfile = async () => {
        try {
          const storedProfile = await db.profile.where('email').equals(profile.email).first();
          if (storedProfile) {
            await db.profile.update(storedProfile.id!, profile);
          } else {
            await db.profile.add(profile);
          }
          localStorage.setItem('kidia_last_user', profile.email);
        } catch (err) {
          console.error("Failed to save profile:", err);
        }
      };
      saveProfile();
    }
  }, [profile, isLoadingProfile, isAuthenticated]);

  const handleUpdateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);

  const handleLogin = async (name: string, email: string) => {
    // Check if profile exists for this email
    const storedProfile = await db.profile.where('email').equals(email).first();
    if (storedProfile) {
      setProfile(storedProfile);
      setHasCompletedOnboarding(true);
    } else {
      setProfile(prev => ({ ...prev, name, email }));
      setHasCompletedOnboarding(false);
    }
    setIsAuthenticated(true);
    setCurrentView(storedProfile ? 'dashboard' : 'profile');
  };

  const handleSignup = (name: string, email: string) => {
    setProfile(prev => ({ ...prev, name, email }));
    setIsAuthenticated(true);
    setCurrentView('profile'); // Go to onboarding
  };

  const handleLogout = () => {
    localStorage.removeItem('kidia_last_user');
    setIsAuthenticated(false);
    setCurrentView('login');
    setHasCompletedOnboarding(false);
    setProfile({
      name: '',
      email: '',
      diabetes: false,
      hypertension: false,
      weightLoss: false,
      weeklyGoal: 'control',
      currentWeight: 75,
      targetWeight: 70
    });
  };

  const triggerScanner = () => {
    setShowScanOptions(true);
  };

  const triggerCamera = () => {
    cameraInputRef.current?.click();
    setShowScanOptions(false);
  };

  const triggerGallery = () => {
    galleryInputRef.current?.click();
    setShowScanOptions(false);
  };

  const handleScanStart = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fileInputRef.current) fileInputRef.current.value = ''; // reset

    setError(null);
    setCurrentView('scanning');

    try {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        const mimeType = file.type || 'image/jpeg';

        try {
          const result = await analyzeImage(base64Data, mimeType, profile);
          setScanResult(result);
          setCurrentView('results');
        } catch (apiError: any) {
          console.error(apiError);
          setError(apiError.message || "Erro ao contactar a IA.");
          setCurrentView('dashboard');
        }
      };
      reader.onerror = () => {
        setError("Erro ao ler a imagem.");
        setCurrentView('dashboard');
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error(err);
      setError("Erro inesperado ocorreu.");
      setCurrentView('dashboard');
    }
  };

  const handleResetScan = () => {
    setCurrentView('dashboard');
    setScanResult(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  // 0. Auth Gate
  if (!isAuthenticated && !isLoadingProfile) {
    return (
      <div className="flex justify-center bg-gray-950 w-full min-h-[100dvh] font-sans">
        <div className="w-full max-w-lg bg-kidia-bg h-[100dvh] flex flex-col relative overflow-hidden sm:h-[95vh] sm:my-auto sm:rounded-[3.5rem] shadow-2xl border border-white/5">
          {currentView === 'login' && <LoginView onLogin={handleLogin} onGoToSignup={() => setCurrentView('signup')} />}
          {currentView === 'signup' && <SignupView onSignup={handleSignup} onGoToLogin={() => setCurrentView('login')} />}
        </div>
      </div>
    );
  }

  if (isLoadingProfile) {
    return (
      <div className="flex justify-center items-center bg-gray-950 w-full min-h-[100dvh] font-sans text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="text-kidia-green-primary animate-pulse font-black text-3xl tracking-[0.3em]">KIDIA</div>
          <div className="w-8 h-1 bg-gradient-to-r from-transparent via-kidia-green-primary to-transparent animate-shimmer"></div>
        </div>
      </div>
    );
  }

  // 1. Onboarding Gate
  if (!hasCompletedOnboarding) {
    return (
      <div className="flex justify-center bg-gray-950 w-full min-h-[100dvh] font-sans">
        <div className="w-full max-w-lg bg-kidia-bg h-[100dvh] flex flex-col relative overflow-hidden sm:h-[95vh] sm:my-auto sm:rounded-[3.5rem] shadow-2xl border border-white/5">
          <ProfileView 
            profile={profile} 
            onUpdateProfile={handleUpdateProfile} 
            onComplete={() => {
              setHasCompletedOnboarding(true);
              setCurrentView('dashboard');
            }} 
            isOnboarding={true}
            onGoSettings={() => setCurrentView('settings')}
          />
        </div>
      </div>
    );
  }

  const showBottomNav = !['scanning', 'results', 'premium', 'chat'].includes(currentView as string);

  return (
    <div className="flex justify-center bg-gray-950 w-full min-h-[100dvh] font-sans">
      <div className="w-full max-w-lg bg-kidia-bg h-[100dvh] flex flex-col relative overflow-hidden sm:h-[95vh] sm:my-auto sm:rounded-[3.5rem] shadow-2xl border border-white/5">
        
        {/* Hidden File Inputs for Scan */}
        <input 
          type="file" accept="image/*" capture="environment" 
          ref={cameraInputRef} onChange={handleScanStart} className="hidden" 
        />
        <input 
          type="file" accept="image/*" 
          ref={galleryInputRef} onChange={handleScanStart} className="hidden" 
        />

        {error && (
          <div className="absolute top-4 left-4 right-4 z-50 bg-kidia-accent-red text-white px-5 py-3 rounded-2xl shadow-lg flex justify-between items-center animate-pulse">
            <span className="text-sm font-bold">{error}</span>
            <button onClick={() => setError(null)} className="text-white/80 hover:text-white font-bold text-lg">&times;</button>
          </div>
        )}

        {/* Dynamic Views */}
        <div className="flex-1 flex flex-col min-h-0 relative">
          {currentView === 'dashboard' && (
            <HomeView 
              onTriggerScan={triggerScanner} 
              onTriggerCamera={triggerCamera} 
              onTriggerGallery={triggerGallery} 
              profile={profile} 
            />
          )}
          {currentView === 'mealplan' && <MealPlanView />}
          {currentView === 'history' && <HistoryView profile={profile} onUpdateProfile={handleUpdateProfile} />}
          {currentView === 'chat' && <ChatView profile={profile} onBack={() => setCurrentView('dashboard')} />}
          {currentView === 'settings' && <SettingsView profile={profile} onBack={() => setCurrentView('profile')} onLogout={handleLogout} />}
          {currentView === 'profile' && (
            <ProfileView 
              profile={profile} 
              onUpdateProfile={handleUpdateProfile} 
              onGoPremium={() => setCurrentView('premium')} 
              onLogout={handleLogout}
              onGoSettings={() => setCurrentView('settings')}
            />
          )}
          {currentView === 'scanning' && <ScanningView imagePreview={imagePreview} />}
          {currentView === 'premium' && <PremiumView onBack={() => setCurrentView('profile')} />}
          {currentView === 'results' && scanResult && (
            <ResultsView result={scanResult} imagePreview={imagePreview} onBack={handleResetScan} />
          )}
        </div>

        {/* Unified Bottom Navigation */}
        {showBottomNav && (
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-between items-center px-6 pb-8 pt-4 z-30 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]">
            <button onClick={() => setCurrentView('dashboard')} className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${currentView === 'dashboard' ? 'text-kidia-green-primary' : 'text-kidia-grey-text'}`}>
              <Home size={22} strokeWidth={currentView === 'dashboard' ? 3 : 2} />
              <span className="text-[9px] font-black tracking-widest uppercase">Início</span>
            </button>
            
            <button onClick={() => setCurrentView('chat')} className={`flex flex-col items-center gap-1.5 mr-4 transition-all active:scale-90 ${(currentView as string) === 'chat' ? 'text-kidia-green-primary' : 'text-kidia-grey-text'}`}>
              <MessageCircle size={22} strokeWidth={(currentView as string) === 'chat' ? 3 : 2} />
              <span className="text-[9px] font-black tracking-widest uppercase">Chat</span>
            </button>

            {/* Center FAB - Scaled for visibility */}
            <div className="relative -translate-y-8">
              <div className="absolute inset-0 bg-kidia-green-primary/30 blur-2xl rounded-full scale-110"></div>
              <button 
                onClick={triggerScanner}
                className="w-16 h-16 bg-kidia-green-primary rounded-2xl shadow-premium flex items-center justify-center relative z-10 active:scale-95 transition-all group border-4 border-white"
              >
                <Plus size={32} className="text-white group-hover:rotate-90 transition-transform" strokeWidth={3} />
              </button>
            </div>

            <button onClick={() => setCurrentView('history')} className={`flex flex-col items-center gap-1.5 ml-4 transition-all active:scale-90 ${currentView === 'history' ? 'text-kidia-green-primary' : 'text-kidia-grey-text'}`}>
              <BarChart2 size={22} strokeWidth={currentView === 'history' ? 3 : 2} />
              <span className="text-[9px] font-black tracking-widest uppercase">Progresso</span>
            </button>

            <button onClick={() => setCurrentView('profile')} className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${currentView === 'profile' ? 'text-kidia-green-primary' : 'text-kidia-grey-text'}`}>
              <User size={22} strokeWidth={currentView === 'profile' ? 3 : 2} />
              <span className="text-[9px] font-black tracking-widest uppercase">Perfil</span>
            </button>
          </div>
        )}

        {/* Scan Options Overlay */}
        {showScanOptions && (
          <div className="absolute inset-0 z-[100] flex items-end justify-center px-6 pb-32">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowScanOptions(false)}></div>
            <div className="relative w-full max-w-sm bg-white rounded-[3rem] p-8 shadow-2xl border border-gray-100 flex flex-col gap-5">
              <div className="text-center mb-2">
                <h3 className="text-2xl font-black text-kidia-green-dark tracking-tight">Analisar Refeição</h3>
                <p className="text-kidia-grey-text text-sm font-medium">Escolha como deseja enviar a imagem</p>
              </div>
              
              <button 
                onClick={triggerCamera}
                className="w-full bg-kidia-green-primary text-white p-6 rounded-[2rem] flex items-center gap-5 shadow-premium active:scale-95 transition-all"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/20">
                  <CameraIcon size={24} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <span className="block font-black text-lg leading-none mb-1">Tirar Foto</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Usar Câmara</span>
                </div>
              </button>

              <button 
                onClick={triggerGallery}
                className="w-full bg-gray-50 text-kidia-green-dark p-6 rounded-[2rem] flex items-center gap-5 border border-gray-100 active:scale-95 transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-soft">
                  <ImageIcon size={24} className="text-kidia-orange" strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <span className="block font-black text-lg leading-none mb-1">Galeria</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-kidia-grey-text">Carregar imagem</span>
                </div>
              </button>

              <button 
                onClick={() => setShowScanOptions(false)}
                className="w-full py-4 text-kidia-grey-text font-black text-sm uppercase tracking-widest hover:text-kidia-green-dark"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;