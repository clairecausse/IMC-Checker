import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { useLang } from "../../context/language";

export default function Register() {
  const { t } = useLang();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { register } = useAuthContext();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || t("errors.server"));
        return;
      }

      register(data.token);
      navigate("/profil");
    } catch {
      setError(t("errors.server"));
    }
  }

  return (
    <div>
      <h1>{t("auth.signupTitle")}</h1>

      <form onSubmit={handleSubmit}>
        <label>{t("auth.email")} :</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>{t("auth.password")} :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {t("auth.createAccount")}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
