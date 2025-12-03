import { useEffect, useState } from "react";

const STORAGE_KEY = "last-bmi-calc";

// CONFIG : ici on met 1 minute pour tester
// En production tu mettras : 60 * 6 (= 6h)
// ou même 60 * 24 (= 1 calcul par jour)
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
