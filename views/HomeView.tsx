import React, { useState } from 'react';
import { Droplet, Flame, Smile, Camera, Zap, Star, Trophy, Gift, ChevronRight, CheckCircle, Plus } from '../components/Icons';
import { Logo } from '../components/Logo';

import { UserProfile } from '../types';

interface HomeViewProps {
  onTriggerScan: () => void;
  profile: UserProfile;
}

export const HomeView: React.FC<HomeViewProps> = ({ onTriggerScan, profile }) => {
  const [activeTab, setActiveTab] = useState<'diarias' | 'semanais' | 'mensais'>('diarias');

  return (
    <div className="flex-1 flex flex-col px-6 pt-12 pb-32 overflow-y-auto bg-mesh">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-bold text-kidia-grey-text uppercase tracking-widest leading-none mb-1">Nível 5</p>
            <p className="text-sm font-black text-kidia-green-dark">{profile.name || 'Utilizador'}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-[0_8px_20px_-5px_rgba(0,0,0,0.1)] border-2 border-white bg-white flex items-center justify-center">
            <span className="text-xl font-black text-kidia-green-primary">{profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}</span>
          </div>
        </div>
      </div>

      {/* Primary Action: QR/Camera Scanner */}
      <button 
        onClick={onTriggerScan}
        className="w-full bg-kidia-green-primary rounded-[2.5rem] p-6 mb-8 flex items-center justify-between shadow-premium active:scale-[0.98] transition-all group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <Camera size={32} className="text-kidia-green-primary" strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <h3 className="text-white font-black text-xl tracking-tight">Analisar Prato</h3>
            <p className="text-white/60 text-[11px] font-black uppercase tracking-widest mt-1">Scan de IA do Dr. Viva</p>
          </div>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center relative z-10 border border-white/20">
          <Plus size={24} className="text-white" />
        </div>
      </button>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Main Health Score */}
        <div className="col-span-2 bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 shadow-soft border border-white flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-kidia-green-primary/5 rounded-full -mr-10 -mt-10 blur-3xl"></div>
          
          <div className="relative w-44 h-44 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="#F1F5F9" strokeWidth="10" fill="transparent" />
              <circle 
                cx="50" cy="50" r="42" 
                stroke="#2D6A4F" 
                strokeWidth="10" 
                fill="transparent" 
                strokeDasharray="264" 
                strokeDashoffset="66" 
                strokeLinecap="round" 
                className="transition-all duration-1000 ease-out" 
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-kidia-green-dark tracking-tighter">75</span>
              <span className="text-[10px] font-black text-kidia-grey-text tracking-[0.2em] uppercase">Saúde</span>
            </div>
          </div>
          
          <div className="text-center">
            <span className="bg-kidia-green-primary/10 text-kidia-green-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 inline-block">Ótimo Progresso</span>
            <p className="text-kidia-grey-text text-sm font-medium leading-relaxed">
              Sua saúde está <span className="text-kidia-green-primary font-bold">15% melhor</span> que ontem.
            </p>
          </div>
        </div>

        {/* Small Stats */}
        <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 flex flex-col justify-between shadow-soft border border-white">
          <div className="w-12 h-12 rounded-2xl bg-kidia-orange/10 flex items-center justify-center mb-4">
            <Flame className="text-kidia-orange" size={24} fill="currentColor" />
          </div>
          <div>
            <p className="text-[10px] font-black text-kidia-grey-text uppercase tracking-widest mb-1">Ofensiva</p>
            <p className="text-2xl font-black text-kidia-green-dark">5 Dias</p>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 flex flex-col justify-between shadow-soft border border-white">
          <div className="w-12 h-12 rounded-2xl bg-kidia-green-primary/10 flex items-center justify-center mb-4">
            <Star className="text-kidia-green-primary" size={24} fill="currentColor" />
          </div>
          <div>
            <p className="text-[10px] font-black text-kidia-grey-text uppercase tracking-widest mb-1">Pontos</p>
            <p className="text-2xl font-black text-kidia-green-dark">1,250</p>
          </div>
        </div>
      </div>

      {/* Dica do Dia - Refined Style */}
      <div className="bg-kidia-green-primary rounded-[2rem] p-6 mb-8 relative overflow-hidden shadow-premium">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex flex-col items-center gap-4 relative z-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-md border border-white/20">
            <Zap className="text-kidia-accent-yellow" size={24} fill="currentColor" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-kidia-accent-yellow uppercase tracking-widest block mb-1">Insight do Dr. Viva</span>
            <p className="text-white text-sm leading-relaxed font-medium">
              "Beber um copo de água morna com limão em jejum ajuda a preparar o estômago para a digestão do dia."
            </p>
          </div>
        </div>
      </div>

      {/* Gamified Goals Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-kidia-green flex items-center gap-2">
            <Trophy size={22} className="text-kidia-orange" />
            Missões Ativas
          </h2>
          <button className="text-xs font-bold text-kidia-orange bg-kidia-orange/10 px-3 py-1.5 rounded-full">Ver todas</button>
        </div>

        {/* Tabs */}
        <div className="flex bg-kidia-green/5 rounded-2xl p-1 mb-6">
          {(['diarias', 'semanais', 'mensais'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-[11px] font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-white text-kidia-green shadow-sm scale-[1.02]' : 'text-kidia-grey-text'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {activeTab === 'diarias' && (
            <>
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 shadow-soft border border-white flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-kidia-green-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="text-kidia-green-primary" size={24} fill="currentColor" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-kidia-green text-sm">Beber 2L de água</h3>
                    <span className="text-[10px] font-bold text-kidia-green-primary">+50 pts</span>
                  </div>
                  <div className="w-full bg-gray-200/50 h-2 rounded-full overflow-hidden">
                    <div className="bg-kidia-green-primary h-full w-full rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 shadow-soft border border-white flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-kidia-orange/10 flex items-center justify-center shrink-0">
                  <Camera className="text-kidia-orange" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-kidia-green text-sm">Escanear 1 refeição</h3>
                    <span className="text-[10px] font-bold text-kidia-orange">+100 pts</span>
                  </div>
                  <div className="w-full bg-gray-200/50 h-2 rounded-full overflow-hidden">
                    <div className="bg-kidia-orange h-full w-0 rounded-full"></div>
                  </div>
                </div>
                <button onClick={onTriggerScan} className="bg-kidia-orange text-white text-[11px] font-bold px-4 py-2 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-all">
                  Fazer
                </button>
              </div>
            </>
          )}

          {activeTab === 'semanais' && (
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 shadow-soft border border-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
                <Flame className="text-purple-500" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-kidia-green text-sm">Ofensiva de 7 dias</h3>
                  <span className="text-[10px] font-bold text-purple-500">+300 pts</span>
                </div>
                <div className="w-full bg-gray-200/50 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[70%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-kidia-grey-text mt-1.5 font-medium">5 de 7 dias completados</p>
              </div>
            </div>
          )}

          {activeTab === 'mensais' && (
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 shadow-soft border border-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                <Trophy className="text-blue-500" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-kidia-green text-sm">30 refeições saudáveis</h3>
                  <span className="text-[10px] font-bold text-blue-500">+1000 pts</span>
                </div>
                <div className="w-full bg-gray-200/50 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[40%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-kidia-grey-text mt-1.5 font-medium">12 de 30 refeições</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rewards / Chest - Premium Style */}
      <div className="bg-kidia-orange rounded-[2rem] p-6 flex items-center justify-between shadow-premium relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mt-10 blur-2xl"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <Gift className="text-kidia-orange animate-bounce" size={28} />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">Baú Místico</h3>
            <p className="text-white/70 text-xs font-medium">Faltam 250 pts para abrir</p>
          </div>
        </div>
        <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
          <ChevronRight size={20} />
        </button>
      </div>

    </div>
  );
};