import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { parseCurrency, parsePercentage } from '../utils/formatting';
import { useLeverageCalculations } from '../hooks/useLeverageCalculations';
import CycleResultsDisplay from './CycleResults';
import { LeverageInput } from '../utils/types';

const LeverageCalculator: React.FC = () => {
  const [input, setInput] = useState<LeverageInput>({
    initialAmount: 1000000,
    ltv: 70,
    interestRate: 5,
    creditRate: 3,
    isLeveraged: false
  });

  const [numberOfCycles, setNumberOfCycles] = useState(12);
  
  const { calculateCycles } = useLeverageCalculations(input);

  const handleInputChange = useCallback((field: keyof LeverageInput, value: string) => {
    setInput(prev => ({
      ...prev,
      [field]: field === 'initialAmount' ? parseCurrency(value) : parsePercentage(value)
    }));
  }, []);

  const toggleLeverage = useCallback(() => {
    setInput(prev => ({
      ...prev,
      isLeveraged: !prev.isLeveraged
    }));
  }, []);

  const cycles = calculateCycles(numberOfCycles);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Calculateur d'Investissement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Montant Initial (€)
                </label>
                <Input
                  type="text"
                  value={input.initialAmount.toString()}
                  onChange={e => handleInputChange('initialAmount', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Taux de Rendement (%)
                </label>
                <Input
                  type="text"
                  value={input.interestRate.toString()}
                  onChange={e => handleInputChange('interestRate', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nombre de Cycles
                </label>
                <Input
                  type="number"
                  min="1"
                  max="120"
                  value={numberOfCycles}
                  onChange={e => setNumberOfCycles(parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Activer Effet de Levier</label>
                <Switch
                  checked={input.isLeveraged}
                  onCheckedChange={toggleLeverage}
                />
              </div>
              {input.isLeveraged && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      LTV (%)
                    </label>
                    <Input
                      type="text"
                      value={input.ltv.toString()}
                      onChange={e => handleInputChange('ltv', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Taux du Crédit (%)
                    </label>
                    <Input
                      type="text"
                      value={input.creditRate.toString()}
                      onChange={e => handleInputChange('creditRate', e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <CycleResultsDisplay 
        cycles={cycles}
        isLeveraged={input.isLeveraged}
      />
    </div>
  );
};

export default LeverageCalculator;