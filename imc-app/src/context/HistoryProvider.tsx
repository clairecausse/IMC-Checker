import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../utils/cookie";
import { HistoryContext, type Preferences, type Result } from "./HistoryContext";

const COOKIE_KEY = "bmi-app-data";

export function HistoryProvider({ children }: { children: ReactNode }) {
  const cookieData = getCookie(COOKIE_KEY);

  const [history, setHistory] = useState<Result[]>(cookieData?.history || []);
  const [preferences, setPreferencesState] = useState<Preferences>(
    cookieData?.preferences || { theme: "light" }
  );

  function addResult(result: Result) {
    const resultWithDate: Result = {
      ...result,
      date: new Date().toISOString(), // date ISO utilisée pour les filtres 30j / 3m / 1a
    };

    setHistory((prev) => [...prev, resultWithDate]);
  }

  function removeResult(index: number) {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  }

  function setPreferences(update: Partial<Preferences>) {
    setPreferencesState((prev) => ({ ...prev, ...update }));
  }

  useEffect(() => {
    setCookie(COOKIE_KEY, { history, preferences });
  }, [history, preferences]);

  return (
    <HistoryContext.Provider
      value={{
        history,
        preferences,
        addResult,
        removeResult,
        setPreferences,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}
