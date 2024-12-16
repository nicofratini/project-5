import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { InvestmentForm } from './components/InvestmentForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Timeline } from './components/Timeline';
import { InterestChart } from './components/InterestChart';
import { CycleSelector } from './components/CycleSelector';
import { CycleResults } from './components/CycleResults';
import { SettingsButton } from './components/SettingsButton';
import { LanguageSelector } from './components/LanguageSelector';
import { SettingsDialog } from './components/SettingsDialog';
import { LeverageToggle } from './components/leverage/LeverageToggle';
import { LeverageForm } from './components/leverage/LeverageForm';
import { LeverageResults } from './components/leverage/LeverageResults';
import { LeverageError } from './components/leverage/LeverageError';
import { calculateMultiCycleResults } from './utils/calculations';
import { useLeverageCalculations } from './hooks/useLeverageCalculations';
import { CycleType } from './utils/types';
import { useTranslation } from 'react-i18next';
import type { InvestmentSettings } from './components/SettingsDialog';
import type { LeverageSettings } from './utils/types/leverage';

function App() {
  const { t } = useTranslation();
  const [investmentInput, setInvestmentInput] = useState('1000000');
  const [selectedCycle, setSelectedCycle] = useState<CycleType>('1');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [leverageSettings, setLeverageSettings] = useState<LeverageSettings>({
    enabled: false,
    ratio: 50,
    interestRate: 3,
    investmentReturnRate: 5,
    duration: 24,
  });
  const [settings, setSettings] = useState<InvestmentSettings>({
    globalReturnRate: 28,
    unusedFundsRate: 1,
    cycleDuration: 24,
    paymentSchedule: [
      { month: 0, percentage: 5 },
      { month: 3, percentage: 30 },
      { month: 6, percentage: 20 },
      { month: 12, percentage: 15 },
      { month: 14, percentage: 20 },
      { month: 16, percentage: 5 },
      { month: 18, percentage: 5 },
    ],
  });

  const amount = parseFloat(investmentInput.replace(/[^\d.-]/g, '')) || 0;
  const { metrics: leverageMetrics, error: leverageError } = useLeverageCalculations({
    initialInvestment: amount,
    leverageSettings,
    paymentSchedule: settings.paymentSchedule,
  });

  const results = useMemo(() => {
    return calculateMultiCycleResults(
      amount,
      selectedCycle,
      settings,
      leverageSettings.enabled ? {
        enabled: true,
        ratio: leverageSettings.ratio
      } : undefined
    );
  }, [amount, selectedCycle, settings, leverageSettings]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-[1600px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t('title')}
          </h1>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <SettingsButton onClick={() => setIsSettingsOpen(true)} />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Investment Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6"
          >
            <div className="flex flex-col gap-6">
              <div className="w-full max-w-xl mx-auto">
                <InvestmentForm
                  value={investmentInput}
                  onChange={setInvestmentInput}
                />
              </div>
              
              <div className="w-full">
                <CycleSelector
                  selectedCycle={selectedCycle}
                  onChange={setSelectedCycle}
                  cycleDuration={settings.cycleDuration}
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <LeverageToggle
                  enabled={leverageSettings.enabled}
                  onChange={(enabled) => setLeverageSettings(prev => ({ ...prev, enabled }))}
                />
                {leverageSettings.enabled && (
                  <div className="mt-4">
                    <LeverageForm
                      settings={leverageSettings}
                      onChange={setLeverageSettings}
                      baseAmount={amount}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          {leverageError && <LeverageError message={leverageError} />}

          {leverageMetrics && leverageSettings.enabled && (
            <LeverageResults metrics={leverageMetrics} />
          )}

          <ResultsDisplay
            totalReturn={results.totalReturn}
            netGain={results.netGain}
            unusedFundsInterest={results.totalUnusedFundsInterest}
            annualizedRate={results.annualizedRate}
            totalRate={results.totalRate}
            totalDuration={results.totalDuration}
            globalReturnRate={settings.globalReturnRate}
          />

          <CycleResults 
            cycles={results.cycles} 
            hasLeverage={leverageSettings.enabled} 
          />
          
          <Timeline 
            periods={results.periods}
            cycleDuration={settings.cycleDuration}
          />
          
          <InterestChart
            interestPeriods={results.interestPeriods}
            periods={results.periods}
            totalInvestment={amount}
            totalReturn={results.totalReturn}
            unusedFundsRate={settings.unusedFundsRate}
            cycleDuration={settings.cycleDuration}
            selectedCycle={selectedCycle}
          />
        </div>

        {/* Settings Dialog */}
        <SettingsDialog
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onSave={setSettings}
        />
      </div>
    </div>
  );
}

export default App;