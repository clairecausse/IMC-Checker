import { createContext } from "react";

export type Result = {
  bmi: number;
  category: string;
  date: string;
};

export type Preferences = {
  theme: "light" | "dark";
};

export type HistoryContextType = {
  history: Result[];
  preferences: Preferences;
  addResult: (r: Result) => void;
  removeResult: (index: number) => void;
  setPreferences: (p: Partial<Preferences>) => void;
};

export const HistoryContext = createContext<HistoryContextType | null>(null);
