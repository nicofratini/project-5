import type { InvestmentSettings } from '../components/SettingsDialog';
import type { CycleType } from './types';

export const calculateMultiCycleResults = (
  initialInvestment: number,
  selectedCycle: CycleType,
  settings: InvestmentSettings,
  leverageMetrics?: {
    loanAmount: number;
    leverageRatio: number;
  }
) => {
  const numberOfCycles = parseInt(selectedCycle);
  const cycles: CycleResult[] = [];
  const allPeriods: InvestmentPeriod[] = [];
  const allInterestPeriods: InterestPeriod[] = [];
  
  // Si l'effet de levier est activé, nous utilisons le crédit pour les appels de fonds
  const effectiveInvestment = initialInvestment;
  const creditLine = leverageMetrics?.loanAmount || 0;
  
  let currentAmount = effectiveInvestment;
  let totalUnusedFundsInterest = 0;

  for (let i = 0; i < numberOfCycles; i++) {
    const startMonth = i * settings.cycleDuration;
    const { periods, interestPeriods } = calculateSingleCycleResults(
      currentAmount,
      startMonth,
      i + 1,
      settings,
      creditLine
    );

    // Calculate cycle results
    const cycleInterest = interestPeriods.reduce(
      (sum, period) => sum + period.monthlyInterest * (period.endMonth - period.startMonth),
      0
    );

    totalUnusedFundsInterest += cycleInterest;
    
    // Pour chaque cycle, le rendement est calculé sur l'investissement initial
    const cycleFinalAmount = currentAmount * (1 + settings.globalReturnRate / 100) + cycleInterest;

    cycles.push({
      cycleNumber: i + 1,
      initialAmount: currentAmount,
      finalAmount: cycleFinalAmount,
      netGain: cycleFinalAmount - currentAmount,
      unusedFundsInterest: cycleInterest,
    });

    currentAmount = cycleFinalAmount;
    allPeriods.push(...periods);
    allInterestPeriods.push(...interestPeriods);
  }

  const totalReturn = currentAmount;
  const totalDuration = numberOfCycles * settings.cycleDuration;
  const netGain = totalReturn - effectiveInvestment - (creditLine || 0);
  const totalRate = (totalReturn / effectiveInvestment - 1) * 100;
  const annualizedRate = (Math.pow(totalReturn / effectiveInvestment, 12 / totalDuration) - 1) * 100;

  return {
    cycles,
    periods: allPeriods,
    interestPeriods: allInterestPeriods,
    totalReturn,
    netGain,
    totalUnusedFundsInterest,
    totalRate,
    annualizedRate,
    totalDuration,
  };
};

const calculateSingleCycleResults = (
  investmentAmount: number,
  startMonth: number,
  cycleNumber: number,
  settings: InvestmentSettings,
  creditLine: number = 0
): { periods: InvestmentPeriod[]; interestPeriods: InterestPeriod[] } => {
  let remainingAmount = investmentAmount;
  let remainingCredit = creditLine;

  const periods = settings.paymentSchedule.map(period => {
    // Si nous avons une ligne de crédit, nous l'utilisons pour les appels de fonds
    const amount = (investmentAmount * period.percentage) / 100;
    const creditUsed = Math.min(amount, remainingCredit);
    remainingCredit -= creditUsed;
    remainingAmount -= (amount - creditUsed);

    return {
      ...period,
      month: startMonth + period.month,
      amount,
      remainingAfterCall: remainingAmount,
      cycle: cycleNumber,
    };
  });

  // Sort periods by month
  periods.sort((a, b) => a.month - b.month);

  // Calculate interest periods
  const interestPeriods: InterestPeriod[] = [];
  let currentMonth = startMonth;
  let lastPeriod = periods[0];

  periods.forEach((period, index) => {
    if (period.month > currentMonth) {
      interestPeriods.push({
        startMonth: currentMonth,
        endMonth: period.month,
        monthlyInterest: (lastPeriod.remainingAfterCall * (settings.unusedFundsRate / 100)) / 12,
        unusedAmount: lastPeriod.remainingAfterCall,
      });
    }
    currentMonth = period.month;
    lastPeriod = period;
  });

  return { periods, interestPeriods };
};