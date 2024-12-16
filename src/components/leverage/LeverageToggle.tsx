import React from 'react';
import { useTranslation } from 'react-i18next';
import { Scale } from 'lucide-react';

interface LeverageToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export const LeverageToggle: React.FC<LeverageToggleProps> = ({ enabled, onChange }) => {
  const { t } = useTranslation();
  const toggleId = React.useId();

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
      <label htmlFor={toggleId} className="flex items-center gap-2 cursor-pointer">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Scale className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700">
            {t('leverage.toggle')}
          </span>
          <p className="text-xs text-gray-500 mt-0.5">
            {enabled ? t('leverage.enabled') : t('leverage.disabled')}
          </p>
        </div>
      </label>
      <button
        id={toggleId}
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${enabled ? 'bg-blue-500' : 'bg-gray-200'}
        `}
      >
        <span className="sr-only">{t('leverage.toggle')}</span>
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
};