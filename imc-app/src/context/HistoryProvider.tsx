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
  const {
    isAuthenticated,
    justRegistered,
    importCookieHistory,
  } = useAuth();

  const [history, setHistory] = useState<Result[]>([]);
  const [preferences, setPreferencesState] = useState<Preferences>({
    theme: "light",
  });

  useEffect(() => {
    const cookieData = getCookie(COOKIE_KEY);
    const cookieHistory = cookieData?.history || [];
    const cookiePrefs = cookieData?.preferences || { theme: "light" };

    // 🔒 RÈGLE ABSOLUE :
    // utilisateur authentifié = cookie interdit
    if (isAuthenticated) {
      // ✅ SEUL CAS AUTORISÉ : migration volontaire à l'inscription
      if (justRegistered && importCookieHistory && cookieHistory.length > 0) {
        setHistory(cookieHistory);
        setPreferencesState(cookiePrefs);
        deleteCookie(COOKIE_KEY);
      } else {
        // ❌ pas d'import → historique vide côté compte
        setHistory([]);
        setPreferencesState({ theme: "light" });
      }
      return;
    }

    // ✅ MODE INVITÉ UNIQUEMENT
    setHistory(cookieHistory);
    setPreferencesState(cookiePrefs);
  }, [isAuthenticated, justRegistered, importCookieHistory]);

  function addResult(result: Result) {
    const resultWithDate: Result = {
      ...result,
      date: new Date().toISOString(),
    };

    setHistory((prev) => {
      const updated = [...prev, resultWithDate];

      // ✅ écriture cookie uniquement en mode invité
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
