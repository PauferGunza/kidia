import React, { useState } from 'react';
import { Droplet, Flame, Smile, Camera, Zap, Star, Trophy, Gift, ChevronRight, CheckCircle } from '../components/Icons';

interface HomeViewProps {
  onTriggerScan: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onTriggerScan }) => {
  const [activeTab, setActiveTab] = useState<'diarias' | 'semanais' | 'mensais'>('diarias');

  return (
    <div className="flex-1 flex flex-col px-6 pt-10 pb-32 overflow-y-auto bg-kidia-bg">
      
      {/* Top Header with Gamification Stats */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-kidia-greyText text-sm mb-0.5">Bem-vindo de volta</p>
          <h1 className="text-2xl font-bold text-kidia-green tracking-tight">Bom dia, Ana Paula</h1>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm border-2 border-kidia-orangeLight">
          <img src="https://images.unsplash.com/photo-1531123897727-8f129e1bfff1?auto=format&fit=crop&q=80&w=150" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Streak and Points Bar */}
      <div className="flex gap-3 mb-8">
        <div className="flex-1 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm border border-gray-50">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <Flame className="text-orange-500" size={20} fill="currentColor" />
          </div>
          <div>
            <p className="text-xs font-bold text-kidia-greyText uppercase tracking-wider">Ofensiva</p>
            <p className="text-lg font-black text-kidia-green">5 Dias</p>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm border border-gray-50">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <Star className="text-yellow-500" size={20} fill="currentColor" />
          </div>
          <div>
            <p className="text-xs font-bold text-kidia-greyText uppercase tracking-wider">Pontos</p>
            <p className="text-lg font-black text-kidia-green">1,250</p>
          </div>
        </div>
      </div>

      {/* Dica do Dia (Tip of the Day) */}
      <div className="bg-gradient-to-br from-[#1A3C28] to-[#2A553B] rounded-[24px] p-5 mb-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
            <Zap className="text-yellow-400" size={24} fill="currentColor" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Dica do Dr. Viva</span>
            </div>
            <p className="text-white text-sm leading-relaxed font-medium">
              "Beber um copo de água morna com limão em jejum ajuda a preparar o estômago para a digestão do dia."
            </p>
          </div>
        </div>
      </div>

      {/* Large Circular Progress (Arc) */}
      <div className="flex flex-col items-center justify-center mb-8 relative">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-[-135deg]" viewBox="0 0 100 100">
            {/* Background Arc */}
            <circle cx="50" cy="50" r="45" stroke="#EFE9E0" strokeWidth="8" fill="transparent" strokeDasharray="283" strokeDashoffset="70" strokeLinecap="round" />
            {/* Progress Arc (75%) */}
            <circle cx="50" cy="50" r="45" stroke="#C26E28" strokeWidth="8" fill="transparent" strokeDasharray="283" strokeDashoffset="130" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center mt-4">
            <span className="text-4xl font-black text-kidia-green tracking-tighter">75%</span>
            <span className="text-[10px] font-bold text-kidia-greyText tracking-widest mt-1">SAÚDE HOJE</span>
          </div>
        </div>
        
        <div className="text-center mt-[-10px] z-10">
          <h2 className="text-lg font-bold text-kidia-green">Quase lá, guerreira!</h2>
          <p className="text-kidia-greyText text-sm mt-1">Faltam 250 pontos para o baú diário.</p>
        </div>
      </div>

      {/* Gamified Goals Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-kidia-green flex items-center gap-2">
            <Trophy size={20} className="text-kidia-orange" />
            Metas e Desafios
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-4">
          <button 
            onClick={() => setActiveTab('diarias')}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-colors ${activeTab === 'diarias' ? 'bg-white text-kidia-green shadow-sm' : 'text-kidia-greyText'}`}
          >
            Diárias
          </button>
          <button 
            onClick={() => setActiveTab('semanais')}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-colors ${activeTab === 'semanais' ? 'bg-white text-kidia-green shadow-sm' : 'text-kidia-greyText'}`}
          >
            Semanais
          </button>
          <button 
            onClick={() => setActiveTab('mensais')}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-colors ${activeTab === 'mensais' ? 'bg-white text-kidia-green shadow-sm' : 'text-kidia-greyText'}`}
          >
            Mensais
          </button>
        </div>

        {/* Goals List */}
        <div className="space-y-3">
          {activeTab === 'diarias' && (
            <>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle className="text-green-500" size={24} fill="currentColor" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-kidia-green text-sm">Beber 2L de água</h3>
                  <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-green-500 h-full w-full rounded-full"></div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-green-500">+50 pts</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <Camera className="text-orange-500" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-kidia-green text-sm">Escanear 1 refeição</h3>
                  <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-kidia-orange h-full w-0 rounded-full"></div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <button onClick={onTriggerScan} className="bg-kidia-orange text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    Fazer
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'semanais' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                <Flame className="text-purple-500" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-kidia-green text-sm">Manter ofensiva de 7 dias</h3>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-purple-500 h-full w-[70%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-kidia-greyText mt-1">5/7 dias</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-purple-500">+300 pts</span>
              </div>
            </div>
          )}

          {activeTab === 'mensais' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Trophy className="text-blue-500" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-kidia-green text-sm">Escanear 30 refeições saudáveis</h3>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-500 h-full w-[40%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-kidia-greyText mt-1">12/30 refeições</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-blue-500">+1000 pts</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rewards / Chest */}
      <div className="bg-[#F5EBE1] rounded-2xl p-4 flex items-center justify-between border border-[#E4D1C1]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Gift className="text-kidia-orange" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-kidia-green text-sm">Baú de Recompensas</h3>
            <p className="text-xs text-kidia-greyText">Desbloqueia aos 1,500 pts</p>
          </div>
        </div>
        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-kidia-orange">
          <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
};