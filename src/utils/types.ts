export interface LeverageInput {
  initialAmount: number;
  ltv: number;
  interestRate: number;
  creditRate: number;
  isLeveraged: boolean;
}

export interface CycleResults {
  cycleIndex: number;
  creditAmount: number;
  grossReturn: number;
  creditCost: number;
  netReturn: number;
  effectiveRate: number;
  remainingAmount: number;
  details: {
    baseAmount: number;
    leverageRatio: number;
    cumulativeReturn: number;
  };
}

export interface LeverageResults {
  initialAmount: number;
  creditAmount: number;
  totalAvailable: number;
  grossReturn: number;
  creditCost: number;
  netReturn: number;
  returnRate: number;
}