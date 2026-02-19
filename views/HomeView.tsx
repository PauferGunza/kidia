import React, { useRef } from 'react';
import { Camera, Leaf, MapPin, Activity, ChevronLeft } from '../components/Icons';

interface HomeViewProps {
  onScanStart: (file: File) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onScanStart }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onScanStart(file);
    }
    // Reset input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6 overflow-y-auto">
      
      {/* Header Area */}
      <div className="w-full pt-8 pb-4">
        <h1 className="text-3xl font-bold text-kidia-forest text-center tracking-tight">KIDIA</h1>
        <p className="text-center text-kidia-forest-light mt-2 text-sm font-medium">Nutrição e Tradição Angolana</p>
      </div>

      {/* Main Scanner Button Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" 
        />
        
        <div className="relative group cursor-pointer" onClick={triggerCamera}>
          {/* Outer glowing rings */}
          <div className="absolute -inset-4 bg-kidia-forest/20 rounded-full animate-pulse-slow"></div>
          <div className="absolute -inset-8 bg-kidia-forest/10 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
          
          {/* Button Core */}
          <button 
            className="relative z-10 w-64 h-64 rounded-full bg-gradient-to-br from-kidia-forest to-kidia-forest-dark shadow-2xl flex flex-col items-center justify-center border-4 border-kidia-sand transition-transform active:scale-95"
          >
            <div className="relative">
              <Camera size={64} className="text-kidia-sand mb-4" strokeWidth={1.5} />
              <div className="absolute -bottom-2 -right-2 bg-kidia-terra rounded-full p-2 shadow-lg">
                <Leaf size={24} className="text-kidia-sand" />
              </div>
            </div>
            <span className="text-kidia-sand font-semibold text-xl tracking-wide mt-4">Scanner Visual</span>
            <span className="text-kidia-sand/70 text-sm mt-1">Toque para analisar</span>
          </button>
        </div>
      </div>

      {/* Quick Access / Emergency Actions */}
      <div className="w-full mt-12 space-y-3 pb-20">
        <button className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-sm active:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-2 rounded-xl">
              <MapPin size={24} className="text-kidia-terra" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Centro de Saúde</h3>
              <p className="text-xs text-gray-500">Encontrar o mais próximo</p>
            </div>
          </div>
          <ChevronLeft size={20} className="text-gray-400 rotate-180" />
        </button>

        <button className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-sm active:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-kidia-forest/10 p-2 rounded-xl">
              <Activity size={24} className="text-kidia-forest" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Receitas Dr. Viva</h3>
              <p className="text-xs text-gray-500">Alternativas saudáveis</p>
            </div>
          </div>
          <ChevronLeft size={20} className="text-gray-400 rotate-180" />
        </button>
      </div>
    </div>
  );
};