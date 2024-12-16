import { useMemo } from 'react';

interface ChartData {
  maxValue: number;
  ticks: number[];
}

export const useChartData = (
  data: any[],
  totalInvestment: number,
  finalReturn: number,
  cycleDuration: number,
  selectedCycle: number
): ChartData => {
  return useMemo(() => {
    const maxValue = Math.max(
      totalInvestment,
      finalReturn,
      ...data.map(d => Math.max(
        d.unusedFunds || 0,
        d.cumulativeInterest || 0,
        d.cycleEnd || 0,
        d.fundCall || 0
      ))
    );

    const maxMonth = cycleDuration * selectedCycle;
    const tickInterval = maxMonth <= 24 ? 3 : maxMonth <= 48 ? 6 : 12;
    const ticks = Array.from(
      { length: Math.floor(maxMonth / tickInterval) + 1 },
      (_, i) => i * tickInterval
    );

    return { maxValue, ticks };
  }, [data, totalInvestment, finalReturn, cycleDuration, selectedCycle]);
};