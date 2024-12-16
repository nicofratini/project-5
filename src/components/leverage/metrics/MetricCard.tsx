import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: 'positive' | 'negative';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  trend
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
          </div>
          {trend && (
            <div className={`mt-1 ${trend === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'positive' ? (
                <ArrowUpIcon className="h-5 w-5" />
              ) : (
                <ArrowDownIcon className="h-5 w-5" />
              )}
            </div>
          )}
        </div>
        {description && (
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};