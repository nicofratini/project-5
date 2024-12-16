import { useMemo } from 'react';
import { calculateRepaymentSchedule } from '../calculations/leverage';
import { RepaymentScheduleItem } from '../types/leverage';

interface UseAmortizationScheduleProps {
  loanAmount: number;
  interestRate: number;
  duration: number;
}

export const useAmortizationSchedule = ({
  loanAmount,
  interestRate,
  duration,
}: UseAmortizationScheduleProps): RepaymentScheduleItem[] => {
  return useMemo(
    () => calculateRepaymentSchedule(loanAmount, interestRate, duration),
    [loanAmount, interestRate, duration]
  );
};