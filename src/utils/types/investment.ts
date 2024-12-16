export interface PeriodResult {
  month: number;
  percentage: number;
  amount: number;
  remainingAfterCall: number;
  creditUsed: number;
  cycle: number;
  totalFundCalls: number; // Ajout du total cumulé des appels de fonds
}

export interface InterestPeriod {
  startMonth: number;
  endMonth: number;
  monthlyInterest: number;
  unusedAmount: number;
}

export interface InvestmentPeriod {
  month: number;
  percentage: number;
  amount: number;
  remainingAfterCall: number;
  cycle: number;
  creditUsed?: number;
  totalFundCalls: number; // Ajout du total cumulé des appels de fonds
}

export interface CycleResult {
  cycleNumber: number;
  initialAmount: number;
  finalAmount: number;
  netGain: number;
  unusedFundsInterest: number;
  creditUsed: number;
}