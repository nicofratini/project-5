import { calculateLeverageBase } from '../leverage/base';
import { calculateCycleResults } from '../cycle/core';
import type { InvestmentSettings } from '../../../components/SettingsDialog';
import type { LeverageSettings } from '../../types/leverage';

export const calculateInvestmentResults = (
  initialInvestment: number,
  selectedCycle: string,
  settings: InvestmentSettings,
  leverageSettings: LeverageSettings
) => {
  // Déterminer la base de calcul selon l'effet de levier
  const { baseAmount, creditLine, hasLeverage } = calculateLeverageBase({
    initialInvestment,
    leverageSettings
  });

  console.log('=== investment/core.ts: Calcul avec effet de levier ===', {
    initialInvestment,
    baseAmount,
    creditLine,
    hasLeverage
  });

  const cycles = [];
  let currentAmount = hasLeverage ? creditLine : initialInvestment;
  const numberOfCycles = parseInt(selectedCycle);

  for (let cycleNumber = 1; cycleNumber <= numberOfCycles; cycleNumber++) {
    const cycleResult = calculateCycleResults({
      cycleNumber,
      baseAmount: currentAmount,
      settings,
      leverageSettings,
      hasLeverage,
      initialInvestment,
      creditLine
    });

    cycles.push(cycleResult);
    currentAmount = cycleResult.finalAmount;
  }

  const totalReturn = currentAmount;
  const netGain = totalReturn - initialInvestment;
  const effectiveRate = (netGain / initialInvestment) * 100;
  const totalDuration = numberOfCycles * settings.cycleDuration;
  const annualizedRate = (Math.pow(1 + effectiveRate / 100, 12 / totalDuration) - 1) * 100;

  return {
    cycles,
    totalReturn: Math.round(totalReturn),
    netGain: Math.round(netGain),
    creditLine: Math.round(creditLine),
    effectiveRate,
    annualizedRate,
    totalDuration,
    hasLeverage,
    initialInvestment: Math.round(initialInvestment),
    baseAmount: Math.round(baseAmount)
  };
};