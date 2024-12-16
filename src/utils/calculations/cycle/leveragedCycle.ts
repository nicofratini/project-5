import { calculateLeverageReturns } from '../leverage/returns';
import { LeverageSettings } from '../../types/leverage';

interface CalculateLeveragedCycleParams {
  cycleNumber: number;
  baseAmount: number;
  creditAmount: number;
  leverageSettings: LeverageSettings;
  cycleDuration: number;
}

export const calculateLeveragedCycle = ({
  cycleNumber,
  baseAmount,
  creditAmount,
  leverageSettings,
  cycleDuration
}: CalculateLeveragedCycleParams) => {
  const { grossReturn, creditCost, netReturn } = calculateLeverageReturns({
    baseAmount,
    creditAmount,
    investmentReturnRate: leverageSettings.investmentReturnRate,
    creditInterestRate: leverageSettings.interestRate,
    duration: cycleDuration
  });

  const finalAmount = baseAmount + netReturn;

  console.log(`=== cycle/leveragedCycle.ts: Cycle ${cycleNumber} ===`, {
    baseAmount,
    creditAmount,
    grossReturn,
    creditCost,
    netReturn,
    finalAmount
  });

  return {
    cycleNumber,
    initialAmount: baseAmount,
    creditUsed: creditAmount,
    grossReturn,
    creditCost,
    netReturn,
    finalAmount
  };
};