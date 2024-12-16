import React from 'react';
import { MetricCard } from './MetricCard';
import { useTranslation } from '../../../i18n/hooks/useTranslation';
import { formatCurrency } from '../../../utils/formatting/currency';
import { formatPercentage } from '../../../utils/formatting/percentage';
import type { LeverageMetrics } from '../../../utils/types';

interface LeverageMetricsGridProps {
  metrics: LeverageMetrics;
}

export const LeverageMetricsGrid: React.FC<LeverageMetricsGridProps> = ({ metrics }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4">
      <MetricCard
        title={t('leverage.metrics.initialInvestment')}
        value={formatCurrency(metrics.initialAmount)}
        description={t('leverage.metrics.initialInvestmentDesc')}
      />
      
      <MetricCard
        title={t('leverage.metrics.creditAmount')}
        value={formatCurrency(metrics.creditAmount)}
        description={t('leverage.metrics.creditAmountDesc')}
      />

      <MetricCard
        title={t('leverage.metrics.grossReturn')}
        value={formatCurrency(metrics.grossReturn)}
        trend={metrics.grossReturn > 0 ? 'positive' : 'negative'}
        description={t('leverage.metrics.grossReturnDesc')}
      />

      <MetricCard
        title={t('leverage.metrics.creditCost')}
        value={formatCurrency(metrics.creditCost)}
        trend="negative"
        description={t('leverage.metrics.creditCostDesc')}
      />

      <MetricCard
        title={t('leverage.metrics.netReturn')}
        value={formatCurrency(metrics.netReturn)}
        trend={metrics.netReturn > 0 ? 'positive' : 'negative'}
        description={t('leverage.metrics.netReturnDesc')}
      />

      <MetricCard
        title={t('leverage.metrics.returnRate')}
        value={formatPercentage(metrics.returnRate)}
        trend={metrics.returnRate > 0 ? 'positive' : 'negative'}
        description={t('leverage.metrics.returnRateDesc')}
      />
    </div>
  );
};