import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./NavBar.css";
import Settings from "./Settings";
import { useLang } from "../context/language";

export default function NavBar() {
  const { t } = useLang();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">{t("nav.home")}</Link>
        </li>
        <li>
          <Link to="/profil">{t("nav.profile")}</Link>
        </li>
      </ul>

      <Settings />
    </nav>
  );
}
