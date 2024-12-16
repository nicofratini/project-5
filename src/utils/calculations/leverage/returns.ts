interface CalculateLeverageReturnsParams {
  creditAmount: number;
  investmentReturnRate: number;
  creditInterestRate: number;
  duration: number;
  initialInvestment: number;
}

export const calculateLeverageReturns = ({
  creditAmount,
  investmentReturnRate,
  creditInterestRate,
  duration,
  initialInvestment
}: CalculateLeverageReturnsParams) => {
  // Rendement brut sur le montant du crédit
  const periodGrossReturn = creditAmount * (investmentReturnRate / 100) * (duration / 12);
  
  // Coût du crédit sur la période
  const periodCreditCost = creditAmount * (creditInterestRate / 100) * (duration / 12);
  
  // Rendement net après déduction du coût du crédit
  const netReturn = periodGrossReturn - periodCreditCost;

  // Taux de rendement effectif par rapport à l'investissement initial
  const effectiveRate = (netReturn / initialInvestment) * 100;

  console.log('=== leverage/returns.ts: Calcul des rendements ===', {
    periodGrossReturn,
    periodCreditCost,
    netReturn,
    effectiveRate,
    initialInvestment
  });

  return {
    grossReturn: periodGrossReturn,
    creditCost: periodCreditCost,
    netReturn,
    effectiveRate
  };
};