import React from 'react';
import { UserProfile } from '../types';
import { ArrowLeft, Droplet, Activity, Minus } from '../components/Icons';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onComplete?: () => void;
  isOnboarding?: boolean;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onUpdateProfile, onComplete, isOnboarding = false }) => {
  
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
    <div className="flex-1 flex flex-col bg-kidia-bg h-full overflow-y-auto">
      
      {/* Top Bar */}
      <div className="px-6 py-6 flex items-center">
        <button className="text-kidia-green">
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
        <div className="flex-1 flex justify-center gap-1.5 mr-6">
          <div className="w-6 h-1.5 rounded-full bg-kidia-orange"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
        </div>
      </div>

      <div className="px-8 pb-8 pt-2 text-center">
        <h1 className="text-[28px] font-bold text-kidia-green tracking-tight leading-tight mb-3">
          Tell us about yourself
        </h1>
        <p className="text-[15px] text-kidia-greyText leading-relaxed px-4">
          Select your health goal for a personalized experience.
        </p>
      </div>

      <div className="px-6 flex-1 space-y-4">
        <GoalCard 
          icon={Droplet} 
          title="Sou Diabético" 
          desc="Personalized monitoring for diabetes"
          isActive={profile.diabetes} toggleKey="diabetes"
          showPlus={true}
        />
        <GoalCard 
          icon={Dumbbell} 
          title="Quero Emagrecer" 
          desc="Focused plans for weight management"
          isActive={profile.weightLoss} toggleKey="weightLoss"
        />
        <GoalCard 
          icon={Activity} 
          title="Hipertenso" 
          desc="Specialized tracking for blood pressure"
          isActive={profile.hypertension} toggleKey="hypertension"
        />
      </div>

      {isOnboarding && (
        <div className="px-6 pb-10 pt-6 mt-auto">
          <button 
            onClick={onComplete}
            className="w-full bg-kidia-orange text-white font-bold text-[17px] py-4 rounded-2xl shadow-sm active:scale-95 transition-transform"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};