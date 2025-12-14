import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  function login(newToken: string) {
    setToken(newToken);
    closeAuthModal(); // fermer le modal après connexion
  }

  function logout() {
    setToken(null);
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
        login,
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
