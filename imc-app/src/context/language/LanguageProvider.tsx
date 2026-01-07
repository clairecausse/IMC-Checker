import { useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import { t, type Lang } from "../../i18n";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved) setLangState(saved);
  }, []);

  function setLang(l: Lang) {
    localStorage.setItem("lang", l);
    setLangState(l);
  }

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: (key) => t(lang, key) }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
