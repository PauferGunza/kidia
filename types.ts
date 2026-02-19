export interface UserProfile {
  diabetes: boolean;
  hypertension: boolean;
  weightLoss: boolean;
}

export interface ScanResult {
  itemName: string;
  isFood: boolean;
  calories: string;
  carbs: string;
  sodium: string;
  vitamins: string;
  drVivaAdvice: string;
  safetyAlert: string;
}

export type AppView = 'home' | 'profile' | 'scanning' | 'results';