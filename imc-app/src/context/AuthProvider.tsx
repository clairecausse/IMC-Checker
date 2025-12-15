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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isAuthenticated = !!token;

  useEffect(() => {
    const saved = getAuthCookie();
    if (saved?.token) {
      setToken(saved.token);
    }
  }, []);

  function login(newToken: string) {
    setToken(newToken);
    setJustRegistered(false);
    setAuthCookie(newToken);
    closeAuthModal();
  }

  function register(newToken: string) {
    setToken(newToken);
    setJustRegistered(true);
    setAuthCookie(newToken);
    closeAuthModal();
  }

  function logout() {
    setToken(null);
    setJustRegistered(false);
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
