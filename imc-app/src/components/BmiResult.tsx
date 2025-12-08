import "./BmiResult.css";

type Props = {
  bmi: number | null;
  category: string | null;
};

export default function BmiResult({ bmi, category }: Props) {
  if (bmi === null || category === null) return null;

  let description = "";

  if (category === "Insuffisance pondérale") {
    description =
      "L’insuffisance pondérale correspond à un poids inférieur à la norme par rapport à la taille. Cela signifie que l’indice de masse corporelle est en dessous de 18,5.";
  } 
  else if (category === "Corpulence normale") {
    description =
      "La corpulence normale correspond à un poids considéré comme adéquat par rapport à la taille. L’IMC se situe entre 18,5 et 25.";
  } 
  else if (category === "Surpoids") {
    description =
      "Le surpoids indique un IMC supérieur à la normale, situé entre 25 et 30. Cela signifie que le poids dépasse la fourchette recommandée pour la taille.";
  } 
  else if (category === "Obésité") {
    description =
      "L’obésité correspond à un IMC compris entre 30 et 50. Elle indique une accumulation de masse grasse plus importante que la normale.";
  } 
  else if (category === "Obésité Morbide") {
    description =
      "L’obésité morbide correspond à un IMC supérieur à 50. Elle représente un niveau très élevé d'accumulation de masse grasse.";
  }

  return (
    <div>
      <h2>Résultat</h2>

      <p>
        IMC : <strong>{bmi}</strong>
      </p>

      <p>
        Catégorie : <em>{category}</em>
      </p>

      <p style={{ marginTop: "1rem" }}>
        {description}
      </p>
    </div>
  );
}
