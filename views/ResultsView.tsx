import React, { useState } from 'react';
import { ScanResult } from '../types';
import { X, Flashlight, CheckCircle, Flame, Activity, Bookmark, Wheat, Droplet, Sparkles, Zap } from '../components/Icons';
import { db } from '../db';
import { Logo } from '../components/Logo';

interface ResultsViewProps {
  result: ScanResult;
  imagePreview: string | null;
  onBack: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, imagePreview, onBack }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveResults = async () => {
    try {
      await db.history.add({
        date: new Date().toISOString(),
        itemName: result.itemName,
        calories: result.calories,
        carbs: result.carbs,
        sodium: result.sodium,
        vitamins: result.vitamins,
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save to database:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-kidia-green">
      
      {/* Background Image (Blurred simulation of camera feed) */}
      {imagePreview && (
        <img 
          src={imagePreview} 
          alt="Scanning" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 filter blur-sm"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-kidia-green/90"></div>

      <div className="relative z-10 flex flex-col h-full overflow-y-auto">
        
        {/* Top Navigation */}
        <div className="px-6 py-10 flex justify-between items-center shrink-0">
          <button onClick={onBack} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10">
            <X size={20} />
          </button>
          <Logo size="sm" showText={false} />
          <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10">
            <Flashlight size={18} fill="currentColor" />
          </button>
        </div>

        {/* Viewfinder Center Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
           <div className="bg-kidia-orange text-white px-6 py-3 rounded-2xl font-extrabold text-sm flex items-center gap-2 shadow-premium z-20 mb-8 tracking-wide animate-float">
             <CheckCircle size={18} fill="currentColor" className="text-white" />
             {result.itemName.toUpperCase()}
           </div>

           <div className="relative w-64 h-64 z-10 opacity-50">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-[4px] border-l-[4px] border-white rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-[4px] border-r-[4px] border-white rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[4px] border-l-[4px] border-white rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[4px] border-r-[4px] border-white rounded-br-3xl"></div>
           </div>
        </div>

        {/* Bottom Sheet Card */}
        <div className="bg-mesh rounded-t-[3rem] p-8 pb-12 shadow-premium z-30 shrink-0 border-t border-white/20">
          
          {/* Drag Handle */}
          <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-8"></div>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-kidia-green tracking-tight flex items-center gap-2">
                Carta de Saúde
                <div className="bg-kidia-green-primary rounded-lg p-1 text-white">
                   <CheckCircle size={18} strokeWidth={4} />
                </div>
              </h2>
              <p className="text-kidia-grey-text text-sm mt-1 font-medium">Análise nutricional completa</p>
            </div>
            
            <div className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden p-1 shadow-soft border border-white shrink-0">
               {imagePreview && <img src={imagePreview} className="w-full h-full object-cover rounded-xl" />}
            </div>
          </div>

          {/* Safety Alert */}
          {result.safetyAlert && (
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-3xl p-5 mb-8 flex items-start gap-4">
              <div className="bg-kidia-accent-red text-white rounded-full p-1.5 mt-0.5 shrink-0 shadow-sm">
                <span className="text-xs font-black px-1.5">!</span>
              </div>
              <p className="text-red-900 text-sm font-semibold leading-relaxed">
                {result.safetyAlert}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/60 backdrop-blur-sm p-5 rounded-3xl shadow-soft border border-white flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={16} className="text-kidia-orange" fill="currentColor" />
                <span className="text-[10px] font-bold text-kidia-grey-text uppercase tracking-widest">Calorias</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-kidia-green">{result.calories.replace('kcal','').replace(' kcal','').trim()}</span>
                <span className="text-xs font-bold text-gray-400">kcal</span>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-5 rounded-3xl shadow-soft border border-white flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={16} className="text-kidia-accent-yellow" />
                <span className="text-[10px] font-bold text-kidia-grey-text uppercase tracking-widest">Glicémico</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-kidia-green truncate">{result.glycemicImpact}</span>
                <div className={`w-3 h-3 rounded-full shrink-0 ${
                  result.glycemicImpact === 'Alto' ? 'bg-kidia-accent-red' :
                  result.glycemicImpact === 'Médio' ? 'bg-kidia-accent-yellow' :
                  result.glycemicImpact === 'Baixo' ? 'bg-kidia-green-primary' : 'bg-gray-400'
                }`}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/60 backdrop-blur-sm p-5 rounded-3xl shadow-soft border border-white flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Wheat size={16} className="text-kidia-green-primary" />
                <span className="text-[10px] font-bold text-kidia-grey-text uppercase tracking-widest">Carbos</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-kidia-green">{result.carbs.replace('g','').replace(' g','').trim()}</span>
                <span className="text-xs font-bold text-gray-400">g</span>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-5 rounded-3xl shadow-soft border border-white flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Droplet size={16} className="text-blue-500" />
                <span className="text-[10px] font-bold text-kidia-grey-text uppercase tracking-widest">Sódio</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-kidia-green">{result.sodium.replace('mg','').replace(' mg','').trim()}</span>
                <span className="text-xs font-bold text-gray-400">mg</span>
              </div>
            </div>
          </div>

          {result.vitamins && (
            <div className="bg-white/60 backdrop-blur-sm p-5 rounded-3xl shadow-soft border border-white mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-purple-500" />
                <span className="text-[10px] font-bold text-kidia-grey-text uppercase tracking-widest">Vitaminas & Minerais</span>
              </div>
              <p className="text-kidia-green text-sm font-semibold leading-relaxed">
                {result.vitamins}
              </p>
            </div>
          )}

          <div className="bg-kidia-green-light/30 backdrop-blur-sm rounded-[2rem] p-6 mb-8 border border-kidia-green/10 shadow-soft relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 rounded-full -mr-8 -mt-8 blur-2xl"></div>
            <div className="flex flex-col items-center gap-3 mb-3 relative z-10 text-center">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-kidia-green-primary shadow-sm relative">
                 <Zap size={20} fill="currentColor" className="animate-pulse" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-kidia-green">Insight do Dr. Viva</span>
            </div>
            <p className="text-kidia-green text-[15px] leading-relaxed relative z-10 mb-4 font-medium text-center">
              {result.drVivaAdvice || `Adicione Quizaca para aumentar o teor de ferro e equilibrar os hidratos de carbono.`}
            </p>
            <div className="flex justify-center relative z-10">
              <button className="bg-white text-kidia-green-primary text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-sm relative z-10 active:scale-95 transition-all">
                Saber mais
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button onClick={onBack} className="w-full bg-kidia-green-primary text-white font-extrabold text-[17px] py-4 rounded-2xl shadow-premium flex items-center justify-center gap-3 active:scale-95 transition-transform">
              <Bookmark size={20} fill="currentColor" />
              Adicionar ao Diário
            </button>

            <button 
              onClick={handleSaveResults} 
              disabled={isSaved}
              className={`w-full font-extrabold text-[17px] py-4 rounded-2xl border-2 flex items-center justify-center gap-3 active:scale-95 transition-all ${
                isSaved 
                  ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                  : 'bg-white/20 backdrop-blur-sm text-kidia-green border-white/40 hover:bg-white/30'
              }`}
            >
              {isSaved ? (
                <>
                  <CheckCircle size={20} className="text-green-500" />
                  Resultados Salvos!
                </>
              ) : (
                'Salvar Resultados'
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};