import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { formatCurrency } from '../utils/formatting/currency';
import { formatPercentage } from '../utils/formatting/percentage';
import { CycleResults } from '../utils/types';

interface CycleResultsProps {
  cycles: CycleResults[];
  isLeveraged: boolean;
}

export const CycleResultsDisplay: React.FC<CycleResultsProps> = ({
  cycles,
  isLeveraged
}) => {
  const chartData = cycles.map(cycle => ({
    name: `Cycle ${cycle.cycleIndex}`,
    'Rendement Brut': cycle.grossReturn,
    'Coût du Crédit': cycle.creditCost,
    'Rendement Net': cycle.netReturn,
    'Taux Effectif': cycle.effectiveRate
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Résultats des Cycles d'Investissement
          {isLeveraged && ' (Avec Effet de Levier)'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Graphique des résultats */}
        <div className="h-96 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="montant" orientation="left" />
              <YAxis yAxisId="taux" orientation="right" unit="%" />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === 'Taux Effectif') {
                    return [formatPercentage(value), name];
                  }
                  return [formatCurrency(value), name];
                }}
              />
              <Legend />
              <Line
                yAxisId="montant"
                type="monotone"
                dataKey="Rendement Brut"
                stroke="#4CAF50"
                activeDot={{ r: 8 }}
              />
              {isLeveraged && (
                <Line
                  yAxisId="montant"
                  type="monotone"
                  dataKey="Coût du Crédit"
                  stroke="#f44336"
                  activeDot={{ r: 8 }}
                />
              )}
              <Line
                yAxisId="montant"
                type="monotone"
                dataKey="Rendement Net"
                stroke="#2196F3"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="taux"
                type="monotone"
                dataKey="Taux Effectif"
                stroke="#9C27B0"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tableau des résultats détaillés */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-primary/5">
                <th className="p-2 text-left">Cycle</th>
                <th className="p-2 text-right">Montant Crédit</th>
                <th className="p-2 text-right">Rendement Brut</th>
                <th className="p-2 text-right">Coût Crédit</th>
                <th className="p-2 text-right">Rendement Net</th>
                <th className="p-2 text-right">Taux Effectif</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycle) => (
                <tr key={cycle.cycleIndex} className="border-b">
                  <td className="p-2">Cycle {cycle.cycleIndex}</td>
                  <td className="p-2 text-right">{formatCurrency(cycle.creditAmount)}</td>
                  <td className="p-2 text-right">{formatCurrency(cycle.grossReturn)}</td>
                  <td className="p-2 text-right">{formatCurrency(cycle.creditCost)}</td>
                  <td className="p-2 text-right">{formatCurrency(cycle.netReturn)}</td>
                  <td className="p-2 text-right">{formatPercentage(cycle.effectiveRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Résumé des totaux */}
        <div className="mt-8 p-4 bg-primary/5 rounded-lg">
          <h3 className="font-semibold mb-4">Résumé Global</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Rendement Brut</p>
              <p className="text-lg font-semibold">
                {formatCurrency(
                  cycles.reduce((sum, cycle) => sum + cycle.grossReturn, 0)
                )}
              </p>
            </div>
            {isLeveraged && (
              <div>
                <p className="text-sm text-muted-foreground">Total Coût Crédit</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(
                    cycles.reduce((sum, cycle) => sum + cycle.creditCost, 0)
                  )}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Total Rendement Net</p>
              <p className="text-lg font-semibold">
                {formatCurrency(
                  cycles.reduce((sum, cycle) => sum + cycle.netReturn, 0)
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Taux Moyen</p>
              <p className="text-lg font-semibold">
                {formatPercentage(
                  cycles.reduce((sum, cycle) => sum + cycle.effectiveRate, 0) / cycles.length
                )}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CycleResultsDisplay;