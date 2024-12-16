import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/formatting';
import { useLoanMetrics } from '../../utils/hooks/useLoanMetrics';

interface LeverageMetricsProps {
  loanAmount: number;
  interestRate: number;
  duration: number;
}

export const LeverageMetrics: React.FC<LeverageMetricsProps> = ({
  loanAmount,
  interestRate,
  duration,
}) => {
  const { t } = useTranslation();
  const metrics = useLoanMetrics({ loanAmount, interestRate, duration });

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="text-sm text-gray-600">{t('leverage.results.monthlyPayment')}</h4>
        <p className="text-lg font-semibold text-gray-900">
          {formatCurrency(metrics.monthlyPayment)}
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="text-sm text-gray-600">{t('leverage.results.totalPayments')}</h4>
        <p className="text-lg font-semibold text-gray-900">
          {formatCurrency(metrics.totalPayments)}
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="text-sm text-gray-600">{t('leverage.results.totalInterest')}</h4>
        <p className="text-lg font-semibold text-gray-900">
          {formatCurrency(metrics.totalInterest)}
        </p>
      </div>
    </div>
  );
};