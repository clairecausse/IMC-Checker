import { useState } from "react";
import BmiForm from "../../components/BmiForm";
import BmiResult from "../../components/BmiResult";
import { calculateBmi, getBmiCategory } from "../../utils/bmi";
import { useHistoryContext } from "../../context/useHistoryContext";

export default function Calculator() {
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const { addResult } = useHistoryContext();

  function handleCalculate(weight: number, height: number) {
    const value = calculateBmi(weight, height);
    const cat = getBmiCategory(value);

    setBmi(value);
    setCategory(cat);

    addResult({
      bmi: value,
      category: cat,
      date: new Date().toLocaleString(),
    });
  }

  return (
    <div>
      <h2>Calculateur d’IMC</h2>
      <BmiForm onCalculate={handleCalculate} />
      <BmiResult bmi={bmi} category={category} />
    </div>
  );
}
