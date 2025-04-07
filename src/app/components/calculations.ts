export function calculateDementiaRisk(
  age: number,
  cognitiveScore: number,
  familyHistory: boolean
): number {
  // Base risk based on age
  let baseRisk = 0;
  if (age >= 65 && age < 75) {
    baseRisk = 5;
  } else if (age >= 75 && age < 85) {
    baseRisk = 15;
  } else if (age >= 85) {
    baseRisk = 30;
  }

  // Adjust risk based on cognitive score (assuming lower score means higher risk)
  const cognitiveAdjustment = Math.max(0, (30 - cognitiveScore) * 2);
  
  // Adjust risk based on family history
  const familyAdjustment = familyHistory ? 10 : 0;

  // Calculate total risk (capped at 100%)
  const totalRisk = Math.min(100, baseRisk + cognitiveAdjustment + familyAdjustment);

  return totalRisk;
} 