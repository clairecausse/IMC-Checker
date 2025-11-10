import { useState } from "react";
import BmiForm from "../../components/BmiForm";
import BmiResult from "../../components/BmiResult";
import { calculateBmi, getBmiCategory } from "../../utils/bmi";

const Calculator = () => {
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  function handleCalculate(weight: number, height: number) {
    const value = calculateBmi(weight, height);
    setBmi(value);
    setCategory(getBmiCategory(value));
  }

  return (
    <div>
      <h2>Calculateur d’IMC</h2>
      <BmiForm onCalculate={handleCalculate} />
      <BmiResult bmi={bmi} category={category} />
    </div>
  );
};

export default Calculator;
