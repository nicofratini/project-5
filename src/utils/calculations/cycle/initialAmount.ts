import { LeverageSettings } from '../../types/leverage';

interface InitialAmountParams {
  baseAmount: number;
  isFirstCycle: boolean;
  currentAmount: number;
  leverageSettings?: LeverageSettings;
}

export const calculateInitialAmount = ({
  baseAmount,
  isFirstCycle,
  currentAmount,
  leverageSettings
}: InitialAmountParams): number => {
  if (!isFirstCycle) {
    return currentAmount;
  }

  if (leverageSettings?.enabled) {
    const creditAmount = Math.round((baseAmount * leverageSettings.ratio) / 100);
    console.log('=== initialAmount.ts: Calcul du montant initial avec levier ===', {
      baseAmount,
      ratio: leverageSettings.ratio,
      creditAmount
    });
    return creditAmount;
  }

  return baseAmount;
};