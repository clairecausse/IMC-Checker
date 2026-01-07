// src/utils/localHistory.ts

export type ImcEntry = {
  value: number;
  date: string;
};

const STORAGE_KEY = "imc-history";

export function getLocalHistory(): ImcEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function hasLocalHistory(): boolean {
  return getLocalHistory().length > 0;
}

export function clearLocalHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
