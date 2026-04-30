import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { ArrowLeft, MoreVertical, Flame, Leaf, Minus, Calendar, Check, Trophy, Star, Zap, Utensils } from '../components/Icons';
import { Logo } from '../components/Logo';

export const HistoryView: React.FC = () => {
  const historyItems = useLiveQuery(() => db.history.orderBy('date').reverse().toArray());

  return (
    <div className="flex-1 flex flex-col bg-mesh h-full overflow-y-auto pb-32">
      
      {/* Top Header */}
      <div className="px-6 py-10 flex items-center justify-between sticky top-0 bg-kidia-bg/90 backdrop-blur-md z-10 border-b border-kidia-green/5">
        <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-kidia-green shadow-soft border border-white">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
        <h1 className="text-lg font-extrabold text-kidia-green tracking-tight">O Seu Progresso</h1>
        <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-kidia-green shadow-soft border border-white">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="px-6 pt-6">
        {/* Gamified Stats Header */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-kidia-orange rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-6 -mt-6 blur-2xl"></div>
            <Flame className="text-white mb-3" size={32} fill="currentColor" />
            <span className="text-4xl font-black text-white tracking-tighter">5</span>
            <span className="text-[10px] font-bold text-white/80 tracking-widest uppercase mt-2">Dias Seguidos</span>
          </div>
          <div className="bg-kidia-green-primary rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-6 -mt-6 blur-2xl"></div>
            <Star className="text-kidia-accent-yellow mb-3" size={32} fill="currentColor" />
            <span className="text-4xl font-black text-white tracking-tighter">1.2k</span>
            <span className="text-[10px] font-bold text-white/80 tracking-widest uppercase mt-2">Pontos Totais</span>
          </div>
        </div>

        {/* Ranking / Leaderboard Preview */}
        <div className="bg-white/60 backdrop-blur-sm rounded-[2.5rem] p-8 mb-8 shadow-premium border border-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-kidia-green flex items-center gap-2">
              <Trophy size={22} className="text-kidia-accent-yellow" fill="currentColor" />
              Liga Ouro
            </h2>
            <button className="text-[11px] font-bold text-kidia-orange bg-kidia-orange/10 px-3 py-1.5 rounded-full uppercase tracking-widest">Ranking</button>
          </div>
          
          <div className="space-y-4">
            {[
              { rank: 1, name: 'Maria S.', pts: '1,450', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
              { rank: 2, name: 'Você', pts: '1,250', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1bfff1?auto=format&fit=crop&q=80&w=150', current: true },
              { rank: 3, name: 'João P.', pts: '1,100', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' }
            ].map((user) => (
              <div key={user.rank} className={`flex items-center gap-4 p-3 rounded-2xl transition-all ${user.current ? 'bg-kidia-orange/10 border border-kidia-orange/10 scale-[1.02]' : ''}`}>
                <span className={`text-sm font-black w-4 ${user.current ? 'text-kidia-orange' : 'text-kidia-grey-text'}`}>{user.rank}</span>
                <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${user.current ? 'border-kidia-orange' : 'border-white shadow-sm'}`}>
                  <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <span className={`flex-1 text-sm font-extrabold ${user.current ? 'text-kidia-green' : 'text-kidia-green/80'}`}>{user.name}</span>
                <span className={`text-sm font-black ${user.current ? 'text-kidia-orange' : 'text-kidia-grey-text'}`}>{user.pts} pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conquistas */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-kidia-green">Conquistas</h2>
          <button className="text-xs font-bold text-kidia-green-primary">Ver todas</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-[2rem] flex flex-col items-center text-center shadow-soft border border-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-kidia-green-light/30 rounded-bl-full"></div>
            <div className="w-16 h-16 bg-kidia-orange/10 rounded-2xl flex items-center justify-center mb-4 relative z-10 shadow-sm">
              <Leaf className="text-kidia-orange" size={28} fill="currentColor" />
            </div>
            <span className="font-extrabold text-kidia-green text-[15px] leading-tight mb-1 relative z-10">Mestre das<br/>Plantas</span>
            <span className="text-[10px] font-bold text-kidia-grey-text uppercase tracking-widest relative z-10">Nível 2</span>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-[2rem] flex flex-col items-center text-center shadow-soft border border-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full"></div>
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 relative z-10 shadow-sm">
              <Zap className="text-blue-500" size={28} fill="currentColor" />
            </div>
            <span className="font-extrabold text-kidia-green text-[15px] leading-tight mb-1 relative z-10">Energia<br/>Pura</span>
            <span className="text-[10px] font-bold text-kidia-grey-text uppercase tracking-widest relative z-10">Ativo</span>
          </div>
        </div>

        {/* Histórico Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-kidia-green">Diário Alimentar</h2>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-kidia-grey-text shadow-soft">
            <Calendar size={20} />
          </div>
        </div>

        {/* List items */}
        <div className="space-y-4">
          {historyItems && historyItems.length > 0 ? (
            historyItems.map((item) => (
              <div key={item.id} className="bg-white/60 backdrop-blur-sm p-5 rounded-[2rem] flex items-center shadow-soft border border-white group hover:shadow-premium transition-all">
                <div className="w-14 h-14 bg-kidia-orange/10 rounded-2xl flex items-center justify-center mr-4 shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <Utensils size={24} className="text-kidia-orange" />
                </div>
                <div className="flex-1">
                  <h4 className="font-extrabold text-kidia-green text-base">{item.itemName}</h4>
                  <p className="text-kidia-grey-text text-xs font-semibold mt-0.5">
                    {item.calories.replace('kcal', '').trim()} kcal • {item.carbs.replace('g', '').trim()}g carbos
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-kidia-green-primary tracking-widest uppercase block mb-1">
                    {new Date(item.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' })}
                  </span>
                  <span className="text-[10px] font-bold text-kidia-grey-text uppercase">
                    {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white/40 backdrop-blur-sm rounded-[2.5rem] border-2 border-dashed border-kidia-green/10 shadow-soft">
              <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="text-gray-300" size={32} />
              </div>
              <p className="text-kidia-green font-extrabold text-sm">Nenhum alimento registado ainda.</p>
              <p className="text-kidia-grey-text text-xs mt-2 font-medium">Faça scan de um prato para começar.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};