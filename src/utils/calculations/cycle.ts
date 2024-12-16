import { CycleResult, InterestPeriod } from '../types/investment';
import { calculateCycleInterest } from './interest';
import { InvestmentSettings } from '../../components/SettingsDialog';

export const calculateCycleResults = (
  cycleNumber: number,
  baseAmount: number,
  cycleCredit: number,
  settings: InvestmentSettings,
  interestPeriods: InterestPeriod[]
): CycleResult => {
  console.log(`=== cycle.ts: Début du calcul pour le cycle ${cycleNumber} ===`, {
    cycleNumber,
    baseAmount,
    cycleCredit,
  });

  // Calculer les intérêts sur les fonds non utilisés
  const cycleInterest = calculateCycleInterest(interestPeriods);

  // Calculer le rendement du cycle
  const effectiveCycleReturn = baseAmount * (settings.globalReturnRate / 100);

  // Calculer le montant final du cycle
  const cycleFinalAmount = baseAmount + effectiveCycleReturn + cycleInterest;

  console.log(`=== cycle.ts: Résultats pour le cycle ${cycleNumber} ===`, {
    initialAmount: baseAmount,
    finalAmount: cycleFinalAmount,
    netGain: cycleFinalAmount - baseAmount,
    unusedFundsInterest: cycleInterest,
  });

  return {
    cycleNumber,
    initialAmount: Math.round(baseAmount),
    finalAmount: Math.round(cycleFinalAmount),
    netGain: Math.round(cycleFinalAmount - baseAmount),
    unusedFundsInterest: Math.round(cycleInterest),
    creditUsed: Math.round(cycleCredit),
  };
};
