export const validateInvestmentAmount = (amount: string): string | null => {
  const numericAmount = parseFloat(amount.replace(/[^\d.-]/g, ''));

  if (isNaN(numericAmount)) {
    return 'Le montant doit être un nombre valide';
  }

  if (numericAmount <= 0) {
    return 'Le montant doit être supérieur à 0';
  }

  if (numericAmount > 1000000000) {
    return 'Le montant ne peut pas dépasser 1 milliard';
  }

  return null;
};