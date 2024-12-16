import React from 'react';
import { motion } from 'framer-motion';
import { EuroIcon, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface InvestmentFormProps {
  value: string;
  onChange: (value: string) => void;
}

export const InvestmentForm: React.FC<InvestmentFormProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  
  const handleCalculate = () => {
    // Format the input value to ensure it's a valid number
    const numericValue = value.replace(/[^\d]/g, '');
    if (numericValue) {
      // Format with thousands separator
      const formattedValue = new Intl.NumberFormat('fr-FR').format(parseInt(numericValue));
      onChange(formattedValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and thousands separator
    const inputValue = e.target.value.replace(/[^\d,]/g, '');
    onChange(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <h2 className="text-center text-lg text-gray-700 font-medium mb-4">
        {t('input.title')}
      </h2>
      
      <div className="relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <EuroIcon className="h-5 w-5 text-gray-400" />
        </div>
        
        <motion.input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="block w-full pl-12 pr-20 py-3 text-lg border-2 border-blue-200 rounded-xl 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 
                   text-center font-medium bg-white/80 shadow-sm"
          placeholder={t('input.placeholder')}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          <motion.button
            onClick={handleCalculate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mr-2 px-4 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium 
                     flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <Calculator className="h-4 w-4" />
            <span>{t('input.calculate')}</span>
          </motion.button>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mt-3 text-sm text-gray-500 italic"
      >
        {t('input.disclaimer')}
      </motion.p>
    </motion.div>
  );
};