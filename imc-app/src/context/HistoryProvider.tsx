import { useState, useEffect } from "react";
import { HistoryContext, type Result, type Preferences } from "./HistoryContext";
import type { ReactNode } from "react";
import { setCookie, getCookie } from "../utils/cookie";

const COOKIE_KEY = "bmi-app-data";

export function HistoryProvider({ children }: { children: ReactNode }) {

  const cookieData = getCookie(COOKIE_KEY);

  const [history, setHistory] = useState<Result[]>(cookieData?.history || []);
  const [preferences, setPreferencesState] = useState<Preferences>(
    cookieData?.preferences || { theme: "light" }
  );

  function addResult(result: Result) {
    setHistory((prev) => [...prev, result]);
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
        setPreferences,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}
