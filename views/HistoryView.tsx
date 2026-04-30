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
      <div className="px-6 py-10 flex items-center justify-between sticky top-0 bg-white shadow-soft z-20 border-b border-gray-50">
        <div className="w-10"></div>
        <h1 className="text-xl font-black text-kidia-green-dark tracking-tight">Análise & Progresso</h1>
        <Logo size="sm" showText={false} />
      </div>

      <div className="px-6 space-y-8 pt-8">
        
        {/* Weekly Goal Section - NEW */}
        <section>
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em]">Objetivo Semanal</h2>
            <button className="text-[10px] font-bold text-kidia-orange uppercase">Alterar</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {goals.map((g) => (
              <button 
                key={g.id}
                onClick={() => onUpdateProfile({ weeklyGoal: g.id as any })}
                className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${
                  profile.weeklyGoal === g.id 
                    ? 'bg-white border-kidia-green-primary shadow-premium scale-[1.02]' 
                    : 'bg-white/50 border-white shadow-soft text-gray-400'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${profile.weeklyGoal === g.id ? g.bg : 'bg-gray-100'}`}>
                  <g.icon size={22} className={profile.weeklyGoal === g.id ? g.color : 'text-gray-400'} />
                </div>
                <span className={`text-[13px] font-black tracking-tight ${profile.weeklyGoal === g.id ? 'text-kidia-green-dark' : 'text-gray-400'}`}>{g.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Professional Stats Cards */}
        <section className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-[2.5rem] p-7 shadow-premium border border-white">
            <div className="w-14 h-14 bg-kidia-green-primary shadow-lg shadow-green-900/20 rounded-2xl flex items-center justify-center mb-6 text-white">
              <TrendingUp size={28} strokeWidth={3} />
            </div>
            <p className="text-[11px] font-black text-kidia-grey-text uppercase tracking-widest mb-1">Vitalidade</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-black text-kidia-green-dark">82%</p>
              <span className="text-[10px] text-green-500 font-bold">+4%</span>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-7 shadow-premium border border-white">
            <div className="w-14 h-14 bg-kidia-orange shadow-lg shadow-orange-950/20 rounded-2xl flex items-center justify-center mb-6 text-white">
              <AlertCircle size={28} strokeWidth={3} />
            </div>
            <p className="text-[11px] font-black text-kidia-grey-text uppercase tracking-widest mb-1">Alertas</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-black text-kidia-green-dark">2</p>
              <span className="text-[10px] text-red-500 font-bold">-20%</span>
            </div>
          </div>
        </section>

        {/* Analysis Data Section */}
        <section>
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em]">Resumo das Análises</h2>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-white">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-bold text-kidia-green-dark">Alimentos Alcalinos</span>
                </div>
                <span className="text-sm font-black text-kidia-green">65%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-kidia-green-primary h-full w-[65%]" />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-bold text-kidia-green-dark">Índice Glicémico Médio</span>
                </div>
                <span className="text-sm font-black text-kidia-green">22%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-kidia-orange h-full w-[22%]" />
              </div>
            </div>
          </div>
        </section>

        {/* Diário List */}
        <section>
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em]">Histórico de Refeições</h2>
            <Calendar size={18} className="text-gray-400" />
          </div>
          <div className="space-y-4">
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
