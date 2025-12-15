import { useAuthContext } from "../../context/useAuthContext";
import History from "./History";
import "./Profil.css";

export default function Profil() {
  const { token, logout, openAuthModal } = useAuthContext();

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
          <button className="logout-btn danger" onClick={logout}>
            Se déconnecter
          </button>
        </>
      )}
    </div>
  );
}
