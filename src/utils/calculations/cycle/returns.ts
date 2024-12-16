interface CalculateCycleReturnsParams {
  baseAmount: number;
  globalReturnRate: number;
  unusedFundsInterest: number;
  totalCreditUsed: number;
  creditInterestRate: number;
  duration: number;
}

export const calculateCycleReturns = ({
  baseAmount,
  globalReturnRate,
  unusedFundsInterest,
  totalCreditUsed,
  creditInterestRate,
  duration
}: CalculateCycleReturnsParams) => {
  // Rendement sur l'investissement initial
  const investmentReturn = baseAmount * (globalReturnRate / 100);
  
  // Coût du crédit sur la période
  const creditCost = totalCreditUsed * (creditInterestRate / 100) * (duration / 12);
  
  // Rendement final incluant les intérêts sur fonds non utilisés
  const finalAmount = baseAmount + investmentReturn + unusedFundsInterest - creditCost;
  
  console.log('=== cycle/returns.ts: Calcul des rendements ===', {
    investmentReturn,
    creditCost,
    unusedFundsInterest,
    finalAmount
  });

  return {
    investmentReturn,
    creditCost,
    finalAmount,
    netGain: finalAmount - baseAmount
  };
};