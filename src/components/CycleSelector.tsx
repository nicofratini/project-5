import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CycleSelectorProps {
  selectedCycle: string;
  onChange: (cycle: string) => void;
  cycleDuration: number;
}

export const CycleSelector: React.FC<CycleSelectorProps> = ({
  selectedCycle,
  onChange,
  cycleDuration,
}) => {
  const { t } = useTranslation();

  const cycles = [
    { value: '1', duration: cycleDuration },
    { value: '2', duration: cycleDuration * 2 },
    { value: '3', duration: cycleDuration * 3 },
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-2">
        <Clock className="w-5 h-5 text-gray-500" />
        <span className="text-base font-medium text-gray-700">
          {t('cycles.title')}
        </span>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        {cycles.map((cycle) => (
          <motion.button
            key={cycle.value}
            onClick={() => onChange(cycle.value)}
            className={`
              relative px-6 py-3 rounded-xl transition-all duration-200
              ${selectedCycle === cycle.value
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-blue-200'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-base font-semibold whitespace-nowrap">
                {cycle.value} {t('cycles.title')} ({cycle.duration} {t('settings.duration.months')})
              </span>
              <span className="text-sm opacity-80">
                {t(`cycles.descriptions.${cycle.value}`)}
              </span>
            </div>
            {selectedCycle === cycle.value && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-blue-500 rounded-xl -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};