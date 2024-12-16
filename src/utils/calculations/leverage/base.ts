import type { LeverageSettings } from '../../types/leverage';

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

  // Calcul du crédit disponible basé sur le ratio LTV
  const creditLine = Math.round((initialInvestment * leverageSettings.ratio) / 100);
  
  console.log('=== leverage/base.ts: Calcul base effet de levier ===', {
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