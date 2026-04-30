import React, { useState, useEffect } from 'react';
import { Droplet, Flame, Smile, Camera, Zap, Star, Trophy, Gift, ChevronRight, CheckCircle, Plus, Utensils, Apple, Coffee } from '../components/Icons';
import { Logo } from '../components/Logo';
import { db, HistoryItem } from '../db';
import { UserProfile } from '../types';

interface HomeViewProps {
  onTriggerScan: () => void;
  profile: UserProfile;
}

export const HomeView: React.FC<HomeViewProps> = ({ onTriggerScan, profile }) => {
  const [activeTab, setActiveTab] = useState<'diarias' | 'semanais' | 'mensais'>('diarias');
  const [lastScan, setLastScan] = useState<HistoryItem | null>(null);

  useEffect(() => {
    const fetchLastScan = async () => {
      const history = await db.history.orderBy('id').reverse().limit(1).toArray();
      if (history.length > 0) {
        setLastScan(history[0]);
      }
    };
    fetchLastScan();
  }, []);

  const getRecommendations = () => {
    const recs = [];
    if (profile.diabetes) {
      recs.push({
        type: 'dieta',
        title: 'Controlo Glicémico',
        desc: 'Priorize fibras e grãos integrais para evitar picos.',
        icon: Utensils,
        color: 'text-blue-500',
        bg: 'bg-blue-50'
      });
      recs.push({
        type: 'fruta',
        title: 'Mirtilos e Maçãs',
        desc: 'Baixo índice glicémico e ricas em antioxidantes.',
        icon: Apple,
        color: 'text-purple-500',
        bg: 'bg-purple-50'
      });
    }
    if (profile.hypertension) {
      recs.push({
        type: 'dieta',
        title: 'Dieta DASH',
        desc: 'Focada na redução de sódio e rica em potássio.',
        icon: Utensils,
        color: 'text-red-500',
        bg: 'bg-red-50'
      });
      recs.push({
        type: 'fruta',
        title: 'Bananas e Melão',
        desc: 'Ricas em potássio, excelente para regular a tensão.',
        icon: Apple,
        color: 'text-yellow-500',
        bg: 'bg-yellow-50'
      });
    }
    if (profile.weightLoss) {
      recs.push({
        type: 'dieta',
        title: 'Proteína Moderada',
        desc: 'Aumente a saciedade mantendo o défice calórico.',
        icon: Utensils,
        color: 'text-green-500',
        bg: 'bg-green-50'
      });
      recs.push({
        type: 'receta',
        title: 'Smoothie de Abacate',
        desc: 'Gorduras boas que mantêm a energia estável.',
        icon: Coffee,
        color: 'text-emerald-500',
        bg: 'bg-emerald-50'
      });
    }
    
    // Default recommendations if no profile specifics
    if (recs.length === 0) {
      recs.push({
        type: 'dieta',
        title: 'Equilíbrio Vital',
        desc: 'Uma mistura variada de macronutrientes para energia.',
        icon: Utensils,
        color: 'text-kidia-green-primary',
        bg: 'bg-kidia-green-primary/10'
      });
      recs.push({
        type: 'fruta',
        title: 'Mix Tropical',
        desc: 'Manga e Papaya para digestão e vitamina C.',
        icon: Apple,
        color: 'text-kidia-orange',
        bg: 'bg-kidia-orange/10'
      });
    }
    return recs;
  };

  const recommendations = getRecommendations();

  return (
    <div className="flex-1 flex flex-col px-6 pt-12 pb-32 overflow-y-auto bg-mesh">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-10">
        <Logo size="md" />
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[11px] font-black text-kidia-orange uppercase tracking-[0.2em] leading-none mb-1.5">Nível 5</p>
            <p className="text-base font-black text-kidia-green-dark">{profile.name || 'Utilizador'}</p>
          </div>
        </div>
      </div>

      {/* Primary Action: QR/Camera Scanner */}
      <div className="relative mb-8 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-kidia-green-primary to-kidia-orange rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <button 
          onClick={onTriggerScan}
          className="relative w-full bg-kidia-green-primary rounded-[2.8rem] p-7 flex items-center justify-between shadow-premium active:scale-[0.98] transition-all overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-18 h-18 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
              <Camera size={36} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <h3 className="text-white font-black text-2xl tracking-tight">Analisar Refeição</h3>
              <p className="text-white/60 text-[12px] font-bold uppercase tracking-widest mt-1">IA da Kdia</p>
            </div>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center relative z-10 border border-white/30">
            <Plus size={24} className="text-white" />
          </div>
        </button>
      </div>

      {/* Last Scan Result - NEW SECTION */}
      {lastScan && (
        <div className="mb-8">
          <h2 className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em] mb-4 ml-2">Última Análise</h2>
          <div className="bg-white rounded-[2.5rem] p-6 shadow-soft border border-white flex items-center gap-5">
            <div className="w-16 h-16 bg-kidia-green-primary/5 rounded-2xl flex flex-col items-center justify-center text-kidia-green-primary">
              <span className="text-xl font-black leading-none">{lastScan.calories.split(' ')[0]}</span>
              <span className="text-[9px] font-bold uppercase">kcal</span>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-kidia-green-dark text-lg leading-tight mb-1">{lastScan.itemName}</h3>
              <div className="flex gap-3 text-[11px] font-bold text-kidia-grey-text">
                <span>Carbos: <span className="text-kidia-green-primary">{lastScan.carbs}</span></span>
                <span>Sódio: <span className="text-blue-500">{lastScan.sodium}</span></span>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </div>
        </div>
      )}

      {/* Recommendations Slider - NEW SECTION */}
      <div className="mb-10">
        <h2 className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em] mb-4 ml-2">Recomendações para Si</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
          {recommendations.map((rec, i) => (
            <div 
              key={i} 
              className="min-w-[260px] bg-white rounded-[2.5rem] p-6 shadow-premium border border-white flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl ${rec.bg} flex items-center justify-center ${rec.color}`}>
                  <rec.icon size={24} />
                </div>
                <span className="text-[10px] font-black px-3 py-1 bg-gray-50 rounded-full text-gray-400 uppercase tracking-widest">{rec.type}</span>
              </div>
              <div>
                <h3 className="font-black text-kidia-green-dark text-lg mb-1 leading-tight">{rec.title}</h3>
                <p className="text-[13px] font-medium text-kidia-grey-text leading-snug">{rec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dica do Dia - Refined Style */}
      <div className="bg-kidia-green-primary rounded-[2rem] p-6 mb-10 relative overflow-hidden shadow-premium">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex flex-col items-center gap-4 relative z-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-md border border-white/20">
            <Zap className="text-kidia-accent-yellow" size={24} fill="currentColor" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-kidia-accent-yellow uppercase tracking-widest block mb-1">Insight Vital da Kdia</span>
            <p className="text-white text-sm leading-relaxed font-bold">
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