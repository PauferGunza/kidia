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
      className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 flex items-center gap-5 ${
        isActive 
          ? 'bg-kidia-orangeLight border-kidia-orange' 
          : 'bg-white border-gray-100 shadow-sm'
      }`}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${isActive ? 'bg-[#EAE1D8]' : 'bg-[#F2F4F2]'}`}>
        <div className="relative">
          <Icon size={24} className={isActive ? 'text-kidia-green' : 'text-kidia-green'} fill={isActive ? 'currentColor' : 'none'} strokeWidth={2.5} />
          {showPlus && (
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isActive ? 'text-kidia-orangeLight' : 'text-white'}`}>
              <Plus size={12} strokeWidth={4} />
            </div>
          )}
        </div>
      </div>
      <div>
        <h3 className={`font-semibold text-[17px] ${isActive ? 'text-kidia-green' : 'text-kidia-green'}`}>{title}</h3>
        <p className="text-[13px] text-kidia-greyText mt-1 leading-snug pr-2">{desc}</p>
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
    <div className="flex-1 flex flex-col bg-kidia-bg h-full overflow-y-auto pb-32">
      
      {/* Top Bar */}
      <div className="px-6 py-6 flex items-center justify-between">
        <button className="text-kidia-green">
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
        {isOnboarding ? (
          <div className="flex-1 flex justify-center gap-1.5 mr-6">
            <div className="w-6 h-1.5 rounded-full bg-kidia-orange"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
          </div>
        ) : (
          <button className="text-kidia-green">
            <Edit2 size={20} strokeWidth={2} />
          </button>
        )}
      </div>

      {!isOnboarding && (
        <div className="px-6 flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-kidia-orangeLight rounded-full mb-4 flex items-center justify-center relative">
            <span className="text-4xl font-black text-kidia-orange">{profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}</span>
            <div className="absolute bottom-0 right-0 w-7 h-7 bg-kidia-orange rounded-full border-4 border-kidia-bg flex items-center justify-center">
              <Star size={12} className="text-white" fill="currentColor" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-kidia-green mb-1">{profile.name || 'Utilizador'}</h2>
          <p className="text-[14px] text-kidia-greyText">{profile.email || 'utilizador@kidia.ao'}</p>
        </div>
      )}

      {isOnboarding && (
        <div className="px-8 pb-6 pt-2 text-center">
          <h1 className="text-[28px] font-bold text-kidia-green tracking-tight leading-tight mb-3">
            Fale-nos sobre si
          </h1>
          <p className="text-[15px] text-kidia-greyText leading-relaxed px-4">
            Selecione a sua meta de saúde para uma experiência personalizada.
          </p>
        </div>
      )}

      <div className="px-6 flex-1 space-y-4">
        
        {!isOnboarding && onGoPremium && (
          <button 
            onClick={onGoPremium}
            className="w-full bg-gradient-to-r from-[#111618] to-[#1A3C28] rounded-2xl p-5 flex items-center justify-between shadow-lg relative overflow-hidden active:scale-95 transition-transform mb-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-kidia-orange/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-kidia-orange to-yellow-500 rounded-full flex items-center justify-center shadow-md">
                <Star size={24} className="text-white" fill="currentColor" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold text-[17px] tracking-wide">Kidia Premium</h3>
                <p className="text-white/70 text-xs mt-0.5">Desbloqueie todo o potencial</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center relative z-10">
              <ChevronRight size={18} className="text-white" />
            </div>
          </button>
        )}

        <h3 className="text-[15px] font-bold text-kidia-green mb-2 px-1">As Suas Metas</h3>

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
          <div className="pt-8 pb-4">
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 text-red-500 font-bold py-4 rounded-2xl bg-red-50 active:scale-95 transition-transform"
            >
              <LogOut size={20} />
              Terminar Sessão
            </button>
          </div>
        )}
      </div>

      {isOnboarding && (
        <div className="px-6 pb-10 pt-6 mt-auto">
          <button 
            onClick={onComplete}
            className="w-full bg-kidia-orange text-white font-bold text-[17px] py-4 rounded-2xl shadow-sm active:scale-95 transition-transform"
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
};