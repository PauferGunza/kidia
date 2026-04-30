import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ArrowLeft, Droplet, Activity, Minus, Star, ChevronRight, LogOut, Edit2, Settings as SettingsIcon, Camera, Target, TrendingUp, Shield, Scale, ChevronLeft } from '../components/Icons';
import { Logo } from '../components/Logo';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onComplete?: () => void;
  isOnboarding?: boolean;
  onGoPremium?: () => void;
  onGoSettings: () => void;
  onBack?: () => void;
  onLogout?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ 
  profile, 
  onUpdateProfile, 
  onComplete, 
  isOnboarding = false, 
  onGoPremium, 
  onLogout,
  onGoSettings,
  onBack
}) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  const GoalCard = ({ icon: Icon, title, desc, isActive, toggleKey, showPlus = false }: any) => (
    <button 
      onClick={() => onUpdateProfile({ [toggleKey]: !profile[toggleKey as keyof UserProfile] })}
      className={`w-full text-left p-6 rounded-[2.5rem] border-2 transition-all duration-300 flex items-center gap-5 group ${
        isActive 
          ? 'bg-kidia-green-primary border-kidia-green-primary shadow-premium scale-[1.02]' 
          : 'bg-white/60 backdrop-blur-md border-white shadow-soft hover:border-kidia-green-primary/30'
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-white/20' : 'bg-kidia-green-primary/5 group-hover:bg-kidia-green-primary/10'}`}>
        <div className="relative">
          <Icon size={24} className={isActive ? 'text-white' : 'text-kidia-green-primary'} fill={isActive ? 'currentColor' : 'none'} strokeWidth={2.5} />
          {showPlus && (
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isActive ? 'text-kidia-green-primary' : 'text-kidia-green-primary'}`}>
              <Plus size={10} strokeWidth={4} />
            </div>
          )}
        </div>
      </div>
      <div>
        <h3 className={`font-extrabold text-[17px] tracking-tight ${isActive ? 'text-white' : 'text-kidia-green-dark'}`}>{title}</h3>
        <p className={`text-[13px] mt-1 leading-snug pr-2 font-medium ${isActive ? 'text-white/80' : 'text-kidia-grey-text'}`}>{desc}</p>
      </div>
    </button>
  );

  // Custom Plus icon for the droplet
  const Plus = ({ size, className, strokeWidth }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  // Dumbbell icon
  const Dumbbell = ({ size, className, strokeWidth }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.4 14.4l5.6 5.6"></path>
      <path d="M20 14.4l-5.6 5.6"></path>
      <path d="M9.6 9.6L4 4"></path>
      <path d="M4 9.6l5.6-5.6"></path>
      <path d="M6.8 6.8l10.4 10.4"></path>
    </svg>
  );

  return (
    <div className="flex-1 flex flex-col bg-mesh h-full overflow-y-auto pb-32">
      
      {/* Top Bar */}
      <div className="px-6 py-10 flex items-center justify-between sticky top-0 z-20 bg-white/10 backdrop-blur-md">
        <div className="w-12 h-12">
          {!isOnboarding && onBack && (
            <button 
              onClick={onBack}
              className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-kidia-green-dark shadow-soft border border-gray-100"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
          )}
        </div>
        
        {isOnboarding ? (
          <Logo size="sm" showText={false} />
        ) : (
          <h1 className="text-xl font-black text-kidia-green-dark">Perfil</h1>
        )}

        <button 
          onClick={onGoSettings}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-kidia-green-dark shadow-soft border border-gray-100"
        >
          <SettingsIcon size={22} strokeWidth={2} />
        </button>
      </div>

      {!isOnboarding && (
        <div className="px-6 flex flex-col items-center mb-10 pt-4">
          <div className="text-center">
            <h2 className="text-4xl font-black text-kidia-green-dark mb-2 tracking-tight">{profile.name || 'Utilizador'}</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em] bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">Membro Nível 5</span>
              <span className="text-[11px] font-bold text-kidia-grey-text uppercase tracking-widest">{profile.email}</span>
            </div>
          </div>
        </div>
      )}

      {isOnboarding && (
        <div className="px-8 pb-10 pt-4 text-center">
          <h1 className="text-4xl font-black text-kidia-green-dark tracking-tighter leading-tight mb-4">
            Personalize a sua <span className="text-kidia-green-primary">Saúde</span>
          </h1>
          <p className="text-[17px] text-kidia-grey-text leading-relaxed px-2 font-medium">
            Selecione as suas condições para receber conselhos exclusivos da Kdia.
          </p>
        </div>
      )}

      <div className="px-6 flex-1 space-y-6">
        
        {!isOnboarding && onGoPremium && (
          <button 
            onClick={onGoPremium}
            className="w-full bg-kidia-green-dark rounded-[2.5rem] p-6 flex items-center justify-between shadow-premium relative overflow-hidden active:scale-[0.98] transition-all group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-kidia-orange/15 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-kidia-orange/25 transition-colors"></div>
            <div className="flex items-center gap-5 relative z-10 transition-transform group-hover:translate-x-1">
              <div className="w-16 h-16 bg-gradient-to-br from-kidia-orange to-kidia-accent-yellow rounded-2xl flex items-center justify-center shadow-lg shadow-orange-950/20">
                <Star size={32} className="text-white" fill="currentColor" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-black text-[20px] tracking-tight">Kidia Premium</h3>
                <p className="text-white/60 text-[11px] font-black uppercase tracking-widest mt-1">Acesso Total à Kdia</p>
              </div>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center relative z-10 border border-white/20 group-hover:bg-white/20 transition-all">
              <ChevronRight size={24} className="text-white" />
            </div>
          </button>
        )}

        <div className="flex items-center justify-between px-4 mb-2">
          <h3 className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em]">Configurações Vital</h3>
          <div className="h-px flex-1 bg-kidia-green-primary/10 ml-6"></div>
        </div>

        <div className="space-y-4">
          <GoalCard 
            icon={Droplet} 
            title="Diabetes" 
            desc="Controlar glicémia e hidratos"
            isActive={profile.diabetes} toggleKey="diabetes"
            showPlus={true}
          />
          <GoalCard 
            icon={Dumbbell} 
            title="Perda de Peso" 
            desc="Défice calórico e metabolismo"
            isActive={profile.weightLoss} toggleKey="weightLoss"
          />
          <GoalCard 
            icon={Activity} 
            title="Hipertensão" 
            desc="Redução de sódio e saúde cardíaca"
            isActive={profile.hypertension} toggleKey="hypertension"
          />
        </div>

      </div>

      {isOnboarding && (
        <div className="px-6 pb-12 pt-10 mt-auto">
          <button 
            onClick={onComplete}
            className="w-full bg-kidia-green-primary text-white font-black text-xl py-6 rounded-[2.5rem] shadow-[0_15px_30px_-10px_rgba(45,106,79,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            Começar Agora
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};