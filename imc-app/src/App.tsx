import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import History from "./pages/Client/History";
import About from "./pages/About/About";

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/historique">Historique</Link></li>
          <li><Link to="/a-propos">À propos</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historique" element={<History />} />
        <Route path="/a-propos" element={<About />} />
      </Routes>
    </Router>
  );
}
