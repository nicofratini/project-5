import React from 'react';
import { Area } from 'recharts';
import { CHART_COLORS, CHART_GRADIENTS } from '../config/chartConfig';

export const ChartAreas: React.FC = () => (
  <>
    <Area
      yAxisId="left"
      type="stepAfter"
      dataKey="unusedFunds"
      stroke={CHART_COLORS.unusedFunds}
      fill={`url(#${CHART_GRADIENTS.unusedFunds.id})`}
      strokeWidth={3}
      isAnimationActive={true}
      animationDuration={1000}
    />

    <Area
      yAxisId="left"
      type="monotone"
      dataKey="cumulativeInterest"
      stroke={CHART_COLORS.interest}
      fill={`url(#${CHART_GRADIENTS.interest.id})`}
      strokeWidth={3}
      isAnimationActive={true}
      animationDuration={1000}
    />
  </>
);