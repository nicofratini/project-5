import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { formatCurrency } from '../../utils/formatting/currency';
import type { LeverageMetrics } from '../../utils/types';

interface CombinedFinancialChartProps {
  metrics: LeverageMetrics;
  title?: string;
}

export const CombinedFinancialChart: React.FC<CombinedFinancialChartProps> = ({ metrics, title }) => {
  const { t } = useTranslation();

  // Préparer les données pour le graphique avec périodes temporelles
  const chartData = [
    {
      period: t('chart.phases.initial'),
      amount: metrics.initialAmount,
      credit: 0,
      totalAvailable: metrics.initialAmount
    },
    {
      period: t('chart.phases.leverageApplied'),
      amount: metrics.initialAmount,
      credit: metrics.creditAmount,
      totalAvailable: metrics.initialAmount + metrics.creditAmount
    },
    {
      period: t('chart.phases.returnPhase'),
      amount: metrics.initialAmount + metrics.grossReturn,
      credit: metrics.creditAmount - metrics.creditCost,
      totalAvailable: metrics.initialAmount + metrics.grossReturn + metrics.creditAmount - metrics.creditCost
    }
  ];

  return (
    <div className="w-full h-full min-h-[400px]">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
          <XAxis 
            dataKey="period" 
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value) => formatCurrency(value)}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: any) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            name={t('chart.legend.investmentAmount')}
            stroke="#2196F3"
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="credit"
            name={t('chart.legend.creditAmount')}
            stroke="#FF9800"
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="totalAvailable"
            name={t('chart.legend.totalAvailable')}
            stroke="#4CAF50"
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CombinedFinancialChart;