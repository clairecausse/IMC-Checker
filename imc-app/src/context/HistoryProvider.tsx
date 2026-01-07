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

  /* =================================================
     1️⃣ EFFET PRINCIPAL
     - hydrate l’état
     - NE SUPPRIME RIEN
     ================================================= */
  useEffect(() => {
    const cookieData = getCookie(COOKIE_KEY);
    const cookieHistory = cookieData?.history || [];
    const cookiePrefs = cookieData?.preferences || { theme: "light" };

    if (isAuthenticated) {
      setHistory([]);
      setPreferencesState({ theme: "light" });
      return;
    }

    setHistory(cookieHistory);
    setPreferencesState(cookiePrefs);
  }, [isAuthenticated]);

  /* =================================================
     2️⃣ EFFET DE MIGRATION (POST-AUTH)
     - agit UNIQUEMENT quand l’utilisateur est connecté
     - corrige le timing
     ================================================= */
  useEffect(() => {

    if (!isAuthenticated || !justRegistered) return;

    const cookieData = getCookie(COOKIE_KEY);
    const cookieHistory = cookieData?.history || [];
    const cookiePrefs = cookieData?.preferences || { theme: "light" };

    if (importCookieHistory && cookieHistory.length > 0) {

      setHistory(cookieHistory);
      setPreferencesState(cookiePrefs);
      deleteCookie(COOKIE_KEY);
    } else {
  
      setHistory([]);
      setPreferencesState({ theme: "light" });
      deleteCookie(COOKIE_KEY);
    }
  }, [isAuthenticated, justRegistered, importCookieHistory]);

  /* ======================
     ACTIONS
     ====================== */
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
