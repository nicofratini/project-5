import React from 'react';
import { TrendingUp } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatting';
import { useTranslation } from 'react-i18next';
import type { CycleResult } from '../../utils/types';

interface CycleMetricsProps {
  cycles: CycleResult[];
}

export const CycleMetrics: React.FC<CycleMetricsProps> = ({ cycles }) => {
  const { t } = useTranslation();

  const totalNetGain = cycles.reduce((sum, cycle) => sum + cycle.netGain, 0);
  const totalUnusedFundsInterest = cycles.reduce((sum, cycle) => sum + cycle.unusedFundsInterest, 0);
  const averageReturn = (totalNetGain / cycles[0].initialAmount) * 100;

  return (
    <div className="bg-gray-50 rounded-xl p-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-10 h-10 text-green-500" />
          <div>
            <div className="text-sm text-gray-600">Total Net Gain</div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(totalNetGain)}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <TrendingUp className="w-10 h-10 text-blue-500" />
          <div>
            <div className="text-sm text-gray-600">Total Interest on Unused Funds</div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(totalUnusedFundsInterest)}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <TrendingUp className="w-10 h-10 text-purple-500" />
          <div>
            <div className="text-sm text-gray-600">Average Return</div>
            <div className="text-lg font-semibold text-gray-900">
              {formatPercentage(averageReturn)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};