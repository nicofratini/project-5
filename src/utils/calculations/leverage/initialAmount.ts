import { LeverageSettings } from '../../types/leverage';

interface CalculateInitialAmountParams {
  baseAmount: number;
  leverageSettings: LeverageSettings;
}

export const calculateInitialAmount = ({
  baseAmount,
  leverageSettings,
}: CalculateInitialAmountParams): {
  initialAmount: number;
  creditLine: number;
} => {
  if (!leverageSettings.enabled) {
    return {
      initialAmount: baseAmount,
      creditLine: 0
    };
  }

  const creditLine = Math.round((baseAmount * leverageSettings.ratio) / 100);
  
  console.log('=== leverage/initialAmount.ts: Calcul du montant initial ===', {
    baseAmount,
    ratio: leverageSettings.ratio,
    creditLine,
    enabled: leverageSettings.enabled
  });

  return {
    initialAmount: baseAmount, // Le montant initial reste le dépôt de base
    creditLine // La ligne de crédit est disponible pour les appels de fonds
  };
};