import { useState } from "react";
import type { ReactNode } from "react";
import { HistoryContext, type Result } from "./HistoryContext";

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<Result[]>([]);

  function addResult(result: Result) {
    setHistory((prev) => [...prev, result]);
  }

  return (
    <HistoryContext.Provider value={{ history, addResult }}>
      {children}
    </HistoryContext.Provider>
  );
}
