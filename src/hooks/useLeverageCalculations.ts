import { useCallback, useMemo } from 'react';
import { LeverageInput, LeverageResults, CycleResults } from '../utils/types';
import { calculateLeveragedResults } from '../utils/calculations/leverage/core';
import { 
  calculateLeveragedCycles,
  calculateCumulativeLeveragedResults 
} from '../utils/calculations/cycle/leveraged';
import { 
  calculateStandardCycles,
  calculateCumulativeStandardResults 
} from '../utils/calculations/cycle/standard';

interface UseLeverageCalculationsReturn {
  results: LeverageResults;
  calculateCycles: (numberOfCycles: number) => CycleResults[];
  calculateCumulativeResults: (cycles: CycleResults[]) => {
    totalGrossReturn: number;
    totalCreditCost: number;
    totalNetReturn: number;
    averageEffectiveRate: number;
  };
}

export const useLeverageCalculations = (input: LeverageInput): UseLeverageCalculationsReturn => {
  // Calcul des résultats de base
  const results = useMemo(() => {
    if (input.isLeveraged) {
      return calculateLeveragedResults(input);
    }
    // Calculs standards si pas d'effet de levier
    return {
      initialAmount: input.initialAmount,
      creditAmount: 0,
      totalAvailable: input.initialAmount,
      grossReturn: input.initialAmount * (input.interestRate / 100),
      creditCost: 0,
      netReturn: input.initialAmount * (input.interestRate / 100),
      returnRate: input.interestRate
    };
  }, [input]);

  // Calcul des cycles d'investissement
  const calculateCycles = useCallback((numberOfCycles: number): CycleResults[] => {
    if (input.isLeveraged) {
      return calculateLeveragedCycles(input, numberOfCycles);
    }
    return calculateStandardCycles(input, numberOfCycles);
  }, [input]);

  // Calcul des résultats cumulés
  const calculateCumulativeResults = useCallback((cycles: CycleResults[]) => {
    if (input.isLeveraged) {
      return calculateCumulativeLeveragedResults(cycles);
    }
    return calculateCumulativeStandardResults(cycles);
  }, [input.isLeveraged]);

  return {
    results,
    calculateCycles,
    calculateCumulativeResults
  };
};