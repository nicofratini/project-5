import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { InvestmentPeriod } from '../utils/types';
import { formatCurrency } from '../utils/formatting';

interface TimelineProps {
  periods: InvestmentPeriod[];
  cycleDuration: number;
}

export const Timeline: React.FC<TimelineProps> = ({ periods, cycleDuration }) => {
  const { t } = useTranslation();

  const groupedPeriods = periods.reduce((acc, period) => {
    const cycleIndex = Math.floor(period.month / cycleDuration);
    if (!acc[cycleIndex]) {
      acc[cycleIndex] = [];
    }
    acc[cycleIndex].push(period);
    return acc;
  }, {} as Record<number, InvestmentPeriod[]>);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {t('timeline.title')}
      </h2>

      <div className="space-y-8">
        {Object.entries(groupedPeriods).map(([cycleIndex, cyclePeriods]) => (
          <div key={cycleIndex} className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {t('timeline.cycle', {
                number: parseInt(cycleIndex) + 1,
                duration: cycleDuration
              })}
            </h3>

            <div className="flex items-center space-x-4 overflow-x-auto pb-4">
              {cyclePeriods.map((period, index) => (
                <div key={index} className="flex-none">
                  <div className="bg-white rounded-lg shadow-sm p-4 min-w-[200px]">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      {t('timeline.month', { number: period.month })}
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-gray-500">{t('timeline.amount')}</div>
                        <div className="font-semibold text-gray-900">
                          {formatCurrency(period.amount)}
                        </div>
                      </div>

                      {period.creditUsed > 0 && (
                        <div>
                          <div className="text-xs text-gray-500">{t('timeline.creditUsed')}</div>
                          <div className="font-semibold text-blue-600">
                            {formatCurrency(period.creditUsed)}
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="text-xs text-gray-500">{t('timeline.percentage')}</div>
                        <div className="font-medium text-gray-900">{period.percentage}%</div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500">{t('timeline.progress')}</div>
                        <div className="font-medium text-gray-900">
                          {formatCurrency(period.remainingAfterCall)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < cyclePeriods.length - 1 && (
                    <div className="flex items-center justify-center w-8">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <div className="bg-gray-50 rounded-lg px-4 py-2">
                <span className="text-sm text-gray-600">
                  {t('timeline.totalAmount', {
                    amount: formatCurrency(
                      cyclePeriods.reduce((sum, p) => sum + p.amount, 0)
                    )
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};