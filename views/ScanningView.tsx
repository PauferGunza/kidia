import React from 'react';
import { X, Flashlight, Plus } from '../components/Icons';

interface ScanningViewProps {
  imagePreview: string | null;
}

export const ScanningView: React.FC<ScanningViewProps> = ({ imagePreview }) => {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-[#111618]">
      
      {/* Background Image (Blurred simulation of camera feed) */}
      {imagePreview && (
        <img 
          src={imagePreview} 
          alt="Scanning" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 filter blur-sm"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>

      <div className="relative z-10 flex flex-col h-full px-6 py-8">
        
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10">
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

        {/* Processing Card */}
        <div className="bg-[#EAE4DF] rounded-2xl p-4 flex items-center gap-4 shadow-xl mt-4">
          <div className="w-12 h-12 rounded-full bg-kidia-orangeLight border border-kidia-orange/30 flex flex-col items-center justify-center relative shadow-sm shrink-0">
             {/* Simple stack icon simulation */}
             <div className="w-6 h-1.5 rounded-sm bg-kidia-orange mb-0.5"></div>
             <div className="w-6 h-1.5 rounded-sm bg-kidia-orange mb-0.5"></div>
             <div className="w-6 h-1.5 rounded-sm bg-kidia-orange"></div>
             
             {/* Rotating scan line effect */}
             <div className="absolute inset-0 rounded-full border border-kidia-orange border-t-transparent animate-spin"></div>
          </div>
          <div>
            <h3 className="text-[#1A3C28] font-bold text-[15px] leading-tight mb-0.5">Analisando Imagem...</h3>
            <p className="text-[#6B716F] text-xs">A consultar a Inteligência Vital da Kidia</p>
          </div>
        </div>

        {/* Viewfinder Brackets */}
        <div className="flex-1 flex items-center justify-center opacity-60">
           <div className="relative w-64 h-64">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white/50 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white/50 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white/50 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white/50 rounded-br-2xl"></div>
           </div>
        </div>
      </div>
    </div>
  );
};