import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuthContext();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Email ou mot de passe incorrect");
        return;
      }

      login(data.token);
      navigate("/profil");

    } catch (err) {
      setError("Impossible de contacter le serveur");
    }
  }

  return (
    <div>
      <h1>Connexion</h1>
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

        <button type="submit">Se connecter</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
