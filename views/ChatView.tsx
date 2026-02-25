import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';
import { ArrowLeft, Send, Sparkles, Mic } from '../components/Icons';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

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
      text: `Olá, ${profile.name || 'amigo'}! Sou o Dr. Viva. Como posso ajudar com a sua saúde hoje?`,
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
    const systemInstruction = `Tu és o Dr. Viva, um especialista em medicina integrativa, fitoterapia e nutrição de Angola.
O utilizador com quem estás a falar chama-se ${profile.name || 'Amigo'}.
Perfil de saúde do utilizador:
- Diabético: ${profile.diabetes ? 'Sim' : 'Não'}
- Hipertenso: ${profile.hypertension ? 'Sim' : 'Não'}
- Quer emagrecer: ${profile.weightLoss ? 'Sim' : 'Não'}

Responde sempre de forma acolhedora, profissional e com foco na realidade angolana. Usa termos simples se necessário. Dá conselhos personalizados baseados no perfil de saúde do utilizador.`;

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
      <div className="px-6 py-5 flex items-center justify-between bg-white shadow-sm z-10 shrink-0">
        <button onClick={onBack} className="text-kidia-green">
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-kidia-orangeLight rounded-full flex items-center justify-center">
            <Sparkles size={16} className="text-kidia-orange" />
          </div>
          <h1 className="text-[17px] font-bold text-kidia-green">Dr. Viva</h1>
        </div>
        <div className="w-6"></div> {/* Spacer */}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-kidia-orange text-white rounded-tr-none' 
                  : 'bg-white text-kidia-green border border-gray-100 rounded-tl-none'
              }`}
            >
              {msg.sender === 'ai' ? (
                <div className="prose prose-sm prose-p:leading-relaxed prose-a:text-kidia-orange max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-[15px] leading-relaxed">{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-kidia-orange rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-kidia-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-kidia-orange rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <div className="flex items-end gap-2 bg-gray-50 rounded-2xl p-2 border border-gray-200 focus-within:border-kidia-orange focus-within:ring-1 focus-within:ring-kidia-orange transition-all">
          <button 
            onClick={toggleListening}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mb-0.5 transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-gray-400 hover:text-kidia-orange'}`}
          >
            <Mic size={20} />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "A ouvir..." : "Pergunte ao Dr. Viva..."}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-3 px-1 text-[15px] text-kidia-green placeholder:text-gray-400"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 bg-kidia-orange rounded-xl flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:bg-gray-300 transition-colors mb-0.5"
          >
            <Send size={20} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
