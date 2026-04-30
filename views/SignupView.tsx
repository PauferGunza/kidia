import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft } from '../components/Icons';
import { Logo } from '../components/Logo';

interface SignupViewProps {
  onSignup: (name: string, email: string) => void;
  onGoToLogin: () => void;
}

export const SignupView: React.FC<SignupViewProps> = ({ onSignup, onGoToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      onSignup(name, email);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative h-full overflow-hidden">
      {/* Full Screen Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1000" 
          alt="Healthy Food" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kidia-green-dark/80 via-kidia-green-dark/60 to-kidia-green-dark/90"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full px-8 pt-12 pb-12 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onGoToLogin} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10">
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
          <Logo size="md" />
          <div className="w-10"></div> {/* Spacer */}
        </div>
        
        <div className="glass-card rounded-[2.5rem] p-8 shadow-premium mt-auto">
          <h1 className="text-[28px] font-extrabold text-kidia-green tracking-tight leading-tight mb-2 text-center">
            Criar Conta
          </h1>
          <p className="text-[15px] text-kidia-grey-text leading-relaxed px-4 mb-8 text-center">
            Junte-se à nossa comunidade Kidia e melhore a sua saúde.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={20} className="text-kidia-grey-text" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
                className="w-full pl-11 pr-4 py-4 bg-white/50 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kidia-green-primary/50 focus:border-kidia-green-primary transition-all text-[15px] font-medium text-kidia-green placeholder:text-kidia-grey-text/60"
                required
              />
            </div>

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

            <button 
              type="submit"
              className="w-full bg-kidia-green-primary text-white font-bold text-[17px] py-4 rounded-2xl shadow-lg active:scale-95 transition-transform mt-8"
            >
              Registar
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[14px] text-kidia-grey-text">
              Já tem uma conta?{' '}
              <button onClick={onGoToLogin} className="font-bold text-kidia-orange">
                Entrar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
