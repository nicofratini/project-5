import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { RepaymentScheduleItem } from '../../utils/types/leverage';
import { formatCurrency } from '../../utils/formatting';

interface LeverageChartProps {
  schedule: RepaymentScheduleItem[];
}

export const LeverageChart: React.FC<LeverageChartProps> = ({ schedule }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('leverage.chart.title')}
      </h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={schedule} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="month"
              label={{
                value: t('leverage.chart.xAxis'),
                position: 'bottom',
                offset: -10,
              }}
            />
            <YAxis
              yAxisId="left"
              label={{
                value: t('leverage.chart.yAxis'),
                angle: -90,
                position: 'insideLeft',
              }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => t('leverage.chart.month', { month: label })}
            />
            <Legend />
            
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="remainingBalance"
              name={t('leverage.chart.remainingBalance')}
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
            <Bar
              yAxisId="right"
              dataKey="principal"
              name={t('leverage.chart.principal')}
              fill="#10B981"
              stackId="a"
            />
            <Bar
              yAxisId="right"
              dataKey="interest"
              name={t('leverage.chart.interest')}
              fill="#F59E0B"
              stackId="a"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="usedCredit"
              name={t('leverage.chart.usedCredit')}
              stroke="#6366F1"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};