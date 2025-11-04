import { useState } from "react";

type Props = {
  onCalculate: (weight: number, height: number) => void;
};

export default function BmiForm({ onCalculate }: Props) {
  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(165);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onCalculate(weight, height);
      }}
      style={{ display: "grid", gap: 12, maxWidth: 300, margin: "0 auto" }}
    >
      <label>
        Poids (kg)
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(+e.target.value)}
          required
        />
      </label>
      <label>
        Taille (cm)
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(+e.target.value)}
          required
        />
      </label>
      <button type="submit">Calculer</button>
    </form>
  );
}
