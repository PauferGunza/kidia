import Dexie, { Table } from 'dexie';
import { UserProfile, UserStats, ChatMessage } from './types';

export interface HistoryItem {
  id?: number;
  userId?: number;
  date: string;
  itemName: string;
  calories: string;
  carbs: string;
  sodium: string;
  vitamins: string;
}

export class KidiaDatabase extends Dexie {
  history!: Table<HistoryItem, number>;
  profile!: Table<UserProfile, number>;
  users!: Table<UserProfile, number>;
  stats!: Table<UserStats, number>;
  chatMessages!: Table<ChatMessage, number>;

  constructor() {
    super('KidiaDB');
    this.version(2).stores({
      history: '++id, userId, date, itemName',
      profile: '++id',
      users: '++id, email',
      stats: '++id, userId',
      chatMessages: '++id, userId, timestamp'
    });
  }
}

export const db = new KidiaDatabase();

// Funções de utilidade para autenticação e gamificação
export const authAPI = {
  async signup(email: string, password: string, name: string): Promise<UserProfile | null> {
    const existingUser = await db.users.where('email').equals(email).first();
    if (existingUser) {
      throw new Error('Email já registado');
    }
    
    const userId = await db.users.add({
      email,
      password,
      name,
      diabetes: false,
      hypertension: false,
      weightLoss: false
    });
    
    // Criar stats iniciais
    await db.stats.add({
      userId,
      points: 0,
      streak: 0,
      dailyProgress: 0,
      weeklyGoals: {},
      monthlyGoals: {},
      achievements: []
    });
    
    return { id: userId, email, password, name, diabetes: false, hypertension: false, weightLoss: false };
  },

  async login(email: string, password: string): Promise<UserProfile | null> {
    const user = await db.users.where('email').equals(email).first();
    if (!user || user.password !== password) {
      throw new Error('Email ou palavra-passe inválidos');
    }
    return user;
  },

  async updateUserStats(userId: number, updates: Partial<UserStats>): Promise<void> {
    const stats = await db.stats.where('userId').equals(userId).first();
    if (stats && stats.id !== undefined) {
      await db.stats.update(stats.id, updates);
    } else {
      await db.stats.add({
        userId,
        points: 0,
        streak: 0,
        dailyProgress: 0,
        weeklyGoals: {},
        monthlyGoals: {},
        achievements: [],
        ...updates
      });
    }
  },

  async getUserStats(userId: number): Promise<UserStats | null> {
    return await db.stats.where('userId').equals(userId).first();
  },

  async addPoints(userId: number, points: number): Promise<void> {
    const stats = await this.getUserStats(userId);
    if (stats && stats.id !== undefined) {
      await db.stats.update(stats.id, {
        points: stats.points + points,
        dailyProgress: stats.dailyProgress + points
      });
    }
  },

  async updateStreak(userId: number): Promise<void> {
    const stats = await this.getUserStats(userId);
    if (!stats) return;

    const today = new Date().toDateString();
    const lastLogin = stats.lastLoginDate ? new Date(stats.lastLoginDate).toDateString() : null;
    
    let newStreak = stats.streak;
    
    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastLogin === yesterday.toDateString()) {
        newStreak += 1;
      } else if (lastLogin !== today) {
        newStreak = 1;
      }
      
      if (stats.id !== undefined) {
        await db.stats.update(stats.id, {
          streak: newStreak,
          lastLoginDate: new Date().toISOString()
        });
      }
    }
  }
};
