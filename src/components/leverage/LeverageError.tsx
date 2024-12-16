import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface LeverageErrorProps {
  message: string;
}

export const LeverageError: React.FC<LeverageErrorProps> = ({ message }) => {
  return (
    <Alert variant="destructive" className="bg-red-50 border-red-200">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800">
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default LeverageError;