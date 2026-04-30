import React, { useState } from 'react';
import { Droplet, Flame, Smile, Camera, Zap, Star, Trophy, Gift, ChevronRight, CheckCircle } from '../components/Icons';
import { Logo } from '../components/Logo';

interface HomeViewProps {
  onTriggerScan: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onTriggerScan }) => {
  const [activeTab, setActiveTab] = useState<'diarias' | 'semanais' | 'mensais'>('diarias');

  return (
    <div className="flex-1 flex flex-col px-6 pt-12 pb-32 overflow-y-auto bg-mesh">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-bold text-kidia-grey-text uppercase tracking-widest">Nível 5</p>
            <p className="text-sm font-extrabold text-kidia-green">Ana Paula</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-soft border-2 border-white">
            <img src="https://images.unsplash.com/photo-1531123897727-8f129e1bfff1?auto=format&fit=crop&q=80&w=150" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Bento Stats Grid - Inspired by Image 11 & 12 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Main Health Score */}
        <div className="col-span-2 bg-kidia-green-dark rounded-[2.5rem] p-6 shadow-premium flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-kidia-green-primary/20 rounded-full -mr-10 -mt-10 blur-3xl"></div>
          
          <div className="relative w-40 h-40 flex items-center justify-center mb-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="transparent" />
              <circle 
                cx="50" cy="50" r="42" 
                stroke="url(#gradient)" 
                strokeWidth="10" 
                fill="transparent" 
                strokeDasharray="264" 
                strokeDashoffset="66" 
                strokeLinecap="round" 
                className="transition-all duration-1000 ease-out" 
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2D6A4F" />
                  <stop offset="100%" stopColor="#FFB703" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white tracking-tighter">75</span>
              <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">Score</span>
            </div>
          </div>
          
          <div className="text-center relative z-10">
            <h2 className="text-lg font-extrabold text-white">Excelente progresso!</h2>
            <p className="text-white/60 text-xs mt-1">Sua saúde está 15% melhor que ontem.</p>
          </div>
        </div>

        {/* Small Stats */}
        <div className="bg-white rounded-3xl p-5 flex flex-col justify-between shadow-soft border border-white/50">
          <div className="w-10 h-10 rounded-2xl bg-kidia-orange/10 flex items-center justify-center mb-3">
            <Flame className="text-kidia-orange" size={20} fill="currentColor" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-kidia-orange uppercase tracking-wider">Ofensiva</p>
            <p className="text-xl font-black text-kidia-green">5 Dias</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 flex flex-col justify-between shadow-soft border border-white/50">
          <div className="w-10 h-10 rounded-2xl bg-kidia-green-primary/10 flex items-center justify-center mb-3">
            <Star className="text-kidia-green-primary" size={20} fill="currentColor" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-kidia-green-primary uppercase tracking-wider">Pontos</p>
            <p className="text-xl font-black text-kidia-green">1,250</p>
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