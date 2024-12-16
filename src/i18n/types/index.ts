export type TranslationKey = string;

export interface Translation {
  title: string;
  disclaimer: {
    title: string;
    content: string;
  };
  input: {
    title: string;
    placeholder: string;
    calculate: string;
    disclaimer: string;
  };
  results: {
    totalInvestment: string;
    profit: string;
    percentageGrowth: string;
    totalReturn: {
      title: string;
      description: string;
    };
    netGain: {
      title: string;
      description: string;
    };
    globalRate: {
      title: string;
      description: string;
    };
    annualRate: {
      title: string;
      description: string;
    };
  };
  timeline: {
    title: string;
    period: string;
    details: string;
    cycle: string;
    totalAmount: string;
    month: string;
    percentage: string;
    amount: string;
    progress: string;
  };
  leverage: {
    toggle: string;
    settings: {
      title: string;
      ratio: string;
      ratioHelp: string;
      interestRate: string;
      investmentReturnRate: string;
      duration: string;
    };
    results: {
      title: string;
      loanAmount: string;
      monthlyPayment: string;
      totalInterest: string;
      totalInvestmentReturn: string;
      netReturn: string;
      totalInvestment: string;
      effectiveRate: string;
      usedCredit: string;
    };
    validation: {
      ratioRange: string;
      positiveRate: string;
      positiveDuration: string;
      positiveInvestment: string;
      returnRateHigher: string;
    };
  };
  settings: {
    title: string;
    globalRate: {
      label: string;
      description: string;
    };
    unusedFundsRate: {
      label: string;
      description: string;
    };
    duration: {
      label: string;
      description: string;
      months: string;
    };
    paymentSchedule: {
      label: string;
      month: string;
      percentage: string;
      add: string;
    };
    buttons: {
      cancel: string;
      save: string;
    };
  };
  cycles: {
    title: string;
    descriptions: {
      1: string;
      2: string;
      3: string;
    };
    details: {
      cycleNumber: string;
      title: string;
      initialAmount: string;
      finalAmount: string;
      netGain: string;
      unusedFundsInterest: string;
      cycleReturn: string;
    };
  };
  chart: {
    label: string;
    unusedFunds: {
      title: string;
      description: string;
    };
    interest: {
      title: string;
      description: string;
    };
    fundCalls: {
      title: string;
      description: string;
    };
    cashback: {
      title: string;
      description: string;
    };
    initialAmount: string;
    finalAmount: string;
    cycle: string;
    cycleReturn: string;
  };
}