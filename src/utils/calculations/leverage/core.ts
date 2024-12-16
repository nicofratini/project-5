import { LeverageSettings } from '../../types/leverage';

interface CalculateLeverageBaseParams {
  initialInvestment: number;
  leverageSettings: LeverageSettings;
}

export const calculateLeverageBase = ({
  initialInvestment,
  leverageSettings
}: CalculateLeverageBaseParams) => {
  if (!leverageSettings.enabled) {
    return {
      baseAmount: initialInvestment,
      creditLine: 0,
      hasLeverage: false
    };
  }

  const creditLine = Math.round((initialInvestment * leverageSettings.ratio) / 100);
  const baseAmount = creditLine; // Le montant de base devient le crédit débloqué

  console.log('=== leverage/core.ts: Calcul base effet de levier ===', {
    initialInvestment,
    creditLine,
    baseAmount,
    ratio: leverageSettings.ratio
  });

  return {
    baseAmount,
    creditLine,
    hasLeverage: true
  };
};