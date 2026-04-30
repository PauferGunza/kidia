import React from 'react';
import { UserProfile, AppView } from '../types';
import { ArrowLeft, Bell, Shield, Smartphone, HelpCircle, LogOut, ChevronRight, Settings as SettingsIcon } from '../components/Icons';

interface SettingsViewProps {
  onBack: () => void;
  onLogout: () => void;
  profile: UserProfile;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack, onLogout, profile }) => {
  return (
    <div className="flex-1 flex flex-col bg-kidia-bg h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 py-10 flex items-center justify-between bg-white shadow-soft z-10 shrink-0 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-kidia-green">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
        <h1 className="text-lg font-black text-kidia-green tracking-tight">Definições</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Account Section */}
        <div>
          <h2 className="text-[11px] font-black text-kidia-grey-text uppercase tracking-widest mb-4 ml-2">Conta e Segurança</h2>
          <div className="bg-white rounded-[2rem] border border-gray-50 shadow-soft overflow-hidden">
            <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <Shield size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-kidia-green">Privacidade</p>
                  <p className="text-[11px] text-kidia-grey-text">Gerenciar dados e acessos</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
            <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <Bell size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-kidia-green">Notificações</p>
                  <p className="text-[11px] text-kidia-grey-text">Alertas de refeições e treinos</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
            <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                  <Smartphone size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-kidia-green">Aparelhos</p>
                  <p className="text-[11px] text-kidia-grey-text">Sincronização com smartwatches</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-[11px] font-black text-kidia-grey-text uppercase tracking-widest mb-4 ml-2">Suporte</h2>
          <div className="bg-white rounded-[2rem] border border-gray-50 shadow-soft overflow-hidden">
            <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-kidia-green-primary">
                  <HelpCircle size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-kidia-green">Centro de Ajuda</p>
                  <p className="text-[11px] text-kidia-grey-text">Dúvidas frequentes</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
            <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                  <Shield size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-kidia-green">Termos e Condições</p>
                  <p className="text-[11px] text-kidia-grey-text">Informação legal</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-4">
          <button 
            onClick={onLogout}
            className="w-full px-6 py-5 flex items-center justify-center gap-3 bg-red-50 text-red-500 rounded-[2rem] font-bold active:scale-95 transition-all"
          >
            <LogOut size={20} />
            Terminar Sessão
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-6 font-medium uppercase tracking-[0.2em]">Kidia v1.0.4 • 2026</p>
        </div>
      </div>
    </div>
  );
};
