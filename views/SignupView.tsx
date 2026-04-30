import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft } from '../components/Icons';
import { Logo } from '../components/Logo';
import { db } from '../db';

interface SignupViewProps {
  onSignup: (name: string, email: string) => void;
  onGoToLogin: () => void;
}

export const SignupView: React.FC<SignupViewProps> = ({ onSignup, onGoToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      setError('Por favor preencha todos os campos');
      return;
    }

    try {
      const existingUser = await db.users.where('email').equals(email).first();
      if (existingUser) {
        setError('Este e-mail já está registado');
        return;
      }

      await db.users.add({ name, email, password });
      onSignup(name, email);
    } catch (err) {
      console.error("Signup error:", err);
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="flex-1 flex flex-col relative h-full overflow-hidden">
      {/* Full Screen Background with softer gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1000" 
          alt="Healthy Food" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-kidia-green-dark/40"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full px-5 sm:px-8 pt-12 pb-10 overflow-y-auto">
        <div className="flex items-center justify-between mb-8 shrink-0">
          <button onClick={onGoToLogin} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 active:scale-90 transition-all">
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <Logo size="md" />
          <div className="w-12"></div> {/* Spacer */}
        </div>
        
        <div className="glass-card rounded-[2.5rem] sm:rounded-[3.5rem] p-7 sm:p-10 shadow-premium border-white/40 mb-6 transition-all">
          <div className="text-center mb-10 px-2">
            <h1 className="text-3xl sm:text-4xl font-black text-kidia-green tracking-tight leading-tight mb-3">
              Criar Conta
            </h1>
            <p className="text-[15px] sm:text-[17px] text-kidia-grey-text/90 leading-relaxed font-bold">
              Junte-se à nossa comunidade Kidia e melhore a sua saúde.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold animate-shake text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-colors group-focus-within:text-kidia-green-primary">
                <User size={22} className="text-kidia-grey-text/50" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
                className="w-full pl-16 pr-4 py-5 bg-white/50 border border-white/70 rounded-3xl focus:outline-none focus:ring-4 focus:ring-kidia-green-primary/10 focus:border-kidia-green-primary/50 focus:bg-white/90 transition-all text-lg font-bold text-kidia-green placeholder:text-kidia-grey-text/40 shadow-sm"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-colors group-focus-within:text-kidia-green-primary">
                <Mail size={22} className="text-kidia-grey-text/50" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="w-full pl-16 pr-4 py-5 bg-white/50 border border-white/70 rounded-3xl focus:outline-none focus:ring-4 focus:ring-kidia-green-primary/10 focus:border-kidia-green-primary/50 focus:bg-white/90 transition-all text-lg font-bold text-kidia-green placeholder:text-kidia-grey-text/40 shadow-sm"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-colors group-focus-within:text-kidia-green-primary">
                <Lock size={22} className="text-kidia-grey-text/50" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Palavra-passe"
                className="w-full pl-16 pr-4 py-5 bg-white/50 border border-white/70 rounded-3xl focus:outline-none focus:ring-4 focus:ring-kidia-green-primary/10 focus:border-kidia-green-primary/50 focus:bg-white/90 transition-all text-lg font-bold text-kidia-green placeholder:text-kidia-grey-text/40 shadow-sm"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-kidia-green-primary text-white font-black text-[18px] py-5 rounded-3xl shadow-[0_15px_30px_-5px_rgba(30,77,59,0.3)] active:scale-[0.98] transition-all mt-8"
            >
              Criar Conta
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[15px] text-kidia-grey-text font-medium">
              Já tem uma conta?{' '}
              <button onClick={onGoToLogin} className="font-black text-kidia-orange hover:brightness-110 transition-all">
                Entrar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
