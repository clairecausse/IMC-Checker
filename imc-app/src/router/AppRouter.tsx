import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../pages/Home/Home";
import Profil from "../pages/Client/Profil";
import Login from "../pages/Client/Login";
import About from "../pages/About/About";

import { HistoryProvider } from "../context/HistoryProvider";
import { AuthProvider } from "../context/AuthProvider";

export default function AppRouter() {
  return (
    <AuthProvider>
      <HistoryProvider>
        <Router>
          <NavBar />
          <main >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profil" element={<Profil />} />
            </Routes>
          </main>
        </Router>
      </HistoryProvider>
    </AuthProvider>
  );
}
