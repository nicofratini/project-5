import React from 'react';
import { Bar } from 'recharts';
import { CHART_COLORS } from '../config/chartConfig';

export const ChartBars: React.FC = () => (
  <>
    <Bar
      yAxisId="right"
      dataKey="fundCall"
      fill={CHART_COLORS.fundCall}
      opacity={0.7}
      isAnimationActive={true}
      animationDuration={1000}
    />

    <Bar
      yAxisId="right"
      dataKey="cycleEnd"
      fill={CHART_COLORS.cashback}
      opacity={0.8}
      isAnimationActive={true}
      animationDuration={1000}
    />
  </>
);