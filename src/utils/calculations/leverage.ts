import { LombardLoanMetrics, RepaymentScheduleItem } from '../types/leverage';

export const calculateLombardLoanMetrics = (
  initialInvestment: number,
  ratio: number,
  interestRate: number,
  investmentReturnRate: number,
  duration: number,
  paymentSchedule: Array<{ month: number; percentage: number }>
): LombardLoanMetrics => {
  console.log('=== leverage.ts: Calcul des métriques du levier ===', {
    initialInvestment,
    ratio,
    interestRate,
    investmentReturnRate,
    duration
  });

  const maxCreditLine = (initialInvestment * ratio) / 100;
  
  // Total des appels de fonds pour limiter le crédit utilisé
  const totalFundCalls = paymentSchedule.reduce((sum, period) => {
    return sum + (initialInvestment * period.percentage) / 100;
  }, 0);

  const usedCredit = Math.min(maxCreditLine, totalFundCalls);
  const monthlyRate = interestRate / 100 / 12;
  const totalInterest = usedCredit * monthlyRate * duration;
  const monthlyInvestmentRate = investmentReturnRate / 100 / 12;
  const totalInvestmentReturn = initialInvestment * monthlyInvestmentRate * duration;
  const realEstateReturn = usedCredit * (investmentReturnRate / 100) * (duration / 12);
  const netReturn = totalInvestmentReturn + realEstateReturn - totalInterest;
  const effectiveRate = (netReturn / initialInvestment) * 100;

  const schedule = generateRepaymentSchedule(
    usedCredit,
    monthlyRate,
    duration,
    monthlyInvestmentRate,
    paymentSchedule,
    initialInvestment
  );

  const result = {
    loanAmount: maxCreditLine,
    monthlyPayment: totalInterest / duration,
    totalInterest,
    totalInvestmentReturn,
    netReturn,
    schedule,
    totalInvestment: initialInvestment,
    leverageRatio: ratio / 100,
    effectiveRate,
    maxUsedCredit: usedCredit,
    realEstateReturn,
  };

  console.log('=== leverage.ts: Résultats des métriques ===', result);

  return result;
};

const generateRepaymentSchedule = (
  usedCredit: number,
  monthlyRate: number,
  duration: number,
  monthlyInvestmentRate: number,
  paymentSchedule: Array<{ month: number; percentage: number }>,
  initialInvestment: number
): RepaymentScheduleItem[] => {
  const schedule: RepaymentScheduleItem[] = [];
  let remainingBalance = usedCredit;
  let cumulativeInterest = 0;
  let cumulativeInvestmentReturn = 0;
  let currentUsedCredit = 0;

  for (let month = 0; month <= duration; month++) {
    const fundCall = paymentSchedule.find(p => p.month === month);

    if (fundCall) {
      const requiredAmount = (initialInvestment * fundCall.percentage) / 100;
      const creditUsed = Math.min(requiredAmount, remainingBalance);
      currentUsedCredit += creditUsed;
    }

    const monthlyInterest = remainingBalance * monthlyRate;
    cumulativeInterest += monthlyInterest;

    const investmentReturn = initialInvestment * monthlyInvestmentRate;
    cumulativeInvestmentReturn += investmentReturn;

    const isLastMonth = month === duration;
    const principal = isLastMonth ? remainingBalance : 0;

    schedule.push({
      month,
      payment: monthlyInterest + (isLastMonth ? principal : 0),
      principal: isLastMonth ? principal : 0,
      interest: monthlyInterest,
      remainingBalance,
      cumulativeInterest,
      investmentReturn,
      cumulativeInvestmentReturn,
      netCashFlow: investmentReturn - monthlyInterest - (isLastMonth ? principal : 0),
      usedCredit: currentUsedCredit,
      totalPrincipalRepaid: isLastMonth ? principal : 0,
    });

    remainingBalance = isLastMonth ? 0 : remainingBalance;
  }

  return schedule;
};

export const calculateLeverageAmount = (
  initialInvestment: number,
  leverageMetrics?: {
    loanAmount: number;
    leverageRatio: number;
  }
): {
  hasLeverage: boolean;
  availableCredit: number;
  firstCycleAmount: number;
} => {
  const hasLeverage = Boolean(leverageMetrics?.loanAmount && leverageMetrics.leverageRatio);
  const availableCredit = hasLeverage 
    ? (initialInvestment * leverageMetrics.leverageRatio / 100)
    : 0;
  const firstCycleAmount = hasLeverage ? availableCredit : initialInvestment;

  console.log('=== leverage.ts: Calcul des montants avec levier ===', {
    initialInvestment,
    hasLeverage,
    availableCredit,
    firstCycleAmount,
    ratio: leverageMetrics?.leverageRatio
  });

  return {
    hasLeverage,
    availableCredit,
    firstCycleAmount
  };
};