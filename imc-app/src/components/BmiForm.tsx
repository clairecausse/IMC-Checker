import { useState } from "react";
import { useLang } from "../context/language";
import "./Form.css";

type Props = {
  onCalculate: (weightKg: number, heightCm: number) => void;
  disabled?: boolean;
};

export default function BmiForm({ onCalculate }: Props) {
  const { t } = useLang();

  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(165);

  // Conversion fonctions
  const lbsToKg = (lbs: number) => lbs * 0.453592;
  const inchToCm = (inch: number) => inch * 2.54;

  const handleWeightChange = (value: number) => {
    if (value >= 0 && value <= (unit === "metric" ? 600 : 1320)) {
      setWeight(value);
    }
  };

  const handleHeightChange = (value: number) => {
    if (value >= 0 && value <= (unit === "metric" ? 250 : 98)) {
      setHeight(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const weightKg = unit === "metric" ? weight : lbsToKg(weight);
    const heightCm = unit === "metric" ? height : inchToCm(height);

    onCalculate(weightKg, heightCm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {t("calculator.unit")}
        <select
          value={unit}
          onChange={(e) =>
            setUnit(e.target.value as "metric" | "imperial")
          }
        >
          <option value="metric">{t("calculator.units.metric")}</option>
          <option value="imperial">{t("calculator.units.imperial")}</option>
        </select>
      </label>

      <label>
        {t("calculator.weight")} ({unit === "metric" ? t("calculator.unitKg") : t("calculator.unitLbs")})
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
        {t("calculator.height")} ({unit === "metric" ? t("calculator.unitCm") : t("calculator.unitInch")})
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

      <button type="submit">
        {t("calculator.calculate")}
      </button>
    </form>
  );
}
