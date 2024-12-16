import { RepaymentScheduleItem } from '../../types/leverage';

export const calculateRepaymentSchedule = (
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
    
    // Mise à jour du crédit utilisé
    if (fundCall) {
      const requiredAmount = (initialInvestment * fundCall.percentage) / 100;
      const creditUsed = Math.min(requiredAmount, remainingBalance);
      currentUsedCredit += creditUsed;
    }

    // Calcul des intérêts mensuels
    const monthlyInterest = remainingBalance * monthlyRate;
    cumulativeInterest += monthlyInterest;

    // Calcul du rendement mensuel
    const investmentReturn = initialInvestment * monthlyInvestmentRate;
    cumulativeInvestmentReturn += investmentReturn;

    // Gestion du dernier mois
    const isLastMonth = month === duration;
    const principal = isLastMonth ? remainingBalance : 0;

    schedule.push({
      month,
      payment: monthlyInterest + principal,
      principal,
      interest: monthlyInterest,
      remainingBalance,
      cumulativeInterest,
      investmentReturn,
      cumulativeInvestmentReturn,
      netCashFlow: investmentReturn - monthlyInterest - principal,
      usedCredit: currentUsedCredit,
      totalPrincipalRepaid: isLastMonth ? principal : 0,
    });

    remainingBalance = isLastMonth ? 0 : remainingBalance;
  }

  return schedule;
};