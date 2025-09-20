import type { Cuisine, Mood, Budget } from './types';

export const CUISINES: Cuisine[] = [
  { name: '日式', emoji: '🍣' },
  { name: '韓式', emoji: '🇰🇷' },
  { name: '火鍋', emoji: '🍲' },
  { name: '炸雞', emoji: '🍗' },
  { name: '咖啡廳', emoji: '☕' },
  { name: '義式', emoji: '🍝' },
  { name: '美式', emoji: '🍔' },
  { name: '泰式', emoji: '🇹🇭' },
  { name: '港式', emoji: '🇭🇰' },
  { name: '小吃', emoji: '🍢' },
  { name: '素食', emoji: '🥬' },
  { name: '甜點', emoji: '🍰' },
];

export const MOODS: Mood[] = [
  { name: '想吃清爽的', description: 'Light & Refreshing', emoji: '🥗' },
  { name: '想吃罪惡的', description: 'Guilty Pleasure', emoji: '🍩' },
  { name: '快速解決一餐', description: 'Quick Bite', emoji: '⚡' },
  { name: '犒賞自己', description: 'Treat Yourself', emoji: '💎' },
  { name: '適合約會', description: 'Date Night', emoji: '❤️' },
];

export const BUDGET_OPTIONS: Budget[] = ['便宜', '中等', '高級', '不限'];

export const LOCATION_OPTIONS: string[] = [
    '信義區',
    '大安區',
    '中山區',
    '中正區',
    '松山區',
    '萬華區',
];
