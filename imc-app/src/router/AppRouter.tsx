import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import History from "../pages/Client/History";
import About from "../pages/About/About";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historique" element={<History />} />
        <Route path="/a-propos" element={<About />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
