import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '../../../i18n/hooks/useTranslation';
import { formatCurrency } from '../../../utils/formatting/currency';
import { formatPercentage } from '../../../utils/formatting/percentage';
import type { LeverageMetrics } from '../../../utils/types';

interface LeverageReturnSummaryProps {
  metrics: LeverageMetrics;
}

export const LeverageReturnSummary: React.FC<LeverageReturnSummaryProps> = ({ metrics }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {t('leverage.summary.title')}
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">
                {t('leverage.summary.initialInvestment')}
              </p>
              <p className="text-lg font-semibold">
                {formatCurrency(metrics.initialAmount)}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">
                {t('leverage.summary.creditAmount')}
              </p>
              <p className="text-lg font-semibold">
                {formatCurrency(metrics.creditAmount)}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  {t('leverage.summary.grossReturn')}
                </p>
                <p className="text-lg font-semibold text-green-600">
                  {formatCurrency(metrics.grossReturn)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">
                  {t('leverage.summary.creditCost')}
                </p>
                <p className="text-lg font-semibold text-red-600">
                  {formatCurrency(metrics.creditCost)}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  {t('leverage.summary.netReturn')}
                </p>
                <p className={`text-lg font-semibold ${
                  metrics.netReturn >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(metrics.netReturn)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">
                  {t('leverage.summary.returnRate')}
                </p>
                <p className={`text-lg font-semibold ${
                  metrics.returnRate >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercentage(metrics.returnRate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};