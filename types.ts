
export interface Restaurant {
  name: string;
  cuisine: string;
  rating: number;
  priceRange: '便宜' | '中等' | '高級';
  address: string;
  isOpenNow: boolean;
  aiReason: string;
  specialty?: string;
}

export interface Cuisine {
  name: string;
  emoji: string;
}

export interface Mood {
  name: string;
  description: string;
  emoji: string;
}

export type Budget = '便宜' | '中等' | '高級' | '不限';

export type AppState = 'start' | 'solo' | 'random' | 'loading' | 'results';
