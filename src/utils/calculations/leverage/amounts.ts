import { LeverageSettings } from '../../types/leverage';

interface CalculateLeverageAmountsParams {
  initialInvestment: number;
  leverageSettings: LeverageSettings;
}

export const calculateLeverageAmounts = ({
  initialInvestment,
  leverageSettings
}: CalculateLeverageAmountsParams) => {
  if (!leverageSettings.enabled) {
    return {
      baseAmount: initialInvestment,
      creditLine: 0,
      hasLeverage: false
    };
  }

  const creditLine = Math.round((initialInvestment * leverageSettings.ratio) / 100);

  console.log('=== leverage/amounts.ts: Calcul des montants ===', {
    initialInvestment,
    creditLine,
    ratio: leverageSettings.ratio
  });

  return {
    baseAmount: creditLine, // Le montant de base devient le crédit disponible
    creditLine,
    hasLeverage: true
  };
};