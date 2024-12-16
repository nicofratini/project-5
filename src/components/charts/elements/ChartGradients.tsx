import React from 'react';
import { CHART_GRADIENTS } from '../config/chartConfig';

export const ChartGradients: React.FC = () => (
  <defs>
    {Object.entries(CHART_GRADIENTS).map(([key, gradient]) => (
      <linearGradient
        key={key}
        id={gradient.id}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop
          offset="5%"
          stopColor={gradient.startColor}
          stopOpacity={0.2}
        />
        <stop
          offset="95%"
          stopColor={gradient.stopColor}
          stopOpacity={0}
        />
      </linearGradient>
    ))}
  </defs>
);