import { calculateCreditUsage } from '../leverage/creditUsage';

interface CalculateFundCallParams {
  baseAmount: number;
  percentage: number;
  remainingCredit: number;
}

export const calculateFundCall = ({
  baseAmount,
  percentage,
  remainingCredit
}: CalculateFundCallParams) => {
  const fundCallAmount = (baseAmount * percentage) / 100;
  
  const { creditUsed, remainingCredit: newRemainingCredit } = calculateCreditUsage({
    fundCallAmount,
    remainingCredit
  });

  const amountFromDeposit = fundCallAmount - creditUsed;

  console.log('=== cycle/fundCall.ts: Calcul appel de fonds ===', {
    fundCallAmount,
    creditUsed,
    amountFromDeposit,
    remainingCredit: newRemainingCredit
  });

  return {
    fundCallAmount,
    creditUsed,
    amountFromDeposit,
    remainingCredit: newRemainingCredit
  };
};