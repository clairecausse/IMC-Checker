import { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import "./AuthModal.css";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    login,
  } = useAuthContext();

  const [mode, setMode] = useState<"login" | "register" | "confirm-email">(
    "login"
  );

  // Champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // États UI
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  function resetFields() {
    setEmail("");
    setPassword("");
    setConfirm("");
    setError("");
    setLoading(false);
    setRegisterSuccess(false);
  }

  /* ======================
        LOGIN
     ====================== */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Email ou mot de passe incorrect");
        setLoading(false);
        return;
      }

      login(data.token);
      resetFields();
    } catch {
      setError("Erreur serveur, réessayez plus tard");
      setLoading(false);
    }
  }

  /* ======================
        REGISTER
     ====================== */
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    // 🔒 Empêche tout double appel
    if (loading || registerSuccess) return;

    setError("");

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas");
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
        setError(data.error || "Impossible de créer le compte");
        setLoading(false);
        return;
      }

      // ✅ Succès UNIQUE : on ne rappellera jamais /register
      setRegisterSuccess(true);
      setMode("confirm-email");
    } catch {
      setError("Erreur serveur, réessayez plus tard");
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
            <h2>Connexion</h2>

            <form onSubmit={handleLogin}>
              <label>Email :</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Mot de passe :</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <p className="auth-switch">
              Pas encore inscrit ?{" "}
              <span
                onClick={() => {
                  setMode("register");
                  resetFields();
                }}
              >
                Créer un compte
              </span>
            </p>
          </>
        )}

        {/* ================= REGISTER ================= */}
        {mode === "register" && (
          <>
            <h2>Créer un compte</h2>

            <form onSubmit={handleRegister}>
              <label>Email :</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Mot de passe :</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <label>Confirmer le mot de passe :</label>
              <input
                type="password"
                value={confirm}
                required
                onChange={(e) => setConfirm(e.target.value)}
              />

              {error && <p className="auth-error">{error}</p>}

              <button
                type="submit"
                className="auth-btn"
                disabled={loading || registerSuccess}
              >
                {loading ? "Création..." : "Créer mon compte"}
              </button>
            </form>

            <p className="auth-switch">
              Déjà un compte ?{" "}
              <span
                onClick={() => {
                  setMode("login");
                  resetFields();
                }}
              >
                Se connecter
              </span>
            </p>
          </>
        )}

        {/* ================= CONFIRM EMAIL ================= */}
        {mode === "confirm-email" && (
          <div className="auth-confirm">
            <h2>📧 Vérifiez vos emails</h2>
            <p>
              Un lien de validation a été envoyé à votre adresse email.
              <br />
              Vous pourrez ensuite vous connecter.
            </p>

            <button
              className="auth-btn"
              onClick={() => {
                setMode("login");
                resetFields();
              }}
            >
              Retour à la connexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
