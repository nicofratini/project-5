export interface RepaymentScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  cumulativeInterest: number;
  investmentReturn: number;
  cumulativeInvestmentReturn: number;
  netCashFlow: number;
  usedCredit: number;
}

export interface LombardLoanMetrics {
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalInvestmentReturn: number;
  netReturn: number;
  schedule: RepaymentScheduleItem[];
  totalInvestment: number;
  leverageRatio: number;
  effectiveRate: number;
  maxUsedCredit: number;
}

export interface LeverageSettings {
  enabled: boolean;
  ratio: number;
  interestRate: number;
  investmentReturnRate: number;
  duration: number;
}

export interface LombardLoanInputs {
  ratio: number;
  interestRate: number;
  investmentReturnRate: number;
  duration: number;
}