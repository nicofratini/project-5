import React from 'react';
import { formatCurrency } from '../../utils/formatting';
import { useTranslation } from 'react-i18next';

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
  }>;
  label?: string | number;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const { t } = useTranslation();

  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const getValueLabel = (dataKey: string) => {
    switch (dataKey) {
      case 'unusedFunds':
        return t('chart.unusedFunds.title');
      case 'cumulativeInterest':
        return t('chart.interest.title');
      case 'fundCall':
        return t('chart.fundCalls.title');
      case 'cycleEnd':
        return t('chart.cashback.title');
      default:
        return dataKey;
    }
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
      <p className="text-sm font-medium text-gray-700 mb-2">
        {t('chart.label', { month: label })}
      </p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          entry.value > 0 && (
            <div key={index} className="text-sm">
              <span className="text-gray-600">
                {getValueLabel(entry.dataKey)}:
              </span>
              <span className="ml-2 font-medium text-gray-900">
                {formatCurrency(entry.value)}
              </span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};