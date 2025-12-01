import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav>
      <img src={logo} alt="Logo" />
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/historique">Historique</Link></li>
        <li><Link to="/a-propos">À propos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
