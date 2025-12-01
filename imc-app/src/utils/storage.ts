// src/utils/storage.ts

export type HistoryEntry = {
  date: string;
  weight: number;
  height: number;
  bmi: number;
  category: string;
};

const STORAGE_KEY = "bmi-history";

export function saveResult(entry: HistoryEntry) {
  const current = getHistory();
  current.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

export function getHistory(): HistoryEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
