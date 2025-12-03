import { useContext } from "react";
import { HistoryContext } from "./HistoryContext";

export function useHistoryContext() {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistoryContext must be inside HistoryProvider");
  return ctx;
}
