import React from 'react';
import { motion } from 'framer-motion';
import { Settings, X, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface InvestmentSettings {
  globalReturnRate: number;
  unusedFundsRate: number;
  cycleDuration: number;
  paymentSchedule: Array<{
    month: number;
    percentage: number;
  }>;
}

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  settings: InvestmentSettings;
  onSave: (settings: InvestmentSettings) => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const { t } = useTranslation();
  const [localSettings, setLocalSettings] = React.useState<InvestmentSettings>(settings);

  const addPaymentPeriod = () => {
    setLocalSettings(prev => ({
      ...prev,
      paymentSchedule: [
        ...prev.paymentSchedule,
        { month: prev.cycleDuration, percentage: 5 }
      ]
    }));
  };

  const removePaymentPeriod = (index: number) => {
    setLocalSettings(prev => ({
      ...prev,
      paymentSchedule: prev.paymentSchedule.filter((_, i) => i !== index)
    }));
  };

  const updatePaymentPeriod = (index: number, field: 'month' | 'percentage', value: number) => {
    setLocalSettings(prev => ({
      ...prev,
      paymentSchedule: prev.paymentSchedule.map((period, i) => 
        i === index ? { ...period, [field]: value } : period
      )
    }));
  };

  const handleSave = () => {
    const sortedSchedule = [...localSettings.paymentSchedule].sort((a, b) => a.month - b.month);
    onSave({
      ...localSettings,
      paymentSchedule: sortedSchedule,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {t('settings.title')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('settings.globalRate.label')}
            </label>
            <input
              type="number"
              value={localSettings.globalReturnRate}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  globalReturnRate: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('settings.unusedFundsRate.label')}
            </label>
            <input
              type="number"
              value={localSettings.unusedFundsRate}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  unusedFundsRate: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('settings.duration.label')}
            </label>
            <input
              type="number"
              value={localSettings.cycleDuration}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  cycleDuration: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {t('settings.paymentSchedule.label')}
              </label>
              <button
                onClick={addPaymentPeriod}
                className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {t('settings.paymentSchedule.add')}
                </span>
              </button>
            </div>

            <div className="space-y-3">
              {localSettings.paymentSchedule.map((period, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">
                      {t('settings.paymentSchedule.month')}
                    </label>
                    <input
                      type="number"
                      value={period.month}
                      onChange={(e) => updatePaymentPeriod(index, 'month', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">
                      {t('settings.paymentSchedule.percentage')}
                    </label>
                    <input
                      type="number"
                      value={period.percentage}
                      onChange={(e) => updatePaymentPeriod(index, 'percentage', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => removePaymentPeriod(index)}
                    className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {t('settings.buttons.cancel')}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t('settings.buttons.save')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};