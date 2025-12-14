import { createContext } from "react";

export type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;

  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
