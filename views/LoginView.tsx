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
      {/* Full Screen Background with softer gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000" 
          alt="Healthy Food" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-kidia-green-dark/95 via-kidia-green-dark/70 to-kidia-green-dark/90"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full px-8 pt-20 pb-12 overflow-y-auto">
        <div className="flex flex-col items-center mb-16">
          <Logo size="xl" className="animate-float" vertical={true} />
        </div>

        <div className="glass-card rounded-[3rem] p-10 shadow-premium mt-auto border-white/30">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-kidia-green tracking-tight leading-tight mb-3">
              Bem-vindo
            </h1>
            <p className="text-[17px] text-kidia-grey-text/90 leading-relaxed font-medium">
              Entre para continuar a sua jornada de saúde com o Dr. Viva.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-kidia-green-primary">
                <Mail size={22} className="text-kidia-grey-text/50" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="w-full pl-14 pr-4 py-5 bg-white/40 border border-white/60 rounded-3xl focus:outline-none focus:ring-2 focus:ring-kidia-green-primary/30 focus:border-kidia-green-primary/50 focus:bg-white/80 transition-all text-[16px] font-bold text-kidia-green placeholder:text-kidia-grey-text/40"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-kidia-green-primary">
                <Lock size={22} className="text-kidia-grey-text/50" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Palavra-passe"
                className="w-full pl-14 pr-4 py-5 bg-white/40 border border-white/60 rounded-3xl focus:outline-none focus:ring-2 focus:ring-kidia-green-primary/30 focus:border-kidia-green-primary/50 focus:bg-white/80 transition-all text-[16px] font-bold text-kidia-green placeholder:text-kidia-grey-text/40"
                required
              />
            </div>

            <div className="flex justify-end pr-2">
              <button type="button" className="text-[14px] font-bold text-kidia-orange hover:brightness-110 transition-all">
                Esqueceu a senha?
              </button>
            </div>

            <button 
              type="submit"
              className="w-full bg-kidia-green-primary text-white font-black text-[18px] py-5 rounded-3xl shadow-[0_15px_30px_-5px_rgba(30,77,59,0.3)] active:scale-[0.98] transition-all mt-6"
            >
              Entrar Agora
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[15px] text-kidia-grey-text font-medium">
              Não tem uma conta?{' '}
              <button onClick={onGoToSignup} className="font-black text-kidia-orange hover:brightness-110 transition-all">
                Registar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
