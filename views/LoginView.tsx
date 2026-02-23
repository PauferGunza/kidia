import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft } from '../components/Icons';

interface LoginViewProps {
  onLogin: () => void;
  onGoToSignup: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, onGoToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-kidia-bg h-full overflow-y-auto">
      <div className="px-6 py-6 flex items-center">
        <button className="text-kidia-green invisible">
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
      </div>

      <div className="px-8 pb-8 pt-2 text-center flex-1 flex flex-col justify-center">
        <div className="w-24 h-24 bg-kidia-orangeLight rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl font-black text-kidia-orange">K</span>
        </div>
        
        <h1 className="text-[28px] font-bold text-kidia-green tracking-tight leading-tight mb-2">
          Bem-vindo de volta
        </h1>
        <p className="text-[15px] text-kidia-greyText leading-relaxed px-4 mb-8">
          Entre para continuar a sua jornada de saúde com o Dr. Viva.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={20} className="text-kidia-greyText" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kidia-orange/50 focus:border-kidia-orange transition-all text-[15px] font-medium text-kidia-green placeholder:text-kidia-greyText/70"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={20} className="text-kidia-greyText" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Palavra-passe"
              className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kidia-orange/50 focus:border-kidia-orange transition-all text-[15px] font-medium text-kidia-green placeholder:text-kidia-greyText/70"
              required
            />
          </div>

          <div className="flex justify-end mb-6">
            <button type="button" className="text-[13px] font-bold text-kidia-orange">
              Esqueceu a palavra-passe?
            </button>
          </div>

          <button 
            type="submit"
            className="w-full bg-kidia-orange text-white font-bold text-[17px] py-4 rounded-2xl shadow-sm active:scale-95 transition-transform mt-4"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8">
          <p className="text-[14px] text-kidia-greyText">
            Não tem uma conta?{' '}
            <button onClick={onGoToSignup} className="font-bold text-kidia-orange">
              Registar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
