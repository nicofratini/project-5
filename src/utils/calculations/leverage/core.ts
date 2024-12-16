import { LeverageSettings } from '../../types/leverage';

interface CalculateLeverageBaseParams {
  initialInvestment: number;
  leverageSettings: LeverageSettings;
}

interface LeverageBaseResult {
  baseAmount: number;
  creditLine: number;
  hasLeverage: boolean;
  totalAvailable: number;
}

/**
 * Calcule les montants de base pour l'effet de levier
 */
export const calculateLeverageBase = ({
  initialInvestment,
  leverageSettings
}: CalculateLeverageBaseParams): LeverageBaseResult => {
  if (!leverageSettings.enabled) {
    return {
      baseAmount: initialInvestment,
      creditLine: 0,
      hasLeverage: false,
      totalAvailable: initialInvestment
    };
  }

  // Calcul du montant de crédit disponible
  const creditLine = Math.round((initialInvestment * leverageSettings.ratio) / 100);
  
  // Le montant de base devient le montant initial + crédit
  // Car nous calculons les rendements sur le montant total
  const baseAmount = initialInvestment;
  const totalAvailable = initialInvestment + creditLine;

  console.log('=== leverage/core.ts: Calcul base effet de levier ===', {
    initialInvestment,
    creditLine,
    baseAmount,
    totalAvailable,
    ratio: leverageSettings.ratio
  });

  return {
    baseAmount,
    creditLine,
    hasLeverage: true,
    totalAvailable
  };
};

/**
 * Calcule le coût du crédit
 */
export const calculateCreditCost = (creditLine: number, interestRate: number): number => {
  return Math.round((creditLine * interestRate) / 100);
};

/**
 * Calcule le rendement brut sur le montant disponible total
 */
export const calculateGrossReturn = (totalAvailable: number, returnRate: number): number => {
  return Math.round((totalAvailable * returnRate) / 100);
};