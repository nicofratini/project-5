import React from 'react';
import { motion } from 'framer-motion';
import { CardContent } from '@/components/ui/card';
import { LeverageMetricsGrid } from './metrics/LeverageMetricsGrid';
import { CombinedFinancialChart } from './charts/CombinedFinancialChart';
import { LeverageReturnSummary } from './metrics/LeverageReturnSummary';
import type { LeverageMetrics } from '../../utils/types';

interface LeverageResultsProps {
  metrics: LeverageMetrics;
}

export const LeverageResults: React.FC<LeverageResultsProps> = ({ metrics }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg"
    >
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <LeverageMetricsGrid metrics={metrics} />
            <LeverageReturnSummary metrics={metrics} />
          </div>
          <div className="h-[400px]">
            <CombinedFinancialChart metrics={metrics} />
          </div>
        </div>
      </CardContent>
    </motion.div>
  );
};

export default LeverageResults;