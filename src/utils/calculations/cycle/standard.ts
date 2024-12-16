import { LeverageInput, CycleResults } from '../../types';

interface StandardCycleInput extends LeverageInput {
  cycleIndex: number;
  remainingAmount?: number;
}

export const calculateStandardCycle = (input: StandardCycleInput): CycleResults => {
  const { 
    cycleIndex, 
    interestRate, 
    initialAmount,
    remainingAmount = initialAmount 
  } = input;

  const grossReturn = remainingAmount * (interestRate / 100);
  const netReturn = grossReturn; // Pas de coût de crédit en standard

  return {
    cycleIndex,
    creditAmount: 0,
    grossReturn,
    creditCost: 0,
    netReturn,
    effectiveRate: (netReturn / initialAmount) * 100,
    remainingAmount,
    details: {
      baseAmount: remainingAmount,
      leverageRatio: 1,
      cumulativeReturn: (netReturn / initialAmount) * 100
    }
  };
};

export const calculateStandardCycles = (
  input: LeverageInput,
  numberOfCycles: number
): CycleResults[] => {
  let currentAmount = input.initialAmount;
  const cycles: CycleResults[] = [];

  for (let i = 0; i < numberOfCycles; i++) {
    const cycleResult = calculateStandardCycle({
      ...input,
      cycleIndex: i + 1,
      remainingAmount: currentAmount
    });

    cycles.push(cycleResult);
    currentAmount += cycleResult.netReturn;
  }

  return cycles;
};

export const calculateCumulativeStandardResults = (
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
      totalCreditCost: 0,
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