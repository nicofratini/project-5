import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, LineChart, Percent } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatting';
import { useTranslation } from 'react-i18next';

interface ResultsDisplayProps {
  totalReturn: number;
  netGain: number;
  unusedFundsInterest: number;
  annualizedRate: number;
  totalRate: number;
  totalDuration: number;
  globalReturnRate: number;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  totalReturn,
  netGain,
  unusedFundsInterest,
  annualizedRate,
  totalRate,
  totalDuration,
  globalReturnRate
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-600">{t('results.totalReturn.title')}</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(totalReturn)}</p>
            <p className="text-xs text-gray-500 mt-1">
              {t('results.totalReturn.description', {
                rate: globalReturnRate,
                duration: totalDuration,
                interest: formatCurrency(unusedFundsInterest)
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3">
          <LineChart className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">{t('results.netGain.title')}</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(netGain)}</p>
            <p className="text-xs text-gray-500 mt-1">{t('results.netGain.description')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3">
          <Percent className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-sm text-gray-600">{t('results.globalRate.title')}</p>
            <p className="text-xl font-bold text-gray-900">{formatPercentage(totalRate)}</p>
            <p className="text-xs text-gray-500 mt-1">
              {t('results.globalRate.description', { duration: totalDuration })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-8 h-8 text-amber-500" />
          <div>
            <p className="text-sm text-gray-600">{t('results.annualRate.title')}</p>
            <p className="text-xl font-bold text-gray-900">{formatPercentage(annualizedRate)}</p>
            <p className="text-xs text-gray-500 mt-1">{t('results.annualRate.description')}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};