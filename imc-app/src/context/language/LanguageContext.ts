import { createContext } from "react";
import type { Lang } from "../../i18n";

export type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

export const LanguageContext =
  createContext<LanguageContextType | null>(null);
