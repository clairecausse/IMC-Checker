// src/utils/storage.ts

export type HistoryEntry = {
  date: string;
  weight: number;
  height: number;
  bmi: number;
  category: string;
};

// historique
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


const LAST_CALC_KEY = "last-bmi-calc";

export function saveLastCalculation(date: Date) {
  localStorage.setItem(LAST_CALC_KEY, date.toISOString());
}

export function getLastCalculation(): Date | null {
  const raw = localStorage.getItem(LAST_CALC_KEY);
  return raw ? new Date(raw) : null;
}

const LAST_RESULT_KEY = "last-bmi-result";

export function saveLastResult(result: { bmi: number; category: string }) {
  localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result));
}

export function getLastResult() {
  const raw = localStorage.getItem(LAST_RESULT_KEY);
  return raw ? JSON.parse(raw) : null;
}

