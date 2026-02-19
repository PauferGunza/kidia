import React from 'react';
import { ScanResult } from '../types';
import { ChevronLeft, Flame, Wheat, Activity, AlertTriangle, Leaf } from '../components/Icons';

interface ResultsViewProps {
  result: ScanResult;
  imagePreview: string | null;
  onBack: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, imagePreview, onBack }) => {
  return (
    <div className="flex-1 flex flex-col bg-kidia-sand h-full overflow-hidden">
      {/* Custom Header */}
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-20 shadow-sm">
        <button onClick={onBack} className="p-2 rounded-full bg-gray-100 text-gray-700 active:bg-gray-200 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg text-kidia-forest mr-10">Análise KIDIA</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Image Header */}
        {imagePreview && (
          <div className="w-full h-64 relative bg-gray-200">
            <img 
              src={imagePreview} 
              alt="Item Scanned" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-3 py-1 bg-kidia-forest/90 text-white text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
                {result.isFood ? 'Alimento' : 'Planta Medicinal'}
              </span>
              <h2 className="text-3xl font-bold text-white drop-shadow-md">{result.itemName}</h2>
            </div>
          </div>
        )}

        <div className="p-5 space-y-5 -mt-4 relative z-10">
          
          {/* Safety Alert (Conditional) */}
          {result.safetyAlert && (
            <div className="bg-kidia-terra/10 border-l-4 border-kidia-terra rounded-r-xl p-4 flex gap-3 shadow-sm">
              <AlertTriangle className="text-kidia-terra shrink-0 mt-0.5" size={24} />
              <div>
                <h3 className="text-kidia-terra font-bold text-sm uppercase tracking-wide mb-1">Aviso de Saúde</h3>
                <p className="text-gray-800 text-sm font-medium leading-relaxed">{result.safetyAlert}</p>
              </div>
            </div>
          )}

          {/* Dr. Viva's Advice Box */}
          <div className="relative bg-white rounded-2xl p-6 shadow-md border-2 border-kidia-gold overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-5">
              <Leaf size={120} />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-kidia-gold p-1.5 rounded-lg">
                <Leaf size={16} className="text-white" />
              </div>
              <h3 className="font-bold text-kidia-forest text-lg">Visão do Dr. Viva</h3>
            </div>
            <p className="text-gray-700 leading-relaxed italic text-[15px]">
              "{result.drVivaAdvice}"
            </p>
          </div>

          {/* Nutritional / Botanical Stats Grid */}
          <h3 className="font-bold text-gray-800 mt-6 mb-2 ml-1">Informação Detalhada</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center gap-2 text-orange-500 mb-2">
                <Flame size={18} />
                <span className="text-xs font-bold uppercase">Calorias</span>
              </div>
              <span className="text-xl font-bold text-gray-800">{result.calories}</span>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <Wheat size={18} />
                <span className="text-xs font-bold uppercase">Hidratos</span>
              </div>
              <span className="text-xl font-bold text-gray-800">{result.carbs}</span>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center gap-2 text-blue-500 mb-2">
                <Activity size={18} />
                <span className="text-xs font-bold uppercase">Sódio</span>
              </div>
              <span className="text-xl font-bold text-gray-800">{result.sodium}</span>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Leaf size={18} />
                <span className="text-xs font-bold uppercase">Vitaminas</span>
              </div>
              <span className="text-sm font-semibold text-gray-800 leading-tight">{result.vitamins}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};