import { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { useLang } from "../context/language";
import {
  getLocalHistory,
  clearLocalHistory,
} from "../utils/localHistory";
import "./AuthModal.css";

export default function AuthModal() {
  const { t } = useLang();
  const { isAuthModalOpen, closeAuthModal, login } = useAuthContext();

  const [mode, setMode] = useState<
    "login" | "register" | "confirm-email"
  >("login");

  // Champs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // UI
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Checkbox (UX inscription uniquement)
  const [transferLocalData, setTransferLocalData] = useState(false);

  if (!isAuthModalOpen) return null;

  function resetFields() {
    setEmail("");
    setPassword("");
    setConfirm("");
    setError("");
    setLoading(false);
    setRegisterSuccess(false);
    setTransferLocalData(false);
  }

  /* ======================
        LOGIN (MIGRATION ICI)
     ====================== */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const localHistory = getLocalHistory();

      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          localHistory, // 🔥 ENVOI DES DONNÉES ICI
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("auth.errors.invalidLogin"));
        setLoading(false);
        return;
      }

      login(data.token);

      // 🧹 Nettoyage après migration réussie
      if (localHistory.length > 0) {
        clearLocalHistory();
      }

      resetFields();
      closeAuthModal();
    } catch {
      setError(t("errors.server"));
      setLoading(false);
    }
  }

  /* ======================
        REGISTER (PAS DE MIGRATION)
     ====================== */
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (loading || registerSuccess) return;

    setError("");

    if (password !== confirm) {
      setError(t("auth.errors.passwordMismatch"));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("auth.errors.register"));
        setLoading(false);
        return;
      }

      setRegisterSuccess(true);
      setMode("confirm-email");
    } catch {
      setError(t("errors.server"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-backdrop" onClick={closeAuthModal}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={closeAuthModal}>
          ×
        </button>

        {/* ================= LOGIN ================= */}
        {mode === "login" && (
          <>
            <h2>{t("auth.loginTitle")}</h2>

            <form onSubmit={handleLogin}>
              <label>{t("auth.email")}</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>{t("auth.password")}</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading
                  ? t("auth.loading.login")
                  : t("auth.loginTitle")}
              </button>
            </form>

            <p className="auth-switch">
              {t("auth.noAccount")}{" "}
              <span
                onClick={() => {
                  resetFields();
                  setMode("register");
                }}
              >
                {t("auth.createAccount")}
              </span>
            </p>
          </>
        )}

        {/* ================= REGISTER ================= */}
        {mode === "register" && (
          <>
            <h2>{t("auth.signupTitle")}</h2>

            <form onSubmit={handleRegister}>
              <label>{t("auth.email")}</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>{t("auth.password")}</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <label>{t("auth.confirmPassword")}</label>
              <input
                type="password"
                value={confirm}
                required
                onChange={(e) => setConfirm(e.target.value)}
              />

              {error && <p className="auth-error">{error}</p>}

              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  checked={transferLocalData}
                  onChange={(e) =>
                    setTransferLocalData(e.target.checked)
                  }
                />
                {t("auth.transferData")}
              </label>

              <button
                type="submit"
                className="auth-btn"
                disabled={loading || registerSuccess}
              >
                {loading
                  ? t("auth.loading.register")
                  : t("auth.createAccount")}
              </button>
            </form>

            <p className="auth-switch">
              {t("auth.alreadyAccount")}{" "}
              <span
                onClick={() => {
                  resetFields();
                  setMode("login");
                }}
              >
                {t("auth.loginTitle")}
              </span>
            </p>
          </>
        )}

        {/* ================= CONFIRM EMAIL ================= */}
        {mode === "confirm-email" && (
          <div className="auth-confirm">
            <h2>{t("auth.confirmEmail.title")}</h2>
            <p>{t("auth.confirmEmail.text")}</p>

            <button
              className="auth-btn"
              onClick={() => {
                resetFields();
                setMode("login");
              }}
            >
              {t("auth.confirmEmail.back")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
