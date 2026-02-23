import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { ArrowLeft, MoreVertical, Flame, Leaf, Minus, Calendar, Check, Trophy, Star, Zap, Utensils } from '../components/Icons';

export const HistoryView: React.FC = () => {
  const historyItems = useLiveQuery(() => db.history.orderBy('date').reverse().toArray());

  return (
    <div className="flex-1 flex flex-col bg-kidia-bg h-full overflow-y-auto pb-32">
      
      {/* Top Header */}
      <div className="px-6 py-5 flex items-center justify-between sticky top-0 bg-kidia-bg/90 backdrop-blur-sm z-10">
        <button className="text-kidia-orange"><ArrowLeft size={24} /></button>
        <h1 className="text-[17px] font-bold text-kidia-green">O Seu Progresso</h1>
        <button className="text-kidia-orange"><MoreVertical size={24} /></button>
      </div>

      <div className="px-6 pt-2">
        {/* Gamified Stats Header */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -mr-4 -mt-4 blur-xl"></div>
            <Flame className="text-white mb-2" size={28} fill="currentColor" />
            <span className="text-3xl font-black text-white tracking-tight">5</span>
            <span className="text-[10px] font-bold text-white/90 tracking-widest uppercase mt-1">Dias Seguidos</span>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -mr-4 -mt-4 blur-xl"></div>
            <Star className="text-white mb-2" size={28} fill="currentColor" />
            <span className="text-3xl font-black text-white tracking-tight">1.2k</span>
            <span className="text-[10px] font-bold text-white/90 tracking-widest uppercase mt-1">Pontos Totais</span>
          </div>
        </div>

        {/* Ranking / Leaderboard Preview */}
        <div className="bg-white rounded-2xl p-5 mb-8 shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[17px] font-bold text-kidia-green flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" fill="currentColor" />
              Liga Ouro
            </h2>
            <button className="text-[11px] font-bold text-kidia-orange tracking-widest uppercase">Ver Ranking</button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-kidia-greyText w-4">1</span>
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" alt="User" className="w-full h-full object-cover" />
              </div>
              <span className="flex-1 text-sm font-bold text-kidia-green">Maria S.</span>
              <span className="text-sm font-bold text-kidia-orange">1,450 pts</span>
            </div>
            <div className="flex items-center gap-3 bg-orange-50 p-2 rounded-lg -mx-2">
              <span className="text-sm font-bold text-kidia-orange w-4">2</span>
              <div className="w-8 h-8 rounded-full border-2 border-kidia-orange overflow-hidden">
                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1bfff1?auto=format&fit=crop&q=80&w=150" alt="You" className="w-full h-full object-cover" />
              </div>
              <span className="flex-1 text-sm font-bold text-kidia-green">Você</span>
              <span className="text-sm font-bold text-kidia-orange">1,250 pts</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-kidia-greyText w-4">3</span>
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="User" className="w-full h-full object-cover" />
              </div>
              <span className="flex-1 text-sm font-bold text-kidia-green">João P.</span>
              <span className="text-sm font-bold text-kidia-greyText">1,100 pts</span>
            </div>
          </div>
        </div>

        {/* Conquistas */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[19px] font-bold text-kidia-green">Conquistas Recentes</h2>
          <button className="text-[13px] font-bold text-kidia-orange">Ver todas</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center shadow-soft border border-gray-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-green-50 rounded-bl-full"></div>
            <div className="w-16 h-16 bg-[#F4EAE1] rounded-full flex items-center justify-center mb-4 relative z-10">
              <Leaf className="text-kidia-orange" size={28} fill="currentColor" />
            </div>
            <span className="font-bold text-kidia-green text-[15px] leading-tight mb-1 relative z-10">Mestre das<br/>Plantas</span>
            <span className="text-xs text-kidia-greyText relative z-10">Nível 2</span>
          </div>

          <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center shadow-soft border border-gray-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-blue-50 rounded-bl-full"></div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 relative z-10">
              <Zap className="text-blue-500" size={28} fill="currentColor" />
            </div>
            <span className="font-bold text-kidia-green text-[15px] leading-tight mb-1 relative z-10">Energia<br/>Pura</span>
            <span className="text-xs text-kidia-greyText relative z-10">Desbloqueado</span>
          </div>
        </div>

        {/* Histórico Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[19px] font-bold text-kidia-green">Diário Alimentar</h2>
          <Calendar className="text-kidia-greyText" size={20} />
        </div>

        {/* List items */}
        <div className="space-y-3">
          {historyItems && historyItems.length > 0 ? (
            historyItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl flex items-center shadow-soft border border-gray-50">
                <div className="w-12 h-12 bg-kidia-orangeLight rounded-xl flex items-center justify-center mr-4 shrink-0">
                  <Utensils size={20} className="text-kidia-orange" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-kidia-green text-[15px]">{item.itemName}</h4>
                  <p className="text-kidia-greyText text-[13px]">
                    {item.calories.replace('kcal', '').trim()} kcal • {item.carbs.replace('g', '').trim()}g carbs
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-kidia-greyText tracking-widest uppercase block">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  <span className="text-[10px] text-kidia-greyText">
                    {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-200">
              <Utensils className="mx-auto text-gray-300 mb-2" size={32} />
              <p className="text-kidia-greyText text-sm">Nenhum alimento registado ainda.</p>
              <p className="text-kidia-greyText text-xs mt-1">Faça scan de um prato para adicionar.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};