import React from 'react';
import { CombinedFinancialChart } from './charts/CombinedFinancialChart';
import { processChartData } from '../utils/chartDataProcessing';
import type { InterestPeriod, InvestmentPeriod } from '../utils/types/investment';

interface InterestChartProps {
  interestPeriods: InterestPeriod[];
  periods: InvestmentPeriod[];
  totalInvestment: number;
  totalReturn: number;
  unusedFundsRate: number;
  cycleDuration: number;
  selectedCycle: number;
}

export const InterestChart: React.FC<InterestChartProps> = ({
  interestPeriods,
  periods,
  totalInvestment,
  totalReturn,
  unusedFundsRate,
  cycleDuration,
  selectedCycle,
}) => {
  const chartData = React.useMemo(() => {
    console.log('=== InterestChart: Préparation des données ===', {
      totalInvestment,
      totalReturn,
      cycleDuration,
      selectedCycle
    });

    return processChartData(
      interestPeriods,
      periods,
      totalInvestment,
      totalReturn,
      cycleDuration,
      parseInt(selectedCycle)
    );
  }, [interestPeriods, periods, totalInvestment, totalReturn, cycleDuration, selectedCycle]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 h-[600px]">
      <CombinedFinancialChart
        data={chartData}
        finalReturn={totalReturn}
        totalInvestment={totalInvestment}
        unusedFundsRate={unusedFundsRate}
        cycleDuration={cycleDuration}
        selectedCycle={parseInt(selectedCycle)}
      />
    </div>
  );
};