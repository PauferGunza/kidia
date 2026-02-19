export interface UserProfile {
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

export type AppView = 'dashboard' | 'mealplan' | 'history' | 'profile' | 'scanning' | 'results';
