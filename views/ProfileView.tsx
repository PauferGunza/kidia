import React from 'react';
import { UserProfile } from '../types';
import { ArrowLeft, Droplet, Activity, Minus, Star, ChevronRight, LogOut, Edit2 } from '../components/Icons';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onComplete?: () => void;
  isOnboarding?: boolean;
  onGoPremium?: () => void;
  onLogout?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onUpdateProfile, onComplete, isOnboarding = false, onGoPremium, onLogout }) => {
  
  const GoalCard = ({ icon: Icon, title, desc, isActive, toggleKey, showPlus = false }: any) => (
    <button 
      onClick={() => onUpdateProfile({ [toggleKey]: !profile[toggleKey as keyof UserProfile] })}
      className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all duration-300 flex items-center gap-5 group ${
        isActive 
          ? 'bg-kidia-green-primary border-kidia-green-primary shadow-premium scale-[1.02]' 
          : 'bg-white border-gray-50 shadow-soft hover:border-kidia-green-primary/30'
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-white/20' : 'bg-gray-50 group-hover:bg-kidia-greenLight'}`}>
        <div className="relative">
          <Icon size={24} className={isActive ? 'text-white' : 'text-kidia-green'} fill={isActive ? 'currentColor' : 'none'} strokeWidth={2.5} />
          {showPlus && (
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isActive ? 'text-kidia-green-primary' : 'text-white'}`}>
              <Plus size={12} strokeWidth={4} />
            </div>
          )}
        </div>
      </div>
      <div>
        <h3 className={`font-extrabold text-[17px] tracking-tight ${isActive ? 'text-white' : 'text-kidia-green'}`}>{title}</h3>
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
      <div className="px-6 py-10 flex items-center justify-between">
        <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-kidia-green shadow-soft border border-white">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
        {isOnboarding ? (
          <div className="flex-1 flex justify-center gap-2 mr-10">
            <div className="w-8 h-2 rounded-full bg-kidia-orange"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
          </div>
        ) : (
          <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-kidia-green shadow-soft border border-white">
            <Edit2 size={20} strokeWidth={2} />
          </button>
        )}
      </div>

      {!isOnboarding && (
        <div className="px-6 flex flex-col items-center mb-10">
          <div className="w-28 h-28 bg-white/80 backdrop-blur-sm rounded-[2.5rem] mb-5 flex items-center justify-center relative shadow-premium border border-white">
            <div className="w-24 h-24 bg-kidia-orange/10 rounded-[2rem] flex items-center justify-center">
              <span className="text-4xl font-black text-kidia-orange">{profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}</span>
            </div>
            <div className="absolute bottom-1 right-1 w-9 h-9 bg-kidia-orange rounded-2xl border-4 border-white flex items-center justify-center shadow-lg">
              <Star size={16} className="text-white" fill="currentColor" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-kidia-green mb-1 tracking-tight">{profile.name || 'Utilizador'}</h2>
          <p className="text-sm font-bold text-kidia-grey-text uppercase tracking-widest">{profile.email || 'utilizador@kidia.ao'}</p>
        </div>
      )}

      {isOnboarding && (
        <div className="px-8 pb-8 pt-2 text-center">
          <h1 className="text-3xl font-black text-kidia-green tracking-tighter leading-tight mb-4">
            Fale-nos sobre si
          </h1>
          <p className="text-base text-kidia-grey-text leading-relaxed px-4 font-medium">
            Selecione a sua meta de saúde para uma experiência personalizada.
          </p>
        </div>
      )}

      <div className="px-6 flex-1 space-y-5">
        
        {!isOnboarding && onGoPremium && (
          <button 
            onClick={onGoPremium}
            className="w-full bg-kidia-green-dark rounded-[2.5rem] p-6 flex items-center justify-between shadow-premium relative overflow-hidden active:scale-[0.98] transition-all group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-kidia-orange/10 rounded-full -mr-12 -mt-12 blur-3xl group-hover:bg-kidia-orange/20 transition-colors"></div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-kidia-orange to-kidia-accent-yellow rounded-2xl flex items-center justify-center shadow-lg shadow-orange-900/20">
                <Star size={28} className="text-white" fill="currentColor" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-black text-lg tracking-tight">Kidia Premium</h3>
                <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mt-1">Desbloqueie tudo</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center relative z-10 border border-white/10">
              <ChevronRight size={20} className="text-white" />
            </div>
          </button>
        )}

        <div className="flex items-center justify-between px-2 mb-2">
          <h3 className="text-sm font-black text-kidia-green uppercase tracking-widest">As Suas Metas</h3>
          <div className="h-px flex-1 bg-kidia-green/10 ml-4"></div>
        </div>

        <GoalCard 
          icon={Droplet} 
          title="Sou Diabético" 
          desc="Monitorização personalizada para diabetes"
          isActive={profile.diabetes} toggleKey="diabetes"
          showPlus={true}
        />
        <GoalCard 
          icon={Dumbbell} 
          title="Quero Emagrecer" 
          desc="Planos focados na gestão de peso"
          isActive={profile.weightLoss} toggleKey="weightLoss"
        />
        <GoalCard 
          icon={Activity} 
          title="Hipertenso" 
          desc="Acompanhamento especializado para tensão arterial"
          isActive={profile.hypertension} toggleKey="hypertension"
        />

        {!isOnboarding && onLogout && (
          <div className="pt-10 pb-6">
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-3 text-red-500 font-black py-5 rounded-[2rem] bg-red-50/50 border border-red-100 active:scale-[0.98] transition-all"
            >
              <LogOut size={22} />
              <span className="uppercase tracking-widest text-xs">Terminar Sessão</span>
            </button>
          </div>
        )}
      </div>

      {isOnboarding && (
        <div className="px-6 pb-12 pt-8 mt-auto">
          <button 
            onClick={onComplete}
            className="w-full bg-kidia-orange text-white font-black text-lg py-5 rounded-[2rem] shadow-premium active:scale-[0.98] transition-all"
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
};