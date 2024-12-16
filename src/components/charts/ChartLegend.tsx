import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CHART_COLORS } from './config/chartConfig';

interface ChartLegendProps {
  unusedFundsRate: number;
}

export const ChartLegend: React.FC<ChartLegendProps> = ({ unusedFundsRate }) => {
  const { t } = useTranslation();

  const legendItems = [
    {
      color: CHART_COLORS.unusedFunds,
      title: t('chart.unusedFunds.title'),
      description: t('chart.unusedFunds.description')
    },
    {
      color: CHART_COLORS.interest,
      title: t('chart.interest.title'),
      description: t('chart.interest.description', { rate: unusedFundsRate })
    },
    {
      color: CHART_COLORS.fundCall,
      title: t('chart.fundCalls.title'),
      description: t('chart.fundCalls.description')
    },
    {
      color: CHART_COLORS.cashback,
      title: t('chart.cashback.title'),
      description: t('chart.cashback.description')
    }
  ];

  return (
    <div className="mb-4 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {legendItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div
              className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <span className="text-sm font-medium text-gray-800 block">
                {item.title}
              </span>
              <span className="text-xs text-gray-500 block mt-0.5">
                {item.description}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};