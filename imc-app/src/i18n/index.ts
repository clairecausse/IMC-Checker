import fr from "./fr";
import en from "./en";

export const translations = { fr, en };
export type Lang = "fr" | "en";

type TranslationObject = Record<string, unknown>;

export function t(lang: Lang, path: string): string {
  const result = path
    .split(".")
    .reduce<unknown>((obj, key) => {
      if (typeof obj === "object" && obj !== null && key in obj) {
        return (obj as TranslationObject)[key];
      }
      return undefined;
    }, translations[lang]);

  return typeof result === "string" ? result : path;
}
