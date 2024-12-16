export const calculateLeverageRates = (
  totalReturn: number,
  initialInvestment: number,
  totalInterest: number,
  duration: number
) => {
  const netReturn = totalReturn - totalInterest;
  const effectiveRate = (netReturn / initialInvestment) * 100;
  const annualizedRate = (Math.pow(1 + effectiveRate / 100, 12 / duration) - 1) * 100;

  return {
    netReturn: Math.round(netReturn),
    effectiveRate: Math.max(0, effectiveRate),
    annualizedRate: Math.max(0, annualizedRate)
  };
};