/**
 * Formate un nombre en pourcentage
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};

/**
 * Analyse une chaîne de caractères représentant un pourcentage et retourne un nombre
 */
export const parsePercentage = (value: string): number => {
  // Supprime tous les caractères non numériques sauf le point et la virgule
  const cleanValue = value.replace(/[^0-9.,]/g, '');
  // Remplace la virgule par un point pour la conversion
  const numberValue = cleanValue.replace(',', '.');
  return Number(numberValue) || 0;
};