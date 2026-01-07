import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  setAuthCookie,
  getAuthCookie,
  deleteAuthCookie,
} from "../utils/cookie";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  const [justRegistered, setJustRegistered] = useState(false);
  const [importCookieHistory, setImportCookieHistory] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isAuthenticated = !!token;

  // 🔁 Récupération session existante
  useEffect(() => {
    const saved = getAuthCookie();
    if (saved?.token) {
      setToken(saved.token);
    }
  }, []);

  // ✅ LOGIN
  function login(newToken: string) {
    setToken(newToken);
    setJustRegistered(false);
    setImportCookieHistory(false);

    setAuthCookie(newToken);
    closeAuthModal();
  }

  // ✅ REGISTER (avec checkbox)
  function register(newToken: string, keepHistory: boolean) {
    setToken(newToken);
    setJustRegistered(true);
    setImportCookieHistory(keepHistory);

    setAuthCookie(newToken);
    closeAuthModal();
  }

  // ✅ LOGOUT
  function logout() {
    setToken(null);
    setJustRegistered(false);
    setImportCookieHistory(false);

    deleteAuthCookie();
  }

  function openAuthModal() {
    setIsAuthModalOpen(true);
  }

  function closeAuthModal() {
    setIsAuthModalOpen(false);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        justRegistered,
        importCookieHistory,
        login,
        register,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
