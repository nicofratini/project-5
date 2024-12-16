import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InvestmentForm } from './components/InvestmentForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Timeline } from './components/Timeline';
import { InterestChart } from './components/InterestChart';
import { CycleSelector } from './components/CycleSelector';
import { CycleResults } from './components/CycleResults';
import { SettingsButton } from './components/SettingsButton';
import { LanguageSelector } from './components/LanguageSelector';
import { SettingsDialog, InvestmentSettings } from './components/SettingsDialog';
import { calculateMultiCycleResults } from './utils/calculations';
import { CycleType } from './utils/types';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const [investmentInput, setInvestmentInput] = useState('1000000');
  const [selectedCycle, setSelectedCycle] = useState<CycleType>('1');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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

  console.log("=== App.tsx: Avant le calcul ===", {
    investmentInput,
    selectedCycle,
    settings,
  });

  const results = React.useMemo(() => {
    console.log("Appel de calculateMultiCycleResults !");
    return calculateMultiCycleResults(amount, selectedCycle, settings);
  }, [amount, selectedCycle, settings]);

  console.log("=== App.tsx: Résultats calculés ===", results);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-[1600px]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t('title')}
          </h1>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <SettingsButton onClick={() => setIsSettingsOpen(true)} />
          </div>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-full max-w-xl">
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
            </div>
          </motion.div>

          <ResultsDisplay
            totalReturn={results.totalReturn}
            netGain={results.netGain}
            unusedFundsInterest={results.totalUnusedFundsInterest}
            annualizedRate={results.annualizedRate}
            totalRate={results.totalRate}
            totalDuration={results.totalDuration}
            globalReturnRate={settings.globalReturnRate}
          />

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6"
          >
            <CycleResults cycles={results.cycles} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6"
          >
            <Timeline periods={results.periods} cycleDuration={settings.cycleDuration} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6"
          >
            <InterestChart
              interestPeriods={results.interestPeriods}
              periods={results.periods}
              totalInvestment={amount}
              totalReturn={results.totalReturn}
              unusedFundsRate={settings.unusedFundsRate}
              cycleDuration={settings.cycleDuration}
              selectedCycle={selectedCycle}
            />
          </motion.section>
        </div>

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
