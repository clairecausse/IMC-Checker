export function calculateBmi(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return +(weightKg / (heightM * heightM)).toFixed(1);
}

export function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Insuffisance pondérale";
  if (bmi < 25) return "Corpulence normale";
  if (bmi < 30) return "Surpoids";
  if (bmi < 50) return "Obésité";
  return "Obésité Morbide";
}

// sources: https://www.calculator.net/bmi-calculator.html

