import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import History from "./History";
import ConfirmDelete from "../../components/ConfirmDelete";
import "./Profil.css";

export default function Profil() {
  const { token, logout, openAuthModal } = useAuthContext();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState("");

  async function deleteAccount() {
    setError("");

    try {
      const res = await fetch("http://localhost:3001/auth/me", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setError("Erreur lors de la suppression du compte");
        return;
      }

      logout();
      navigate("/");
    } catch {
      setError("Impossible de contacter le serveur");
    }
  }

  return (
    <div className="profil-container">
      <h1>Mon Profil</h1>

      <section className="profil-auth-box">
        {token ? (
          <p className="profil-hello">Bonjour !</p>
        ) : (
          <>
            <p>
              Connectez-vous pour sauvegarder vos données et les retrouver plus tard.
            </p>
            <button className="login-btn" onClick={openAuthModal}>
              Se connecter / Créer un compte
            </button>
          </>
        )}
      </section>

      <hr className="profil-separator" />

      <section className="profil-history">
        <h2>Mon historique IMC</h2>
        <History hideTitle />
      </section>

      {token && (
        <>
          <hr className="profil-separator" />

          <div className="profil-actions">
            <button className="logout-btn" onClick={logout}>
              Se déconnecter
            </button>

            <button
              className="logout-btn danger"
              onClick={() => setShowDeleteModal(true)}
            >
              Supprimer mon compte
            </button>
          </div>
        </>
      )}

      {showDeleteModal && (
        <ConfirmDelete
          title="Supprimer mon compte"
          message="Cette action est définitive. Toutes vos données seront supprimées."
          confirmLabel="Oui, supprimer"
          cancelLabel="Annuler"
          onConfirm={deleteAccount}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
