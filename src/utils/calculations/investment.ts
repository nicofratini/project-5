import { calculateInitialAmount } from './leverage/initialAmount';
import { calculateFundCall } from './cycle/fundCall';
import { calculateCycleReturns } from './cycle/returns';
import type { InvestmentSettings } from '../../components/SettingsDialog';
import type { LeverageSettings } from '../types/leverage';

export const calculateInvestment = (
  baseAmount: number,
  selectedCycle: string,
  settings: InvestmentSettings,
  leverageSettings: LeverageSettings
) => {
  console.log('=== investment.ts: Début des calculs ===', {
    baseAmount,
    leverageSettings
  });

  const { initialAmount, creditLine } = calculateInitialAmount({
    baseAmount,
    leverageSettings
  });

  const cycles = [];
  let currentAmount = initialAmount;
  let remainingCredit = creditLine;
  
  for (let cycleNumber = 1; cycleNumber <= parseInt(selectedCycle); cycleNumber++) {
    let cycleTotalCreditUsed = 0;
    let unusedFundsInterest = 0;
    
    // Traitement des appels de fonds du cycle
    settings.paymentSchedule.forEach(({ percentage }) => {
      const { creditUsed } = calculateFundCall({
        baseAmount: currentAmount,
        percentage,
        remainingCredit
      });
      
      cycleTotalCreditUsed += creditUsed;
    });

    // Calcul des rendements du cycle
    const cycleReturns = calculateCycleReturns({
      baseAmount: currentAmount,
      globalReturnRate: settings.globalReturnRate,
      unusedFundsInterest,
      totalCreditUsed: cycleTotalCreditUsed,
      creditInterestRate: leverageSettings.interestRate,
      duration: settings.cycleDuration
    });

    cycles.push({
      cycleNumber,
      initialAmount: currentAmount,
      finalAmount: cycleReturns.finalAmount,
      netGain: cycleReturns.netGain,
      creditUsed: cycleTotalCreditUsed,
      unusedFundsInterest
    });

    currentAmount = cycleReturns.finalAmount;
  }

  return {
    cycles,
    totalReturn: currentAmount,
    netGain: currentAmount - baseAmount,
    creditLine
  };
};