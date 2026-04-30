import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { UserProfile } from '../types';
import { ArrowLeft, MoreVertical, Flame, Leaf, Minus, Calendar, Check, Trophy, Star, Zap, Utensils, Target, TrendingUp, AlertCircle, Bookmark } from '../components/Icons';
import { Logo } from '../components/Logo';

interface HistoryViewProps {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ profile, onUpdateProfile }) => {
  const historyItems = useLiveQuery(() => db.history.orderBy('date').reverse().toArray());

  const goals = [
    { id: 'lose', label: 'Perder Peso', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'gain', label: 'Ganhar Peso', icon: Utensils, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'maintain', label: 'Manutenção', icon: Check, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'control', label: 'Controlar', icon: Target, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const currentGoal = goals.find(g => g.id === profile.weeklyGoal) || goals[3];

  return (
    <div className="flex-1 flex flex-col bg-kidia-bg h-full overflow-y-auto pb-32">
      
      {/* Top Header */}
      <div className="px-6 pt-12 pb-8 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-30 border-b border-gray-50/50">
        <div className="w-10"></div>
        <h1 className="text-2xl font-black text-kidia-green-dark tracking-tight">Estatísticas</h1>
        <Logo size="sm" showText={false} />
      </div>

      <div className="px-6 space-y-12 pt-10">
        
        {/* Weekly Goal Section */}
        <section>
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em]">Foco Ativo</h2>
            <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-50 px-3 py-1 rounded-full">Automático</span>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {goals.map((g) => (
              <button 
                key={g.id}
                onClick={() => onUpdateProfile({ weeklyGoal: g.id as any })}
                className={`p-6 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 ${
                  profile.weeklyGoal === g.id 
                    ? 'bg-white border-kidia-green-primary shadow-premium scale-[1.02]' 
                    : 'bg-white/50 border-gray-50 shadow-soft text-gray-400'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${profile.weeklyGoal === g.id ? g.bg : 'bg-gray-50'}`}>
                  <g.icon size={26} className={profile.weeklyGoal === g.id ? g.color : 'text-gray-300'} />
                </div>
                <span className={`text-[14px] font-black tracking-tight ${profile.weeklyGoal === g.id ? 'text-kidia-green-dark' : 'text-gray-400'}`}>{g.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Analysis Data Section */}
        <section>
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em]">Distribuição Alimentar</h2>
          </div>
          <div className="bg-white rounded-[2.8rem] p-8 shadow-premium border border-gray-50">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-black text-kidia-green-dark">Alimentos Alcalinos</span>
                  </div>
                  <span className="text-sm font-black text-kidia-green">65%</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-kidia-green-primary h-full rounded-full w-[65%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-black text-kidia-green-dark">Proteína Vital</span>
                  </div>
                  <span className="text-sm font-black text-kidia-orange">42%</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-kidia-orange h-full rounded-full w-[42%]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diário List */}
        <section className="pb-10">
          <div className="flex justify-between items-center mb-8 px-2">
            <h2 className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em]">Histórico Diário</h2>
            <Calendar size={18} className="text-gray-400" />
          </div>
          <div className="space-y-5">
            {historyItems && historyItems.length > 0 ? (
              historyItems.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-[2rem] flex items-center shadow-soft border border-gray-50 group hover:shadow-premium transition-all">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mr-4 shrink-0 shadow-sm border border-white">
                    <Utensils size={24} className="text-kidia-green-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-extrabold text-kidia-green text-base">{item.itemName}</h4>
                    <p className="text-kidia-grey-text text-[11px] font-bold mt-0.5 uppercase tracking-wider">
                      {item.calories.replace('kcal', '').trim()} kcal • {item.carbs.replace('g', '').trim()}g carbos
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-kidia-orange tracking-widest uppercase block mb-1">
                      {new Date(item.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' })}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-[3rem] border border-gray-100 shadow-soft">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Utensils className="text-gray-300" size={32} />
                </div>
                <p className="text-kidia-green-dark font-black text-lg">Sem histórico</p>
                <p className="text-kidia-grey-text text-sm mt-1 font-medium">Suas análises aparecerão aqui.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};
