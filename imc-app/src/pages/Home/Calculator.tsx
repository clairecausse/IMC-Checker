import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BmiForm from "../../components/BmiForm";
import BmiResult from "../../components/BmiResult";
import { useHistoryContext } from "../../context/useHistoryContext";
import { useCooldown } from "../../context/hooks/useCooldown";
import { calculateBmi, getBmiCategory } from "../../utils/bmi";
import { getLastResult, saveLastResult } from "../../utils/storage";
import "./Calculator.css";

export default function Calculator() {
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const { addResult, removeResult, history } = useHistoryContext();
  const { available, remaining, saveNow } = useCooldown();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const last = getLastResult();
      if (last) {
        setBmi(last.bmi);
        setCategory(last.category);
      }
    } catch (e) {
      console.error("Erreur chargement dernier résultat:", e);
      setError("Impossible de charger le dernier résultat.");
    }
  }, []);


  function handleCalculate(weight: number, height: number) {
    if (!available) return;

    try {
      const value = calculateBmi(weight, height);
      if (!isFinite(value) || Number.isNaN(value)) throw new Error("IMC invalide");

      const cat = getBmiCategory(value);

      setBmi(value);
      setCategory(cat);
      setError(null);

      addResult({
        bmi: value,
        category: cat,
        date: new Date().toLocaleString(),
      });

      saveLastResult({ bmi: value, category: cat });

      saveNow();
      window.location.reload();
    } catch (e) {
      console.error("Erreur lors du calcul IMC:", e);
      setError("Erreur lors du calcul. Vérifiez les valeurs saisies et réessayez.");
    }
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
    setError(null);
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

      {error && (
        <div role="alert" style={{ color: "#c0392b", marginBottom: "12px" }}>
          {error}
        </div>
      )}

      <div className="form-area">
        <BmiForm onCalculate={handleCalculate} disabled={!available} />
      </div>

      {!available && (
        <div className="calculator-actions">
          <BmiResult bmi={bmi} category={category} />
          <div className="buttons">
            <button onClick={handleGoHistory}>Voir l'historique</button>
            <button onClick={handleDeleteLast}>Modifier</button>
          </div>
        </div>
      )}
    </div>
  );
}
