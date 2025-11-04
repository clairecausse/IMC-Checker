import { useState } from "react";
import BmiForm from "./components/BmiForm";
import BmiResult from "./components/BmiResult";
import { calculateBmi, getBmiCategory } from "./utils/bmi";

export default function App() {
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  function handleCalculate(weight: number, height: number) {
    const value = calculateBmi(weight, height);
    setBmi(value);
    setCategory(getBmiCategory(value));
  }

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Calculateur d’IMC</h1>
      <BmiForm onCalculate={handleCalculate} />
      <BmiResult bmi={bmi} category={category} />
    </div>
  );
}
