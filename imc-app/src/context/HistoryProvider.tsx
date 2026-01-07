import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "../utils/cookie";
import {
  HistoryContext,
  type Preferences,
  type Result,
} from "./HistoryContext";
import { useAuth } from "./AuthContext";

const COOKIE_KEY = "bmi-app-data";

export function HistoryProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, justRegistered } = useAuth();

  const [history, setHistory] = useState<Result[]>([]);
  const [preferences, setPreferencesState] = useState<Preferences>({
    theme: "light",
  });

  useEffect(() => {
    const cookieData = getCookie(COOKIE_KEY);
    const cookieHistory = cookieData?.history || [];
    const cookiePrefs = cookieData?.preferences || { theme: "light" };

    // ✅ CAS UNIQUE : juste après inscription
    if (justRegistered) {
      if (cookieHistory.length > 0) {
        setHistory(cookieHistory);
        setPreferencesState(cookiePrefs);
        deleteCookie(COOKIE_KEY);
      }
      return;
    }

    // ✅ UTILISATEUR NON CONNECTÉ → cookie = source
    if (!isAuthenticated) {
      setHistory(cookieHistory);
      setPreferencesState(cookiePrefs);
    }

    // 🔒 UTILISATEUR CONNECTÉ (login)
    // ❌ ON NE TOUCHE PAS AU COOKIE
    // ❌ ON NE MET PAS À JOUR L’ÉTAT
  }, [isAuthenticated, justRegistered]);

  function addResult(result: Result) {
    const resultWithDate: Result = {
      ...result,
      date: new Date().toISOString(),
    };

    setHistory((prev) => {
      const updated = [...prev, resultWithDate];

      if (!isAuthenticated) {
        setCookie(COOKIE_KEY, {
          history: updated,
          preferences,
        });
      }

      return updated;
    });
  }

  function removeResult(index: number) {
    setHistory((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      if (!isAuthenticated) {
        setCookie(COOKIE_KEY, {
          history: updated,
          preferences,
        });
      }

      return updated;
    });
  }

  function setPreferences(update: Partial<Preferences>) {
    setPreferencesState((prev) => {
      const updated = { ...prev, ...update };

      if (!isAuthenticated) {
        setCookie(COOKIE_KEY, {
          history,
          preferences: updated,
        });
      }

      return updated;
    });
  }

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
