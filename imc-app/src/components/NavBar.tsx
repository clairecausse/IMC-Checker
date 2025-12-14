import { Link } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";
import logo from "../assets/logo.png";
import "./NavBar.css";

export default function NavBar() {
  const { token, logout, openAuthModal } = useAuthContext();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/a-propos">À propos</Link></li>

        {token ? (
          <>
            <li><Link to="/profil">Mon profil</Link></li>
            <li>
              <button className="logout-btn" onClick={logout}>Déconnexion</button>
            </li>
          </>
        ) : (
          <li>
            <button className="login-btn" onClick={openAuthModal}>
              Se connecter
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
