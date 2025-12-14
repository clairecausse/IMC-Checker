import { useAuthContext } from "../../context/useAuthContext";
import History from "./History";
import "./Profil.css";

export default function Profil() {
  const { token, logout } = useAuthContext();

  return (
    <div className="profil-container">
      <h1>Mon Profil</h1>

      <section className="profil-info">
        <h2>Informations du compte</h2>

        <p>
          <strong>Statut :</strong>{" "}
          {token ? "Connecté" : "Non connecté"}
        </p>

        {token && (
          <p>
            <strong>Token :</strong> {token.slice(0, 15)}...
            <span style={{ color: "#777" }}>(caché)</span>
          </p>
        )}

        <button className="logout-btn" onClick={logout}>
          Se déconnecter
        </button>
      </section>

      <hr className="profil-separator" />

      <section className="profil-history">
        <h2>📊 Mon historique IMC</h2>
        <History hideTitle />
      </section>
    </div>
  );
}
