import type { InvestmentSettings } from '../../../components/SettingsDialog';
import type { LeverageSettings } from '../../types/leverage';
import type { InvestmentPeriod } from '../../types/investment';

interface CalculateCycleMetricsParams {
  baseAmount: number;
  periods: InvestmentPeriod[];
  settings: InvestmentSettings;
  leverageSettings: LeverageSettings;
  hasLeverage: boolean;
  totalCreditUsed: number;
  initialInvestment: number;
  creditLine: number;
}

export const calculateCycleMetrics = ({
  baseAmount,
  periods,
  settings,
  leverageSettings,
  hasLeverage,
  totalCreditUsed,
  initialInvestment,
  creditLine
}: CalculateCycleMetricsParams) => {
  // Utiliser le montant du crédit comme base si effet de levier activé
  const calculationBase = hasLeverage ? creditLine : baseAmount;

  console.log('=== cycle/metrics.ts: Calcul des métriques ===', {
    calculationBase,
    hasLeverage,
    creditLine,
    baseAmount
  });
  
  // Calcul du rendement brut
  const grossReturn = calculationBase * (
    hasLeverage ? leverageSettings.investmentReturnRate : settings.globalReturnRate
  ) / 100;

  // Calcul du coût du crédit
  const creditCost = hasLeverage
    ? calculationBase * (leverageSettings.interestRate / 100) * (settings.cycleDuration / 12)
    : 0;

  // Montant final après rendement et coûts
  const finalAmount = calculationBase + grossReturn - creditCost;

  // Gain net par rapport à l'investissement initial
  const netGain = finalAmount - initialInvestment;

  return {
    initialAmount: Math.round(calculationBase),
    finalAmount: Math.round(finalAmount),
    grossReturn: Math.round(grossReturn),
    creditCost: Math.round(creditCost),
    netGain: Math.round(netGain),
    creditUsed: Math.round(totalCreditUsed)
  };
};