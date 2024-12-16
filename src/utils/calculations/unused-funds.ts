export const calculateUnusedFunds = (
  remainingAmount: number,
  creditUsed: number,
  totalAmount: number
): number => {
  // Les fonds non utilisés sont le montant initial moins les appels de fonds cumulés
  const unusedFunds = Math.max(0, remainingAmount);
  
  console.log('=== unused-funds.ts: Calcul des fonds non utilisés ===', {
    remainingAmount,
    creditUsed,
    totalAmount,
    unusedFunds
  });

  return unusedFunds;
};