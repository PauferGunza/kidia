import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft } from '../components/Icons';

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
    <div className="flex-1 flex flex-col bg-kidia-bg h-full overflow-y-auto">
      <div className="px-6 py-6 flex items-center">
        <button onClick={onGoToLogin} className="text-kidia-green">
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
      </div>

      <div className="px-8 pb-8 pt-2 text-center flex-1 flex flex-col justify-center">
        <h1 className="text-[28px] font-bold text-kidia-green tracking-tight leading-tight mb-2">
          Criar Conta
        </h1>
        <p className="text-[15px] text-kidia-greyText leading-relaxed px-4 mb-8">
          Junte-se à comunidade Kidia e melhore a sua saúde.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User size={20} className="text-kidia-greyText" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
              className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kidia-orange/50 focus:border-kidia-orange transition-all text-[15px] font-medium text-kidia-green placeholder:text-kidia-greyText/70"
              required
            />
          </div>

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

          <button 
            type="submit"
            className="w-full bg-kidia-orange text-white font-bold text-[17px] py-4 rounded-2xl shadow-sm active:scale-95 transition-transform mt-8"
          >
            Registar
          </button>
        </form>

        <div className="mt-8">
          <p className="text-[14px] text-kidia-greyText">
            Já tem uma conta?{' '}
            <button onClick={onGoToLogin} className="font-bold text-kidia-orange">
              Entrar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
