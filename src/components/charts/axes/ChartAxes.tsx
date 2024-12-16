import React from 'react';
import { XAxis, YAxis } from 'recharts';

interface ChartAxesProps {
  ticks: number[];
  maxValue: number;
}

export const ChartAxes: React.FC<ChartAxesProps> = ({ ticks, maxValue }) => (
  <>
    <XAxis
      dataKey="month"
      ticks={ticks}
      tickFormatter={(value) => `M${value}`}
      stroke="#6B7280"
    />

    <YAxis
      yAxisId="left"
      stroke="#6B7280"
      tickFormatter={(value) => `${Math.round(value / 1000)}k€`}
      domain={[0, maxValue * 1.1]}
    />

    <YAxis
      yAxisId="right"
      orientation="right"
      stroke="#6B7280"
      tickFormatter={(value) => `${Math.round(value / 1000)}k€`}
      domain={[0, maxValue * 1.1]}
    />
  </>
);