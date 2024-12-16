import { LombardLoanInputs } from '../types/leverage';

export const validateLombardLoanInputs = (
  inputs: LombardLoanInputs,
  initialInvestment: number
): void => {
  const { ratio, interestRate, duration } = inputs;

  if (ratio < 0 || ratio > 100) {
    throw new Error('Le ratio de levier doit être compris entre 0 et 100%');
  }

  if (interestRate <= 0) {
    throw new Error('Le taux d\'intérêt doit être supérieur à 0');
  }

  if (duration <= 0 || !Number.isInteger(duration)) {
    throw new Error('La durée doit être un nombre entier positif de mois');
  }

  if (initialInvestment <= 0) {
    throw new Error('L\'investissement initial doit être supérieur à 0');
  }
};