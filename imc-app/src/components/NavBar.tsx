import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/historique">Historique</Link></li>
        <li><Link to="/a-propos">À propos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
