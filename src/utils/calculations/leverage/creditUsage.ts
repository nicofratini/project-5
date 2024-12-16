interface CalculateCreditUsageParams {
  fundCallAmount: number;
  remainingCredit: number;
}

export const calculateCreditUsage = ({
  fundCallAmount,
  remainingCredit
}: CalculateCreditUsageParams): {
  creditUsed: number;
  remainingCredit: number;
} => {
  const creditUsed = Math.min(fundCallAmount, remainingCredit);
  const newRemainingCredit = remainingCredit - creditUsed;

  console.log('=== leverage/creditUsage.ts: Calcul utilisation crédit ===', {
    fundCallAmount,
    creditUsed,
    remainingCredit: newRemainingCredit
  });

  return {
    creditUsed,
    remainingCredit: newRemainingCredit
  };
};