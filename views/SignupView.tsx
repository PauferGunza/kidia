import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft } from '../components/Icons';

interface SignupViewProps {
  onSignup: (name: string, email: string, password: string) => void;
  onGoToLogin: () => void;
  error: string | null;
  clearError: () => void;
}

export const SignupView: React.FC<SignupViewProps> = ({ onSignup, onGoToLogin, error, clearError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    clearError();
    
    if (!name.trim()) {
      setValidationError('Por favor, insira o seu nome completo');
      return;
    }
    
    if (!email.trim()) {
      setValidationError('Por favor, insira o seu e-mail');
      return;
    }
    
    if (!validateEmail(email)) {
      setValidationError('Por favor, insira um e-mail válido');
      return;
    }
    
    if (!password) {
      setValidationError('Por favor, crie uma palavra-passe');
      return;
    }
    
    if (password.length < 6) {
      setValidationError('A palavra-passe deve ter pelo menos 6 caracteres');
      return;
    }
    
    if (password !== confirmPassword) {
      setValidationError('As palavras-passe não coincidem');
      return;
    }
    
    onSignup(name, email, password);
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
          Junte-se à nossa comunidade Kidia e melhore a sua saúde.
        </p>

        {(error || validationError) && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
            {error || validationError}
          </div>
        )}

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
              className={`w-full pl-11 pr-4 py-4 bg-white border rounded-2xl focus:outline-none focus:ring-2 focus:ring-kidia-orange/50 focus:border-kidia-orange transition-all text-[15px] font-medium text-kidia-green placeholder:text-kidia-greyText/70 ${validationError || error ? 'border-red-300' : 'border-gray-200'}`}
              disabled={false}
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
              className={`w-full pl-11 pr-4 py-4 bg-white border rounded-2xl focus:outline-none focus:ring-2 focus:ring-kidia-orange/50 focus:border-kidia-orange transition-all text-[15px] font-medium text-kidia-green placeholder:text-kidia-greyText/70 ${validationError || error ? 'border-red-300' : 'border-gray-200'}`}
              disabled={false}
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
              className={`w-full pl-11 pr-4 py-4 bg-white border rounded-2xl focus:outline-none focus:ring-2 focus:ring-kidia-orange/50 focus:border-kidia-orange transition-all text-[15px] font-medium text-kidia-green placeholder:text-kidia-greyText/70 ${validationError || error ? 'border-red-300' : 'border-gray-200'}`}
              disabled={false}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={20} className="text-kidia-greyText" />
            </div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar palavra-passe"
              className={`w-full pl-11 pr-4 py-4 bg-white border rounded-2xl focus:outline-none focus:ring-2 focus:ring-kidia-orange/50 focus:border-kidia-orange transition-all text-[15px] font-medium text-kidia-green placeholder:text-kidia-greyText/70 ${validationError || error ? 'border-red-300' : 'border-gray-200'}`}
              disabled={false}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-kidia-orange text-white font-bold text-[17px] py-4 rounded-2xl shadow-sm active:scale-95 transition-transform mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={false}
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
