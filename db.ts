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
  kdiaAdvice?: string;
}

export class KidiaDatabase extends Dexie {
  history!: Table<HistoryItem, number>;
  profile!: Table<UserProfile, number>;

  constructor() {
    super('KidiaDB');
    this.version(1).stores({
      history: '++id, date, itemName',
      profile: '++id' // Just to store a single profile record
    });
  }
}

export const db = new KidiaDatabase();
