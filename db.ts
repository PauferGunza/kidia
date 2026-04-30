import Dexie, { Table } from 'dexie';
import { UserProfile } from './types';

export interface HistoryItem {
  id?: number;
  date: string;
  itemName: string;
  calories: string;
  carbs: string;
  sodium: string;
  vitamins: string;
  kidiaAdvice?: string;
}

export class KidiaDatabase extends Dexie {
  history!: Table<HistoryItem, number>;
  profile!: Table<UserProfile, number>;
  users!: Table<{ id?: number; email: string; password: string; name: string }, number>;
  goals!: Table<{ id: string; completed: boolean; date: string }, string>;

  constructor() {
    super('KidiaDB');
    this.version(3).stores({
      history: '++id, date, itemName',
      profile: '++id, email',
      users: '++id, &email',
      goals: 'id, date'
    });
  }
}

export const db = new KidiaDatabase();
