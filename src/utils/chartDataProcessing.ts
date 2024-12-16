export const processChartData = (
  interestPeriods: InterestPeriod[],
  periods: InvestmentPeriod[],
  totalInvestment: number,
  finalReturn: number,
  cycleDuration: number,
  selectedCycle: number
): ChartDataPoint[] => {
  const monthlyData: ChartDataPoint[] = [];
  let cumulativeInterest = 0;
  let cumulativeFundCalls = 0;

  // Maps pour les recherches rapides
  const fundCallsMap = new Map(periods.map(period => [period.month, period]));
  const interestPeriodsMap = new Map();
  
  interestPeriods.forEach(period => {
    for (let month = period.startMonth; month < period.endMonth; month++) {
      interestPeriodsMap.set(month, period);
    }
  });

  // Traitement mois par mois
  for (let month = 0; month <= cycleDuration * selectedCycle; month++) {
    const currentPeriod = interestPeriodsMap.get(month);
    const fundCall = fundCallsMap.get(month);
    const cycleNumber = Math.floor(month / cycleDuration) + 1;
    
    // Mise à jour des appels de fonds cumulés
    if (fundCall) {
      cumulativeFundCalls += fundCall.amount;
    }

    // Les fonds non utilisés sont le montant initial moins les appels de fonds cumulés
    const unusedFunds = Math.max(0, totalInvestment - cumulativeFundCalls);

    // Calcul des intérêts
    const monthlyInterest = currentPeriod ? currentPeriod.monthlyInterest : 0;
    cumulativeInterest += monthlyInterest;

    // Gestion des fins de cycle
    const isCycleEnd = month > 0 && month % cycleDuration === 0;
    const cycleEndAmount = isCycleEnd ? 
      (finalReturn * (cycleNumber - 1) / selectedCycle) : 0;

    monthlyData.push({
      month,
      unusedFunds: Math.round(unusedFunds),
      cumulativeInterest: Math.round(cumulativeInterest),
      monthlyInterest: Math.round(monthlyInterest),
      fundCall: Math.round(fundCall?.amount || 0),
      cycleEnd: Math.round(cycleEndAmount),
      cycleNumber,
    });
  }

  // Ajout du retour final
  if (monthlyData.length > 0) {
    monthlyData[monthlyData.length - 1].cycleEnd = Math.round(finalReturn);
  }

  return monthlyData;
};