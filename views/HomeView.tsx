import React from 'react';
import { Droplet, Flame, Smile, Camera } from '../components/Icons';

interface HomeViewProps {
  onTriggerScan: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onTriggerScan }) => {
  return (
    <div className="flex-1 flex flex-col px-6 pt-10 pb-32 overflow-y-auto bg-kidia-bg">
      
      {/* Top Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-kidia-greyText text-sm mb-0.5">Bem-vindo de volta</p>
          <h1 className="text-2xl font-bold text-kidia-green tracking-tight">Bom dia, Ana Paula</h1>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm border-2 border-kidia-orangeLight">
          <img src="https://images.unsplash.com/photo-1531123897727-8f129e1bfff1?auto=format&fit=crop&q=80&w=150" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Large Circular Progress (Arc) */}
      <div className="flex flex-col items-center justify-center mb-8 relative">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-[-135deg]" viewBox="0 0 100 100">
            {/* Background Arc */}
            <circle cx="50" cy="50" r="45" stroke="#EFE9E0" strokeWidth="6" fill="transparent" strokeDasharray="283" strokeDashoffset="70" strokeLinecap="round" />
            {/* Progress Arc (75%) */}
            <circle cx="50" cy="50" r="45" stroke="#C26E28" strokeWidth="6" fill="transparent" strokeDasharray="283" strokeDashoffset="130" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center mt-4">
            <span className="text-5xl font-black text-kidia-green tracking-tighter">75%</span>
            <span className="text-[11px] font-bold text-kidia-greyText tracking-widest mt-1">CONCLUÍDO</span>
          </div>
        </div>
        
        <div className="text-center mt-[-10px] z-10">
          <h2 className="text-lg font-bold text-kidia-green">Você está no caminho certo!</h2>
          <p className="text-kidia-greyText text-sm mt-1">Faltam apenas 3 tarefas para bater a meta.</p>
        </div>
      </div>

      {/* 3 Stat Cards */}
      <div className="flex justify-between gap-3 mb-10">
        <div className="flex-1 bg-white rounded-2xl p-4 flex flex-col items-center shadow-soft border border-gray-50">
          <Droplet className="text-kidia-orange mb-2" size={24} fill="currentColor" />
          <span className="font-bold text-kidia-green text-lg">1.2L</span>
          <span className="text-[9px] font-bold text-kidia-greyText tracking-widest uppercase mt-0.5">Hidratação</span>
        </div>
        <div className="flex-1 bg-white rounded-2xl p-4 flex flex-col items-center shadow-soft border border-gray-50">
          <Flame className="text-kidia-orange mb-2" size={24} fill="currentColor" />
          <span className="font-bold text-kidia-green text-lg">1,500</span>
          <span className="text-[9px] font-bold text-kidia-greyText tracking-widest uppercase mt-0.5">Calorias</span>
        </div>
        <div className="flex-1 bg-white rounded-2xl p-4 flex flex-col items-center shadow-soft border border-gray-50">
          <Smile className="text-kidia-orange mb-2" size={24} fill="currentColor" />
          <span className="font-bold text-kidia-green text-lg">Radiante</span>
          <span className="text-[9px] font-bold text-kidia-greyText tracking-widest uppercase mt-0.5">Humor</span>
        </div>
      </div>

      {/* Mission of the Day */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-kidia-green">Missão do Dia</h2>
          <button className="text-[11px] font-bold text-kidia-orange tracking-widest uppercase">Ver Todas</button>
        </div>

        <div className="bg-kidia-green rounded-[28px] p-5 flex items-center relative shadow-lg overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0">
             <div className="w-6 h-6 border-b-2 border-l-2 border-r-2 border-white rounded-b-sm relative">
                <div className="absolute -top-1 left-0 right-0 h-1 bg-white"></div>
             </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">Beber 2L de água</h3>
            <p className="text-white/60 text-sm mt-0.5">Meta diária essencial</p>
          </div>

          {/* Large overlapping camera button */}
          <button 
            onClick={onTriggerScan}
            className="absolute -bottom-2 -right-2 w-20 h-20 bg-kidia-orange rounded-full flex items-center justify-center shadow-xl border-[6px] border-kidia-bg transform active:scale-95 transition-transform"
          >
            <Camera className="text-white" size={28} fill="currentColor" />
          </button>
        </div>
      </div>

    </div>
  );
};