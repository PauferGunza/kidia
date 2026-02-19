import React from 'react';
import { ArrowLeft, MoreVertical, Flame, Leaf, Minus, Calendar, Check } from '../components/Icons';

export const HistoryView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-kidia-bg h-full overflow-y-auto pb-32">
      
      {/* Top Header */}
      <div className="px-6 py-5 flex items-center justify-between sticky top-0 bg-kidia-bg/90 backdrop-blur-sm z-10">
        <button className="text-kidia-orange"><ArrowLeft size={24} /></button>
        <h1 className="text-[17px] font-bold text-kidia-green">O Seu Progresso</h1>
        <button className="text-kidia-orange"><MoreVertical size={24} /></button>
      </div>

      <div className="px-6 pt-2">
        {/* Streak Card */}
        <div className="bg-kidia-orangeCard rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg mb-8 relative overflow-hidden bg-dot-pattern">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <Flame className="text-white" size={32} fill="currentColor" />
          </div>
          <span className="text-xs font-bold text-white tracking-widest uppercase mb-1">Streak Atual</span>
          <span className="text-5xl font-bold text-white tracking-tight mb-2">7 Dias</span>
          <p className="text-white/90 text-sm font-medium">Você está indo muito bem, continue!</p>
        </div>

        {/* Conquistas */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[19px] font-bold text-kidia-green">Conquistas Recentes</h2>
          <button className="text-[13px] font-bold text-kidia-orange">Ver todas</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center shadow-soft border border-gray-50">
            <div className="w-16 h-16 bg-[#F4EAE1] rounded-full flex items-center justify-center mb-4">
              <Leaf className="text-kidia-orange" size={28} fill="currentColor" />
            </div>
            <span className="font-bold text-kidia-green text-[15px] leading-tight mb-1">Mestre das<br/>Plantas</span>
            <span className="text-xs text-kidia-greyText">Nível 2</span>
          </div>

          <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center shadow-soft border border-gray-50">
            <div className="w-16 h-16 bg-[#E8EAE8] rounded-full flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-kidia-green rounded-full flex items-center justify-center text-white">
                <Minus size={16} strokeWidth={4} />
              </div>
            </div>
            <span className="font-bold text-kidia-green text-[15px] leading-tight mb-1">7 dias sem açúcar</span>
            <span className="text-xs text-kidia-greyText mt-1">Concluído</span>
          </div>
        </div>

        {/* Histórico Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[19px] font-bold text-kidia-green">Histórico</h2>
          <Calendar className="text-kidia-greyText" size={20} />
        </div>

        {/* List items */}
        <div className="space-y-3">
          {/* Sucesso Item */}
          <div className="bg-white p-4 rounded-xl flex items-center shadow-soft border border-gray-50">
            <div className="w-12 h-12 bg-kidia-green rounded-xl flex items-center justify-center mr-4 shrink-0">
              <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" strokeWidth={3} />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-kidia-green text-[15px]">Hoje</h4>
              <p className="text-kidia-greyText text-[13px] italic">"Cada pequeno passo conta."</p>
            </div>
            <span className="text-[11px] font-bold text-kidia-green tracking-widest uppercase">Sucesso</span>
          </div>

          <div className="bg-white p-4 rounded-xl flex items-center shadow-soft border border-gray-50">
            <div className="w-12 h-12 bg-kidia-green rounded-xl flex items-center justify-center mr-4 shrink-0">
              <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" strokeWidth={3} />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-kidia-green text-[15px]">Ontem</h4>
              <p className="text-kidia-greyText text-[13px] italic">Metas concluídas com êxito</p>
            </div>
            <span className="text-[11px] font-bold text-kidia-green tracking-widest uppercase">Sucesso</span>
          </div>

          <div className="bg-white p-4 rounded-xl flex items-center shadow-soft border border-gray-50">
            <div className="w-12 h-12 bg-kidia-green rounded-xl flex items-center justify-center mr-4 shrink-0">
              <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" strokeWidth={3} />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-kidia-green text-[15px]">22 de Outubro</h4>
              <p className="text-kidia-greyText text-[13px] italic">Rotina matinal completa</p>
            </div>
            <span className="text-[11px] font-bold text-kidia-green tracking-widest uppercase">Sucesso</span>
          </div>

          {/* Pausa Item */}
          <div className="bg-white p-4 rounded-xl flex items-center shadow-soft border border-gray-50">
            <div className="w-12 h-12 bg-kidia-orangeLight rounded-xl flex items-center justify-center mr-4 shrink-0">
              <div className="w-6 h-6 bg-[#D89F6B] rounded-full flex items-center justify-center space-x-0.5">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-kidia-green text-[15px]">21 de Outubro</h4>
              <p className="text-kidia-greyText text-[13px] italic">Descanso necessário</p>
            </div>
            <span className="text-[11px] font-bold text-[#D89F6B] tracking-widest uppercase">Pausa</span>
          </div>
        </div>

      </div>
    </div>
  );
};