import { useState } from "react";

type Props = {
  onCalculate: (weightKg: number, heightCm: number) => void;
};

export default function BmiForm({ onCalculate }: Props) {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric"); // 'metric' = kg/cm, 'imperial' = lbs/inch
  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(165);

  // Conversion fonctions
  const lbsToKg = (lbs: number) => lbs * 0.453592;
  const inchToCm = (inch: number) => inch * 2.54;

  const handleWeightChange = (value: number) => {
    if (value >= 0 && value <= (unit === "metric" ? 600 : 1320)) { // 600 kg ou ~1320 lbs
      setWeight(value);
    }
  };

  const handleHeightChange = (value: number) => {
    if (value >= 0 && value <= (unit === "metric" ? 250 : 98)) { // 250 cm ou ~98 inch
      setHeight(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convertir toujours en kg/cm avant calcul
    const weightKg = unit === "metric" ? weight : lbsToKg(weight);
    const heightCm = unit === "metric" ? height : inchToCm(height);

    onCalculate(weightKg, heightCm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Unité
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as "metric" | "imperial")}
        >
          <option value="metric">kg / cm</option>
          <option value="imperial">lbs / inch</option>
        </select>
      </label>

      <label>
        Poids ({unit === "metric" ? "kg" : "lbs"})
        <input
          type="number"
          value={weight}
          onChange={(e) => handleWeightChange(+e.target.value)}
          required
          min={0}
          max={unit === "metric" ? 600 : 1320}
          step={0.1}
        />
      </label>

      <label>
        Taille ({unit === "metric" ? "cm" : "inch"})
        <input
          type="number"
          value={height}
          onChange={(e) => handleHeightChange(+e.target.value)}
          required
          min={0}
          max={unit === "metric" ? 250 : 98}
          step={0.1}
        />
      </label>

      <button type="submit">Calculer</button>
    </form>
  );
}
