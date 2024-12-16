import { InvestmentSettings } from '../../components/SettingsDialog';
import { PeriodResult } from '../types/investment';

export const calculatePeriods = (
  baseAmount: number,
  startMonth: number,
  cycleNumber: number,
  settings: InvestmentSettings,
  creditLine: number
): {
  periods: PeriodResult[];
  cycleCredit: number;
} => {
  const periods: PeriodResult[] = [];
  let totalCreditUsed = 0;
  let totalFundCalls = 0;
  let remainingAmount = baseAmount;

  console.log('=== periods.ts: Début du calcul des périodes ===', {
    baseAmount,
    creditLine,
    cycleNumber,
    startMonth
  });

  // Trier les périodes par mois
  const sortedSchedule = [...settings.paymentSchedule].sort((a, b) => a.month - b.month);

  sortedSchedule.forEach(({ month, percentage }) => {
    const periodMonth = startMonth + month;
    const callAmount = (baseAmount * percentage) / 100;
    
    // Calculer le crédit utilisé pour cet appel de fonds
    const creditUsed = creditLine > 0 
      ? Math.min(callAmount, creditLine - totalCreditUsed) 
      : 0;

    // Mettre à jour les montants
    totalCreditUsed += creditUsed;
    totalFundCalls += callAmount;
    remainingAmount = Math.max(0, remainingAmount - callAmount);

    const period = {
      month: periodMonth,
      percentage,
      amount: Math.round(callAmount),
      remainingAfterCall: Math.round(remainingAmount),
      creditUsed: Math.round(creditUsed),
      cycle: cycleNumber,
      totalFundCalls: Math.round(totalFundCalls)
    };

    console.log(`Période ${periodMonth}:`, period);

    periods.push(period);
  });

  return {
    periods,
    cycleCredit: totalCreditUsed
  };
};