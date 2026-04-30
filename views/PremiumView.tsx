import React, { useState } from 'react';
import { ArrowLeft, Star, CheckCircle, Zap, ShieldCheck, HeartPulse, Sparkles } from '../components/Icons';

interface PremiumViewProps {
  onBack: () => void;
}

export const PremiumView: React.FC<PremiumViewProps> = ({ onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="flex-1 flex flex-col bg-[#111618] h-full overflow-y-auto pb-10 relative">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-kidia-orange/30 to-transparent pointer-events-none"></div>
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-kidia-orange/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <div className="px-6 py-5 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-full text-white border border-white/10 active:scale-95 transition-transform">
          <ArrowLeft size={20} />
          <span className="text-sm font-bold">Voltar</span>
        </button>
        <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
          <Star size={14} className="text-kidia-orange" fill="currentColor" />
          <span className="text-white text-xs font-bold tracking-wider uppercase">Kidia Premium</span>
        </div>
      </div>

      <div className="px-6 pt-4 flex-1 flex flex-col">
        
        {/* Hero Section */}
        <div className="text-center mb-8 relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-kidia-orange to-yellow-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(194,110,40,0.4)] transform rotate-3">
            <Sparkles size={36} className="text-white" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Desbloqueie o seu<br/>Potencial Máximo</h1>
          <p className="text-white/70 text-sm max-w-[280px] mx-auto">
            Acesso ilimitado à inteligência artificial da Kidia e planos alimentares personalizados.
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-8 relative z-10">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-kidia-orange/20 flex items-center justify-center shrink-0">
              <Zap size={20} className="text-kidia-orange" fill="currentColor" />
            </div>
            <div>
              <h3 className="text-white font-bold text-[15px] mb-0.5">Scans Ilimitados</h3>
              <p className="text-white/60 text-xs leading-relaxed">Analise qualquer prato angolano sem limites diários de uso.</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <HeartPulse size={20} className="text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-[15px] mb-0.5">Planos Personalizados</h3>
              <p className="text-white/60 text-xs leading-relaxed">Dietas adaptadas a diabetes, hipertensão e perda de peso.</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-[15px] mb-0.5">Chat Direto com IA</h3>
              <p className="text-white/60 text-xs leading-relaxed">Tire dúvidas de saúde 24/7 com a IA treinada pela Kidia.</p>
            </div>
          </div>
        </div>

        {/* Pricing Toggle */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-1 flex mb-6 relative z-10">
          <button 
            onClick={() => setSelectedPlan('monthly')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${selectedPlan === 'monthly' ? 'bg-white text-[#111618] shadow-sm' : 'text-white/60'}`}
          >
            Mensal
          </button>
          <button 
            onClick={() => setSelectedPlan('yearly')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${selectedPlan === 'yearly' ? 'bg-white text-[#111618] shadow-sm' : 'text-white/60'}`}
          >
            Anual
            <span className={`text-[9px] px-1.5 py-0.5 rounded-md uppercase tracking-wider ${selectedPlan === 'yearly' ? 'bg-kidia-orange text-white' : 'bg-kidia-orange/20 text-kidia-orange'}`}>
              -20%
            </span>
          </button>
        </div>

        {/* Price Display */}
        <div className="text-center mb-8 relative z-10">
          <div className="flex items-end justify-center gap-1 mb-1">
            <span className="text-4xl font-black text-white">
              {selectedPlan === 'monthly' ? '2.500' : '24.000'}
            </span>
            <span className="text-lg font-bold text-kidia-orange mb-1">AOA</span>
          </div>
          <p className="text-white/50 text-xs font-medium">
            {selectedPlan === 'monthly' ? 'Cobrado mensalmente' : 'Cobrado anualmente (equivale a 2.000 AOA/mês)'}
          </p>
        </div>

        {/* Payment Methods */}
        <div className="mb-8 relative z-10">
          <p className="text-center text-white/50 text-[10px] font-bold uppercase tracking-widest mb-3">Métodos de Pagamento Aceites</p>
          <div className="flex justify-center gap-3">
            <div className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold text-white">Multicaixa Express</div>
            <div className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold text-white">Unitel Money</div>
            <div className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold text-white">Afrimoney</div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full bg-gradient-to-r from-kidia-orange to-yellow-500 text-white font-bold text-[17px] py-4 rounded-xl shadow-[0_8px_20px_rgba(194,110,40,0.3)] flex items-center justify-center gap-2 active:scale-95 transition-transform relative z-10 mt-auto">
          <CheckCircle size={20} />
          Ativar Premium Agora
        </button>
        <p className="text-center text-white/40 text-[10px] mt-4 relative z-10">
          Pode cancelar a qualquer momento nas definições.
        </p>

      </div>
    </div>
  );
};
