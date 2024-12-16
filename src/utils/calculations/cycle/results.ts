import { CycleResult } from '../../types/investment';
import { calculateCycleInterest } from '../interest';
import { InterestPeriod } from '../../types/investment';
import { InvestmentSettings } from '../../../components/SettingsDialog';

interface CycleResultsParams {
  cycleNumber: number;
  baseAmount: number;
  cycleCredit: number;
  settings: InvestmentSettings;
  interestPeriods: InterestPeriod[];
}

export const calculateCycleResults = ({
  cycleNumber,
  baseAmount,
  cycleCredit,
  settings,
  interestPeriods
}: CycleResultsParams): CycleResult => {
  console.log(`=== results.ts: Calcul des résultats du cycle ${cycleNumber} ===`, {
    cycleNumber,
    baseAmount,
    cycleCredit
  });

  // Calculer les intérêts sur les fonds non utilisés
  const cycleInterest = calculateCycleInterest(interestPeriods);

  // Calculer le rendement du cycle
  const effectiveCycleReturn = baseAmount * (settings.globalReturnRate / 100);

  // Calculer le montant final du cycle
  const cycleFinalAmount = baseAmount + effectiveCycleReturn + cycleInterest;

  const result = {
    cycleNumber,
    initialAmount: Math.round(baseAmount),
    finalAmount: Math.round(cycleFinalAmount),
    netGain: Math.round(cycleFinalAmount - baseAmount),
    unusedFundsInterest: Math.round(cycleInterest),
    creditUsed: Math.round(cycleCredit)
  };

  console.log(`=== results.ts: Résultats du cycle ${cycleNumber} ===`, result);

  return result;
};