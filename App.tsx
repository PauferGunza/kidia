import React, { useState, useCallback, useRef } from 'react';
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
import { Home, User, Plus, Calendar, BarChart2, MessageCircle } from './components/Icons';

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
  });
  
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    if (!hasCompletedOnboarding) {
      setCurrentView('profile'); // Go to onboarding
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleSignup = (name: string, email: string) => {
    setProfile(prev => ({ ...prev, name, email }));
    setIsAuthenticated(true);
    setCurrentView('profile'); // Go to onboarding
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  const triggerScanner = () => {
    fileInputRef.current?.click();
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
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center bg-gray-900 w-full min-h-screen font-sans">
        <div className="w-full max-w-md bg-kidia-bg h-[100dvh] flex flex-col relative overflow-hidden sm:h-[95vh] sm:my-auto sm:rounded-3xl shadow-2xl">
          {currentView === 'login' && <LoginView onLogin={handleLogin} onGoToSignup={() => setCurrentView('signup')} />}
          {currentView === 'signup' && <SignupView onSignup={handleSignup} onGoToLogin={() => setCurrentView('login')} />}
        </div>
      </div>
    );
  }

  // 1. Onboarding Gate
  if (!hasCompletedOnboarding) {
    return (
      <div className="flex justify-center bg-gray-900 w-full min-h-screen font-sans">
        <div className="w-full max-w-md bg-kidia-bg h-[100dvh] flex flex-col relative overflow-hidden sm:h-[95vh] sm:my-auto sm:rounded-3xl shadow-2xl">
          <ProfileView 
            profile={profile} 
            onUpdateProfile={handleUpdateProfile} 
            onComplete={() => {
              setHasCompletedOnboarding(true);
              setCurrentView('dashboard');
            }} 
            isOnboarding={true}
          />
        </div>
      </div>
    );
  }

  const showBottomNav = !['scanning', 'results', 'premium', 'chat'].includes(currentView as string);

  return (
    <div className="flex justify-center bg-gray-900 w-full min-h-screen font-sans">
      <div className="w-full max-w-md bg-kidia-bg h-[100dvh] flex flex-col relative overflow-hidden sm:h-[95vh] sm:my-auto sm:rounded-3xl shadow-2xl">
        
        {/* Hidden File Input for the FAB */}
        <input 
          type="file" accept="image/*" capture="environment" 
          ref={fileInputRef} onChange={handleScanStart} className="hidden" 
        />

        {error && (
          <div className="absolute top-4 left-4 right-4 z-50 bg-red-500 text-white px-5 py-3 rounded-2xl shadow-lg flex justify-between items-center animate-pulse">
            <span className="text-sm font-bold">{error}</span>
            <button onClick={() => setError(null)} className="text-white/80 hover:text-white font-bold text-lg">&times;</button>
          </div>
        )}

        {/* Dynamic Views */}
        {currentView === 'dashboard' && <HomeView onTriggerScan={triggerScanner} />}
        {currentView === 'mealplan' && <MealPlanView />}
        {currentView === 'history' && <HistoryView />}
        {currentView === 'chat' && <ChatView profile={profile} onBack={() => setCurrentView('dashboard')} />}
        {currentView === 'profile' && <ProfileView profile={profile} onUpdateProfile={handleUpdateProfile} onGoPremium={() => setCurrentView('premium')} onLogout={handleLogout} />}
        {currentView === 'scanning' && <ScanningView imagePreview={imagePreview} />}
        {currentView === 'premium' && <PremiumView onBack={() => setCurrentView('profile')} />}
        {currentView === 'results' && scanResult && (
          <ResultsView result={scanResult} imagePreview={imagePreview} onBack={handleResetScan} />
        )}

        {/* Unified Bottom Navigation matching Image 4 */}
        {showBottomNav && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-50 flex justify-between items-center px-6 pb-8 pt-4 z-30 shadow-premium">
            <button onClick={() => setCurrentView('dashboard')} className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${currentView === 'dashboard' ? 'text-kidia-orange' : 'text-kidia-grey-text'}`}>
              <Home size={22} strokeWidth={currentView === 'dashboard' ? 3 : 2} fill={currentView === 'dashboard' ? 'currentColor' : 'none'} />
              <span className="text-[9px] font-black tracking-widest uppercase">Início</span>
            </button>
            
            <button onClick={() => setCurrentView('chat')} className={`flex flex-col items-center gap-1.5 mr-4 transition-all active:scale-90 ${(currentView as string) === 'chat' ? 'text-kidia-orange' : 'text-kidia-grey-text'}`}>
              <MessageCircle size={22} strokeWidth={(currentView as string) === 'chat' ? 3 : 2} fill={(currentView as string) === 'chat' ? 'currentColor' : 'none'} />
              <span className="text-[9px] font-black tracking-widest uppercase">Chat</span>
            </button>

            {/* Center FAB */}
            <div className="relative -translate-y-6">
              <div className="absolute inset-0 bg-kidia-green-primary/20 blur-xl rounded-full"></div>
              <button 
                onClick={triggerScanner}
                className="w-16 h-16 bg-kidia-green-primary rounded-[1.5rem] shadow-premium flex items-center justify-center relative z-10 active:scale-95 transition-all group"
              >
                <Plus size={32} className="text-white group-hover:rotate-90 transition-transform" strokeWidth={3} />
              </button>
            </div>

            <button onClick={() => setCurrentView('history')} className={`flex flex-col items-center gap-1.5 ml-4 transition-all active:scale-90 ${currentView === 'history' ? 'text-kidia-orange' : 'text-kidia-grey-text'}`}>
              <BarChart2 size={22} strokeWidth={currentView === 'history' ? 3 : 2} />
              <span className="text-[9px] font-black tracking-widest uppercase">Progresso</span>
            </button>

            <button onClick={() => setCurrentView('profile')} className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${currentView === 'profile' ? 'text-kidia-orange' : 'text-kidia-grey-text'}`}>
              <User size={22} strokeWidth={currentView === 'profile' ? 3 : 2} fill={currentView === 'profile' ? 'currentColor' : 'none'} />
              <span className="text-[9px] font-black tracking-widest uppercase">Perfil</span>
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;