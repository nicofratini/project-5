import { LombardLoanMetrics } from '../../types/leverage';
import { calculateRepaymentSchedule } from './schedule';
import { calculateLeverageRates } from './rates';

export const calculateLombardLoanMetrics = (
  initialInvestment: number,
  ratio: number,
  interestRate: number,
  investmentReturnRate: number,
  duration: number,
  paymentSchedule: Array<{ month: number; percentage: number }>
): LombardLoanMetrics => {
  console.log('=== leverage/metrics.ts: Calcul des métriques ===', {
    initialInvestment,
    ratio,
    interestRate,
    investmentReturnRate,
    duration
  });

  // Calcul du crédit maximum disponible
  const maxCreditLine = (initialInvestment * ratio) / 100;
  
  // Calcul du crédit effectivement utilisé
  const totalFundCalls = paymentSchedule.reduce((sum, period) => {
    return sum + (initialInvestment * period.percentage) / 100;
  }, 0);
  const usedCredit = Math.min(maxCreditLine, totalFundCalls);

  // Calcul des intérêts et rendements
  const monthlyRate = interestRate / 100 / 12;
  const totalInterest = usedCredit * monthlyRate * duration;
  const monthlyInvestmentRate = investmentReturnRate / 100 / 12;
  const totalInvestmentReturn = initialInvestment * monthlyInvestmentRate * duration;
  const realEstateReturn = usedCredit * (investmentReturnRate / 100) * (duration / 12);

  // Calcul des taux effectifs
  const { netReturn, effectiveRate } = calculateLeverageRates(
    totalInvestmentReturn + realEstateReturn,
    initialInvestment,
    totalInterest,
    duration
  );

  // Génération de l'échéancier
  const schedule = calculateRepaymentSchedule(
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

  console.log('=== leverage/metrics.ts: Résultats ===', result);

  return result;
};