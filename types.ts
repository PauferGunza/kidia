export interface UserProfile {
  name?: string;
  email?: string;
  diabetes: boolean;
  hypertension: boolean;
  weightLoss: boolean;
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
