import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

export default function Register() {
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
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erreur lors de la création du compte");
        return;
      }

      register(data.token);
      navigate("/profil");

    } catch {
      setError("Impossible de contacter le serveur");
    }
  }

  return (
    <div>
      <h1>Créer un compte</h1>

      <form onSubmit={handleSubmit}>
        <label>Email :</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Créer un compte</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
