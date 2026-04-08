export interface UserProfile {
  id?: number;
  name?: string;
  email?: string;
  password?: string; // Para autenticação local
  diabetes: boolean;
  hypertension: boolean;
  weightLoss: boolean;
}

export interface UserStats {
  id?: number;
  userId?: number;
  points: number;
  streak: number;
  lastLoginDate?: string;
  dailyProgress: number;
  weeklyGoals: Record<string, boolean>;
  monthlyGoals: Record<string, boolean>;
  achievements: string[];
}

export interface ChatMessage {
  id?: number;
  userId?: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export interface ScanResult {
  itemName: string;
  isFood: boolean;
  calories: string;
  glycemicImpact: 'Baixo' | 'Médio' | 'Alto' | 'N/A';
  carbs: string;
  sodium: string;
  vitamins: string;
  drVivaAdvice: string;
  safetyAlert: string;
}

export type AppView = 'login' | 'signup' | 'dashboard' | 'mealplan' | 'history' | 'profile' | 'scanning' | 'results' | 'premium' | 'chat';
