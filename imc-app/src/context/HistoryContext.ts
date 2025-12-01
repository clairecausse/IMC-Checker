import { createContext } from "react";

export type Result = {
  bmi: number;
  category: string;
  date: string;
};

export type HistoryContextType = {
  history: Result[];
  addResult: (result: Result) => void;
  removeResult: (index: number) => void;
};

export const HistoryContext = createContext<HistoryContextType | null>(null);
