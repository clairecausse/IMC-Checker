import { useEffect, useState } from "react";
import { useLang } from "../context/language";
import "./Settings.css";

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { lang, setLang } = useLang();

  // Charger le thème au démarrage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  function toggleTheme() {
    setDarkMode((prev) => {
      const next = !prev;
      document.body.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }

  return (
    <div className="settings">
      <button
        className="settings-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Paramètres"
      >
        ⋯
      </button>

      {open && (
        <div className="settings-menu">

          {/* LANGUE */}
          <div className="setting-block">
            <span className="setting-title">Langue</span>

            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={lang === "fr"}
                onChange={() => setLang("fr")}
              />
              <span className="checkmark" />
              Français
            </label>

            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={lang === "en"}
                onChange={() => setLang("en")}
              />
              <span className="checkmark" />
              English
            </label>
          </div>

          {/* THEME */}
          <div className="setting-block">
            <span className="setting-title">Thème</span>

            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleTheme}
              />
              <span className="slider">
                <span className="star star_1" />
                <span className="star star_2" />
                <span className="star star_3" />
                <span className="cloud" />
              </span>
            </label>
          </div>

        </div>
      )}
    </div>
  );
}
