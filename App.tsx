import React, { useState, useCallback } from 'react';
import { UserProfile, ScanResult, AppView } from './types';
import { analyzeImage } from './services/geminiService';
import { HomeView } from './views/HomeView';
import { ProfileView } from './views/ProfileView';
import { ScanningView } from './views/ScanningView';
import { ResultsView } from './views/ResultsView';
import { Home, User } from './components/Icons';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [profile, setProfile] = useState<UserProfile>({
    diabetes: false,
    hypertension: false,
    weightLoss: false,
  });
  
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);

  const handleScanStart = async (file: File) => {
    setError(null);
    setCurrentView('scanning');

    try {
      // Create local preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Convert file to base64 for Gemini
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        // Extract just the base64 data part (remove "data:image/jpeg;base64,")
        const base64Data = base64String.split(',')[1];
        const mimeType = file.type || 'image/jpeg';

        try {
          const result = await analyzeImage(base64Data, mimeType, profile);
          setScanResult(result);
          setCurrentView('results');
        } catch (apiError: any) {
          console.error(apiError);
          setError(apiError.message || "Erro ao contactar a IA.");
          setCurrentView('home');
        }
      };
      reader.onerror = () => {
        setError("Erro ao ler a imagem.");
        setCurrentView('home');
      };
      
      reader.readAsDataURL(file);

    } catch (err: any) {
      console.error(err);
      setError("Erro inesperado ocorreu.");
      setCurrentView('home');
    }
  };

  const handleReset = () => {
    setCurrentView('home');
    setScanResult(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  return (
    <div className="flex justify-center bg-gray-900 w-full min-h-screen font-sans">
      {/* Mobile App Container Wrapper */}
      <div className="w-full max-w-md bg-kidia-sand h-[100dvh] flex flex-col relative overflow-hidden shadow-2xl sm:rounded-3xl sm:h-[95vh] sm:my-auto sm:border sm:border-gray-800">
        
        {/* Error Toast */}
        {error && (
          <div className="absolute top-4 left-4 right-4 z-50 bg-kidia-terra text-white px-4 py-3 rounded-xl shadow-lg flex justify-between items-center animate-pulse">
            <span className="text-sm font-medium">{error}</span>
            <button onClick={() => setError(null)} className="text-white/80 hover:text-white font-bold">&times;</button>
          </div>
        )}

        {/* Dynamic View Rendering */}
        {currentView === 'home' && <HomeView onScanStart={handleScanStart} />}
        {currentView === 'profile' && <ProfileView profile={profile} onUpdateProfile={handleUpdateProfile} />}
        {currentView === 'scanning' && <ScanningView />}
        {currentView === 'results' && scanResult && (
          <ResultsView 
            result={scanResult} 
            imagePreview={imagePreview} 
            onBack={handleReset} 
          />
        )}

        {/* Bottom Navigation Bar (Hidden in scanning and results view to focus on content) */}
        {(currentView === 'home' || currentView === 'profile') && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center pb-safe pt-2 pb-6 px-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] z-30">
            <button 
              onClick={() => setCurrentView('home')}
              className={`flex flex-col items-center p-2 transition-colors ${currentView === 'home' ? 'text-kidia-forest' : 'text-gray-400'}`}
            >
              <Home size={24} strokeWidth={currentView === 'home' ? 2.5 : 2} />
              <span className="text-[10px] font-semibold mt-1">Início</span>
            </button>
            
            <button 
              onClick={() => setCurrentView('profile')}
              className={`flex flex-col items-center p-2 transition-colors ${currentView === 'profile' ? 'text-kidia-forest' : 'text-gray-400'}`}
            >
              <User size={24} strokeWidth={currentView === 'profile' ? 2.5 : 2} />
              <span className="text-[10px] font-semibold mt-1">Perfil</span>
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;