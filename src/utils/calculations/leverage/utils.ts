export const calculateLeverageAmount = (
  initialInvestment: number,
  leverageMetrics?: {
    loanAmount: number;
    leverageRatio: number;
  }
): {
  hasLeverage: boolean;
  availableCredit: number;
  firstCycleAmount: number;
} => {
  const hasLeverage = Boolean(leverageMetrics?.loanAmount && leverageMetrics.leverageRatio);
  const availableCredit = hasLeverage 
    ? (initialInvestment * leverageMetrics.leverageRatio / 100)
    : 0;

  // Pour le premier cycle, on utilise le montant du crédit si levier activé
  const firstCycleAmount = hasLeverage ? availableCredit : initialInvestment;

  console.log('=== leverage/utils.ts: Calcul des montants avec levier ===', {
    initialInvestment,
    hasLeverage,
    availableCredit,
    firstCycleAmount,
    ratio: leverageMetrics?.leverageRatio
  });

  return {
    hasLeverage,
    availableCredit,
    firstCycleAmount
  };
};