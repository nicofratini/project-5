import { InterestPeriod } from '../types/investment';

export const calculateInterestPeriods = (
  periods: any[],
  startMonth: number,
  unusedFundsRate: number
): InterestPeriod[] => {
  console.log('=== interest.ts: Calcul des périodes d\'intérêt ===');
  
  const interestPeriods: InterestPeriod[] = [];
  let currentMonth = startMonth;
  let lastPeriod = periods[0];

  periods.forEach((period, index) => {
    if (period.month > currentMonth) {
      const monthlyInterest = (lastPeriod.remainingAfterCall * (unusedFundsRate / 100)) / 12;
      
      const interestPeriod = {
        startMonth: currentMonth,
        endMonth: period.month,
        monthlyInterest,
        unusedAmount: lastPeriod.remainingAfterCall
      };

      console.log(`Période d'intérêt ${currentMonth}-${period.month}:`, {
        unusedAmount: lastPeriod.remainingAfterCall,
        monthlyInterest
      });

      interestPeriods.push(interestPeriod);
    }
    currentMonth = period.month;
    lastPeriod = period;
  });

  return interestPeriods;
};

export const calculateCycleInterest = (interestPeriods: InterestPeriod[]): number => {
  return interestPeriods.reduce((sum, period) => {
    const monthlyInterest = period.monthlyInterest || 0;
    const months = period.endMonth - period.startMonth;
    return sum + (monthlyInterest * months);
  }, 0);
};