import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const { addResult, removeResult, history } = useHistoryContext();
  const { available, remaining, saveNow } = useCooldown();
  const navigate = useNavigate();

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

  function handleGoHistory() {
    navigate("/historique");
  }

  function handleDeleteLast() {
    if (!history || history.length === 0) return;
    const idx = history.length - 1;
    removeResult(idx);
    localStorage.removeItem("last-bmi-calc");
    localStorage.removeItem("last-bmi-result");
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

      <div className="form-area">
        <BmiForm onCalculate={handleCalculate} disabled={!available} />
      </div>

      {!available && (
        <div className="calculator-actions">
          <BmiResult bmi={bmi} category={category} />
          <div className="buttons">
            <button onClick={handleGoHistory}>Voir l'historique</button>
            <button onClick={handleDeleteLast}>Supprimer dernier calcul</button>
          </div>
        </div>
      )}
    </div>
  );
}
