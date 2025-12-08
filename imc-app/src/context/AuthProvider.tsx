import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { setCookie, getCookie } from "../utils/cookie";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = getCookie("auth-token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  function login(token: string) {
    setCookie("auth-token", token, 365); // 1 an
    setToken(token);
  }

  function logout() {
    document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
