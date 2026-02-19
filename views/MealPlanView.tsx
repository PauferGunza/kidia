import React from 'react';
import { ArrowLeft, MoreVertical, Plus, Check, Clock } from '../components/Icons';

export const MealPlanView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-kidia-bg h-full overflow-y-auto pb-32">
      
      {/* Top Header */}
      <div className="px-6 py-5 flex items-center justify-between bg-kidia-bg z-10">
        <button className="text-kidia-green"><ArrowLeft size={24} /></button>
        <h1 className="text-[17px] font-bold text-kidia-green">O Seu Plano Alimentar</h1>
        <button className="text-kidia-green"><MoreVertical size={24} /></button>
      </div>

      {/* Date Carousel */}
      <div className="flex justify-between items-center px-6 mb-6">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-kidia-greyText uppercase mb-1">Seg</span>
          <span className="text-lg font-bold text-kidia-greyText">12</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-kidia-greyText uppercase mb-1">Ter</span>
          <span className="text-lg font-bold text-kidia-greyText">13</span>
        </div>
        <div className="flex flex-col items-center bg-kidia-orange text-white rounded-xl px-4 py-2 shadow-md">
          <span className="text-[10px] font-bold uppercase mb-0.5">Qua</span>
          <span className="text-lg font-bold">14</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-kidia-greyText uppercase mb-1">Qui</span>
          <span className="text-lg font-bold text-kidia-greyText">15</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-kidia-greyText uppercase mb-1">Sex</span>
          <span className="text-lg font-bold text-kidia-greyText">16</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-kidia-greyText uppercase mb-1">Sáb</span>
          <span className="text-lg font-bold text-kidia-greyText">17</span>
        </div>
      </div>

      <div className="px-6 border-t border-gray-100 pt-6">
        
        {/* Summary Cards */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
            <span className="text-[10px] font-bold text-kidia-greyText uppercase tracking-wider block mb-1">Planeado</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-kidia-green">1,450</span>
              <span className="text-xs text-kidia-greyText font-medium">kcal</span>
            </div>
          </div>
          <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
            <span className="text-[10px] font-bold text-kidia-greyText uppercase tracking-wider block mb-1">Meta Diária</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-kidia-orange">1,800</span>
              <span className="text-xs text-kidia-greyText font-medium">kcal</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-dotted border-kidia-orange/50 ml-3 space-y-10">
          
          {/* Breakfast */}
          <div className="relative pl-6">
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-kidia-orange rounded-full"></div>
            
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                <span className="text-kidia-greyText text-xs font-bold tracking-widest">08:30 • PEQUENO ALMOÇO</span>
              </div>
              <div className="bg-[#F2F4F2] px-2 py-1.5 rounded-lg text-center">
                <span className="text-kidia-green font-bold text-xs block leading-none">320</span>
                <span className="text-kidia-green text-[9px] block">kcal</span>
              </div>
            </div>
            
            <h3 className="font-bold text-kidia-green text-lg leading-tight mb-3 pr-10">Papas de Aveia com Frutos Vermelhos</h3>
            
            <div className="bg-white rounded-2xl p-3 shadow-soft border border-gray-50 flex gap-4 items-center">
              <div className="w-20 h-20 rounded-xl bg-kidia-orangeLight overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=200" alt="Food" className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#2A8B58] mb-1">
                  <div className="w-3 h-3 rounded-full bg-[#2A8B58] flex items-center justify-center"><Check size={8} className="text-white" strokeWidth={4} /></div>
                  <span className="text-[10px] font-bold tracking-wider uppercase">Excelente (92/100)</span>
                </div>
                <p className="text-[13px] text-kidia-greyText italic leading-snug">"Comece o dia com energia de libertação lenta."</p>
              </div>
            </div>
          </div>

          {/* Lunch */}
          <div className="relative pl-6">
            <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 bg-white border-4 border-kidia-orange rounded-full shadow-sm"></div>
            
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                <span className="text-kidia-orange text-xs font-bold tracking-widest">13:00 • ALMOÇO</span>
              </div>
              <div className="bg-[#F5EBE1] px-2 py-1.5 rounded-lg text-center">
                <span className="text-kidia-orange font-bold text-xs block leading-none">580</span>
                <span className="text-kidia-orange text-[9px] block">kcal</span>
              </div>
            </div>
            
            <h3 className="font-bold text-kidia-green text-lg leading-tight mb-3 pr-10">Peixe Fresco com Funge e Vegetais</h3>
            
            {/* Dr Viva Tip */}
            <div className="bg-kidia-orangeLight rounded-xl p-4 mb-3 flex gap-3 relative border-l-4 border-kidia-orange">
              <div className="bg-white rounded-full p-1.5 h-fit text-kidia-orange shadow-sm shrink-0">
                <Plus size={16} strokeWidth={3} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-kidia-orange uppercase tracking-wider block mb-1">Dica da Drª Viva</span>
                <p className="text-[13px] text-kidia-green leading-snug">"Rico em Ómega-3 para o desenvolvimento cerebral do seu bebé. O funge fornece os hidratos necessários para a saciedade."</p>
              </div>
            </div>

            {/* Large Image Card */}
            <div className="bg-white rounded-3xl shadow-soft border border-gray-50 overflow-hidden relative">
               <img src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=400" alt="Fish" className="w-full h-40 object-cover" />
               <div className="p-4 flex justify-between items-center">
                 <div className="flex gap-4">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#2A8B58]"><div className="w-2 h-2 rounded-full bg-[#2A8B58]"></div> Nutritivo</span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-kidia-orange"><Clock size={12} /> 35 min</span>
                 </div>
                 <button className="bg-kidia-orange text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-full shadow-sm">
                   Marcar como Feito
                 </button>
               </div>
            </div>
          </div>

          {/* Snack */}
          <div className="relative pl-6">
            <div className="absolute -left-[4px] top-1.5 w-2 h-2 bg-[#DDB18F] rounded-full"></div>
            
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                <span className="text-kidia-greyText text-xs font-bold tracking-widest">16:30 • LANCHE</span>
              </div>
              <div className="bg-[#F2F4F2] px-2 py-1.5 rounded-lg text-center">
                <span className="text-kidia-green font-bold text-xs block leading-none">180</span>
                <span className="text-kidia-green text-[9px] block">kcal</span>
              </div>
            </div>
            
            <h3 className="font-bold text-kidia-green text-lg leading-tight mb-3 pr-10">Iogurte Grego com Nozes</h3>
            
            <div className="bg-white rounded-2xl p-4 shadow-soft border border-gray-50">
                <p className="text-[13px] text-kidia-greyText leading-snug">Uma opção leve para manter o metabolismo ativo até ao jantar.</p>
            </div>
          </div>

          {/* Dinner */}
          <div className="relative pl-6">
            <div className="absolute -left-[4px] top-1.5 w-2 h-2 bg-[#DDB18F] rounded-full"></div>
            
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                <span className="text-kidia-greyText text-xs font-bold tracking-widest">20:00 • JANTAR</span>
              </div>
              <div className="bg-[#F2F4F2] px-2 py-1.5 rounded-lg text-center">
                <span className="text-kidia-green font-bold text-xs block leading-none">370</span>
                <span className="text-kidia-green text-[9px] block">kcal</span>
              </div>
            </div>
            
            <h3 className="font-bold text-kidia-green text-lg leading-tight mb-3 pr-10">Sopa de Legumes e Frango</h3>
            
            <div className="bg-white rounded-3xl shadow-soft border border-gray-50 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400" alt="Soup" className="w-full h-32 object-cover" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};