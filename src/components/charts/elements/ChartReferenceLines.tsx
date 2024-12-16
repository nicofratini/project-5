import React from 'react';
import { ReferenceLine } from 'recharts';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../utils/formatting';
import { CHART_COLORS } from '../config/chartConfig';

interface ChartReferenceLinesProps {
  totalInvestment: number;
  finalReturn: number;
  cycleDuration: number;
  selectedCycle: number;
}

export const ChartReferenceLines: React.FC<ChartReferenceLinesProps> = ({
  totalInvestment,
  finalReturn,
  cycleDuration,
  selectedCycle,
}) => {
  const { t } = useTranslation();

  const renderLabel = (value: number, color: string = CHART_COLORS.reference) => ({
    value: formatCurrency(value),
    position: 'right',
    fill: color,
    fontSize: 12,
  });

  return (
    <>
      {/* Initial Investment Line */}
      <ReferenceLine
        y={totalInvestment}
        stroke={CHART_COLORS.reference}
        strokeDasharray="3 3"
        label={renderLabel(totalInvestment)}
      />

      {/* Final Return Line */}
      <ReferenceLine
        y={finalReturn}
        stroke={CHART_COLORS.finalAmount}
        strokeDasharray="3 3"
        label={renderLabel(finalReturn, CHART_COLORS.finalAmount)}
      />

      {/* Cycle End Lines */}
      {Array.from({ length: selectedCycle - 1 }).map((_, index) => {
        const cycleMonth = (index + 1) * cycleDuration;
        return (
          <ReferenceLine
            key={cycleMonth}
            x={cycleMonth}
            stroke={CHART_COLORS.reference}
            strokeDasharray="3 3"
            label={{
              value: t('chart.cycle', { number: index + 1 }),
              position: 'top',
              fill: CHART_COLORS.reference,
              fontSize: 12,
            }}
          />
        );
      })}
    </>
  );
};