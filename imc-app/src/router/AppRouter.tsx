import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../pages/Home/Home";
import Profil from "../pages/Client/Profil";
import Login from "../pages/Client/Login";

import AuthModal from "../components/AuthModal";

import { HistoryProvider } from "../context/HistoryProvider";
import { AuthProvider } from "../context/AuthProvider";
import { LanguageProvider } from "../context/language";

export default function AppRouter() {
  return (
    <AuthProvider>
      <HistoryProvider>
        <LanguageProvider>
          <Router>
            <NavBar />
            <AuthModal />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profil" element={<Profil />} />
              </Routes>
            </main>
          </Router>
        </LanguageProvider>
      </HistoryProvider>
    </AuthProvider>
  );
}
