import React from 'react';
import { UserProfile } from '../types';
import { HeartPulse, Droplet, Scale, User } from '../components/Icons';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onUpdateProfile }) => {
  const ToggleRow = ({ 
    icon: Icon, 
    title, 
    description, 
    isActive, 
    onChange 
  }: { 
    icon: any, 
    title: string, 
    description: string, 
    isActive: boolean, 
    onChange: () => void 
  }) => (
    <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm border border-gray-100">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-kidia-terra/10 text-kidia-terra' : 'bg-gray-100 text-gray-400'}`}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-base">{title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>
      
      {/* Custom iOS style toggle */}
      <button 
        onClick={onChange}
        className={`w-14 h-8 rounded-full transition-colors relative focus:outline-none ${isActive ? 'bg-kidia-forest' : 'bg-gray-200'}`}
        aria-pressed={isActive}
      >
        <span 
          className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${isActive ? 'translate-x-7 left-0' : 'translate-x-1 left-0'}`} 
        />
      </button>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-kidia-sand">
      <div className="flex items-center justify-center pt-8 pb-10">
        <div className="w-24 h-24 bg-kidia-forest/10 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
          <User size={40} className="text-kidia-forest" />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-kidia-forest">O Meu Perfil</h2>
        <p className="text-sm text-gray-600 mt-1">
          A IA do Dr. Viva adaptará as análises com base nas suas necessidades de saúde.
        </p>
      </div>

      <div className="space-y-4 pb-24">
        <ToggleRow 
          icon={Droplet}
          title="Diabetes"
          description="Alerta sobre índice glicémico"
          isActive={profile.diabetes}
          onChange={() => onUpdateProfile({ diabetes: !profile.diabetes })}
        />
        
        <ToggleRow 
          icon={HeartPulse}
          title="Hipertensão"
          description="Monitoriza níveis de sódio/tensão"
          isActive={profile.hypertension}
          onChange={() => onUpdateProfile({ hypertension: !profile.hypertension })}
        />
        
        <ToggleRow 
          icon={Scale}
          title="Perda de Peso"
          description="Foco em calorias e metabolismo"
          isActive={profile.weightLoss}
          onChange={() => onUpdateProfile({ weightLoss: !profile.weightLoss })}
        />
      </div>
    </div>
  );
};