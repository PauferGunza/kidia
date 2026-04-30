import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';
import { ArrowLeft, Send, Sparkles, Mic } from '../components/Icons';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { Logo } from '../components/Logo';

interface ChatViewProps {
  profile: UserProfile;
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export const ChatView: React.FC<ChatViewProps> = ({ profile, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Olá, ${profile.name || 'amigo'}! Sou o Kdia, seu assistente de saúde. Como posso ajudar na sua jornada hoje?`,
      sender: 'ai'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Gemini API Key is missing");
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = `Tu és o Kdia, um assistente virtual de saúde altamente profissional, especialista em medicina integrativa e nutrição.
O utilizador com quem estás a falar chama-se ${profile.name || 'Amigo'}.
Perfil de saúde do utilizador:
- Diabético: ${profile.diabetes ? 'Sim' : 'Não'}
- Hipertenso: ${profile.hypertension ? 'Sim' : 'Não'}
- Quer emagrecer: ${profile.weightLoss ? 'Sim' : 'Não'}
- Objetivo Semanal: ${profile.weeklyGoal || 'Não definido'}

Responde sempre de forma acolhedora, mas extremamente profissional e técnica, focada no bem-estar e na realidade de saúde do utilizador. Não uses avatares infantis. Dá conselhos personalizados baseados no perfil de saúde e objetivos.`;

    chatRef.current = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction,
      }
    });

    // Setup Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'pt-PT'; // Portuguese

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [profile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatRef.current) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userMsg, sender: 'user' }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { id: Date.now().toString(), text: response.text, sender: 'ai' }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), text: "Desculpe, ocorreu um erro ao processar a sua mensagem. Tente novamente.", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Could not start speech recognition", e);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-kidia-bg h-full overflow-hidden">
      {/* Top Header */}
      <div className="px-6 py-10 flex items-center justify-between bg-white shadow-soft z-10 shrink-0 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-kidia-green">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h1 className="text-lg font-extrabold text-kidia-green tracking-tight">Kdia</h1>
          </div>
          <p className="text-[10px] font-bold text-kidia-grey-text uppercase tracking-widest">Assistente de Saúde</p>
        </div>
        <Logo size="sm" showText={false} />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
              <div 
                className={`rounded-[2rem] p-5 shadow-soft ${
                  msg.sender === 'user' 
                    ? 'bg-kidia-green-primary text-white rounded-tr-none' 
                    : 'bg-white text-kidia-green border border-gray-50 rounded-tl-none'
                }`}
              >
                {msg.sender === 'ai' ? (
                  <div className="prose prose-sm prose-p:leading-relaxed prose-strong:text-kidia-green prose-a:text-kidia-orange max-w-none font-medium">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-[15px] leading-relaxed font-semibold">{msg.text}</p>
                )}
              </div>
              <span className="text-[10px] font-bold text-kidia-grey-text mt-2 px-2 uppercase tracking-widest">
                {msg.sender === 'ai' ? 'Kdia' : 'Tu'}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-50 rounded-[2rem] rounded-tl-none p-5 shadow-soft flex items-center gap-2">
              <div className="w-2 h-2 bg-kidia-green-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-kidia-green-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-kidia-green-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-50 shrink-0">
        <div className="flex items-end gap-3 bg-gray-50 rounded-[2rem] p-2.5 border border-gray-100 focus-within:border-kidia-green-primary focus-within:ring-4 focus-within:ring-kidia-green-primary/5 transition-all">
          <button 
            onClick={toggleListening}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${isListening ? 'bg-red-50 text-red-500 animate-pulse' : 'text-gray-400 hover:text-kidia-green-primary hover:bg-white'}`}
          >
            <Mic size={22} />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "A ouvir..." : "Pergunte ao Kdia..."}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[48px] py-3.5 px-2 text-[15px] text-kidia-green font-medium placeholder:text-gray-400"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-kidia-green-primary rounded-2xl flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:bg-gray-300 shadow-lg shadow-green-900/10 active:scale-95 transition-all"
          >
            <Send size={22} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
