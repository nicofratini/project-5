import React from 'react';

interface ChartLabelProps {
  value: string;
  position?: 'left' | 'right';
  fill?: string;
  offset?: number;
}

export const ChartLabel: React.FC<ChartLabelProps> = ({
  value,
  position = 'left',
  fill = '#4B5563',
  offset = -10,
}) => {
  return {
    value,
    position,
    fill,
    fontSize: 12,
    offset,
  };
};