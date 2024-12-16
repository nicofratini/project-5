import { LeverageInput, CycleResults } from '../../types';
import { 
  calculateBaseLeveragedAmount, 
  calculateGrossReturn, 
  calculateCreditCost 
} from '../leverage/core';

interface LeveragedCycleInput extends LeverageInput {
  cycleIndex: number;
  remainingAmount?: number;
}

/**
 * Calcule les résultats d'un cycle avec effet de levier
 */
export const calculateLeveragedCycle = (input: LeveragedCycleInput): CycleResults => {
  const { 
    cycleIndex,
    interestRate,
    creditRate,
    initialAmount,
    remainingAmount = initialAmount
  } = input;

  // Utilise le montant du crédit comme base de calcul
  const creditAmount = calculateBaseLeveragedAmount({
    ...input,
    initialAmount: remainingAmount
  });

  // Calcule les rendements basés sur le montant du crédit
  const grossReturn = calculateGrossReturn(creditAmount, interestRate);
  const creditCost = calculateCreditCost(creditAmount, creditRate);
  const netReturn = grossReturn - creditCost;

  // Calcule le taux effectif sur le montant initial investi
  const effectiveRate = (netReturn / initialAmount) * 100;

  return {
    cycleIndex,
    creditAmount,
    grossReturn,
    creditCost,
    netReturn,
    effectiveRate,
    remainingAmount,
    // Données supplémentaires pour le suivi
    details: {
      baseAmount: creditAmount,
      leverageRatio: creditAmount / initialAmount,
      cumulativeReturn: (netReturn / initialAmount) * 100
    }
  };
};

/**
 * Calcule les résultats pour plusieurs cycles avec effet de levier
 */
export const calculateLeveragedCycles = (
  input: LeverageInput,
  numberOfCycles: number
): CycleResults[] => {
  let currentAmount = input.initialAmount;
  const cycles: CycleResults[] = [];

  for (let i = 0; i < numberOfCycles; i++) {
    const cycleResult = calculateLeveragedCycle({
      ...input,
      cycleIndex: i + 1,
      remainingAmount: currentAmount
    });

    cycles.push(cycleResult);
    // Met à jour le montant pour le prochain cycle
    currentAmount += cycleResult.netReturn;
  }

  return cycles;
};

/**
 * Calcule les résultats cumulés de tous les cycles
 */
export const calculateCumulativeLeveragedResults = (
  cycles: CycleResults[]
): {
  totalGrossReturn: number;
  totalCreditCost: number;
  totalNetReturn: number;
  averageEffectiveRate: number;
} => {
  const totals = cycles.reduce(
    (acc, cycle) => ({
      totalGrossReturn: acc.totalGrossReturn + cycle.grossReturn,
      totalCreditCost: acc.totalCreditCost + cycle.creditCost,
      totalNetReturn: acc.totalNetReturn + cycle.netReturn
    }),
    { totalGrossReturn: 0, totalCreditCost: 0, totalNetReturn: 0 }
  );

  return {
    ...totals,
    averageEffectiveRate:
      cycles.length > 0
        ? cycles.reduce((sum, cycle) => sum + cycle.effectiveRate, 0) / cycles.length
        : 0
  };
};