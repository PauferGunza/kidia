import React from 'react';
import { Sparkles, Leaf } from '../components/Icons';

export const ScanningView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-kidia-forest relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-kidia-forest-light rounded-full mix-blend-screen filter blur-[80px] opacity-60 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-kidia-terra-dark rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse" style={{animationDuration: '4s'}}></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-12">
          {/* Rotating scan ring */}
          <div className="w-32 h-32 rounded-full border-4 border-kidia-forest-light border-t-kidia-gold animate-spin"></div>
          
          {/* Inner icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-kidia-forest p-4 rounded-full border border-kidia-forest-light">
              <Leaf size={32} className="text-kidia-gold" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles size={24} className="text-kidia-gold animate-pulse" />
          A analisar com Dr. Viva AI
        </h2>
        <p className="text-kidia-sand/80 text-center max-w-xs leading-relaxed">
          A consultar a base de dados de fitoterapia e nutrição angolana...
        </p>

        {/* Progress Dots */}
        <div className="flex gap-2 mt-8">
          <div className="w-2.5 h-2.5 bg-kidia-gold rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="w-2.5 h-2.5 bg-kidia-gold rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2.5 h-2.5 bg-kidia-gold rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};