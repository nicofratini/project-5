/**
 * Formate un nombre en montant monétaire (EUR)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Analyse une chaîne de caractères représentant un montant en EUR et retourne un nombre
 */
export const parseCurrency = (value: string): number => {
  // Supprime tous les caractères non numériques sauf le point et la virgule
  const cleanValue = value.replace(/[^0-9.,]/g, '');
  // Remplace la virgule par un point pour la conversion
  const numberValue = cleanValue.replace(',', '.');
  return Number(numberValue) || 0;
};