import { calculateLeverageBase } from '../leverage/base';
import { calculateLeveragedCycle } from '../cycle/leveraged';
import type { InvestmentSettings } from '../../../components/SettingsDialog';
import type { LeverageSettings } from '../../types/leverage';

export const calculateLeveragedInvestment = (
  initialInvestment: number,
  selectedCycle: string,
  settings: InvestmentSettings,
  leverageSettings: LeverageSettings
) => {
  console.log('=== investment/leveraged.ts: Début calcul investissement ===', {
    initialInvestment,
    selectedCycle,
    leverageSettings
  });

  // Calcul des montants de base avec effet de levier
  const { baseAmount, creditLine, hasLeverage, initialInvestment: deposit } = calculateLeverageBase({
    initialInvestment,
    leverageSettings
  });

  if (!hasLeverage) {
    return null;
  }

  const cycles = [];
  let currentAmount = baseAmount; // On commence avec le montant du crédit
  const numberOfCycles = parseInt(selectedCycle);

  // Calcul de chaque cycle
  for (let i = 1; i <= numberOfCycles; i++) {
    const cycleResult = calculateLeveragedCycle({
      cycleNumber: i,
      creditAmount: currentAmount,
      leverageSettings,
      cycleDuration: settings.cycleDuration,
      initialInvestment: deposit // On passe le dépôt initial pour les calculs de rendement
    });

    cycles.push(cycleResult);
    currentAmount = cycleResult.finalAmount;
  }

  // Calcul des métriques finales
  const totalReturn = currentAmount;
  const netGain = totalReturn - deposit; // Le gain net est calculé par rapport au dépôt initial
  const effectiveRate = (netGain / deposit) * 100;
  const annualizedRate = (Math.pow(1 + effectiveRate / 100, 12 / (settings.cycleDuration * numberOfCycles)) - 1) * 100;

  return {
    cycles,
    totalReturn,
    netGain,
    creditLine,
    effectiveRate,
    annualizedRate,
    initialInvestment: deposit
  };
};