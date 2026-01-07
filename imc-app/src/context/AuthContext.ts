import { createContext, useContext } from "react";

export type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;

  // migration flags
  justRegistered: boolean;
  importCookieHistory: boolean;

  login: (token: string) => void;
  register: (token: string, importCookieHistory: boolean) => void;
  logout: () => void;

  // modal auth
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
