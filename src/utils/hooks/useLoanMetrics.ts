import { useMemo } from 'react';
import { calculateMonthlyPayment } from '../calculations/leverage';

interface UseLoanMetricsProps {
  loanAmount: number;
  interestRate: number;
  duration: number;
}

interface LoanMetrics {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
}

export const useLoanMetrics = ({
  loanAmount,
  interestRate,
  duration,
}: UseLoanMetricsProps): LoanMetrics => {
  return useMemo(() => {
    const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, duration);
    const totalPayments = monthlyPayment * duration;
    const totalInterest = totalPayments - loanAmount;

    return {
      monthlyPayment,
      totalPayments,
      totalInterest,
    };
  }, [loanAmount, interestRate, duration]);
};