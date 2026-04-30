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
        kdiaAdvice: result.kdiaAdvice || '',
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
          <div className="w-10"></div>
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
        <div className="bg-white rounded-t-[4rem] p-10 pb-16 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.15)] z-30 shrink-0 border-t border-white relative">
          
          {/* Drag Handle */}
          <div className="w-16 h-2 bg-gray-100 rounded-full mx-auto mb-10"></div>

          <div className="flex justify-between items-start mb-10">
            <div className="flex-1 pr-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-kidia-green-primary rounded-xl p-1.5 text-white shadow-md shadow-green-900/20">
                   <Sparkles size={20} strokeWidth={4} />
                </div>
                <span className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em]">IA da Kdia Analisou</span>
              </div>
              <h2 className="text-4xl font-black text-kidia-green-dark tracking-tighter leading-none mb-2">
                Relatório Vital
              </h2>
              <p className="text-kidia-grey-text text-[15px] font-medium">Avaliação completa do seu prato</p>
            </div>
            
            <div className="w-24 h-24 bg-white rounded-[2rem] overflow-hidden p-1 shadow-premium border border-white shrink-0 transform rotate-3 hover:rotate-0 transition-transform">
               {imagePreview && <img src={imagePreview} className="w-full h-full object-cover rounded-[1.8rem]" />}
            </div>
          </div>

          {/* Safety Alert */}
          {result.safetyAlert && (
            <div className="bg-kidia-accent-red/5 border border-kidia-accent-red/15 rounded-[2.5rem] p-6 mb-10 flex items-center gap-5 shadow-sm">
              <div className="bg-kidia-accent-red text-white rounded-2xl w-14 h-14 flex items-center justify-center shrink-0 shadow-lg shadow-red-900/20">
                <span className="text-2xl font-black">!</span>
              </div>
              <p className="text-kidia-green-dark text-[15px] font-bold leading-tight">
                {result.safetyAlert}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="bg-kidia-bg/50 p-6 rounded-[2.5rem] shadow-soft border border-white/80 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Flame size={18} className="text-kidia-orange" fill="currentColor" />
                </div>
                <span className="text-[11px] font-black text-kidia-grey-text uppercase tracking-widest">Energia</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-kidia-green-dark tracking-tighter">{result.calories.replace('kcal','').replace(' kcal','').trim()}</span>
                <span className="text-sm font-black text-kidia-grey-text/50 uppercase tracking-widest">kcal</span>
              </div>
            </div>

            <div className="bg-kidia-bg/50 p-6 rounded-[2.5rem] shadow-soft border border-white/80 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Activity size={18} className="text-kidia-accent-yellow" strokeWidth={3} />
                </div>
                <span className="text-[11px] font-black text-kidia-grey-text uppercase tracking-widest">Impacto G.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-kidia-green-dark truncate tracking-tight">{result.glycemicImpact}</span>
                <div className={`w-4 h-4 rounded-full shrink-0 shadow-sm ${
                  result.glycemicImpact === 'Alto' ? 'bg-kidia-accent-red' :
                  result.glycemicImpact === 'Médio' ? 'bg-kidia-accent-yellow' :
                  result.glycemicImpact === 'Baixo' ? 'bg-kidia-green-primary' : 'bg-gray-400'
                }`}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mb-10">
            <div className="bg-kidia-bg/50 p-6 rounded-[2.5rem] shadow-soft border border-white/80 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Wheat size={18} className="text-emerald-600" />
                </div>
                <span className="text-[11px] font-black text-kidia-grey-text uppercase tracking-widest">Carbos</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-kidia-green-dark tracking-tighter">{result.carbs.replace('g','').replace(' g','').trim()}</span>
                <span className="text-sm font-black text-kidia-grey-text/50 uppercase tracking-widest">g</span>
              </div>
            </div>

            <div className="bg-kidia-bg/50 p-6 rounded-[2.5rem] shadow-soft border border-white/80 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Droplet size={18} className="text-blue-500" />
                </div>
                <span className="text-[11px] font-black text-kidia-grey-text uppercase tracking-widest">Sódio</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-kidia-green-dark tracking-tighter">{result.sodium.replace('mg','').replace(' mg','').trim()}</span>
                <span className="text-sm font-black text-kidia-grey-text/50 uppercase tracking-widest">mg</span>
              </div>
            </div>
          </div>

          {result.vitamins && (
            <div className="bg-kidia-green-light/20 p-7 rounded-[2.5rem] shadow-soft border border-white mb-10">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles size={20} className="text-emerald-600" />
                <span className="text-[11px] font-black text-kidia-green-primary uppercase tracking-[0.2em]">Vitaminas & Minerais</span>
              </div>
              <p className="text-kidia-green-dark text-base font-bold leading-relaxed">
                {result.vitamins}
              </p>
            </div>
          )}

          <div className="bg-kidia-green-primary rounded-[2.5rem] p-8 mb-10 shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12 blur-3xl"></div>
            <div className="flex flex-col items-center gap-5 relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/20">
                 <Zap size={32} fill="currentColor" className="animate-pulse" />
              </div>
              <div>
                <span className="font-black text-[12px] uppercase tracking-[0.3em] text-kidia-accent-yellow block mb-2">Insight Vital</span>
                <p className="text-white text-[17px] leading-snug font-bold">
                  {result.kdiaAdvice || `Adicione Quizaca para aumentar o teor de ferro e equilibrar os hidratos de carbono.`}
                </p>
              </div>
              <button className="bg-white text-kidia-green-primary text-[11px] font-black uppercase tracking-widest px-8 py-3.5 rounded-2xl shadow-premium active:scale-95 transition-all">
                Dicas da Kdia
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <button onClick={onBack} className="w-full bg-kidia-green-dark text-white font-black text-xl py-6 rounded-[2rem] shadow-premium flex items-center justify-center gap-4 active:scale-95 transition-all">
              <Bookmark size={24} fill="currentColor" />
              Adicionar ao Diário
            </button>

            <button 
              onClick={handleSaveResults} 
              disabled={isSaved}
              className={`w-full font-black text-xl py-6 rounded-[2rem] border-2 flex items-center justify-center gap-4 active:scale-95 transition-all ${
                isSaved 
                  ? 'bg-kidia-green-primary/10 text-kidia-green-primary border-kidia-green-primary/20' 
                  : 'bg-white text-kidia-green-dark border-gray-100 hover:bg-gray-50'
              }`}
            >
              {isSaved ? (
                <>
                  <CheckCircle size={24} className="text-kidia-green-primary" />
                  Salvo com Sucesso!
                </>
              ) : (
                'Salvar Manualmente'
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};