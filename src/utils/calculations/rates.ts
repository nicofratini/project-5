export const calculateRates = (
  totalReturn: number,
  initialInvestment: number,
  totalDuration: number,
  hasLeverage: boolean,
  creditAmount: number
) => {
  console.log('=== rates.ts: Calcul des taux ===', {
    totalReturn,
    initialInvestment,
    totalDuration,
    hasLeverage,
    creditAmount
  });

  // Pour le gain net, on soustrait l'investissement initial et le crédit utilisé
  const netGain = hasLeverage 
    ? totalReturn - initialInvestment - creditAmount
    : totalReturn - initialInvestment;
  
  // Le taux est calculé par rapport à l'investissement initial
  const totalRate = (netGain / initialInvestment) * 100;
  
  // Taux annualisé
  const annualizedRate = (Math.pow(1 + totalRate / 100, 12 / totalDuration) - 1) * 100;

  console.log('=== rates.ts: Résultats ===', {
    netGain,
    totalRate,
    annualizedRate
  });

  return {
    netGain: Math.round(netGain),
    totalRate: Math.max(0, totalRate),
    annualizedRate: Math.max(0, annualizedRate)
  };
};