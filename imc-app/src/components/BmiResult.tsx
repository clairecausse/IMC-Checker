import { useLang } from "../context/language";
import "./BmiResult.css";

type Props = {
  bmi: number | null;
  category: string | null;
};

export default function BmiResult({ bmi, category }: Props) {
  const { t } = useLang();

  if (bmi === null || category === null) return null;

  return (
    <div>
      <h2>{t("calculator.result.title")}</h2>

      <p>
        {t("calculator.result.imc")} : <strong>{bmi}</strong>
      </p>

      <p>
        {t("calculator.result.category")} :{" "}
        <em>{t(`bmiCategory.${category}.label`)}</em>
      </p>

      <p style={{ marginTop: "1rem" }}>
        {t(`bmiCategory.${category}.description`)}
      </p>
    </div>
  );
}
