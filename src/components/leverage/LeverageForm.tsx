import React from 'react';
import { Input } from '@/components/ui/input';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { formatCurrency, parseCurrency } from '../../utils/formatting/currency';
import { formatPercentage, parsePercentage } from '../../utils/formatting/percentage';
import type { LeverageSettings } from '../../utils/types';

interface LeverageFormProps {
  settings: LeverageSettings;
  onChange: (settings: LeverageSettings) => void;
  baseAmount: number;
}

export const LeverageForm: React.FC<LeverageFormProps> = ({
  settings,
  onChange,
  baseAmount
}) => {
  const { t } = useTranslation();

  // Calcul des montants basés sur les paramètres
  const creditAmount = baseAmount * (settings.ratio / 100);
  const totalAmount = baseAmount + creditAmount;

  const handleRatioChange = (value: string) => {
    const newRatio = parsePercentage(value);
    if (newRatio >= 0 && newRatio <= 100) {
      onChange({ ...settings, ratio: newRatio });
    }
  };

  const handleInterestRateChange = (value: string) => {
    const newRate = parsePercentage(value);
    if (newRate >= 0 && newRate <= 100) {
      onChange({ ...settings, interestRate: newRate });
    }
  };

  return (
    <div className="space-y-6">
      {/* Résumé des montants */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-primary/5 rounded-lg">
        <div>
          <p className="text-sm text-gray-500">{t('leverage.form.baseAmount')}</p>
          <p className="text-lg font-semibold">{formatCurrency(baseAmount)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t('leverage.form.creditAmount')}</p>
          <p className="text-lg font-semibold">{formatCurrency(creditAmount)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t('leverage.form.totalAmount')}</p>
          <p className="text-lg font-semibold">{formatCurrency(totalAmount)}</p>
        </div>
      </div>

      {/* Formulaire des paramètres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t('leverage.form.ltvRatio')}
          </label>
          <Input
            type="text"
            value={formatPercentage(settings.ratio)}
            onChange={(e) => handleRatioChange(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-gray-500">
            {t('leverage.form.ltvRatioHelp')}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t('leverage.form.creditRate')}
          </label>
          <Input
            type="text"
            value={formatPercentage(settings.interestRate)}
            onChange={(e) => handleInterestRateChange(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-gray-500">
            {t('leverage.form.creditRateHelp')}
          </p>
        </div>
      </div>

      {/* Avertissement */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          {t('leverage.form.warning')}
        </p>
      </div>
    </div>
  );
};

export default LeverageForm;