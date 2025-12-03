import { useEffect, useState } from "react";
import BmiForm from "../../components/BmiForm";
import BmiResult from "../../components/BmiResult";
import { useHistoryContext } from "../../context/useHistoryContext";
import { useCooldown } from "../../hooks/useCooldown";
import { calculateBmi, getBmiCategory } from "../../utils/bmi";
import { getLastResult, saveLastResult } from "../../utils/storage";
import "./Calculator.css";

export default function Calculator() {
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const { addResult } = useHistoryContext();
  const { available, remaining, saveNow } = useCooldown();

  useEffect(() => {
    const last = getLastResult();
    if (last) {
      setBmi(last.bmi);
      setCategory(last.category);
    }
  }, []);

  function handleCalculate(weight: number, height: number) {
    if (!available) return;

    const value = calculateBmi(weight, height);
    const cat = getBmiCategory(value);

    setBmi(value);
    setCategory(cat);

    addResult({
      bmi: value,
      category: cat,
      date: new Date().toLocaleString(),
    });

    saveLastResult({ bmi: value, category: cat });

    saveNow();
    window.location.reload();
  }


  return (
    <div className={`calculator ${!available ? "disabled" : ""}`}>
      <h2>Calculateur d’IMC</h2>

      {!available && (
        <p className="cooldown-text">
          Vous avez déjà calculé votre IMC pour ajourd'hui, revenez demain ! {remaining} minute(s)
        </p>
      )}

      <BmiForm onCalculate={handleCalculate} disabled={!available} />

      <BmiResult bmi={bmi} category={category} />
    </div>
  );
}
