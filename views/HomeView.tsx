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
  const [todayCalories, setTodayCalories] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const history = await db.history.orderBy('id').reverse().toArray();
      
      if (history.length > 0) {
        setLastScan(history[0]);
      }

      // Calculate today's calories
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayHistory = history.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= today;
      });

      const totalCals = todayHistory.reduce((sum, item) => {
        const cal = parseInt(item.calories.replace(/[^0-9]/g, '')) || 0;
        return sum + cal;
      }, 0);

      setTodayCalories(totalCals);
    };
    fetchData();
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
    <div className="flex-1 flex flex-col px-6 pt-12 pb-32 overflow-y-auto bg-mesh space-y-12">
      
      {/* Top Header */}
      <div className="flex justify-between items-center px-2 shrink-0">
        <Logo size="md" />
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[11px] font-black text-kidia-orange uppercase tracking-[0.2em] leading-none mb-1.5">Nível 5</p>
            <p className="text-base font-black text-kidia-green-dark">{profile.name || 'Utilizador'}</p>
          </div>
        </div>
      </div>

      {/* Daily Progress Overview */}
      <div className="px-1">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-kidia-green-primary/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="flex justify-between items-end mb-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-kidia-green-primary uppercase tracking-[0.2em] mb-1">Calorias de Hoje</span>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-black text-kidia-green-dark">{todayCalories.toLocaleString()}</h2>
                <span className="text-kidia-grey-text font-black text-sm uppercase">kcal</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-kidia-green-primary/10 rounded-2xl flex items-center justify-center">
              <Flame className="text-kidia-green-primary" size={32} fill="currentColor" />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-[11px] font-black uppercase tracking-wider">
              <span className="text-kidia-grey-text">Meta Diária</span>
              <span className="text-kidia-green-dark">2,000 kcal</span>
            </div>
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-kidia-green-primary h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min((todayCalories / 2000) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-[10px] font-bold text-kidia-grey-text text-center mt-2">
              {todayCalories >= 2000 ? 'Meta atingida! Mantenha o foco.' : `Faltam ${(2000 - todayCalories).toLocaleString()} kcal para a sua meta.`}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action: QR/Camera Scanner */}
      <div className="relative group px-1">
        <div className="absolute -inset-1 bg-gradient-to-r from-kidia-green-primary to-kidia-orange rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <button 
          onClick={onTriggerScan}
          className="relative w-full bg-kidia-green-primary rounded-[2.8rem] p-7 flex items-center justify-between shadow-premium active:scale-[0.98] transition-all overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
              <Camera size={32} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <h3 className="text-white font-black text-xl tracking-tight">Analisar Refeição</h3>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">IA da Kdia</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative z-10 border border-white/30">
            <Plus size={20} className="text-white" />
          </div>
        </button>
      </div>

      {/* Last Scan Result */}
      {lastScan && (
        <div className="px-1">
          <h2 className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em] mb-4 ml-2">Última Análise</h2>
          <div className="bg-white rounded-[2.5rem] p-6 shadow-soft border border-gray-50 flex items-center gap-5">
            <div className="w-16 h-16 bg-kidia-green-primary/5 rounded-2xl flex flex-col items-center justify-center text-kidia-green-primary shrink-0">
              <span className="text-xl font-black leading-none">{lastScan.calories.split(' ')[0]}</span>
              <span className="text-[9px] font-bold uppercase">kcal</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-kidia-green-dark text-lg leading-tight mb-1 truncate">{lastScan.itemName}</h3>
              <div className="flex gap-3 text-[11px] font-bold text-kidia-grey-text">
                <span>Carbos: <span className="text-kidia-green-primary">{lastScan.carbs}</span></span>
                <span>Sódio: <span className="text-blue-500">{lastScan.sodium}</span></span>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </div>
        </div>
      )}

      {/* Recommendations Slider */}
      <div className="px-1">
        <h2 className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em] mb-4 ml-2">Recomendações para Si</h2>
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide px-2">
          {recommendations.map((rec, i) => (
            <div 
              key={i} 
              className="min-w-[280px] bg-white rounded-[2.5rem] p-7 shadow-premium border border-gray-50 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <div className={`w-14 h-14 rounded-2xl ${rec.bg} flex items-center justify-center ${rec.color}`}>
                  <rec.icon size={28} />
                </div>
                <span className="text-[10px] font-black px-3 py-1 bg-gray-50 rounded-full text-gray-400 uppercase tracking-widest">{rec.type}</span>
              </div>
              <div>
                <h3 className="font-black text-kidia-green-dark text-xl mb-1.5 leading-tight">{rec.title}</h3>
                <p className="text-[14px] font-medium text-kidia-grey-text leading-relaxed">{rec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dica do Dia */}
      <div className="px-1">
        <div className="bg-kidia-green-primary rounded-[2.5rem] p-8 relative overflow-hidden shadow-premium">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="flex flex-col items-center gap-5 relative z-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-md border border-white/20">
              <Zap className="text-kidia-accent-yellow" size={28} fill="currentColor" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-kidia-accent-yellow uppercase tracking-widest block mb-2">Insight Vital da Kdia</span>
              <p className="text-white text-base leading-relaxed font-bold">
                "Beber um copo de água morna com limão em jejum ajuda a preparar o estômago para a digestão do dia."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gamified Goals Section */}
      <div className="px-1 pb-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-kidia-green-dark flex items-center gap-3">
            <Trophy size={26} className="text-kidia-orange" />
            Missões Ativas
          </h2>
          <button className="text-[11px] font-black tracking-widest uppercase text-kidia-orange bg-kidia-orange/10 px-4 py-2 rounded-full">Ver todas</button>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-2xl p-1.5 mb-8">
          {(['diarias', 'semanais', 'mensais'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-[11px] font-black tracking-widest uppercase rounded-xl transition-all ${activeTab === tab ? 'bg-white text-kidia-green-dark shadow-sm scale-[1.02]' : 'text-kidia-grey-text'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Goals List */}
        <div className="space-y-5">
          {activeTab === 'diarias' && (
            <>
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-50 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-kidia-green-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="text-kidia-green-primary" size={28} fill="currentColor" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-black text-kidia-green-dark text-base">Beber 2L de água</h3>
                    <span className="text-[10px] font-black text-kidia-green-primary">+50 pts</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-kidia-green-primary h-full w-full rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-50 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-kidia-orange/10 flex items-center justify-center shrink-0">
                  <Camera className="text-kidia-orange" size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-black text-kidia-green-dark text-base">Escanear 1 refeição</h3>
                    <span className="text-[10px] font-black text-kidia-orange">+100 pts</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-kidia-orange h-full w-0 rounded-full"></div>
                  </div>
                </div>
                <button onClick={onTriggerScan} className="bg-kidia-orange text-white text-[11px] font-black tracking-widest uppercase px-5 py-2.5 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-all">
                  Fazer
                </button>
              </div>
            </>
          )}

          {activeTab === 'semanais' && (
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-50 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
                <Flame className="text-purple-500" size={28} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-black text-kidia-green-dark text-base">Ofensiva de 7 dias</h3>
                  <span className="text-[10px] font-black text-purple-500">+300 pts</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[70%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-kidia-grey-text mt-2 font-bold uppercase tracking-widest">5 de 7 dias completados</p>
              </div>
            </div>
          )}

          {activeTab === 'mensais' && (
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-50 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                <Trophy className="text-blue-500" size={28} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-black text-kidia-green-dark text-base">30 refeições saudáveis</h3>
                  <span className="text-[10px] font-black text-blue-500">+1000 pts</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[40%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-kidia-grey-text mt-2 font-bold uppercase tracking-widest">12 de 30 refeições</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rewards / Chest */}
      <div className="px-1">
        <div className="bg-kidia-orange rounded-[2.5rem] p-8 flex items-center justify-between shadow-premium relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mt-10 blur-2xl"></div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg">
              <Gift className="text-kidia-orange animate-pulse" size={32} />
            </div>
            <div>
              <h3 className="font-black text-white text-xl tracking-tight">Baú Místico</h3>
              <p className="text-white/70 text-[11px] font-black uppercase tracking-widest mt-1">Faltam 250 pts para abrir</p>
            </div>
          </div>
          <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

    </div>
  );
};
