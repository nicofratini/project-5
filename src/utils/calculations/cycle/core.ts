import { LeverageInput, LeverageResults } from '../../types';

/**
 * Calculate the base leveraged amount (credit amount) based on initial investment and LTV
 */
export const calculateBaseLeveragedAmount = (input: LeverageInput): number => {
  const { initialAmount, ltv } = input;
  return initialAmount * (ltv / 100);
};

/**
 * Calculate the total amount available for investment (initial + credit)
 */
export const calculateTotalAvailable = (input: LeverageInput): number => {
  const { initialAmount } = input;
  const leveragedAmount = calculateBaseLeveragedAmount(input);
  return initialAmount + leveragedAmount;
};

/**
 * Calculate gross return based on total investment amount and interest rate
 */
export const calculateGrossReturn = (amount: number, interestRate: number): number => {
  return amount * (interestRate / 100);
};

/**
 * Calculate credit cost based on leveraged amount and credit rate
 */
export const calculateCreditCost = (leveragedAmount: number, creditRate: number): number => {
  return leveragedAmount * (creditRate / 100);
};

/**
 * Main calculation function for leveraged investments
 */
export const calculateLeveragedResults = (input: LeverageInput): LeverageResults => {
  const creditAmount = calculateBaseLeveragedAmount(input);
  const totalAvailable = calculateTotalAvailable(input);
  const { interestRate, creditRate, initialAmount } = input;

  // CHANGEMENT ICI : Calcul du rendement basé sur le montant du crédit quand il y a effet de levier
  const grossReturn = calculateGrossReturn(creditAmount, interestRate); // Changé de totalAvailable à creditAmount
  const creditCost = calculateCreditCost(creditAmount, creditRate);
  const netReturn = grossReturn - creditCost;

  return {
    initialAmount,
    creditAmount,
    totalAvailable,
    grossReturn,
    creditCost,
    netReturn,
    returnRate: (netReturn / initialAmount) * 100
  };
};