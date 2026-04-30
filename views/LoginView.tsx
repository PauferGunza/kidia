import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft } from '../components/Icons';
import { Logo } from '../components/Logo';

interface LoginViewProps {
  onLogin: () => void;
  onGoToSignup: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, onGoToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="flex-1 flex flex-col relative h-full overflow-hidden">
      {/* Full Screen Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000" 
          alt="Healthy Food" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kidia-green-dark/80 via-kidia-green-dark/60 to-kidia-green-dark/90"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full px-8 pt-16 pb-12 overflow-y-auto">
        <div className="flex justify-center mb-12">
          <Logo size="lg" className="animate-float" vertical={true} />
        </div>

        <div className="glass-card rounded-[2.5rem] p-8 shadow-premium mt-auto">
          <h1 className="text-[28px] font-extrabold text-kidia-green tracking-tight leading-tight mb-2 text-center">
            Bem-vindo de volta
          </h1>
          <p className="text-[15px] text-kidia-grey-text leading-relaxed px-4 mb-8 text-center">
            Entre para continuar a sua jornada de saúde com o Dr. Viva.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={20} className="text-kidia-grey-text" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="w-full pl-11 pr-4 py-4 bg-white/50 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kidia-green-primary/50 focus:border-kidia-green-primary transition-all text-[15px] font-medium text-kidia-green placeholder:text-kidia-grey-text/60"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={20} className="text-kidia-grey-text" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Palavra-passe"
                className="w-full pl-11 pr-4 py-4 bg-white/50 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kidia-green-primary/50 focus:border-kidia-green-primary transition-all text-[15px] font-medium text-kidia-green placeholder:text-kidia-grey-text/60"
                required
              />
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-[13px] font-bold text-kidia-orange">
                Esqueceu a palavra-passe?
              </button>
            </div>

            <button 
              type="submit"
              className="w-full bg-kidia-green-primary text-white font-bold text-[17px] py-4 rounded-2xl shadow-lg active:scale-95 transition-transform mt-4"
            >
              Entrar
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[14px] text-kidia-grey-text">
              Não tem uma conta?{' '}
              <button onClick={onGoToSignup} className="font-bold text-kidia-orange">
                Registar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
