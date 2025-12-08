import { useEffect, useState } from "react";

const STORAGE_KEY = "last-bmi-calc";

const COOLDOWN_MINUTES = 1;

export function useCooldown() {
  const [available, setAvailable] = useState(true);
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const last = new Date(raw);
    const now = new Date();

    const diffMs = now.getTime() - last.getTime();
    const diffMin = diffMs / 1000 / 60;

    if (diffMin < COOLDOWN_MINUTES) {
      setAvailable(false);
      setRemaining(Math.ceil(COOLDOWN_MINUTES - diffMin));
    }
  }, []);

  function saveNow() {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  }

  return { available, remaining, saveNow };
}
