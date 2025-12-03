import "./BmiResult.css";

type Props = {
  bmi: number | null;
  category: string | null;
};

export default function BmiResult({ bmi, category }: Props) {
  if (bmi === null) return null;

  return (
    <div>
      <h2>Résultat</h2>
      <p>IMC : <strong>{bmi}</strong></p>
      <p>Catégorie : <em>{category}</em></p>
    </div>
  );
}
