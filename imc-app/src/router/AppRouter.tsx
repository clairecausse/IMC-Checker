import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../pages/Home/Home";
import History from "../pages/Client/History";
import About from "../pages/About/About";
import { HistoryProvider } from "../context/HistoryProvider";
import "./AppRouter.css";

export default function AppRouter() {
  return (
    <HistoryProvider>
      <Router>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historique" element={<History />} />
            <Route path="/a-propos" element={<About />} />
          </Routes>
        </main>
      </Router>
    </HistoryProvider>
  );
}
