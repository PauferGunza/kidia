import React from 'react';
import { ScanResult } from '../types';
import { X, Flashlight, CheckCircle, Flame, Activity, Bookmark } from '../components/Icons';

interface ResultsViewProps {
  result: ScanResult;
  imagePreview: string | null;
  onBack: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, imagePreview, onBack }) => {
  
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

      <div className="relative z-10 flex flex-col h-full">
        
        {/* Top Navigation */}
        <div className="px-6 py-8 flex justify-between items-center">
          <button onClick={onBack} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10">
            <X size={20} />
          </button>
          <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-kidia-orange"></div>
            <span className="text-white text-sm font-medium">Scanner IA Ativo</span>
          </div>
          <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10">
            <Flashlight size={18} fill="currentColor" />
          </button>
        </div>

        {/* Viewfinder Center Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
           
           <div className="bg-[#C26E28] text-white px-5 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg z-20 mb-8 tracking-wide">
             <CheckCircle size={16} fill="currentColor" className="text-white" />
             IDENTIFICADO!
           </div>

           <div className="relative w-64 h-64 z-10 opacity-40">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-white rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-[3px] border-r-[3px] border-white rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[3px] border-l-[3px] border-white rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-white rounded-br-2xl"></div>
           </div>
        </div>

        {/* Bottom Sheet Card */}
        <div className="bg-[#EFEBE4] rounded-t-[2.5rem] p-6 pb-10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] z-30">
          
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
            
            <div className="w-16 h-16 bg-[#DCD8D0] rounded-xl overflow-hidden p-1 shadow-sm border border-white/50">
               {imagePreview && <img src={imagePreview} className="w-full h-full object-cover rounded-lg" />}
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-white flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={16} className="text-[#B66B24]" fill="currentColor" />
                <span className="text-[11px] font-bold text-[#6B716F] uppercase tracking-wider">Calorias</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-[#1A3C28]">{result.calories.replace('kcal','').replace(' kcal','').trim()}</span>
                <span className="text-sm font-medium text-[#A0A4A1]">kcal</span>
              </div>
            </div>

            <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-white flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={16} className="text-[#D4A373]" />
                <span className="text-[11px] font-bold text-[#6B716F] uppercase tracking-wider">Glicémico</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#1A3C28]">{result.glycemicImpact}</span>
                <div className="w-3 h-3 rounded-full bg-[#E59500]"></div>
              </div>
            </div>
          </div>

          <div className="bg-[#E4D1C1] rounded-2xl p-5 mb-6 border border-[#D5BAA6]/30">
            <div className="flex items-center gap-2 mb-2 text-[#B66B24]">
              <div className="w-5 h-5 bg-[#B66B24] rounded-full flex items-center justify-center text-white pb-0.5">
                 <span className="text-[10px] font-black">!</span>
              </div>
              <span className="font-bold text-sm tracking-wide">Dica Inteligente</span>
            </div>
            <p className="text-[#3A4E42] text-[15px] leading-relaxed">
              {result.drVivaAdvice || `Adicione Quizaca para aumentar o teor de ferro e equilibrar os hidratos de carbono.`}
            </p>
          </div>

          <button onClick={onBack} className="w-full bg-[#C26E28] text-white font-bold text-[17px] py-4 rounded-xl shadow-[0_8px_20px_rgba(194,110,40,0.3)] flex items-center justify-center gap-3 active:scale-95 transition-transform">
            <Bookmark size={20} fill="currentColor" />
            Adicionar ao Diário Alimentar
          </button>

        </div>
      </div>
    </div>
  );
};