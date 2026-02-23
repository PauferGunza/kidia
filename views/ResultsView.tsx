import React, { useState } from 'react';
import { ScanResult } from '../types';
import { X, Flashlight, CheckCircle, Flame, Activity, Bookmark, Wheat, Droplet, Sparkles } from '../components/Icons';
import { db } from '../db';

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
    <div className="flex-1 flex flex-col relative overflow-hidden bg-[#111618]">
      
      {/* Background Image (Blurred simulation of camera feed) */}
      {imagePreview && (
        <img 
          src={imagePreview} 
          alt="Scanning" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-sm"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>

      <div className="relative z-10 flex flex-col h-full overflow-y-auto">
        
        {/* Top Navigation */}
        <div className="px-6 py-8 flex justify-between items-center shrink-0">
          <button onClick={onBack} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10">
            <X size={20} />
          </button>
          <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-kidia-orange animate-pulse"></div>
            <span className="text-white text-sm font-medium">Scanner IA Ativo</span>
          </div>
          <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10">
            <Flashlight size={18} fill="currentColor" />
          </button>
        </div>

        {/* Viewfinder Center Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
           
           <div className="bg-[#C26E28] text-white px-5 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(194,110,40,0.6)] z-20 mb-8 tracking-wide animate-pulse">
             <CheckCircle size={16} fill="currentColor" className="text-white" />
             {result.itemName.toUpperCase()}
           </div>

           <div className="relative w-64 h-64 z-10 opacity-40">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-white rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-[3px] border-r-[3px] border-white rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[3px] border-l-[3px] border-white rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-white rounded-br-2xl"></div>
           </div>
        </div>

        {/* Bottom Sheet Card */}
        <div className="bg-[#EFEBE4] rounded-t-[2.5rem] p-6 pb-10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] z-30 shrink-0">
          
          {/* Drag Handle */}
          <div className="w-12 h-1.5 bg-[#D6D0C4] rounded-full mx-auto mb-6"></div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-black text-[#1A3C28] tracking-tight flex items-center gap-2">
                Carta de Saúde
                <div className="bg-[#B66B24] rounded-md p-0.5 text-white">
                   <CheckCircle size={16} strokeWidth={4} />
                </div>
              </h2>
              <p className="text-[#6B716F] text-sm mt-1">Análise nutricional completa</p>
            </div>
            
            <div className="w-16 h-16 bg-[#DCD8D0] rounded-xl overflow-hidden p-1 shadow-sm border border-white/50 shrink-0">
               {imagePreview && <img src={imagePreview} className="w-full h-full object-cover rounded-lg" />}
            </div>
          </div>

          {/* Safety Alert */}
          {result.safetyAlert && (
            <div className="bg-red-100 border border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <div className="bg-red-500 text-white rounded-full p-1 mt-0.5 shrink-0">
                <span className="text-xs font-bold px-1.5">!</span>
              </div>
              <p className="text-red-800 text-sm font-medium leading-relaxed">
                {result.safetyAlert}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-white flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={16} className="text-[#B66B24]" fill="currentColor" />
                <span className="text-[11px] font-bold text-[#6B716F] uppercase tracking-wider">Calorias</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#1A3C28]">{result.calories.replace('kcal','').replace(' kcal','').trim()}</span>
                <span className="text-xs font-medium text-[#A0A4A1]">kcal</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-white flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={16} className="text-[#D4A373]" />
                <span className="text-[11px] font-bold text-[#6B716F] uppercase tracking-wider">Glicémico</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-[#1A3C28] truncate">{result.glycemicImpact}</span>
                <div className={`w-3 h-3 rounded-full shrink-0 ${
                  result.glycemicImpact === 'Alto' ? 'bg-red-500' :
                  result.glycemicImpact === 'Médio' ? 'bg-yellow-500' :
                  result.glycemicImpact === 'Baixo' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-white flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Wheat size={16} className="text-[#C26E28]" />
                <span className="text-[11px] font-bold text-[#6B716F] uppercase tracking-wider">Carboidratos</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-[#1A3C28]">{result.carbs.replace('g','').replace(' g','').trim()}</span>
                <span className="text-xs font-medium text-[#A0A4A1]">g</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-white flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Droplet size={16} className="text-blue-500" />
                <span className="text-[11px] font-bold text-[#6B716F] uppercase tracking-wider">Sódio</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-[#1A3C28]">{result.sodium.replace('mg','').replace(' mg','').trim()}</span>
                <span className="text-xs font-medium text-[#A0A4A1]">mg</span>
              </div>
            </div>
          </div>

          {result.vitamins && (
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-white mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-purple-500" />
                <span className="text-[11px] font-bold text-[#6B716F] uppercase tracking-wider">Vitaminas & Minerais</span>
              </div>
              <p className="text-[#3A4E42] text-sm font-medium">
                {result.vitamins}
              </p>
            </div>
          )}

          <div className="bg-gradient-to-br from-[#E4D1C1] to-[#D5BAA6] rounded-2xl p-5 mb-6 border border-[#C26E28]/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-8 -mt-8 blur-xl"></div>
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className="w-8 h-8 bg-white/40 rounded-full flex items-center justify-center text-[#B66B24] shadow-sm backdrop-blur-sm relative">
                 <div className="absolute inset-0 rounded-full border-2 border-[#B66B24] border-t-transparent animate-spin"></div>
                 <span className="text-sm font-black">!</span>
              </div>
              <span className="font-bold text-[15px] tracking-wide text-[#1A3C28]">Conselho do Dr. Viva</span>
            </div>
            <p className="text-[#3A4E42] text-[15px] leading-relaxed relative z-10 mb-4 transition-opacity duration-500">
              {result.drVivaAdvice || `Adicione Quizaca para aumentar o teor de ferro e equilibrar os hidratos de carbono.`}
            </p>
            <button className="bg-white/50 hover:bg-white/70 text-[#B66B24] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-sm relative z-10 active:scale-95 transition-all">
              Saber mais
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={onBack} className="w-full bg-[#C26E28] text-white font-bold text-[17px] py-4 rounded-xl shadow-[0_8px_20px_rgba(194,110,40,0.3)] flex items-center justify-center gap-3 active:scale-95 transition-transform">
              <Bookmark size={20} fill="currentColor" />
              Adicionar ao Diário Alimentar
            </button>

            <button 
              onClick={handleSaveResults} 
              disabled={isSaved}
              className={`w-full font-bold text-[17px] py-4 rounded-xl border-2 flex items-center justify-center gap-3 active:scale-95 transition-all ${
                isSaved 
                  ? 'bg-green-50 text-green-600 border-green-200' 
                  : 'bg-transparent text-[#1A3C28] border-[#DCD8D0] hover:bg-white/50'
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