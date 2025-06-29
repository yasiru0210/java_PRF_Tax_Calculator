import { TaxResult, LeasingResult } from '../types';

export const calculateRentTax = (paymentAmount: number): TaxResult => {
  if (paymentAmount <= 0) {
    throw new Error('Payment amount must be greater than 0');
  }

  const rentTax = paymentAmount > 100000 ? 0.1 * (paymentAmount - 100000) : 0;
  
  return {
    amount: rentTax,
    message: rentTax > 0 ? undefined : "You don't have to pay Rent Tax."
  };
};

export const calculateBankInterestTax = (annualInterest: number): TaxResult => {
  if (annualInterest <= 0) {
    throw new Error('Annual interest amount must be greater than 0');
  }

  const bankInterestTax = 0.05 * annualInterest;
  
  return {
    amount: bankInterestTax
  };
};

export const calculateDividendTax = (dividendAmount: number): TaxResult => {
  if (dividendAmount <= 0) {
    throw new Error('Dividend amount must be greater than 0');
  }

  let dividendTax = 0;
  if (dividendAmount > 100000) {
    if (dividendAmount <= 141667) {
      dividendTax = 0.06 * (dividendAmount - 100000);
    } else if (dividendAmount <= 183333) {
      dividendTax = 0.12 * (dividendAmount - 141667) + 2500;
    } else if (dividendAmount <= 225000) {
      dividendTax = 0.18 * (dividendAmount - 183333) + 5500;
    } else if (dividendAmount <= 266667) {
      dividendTax = 0.24 * (dividendAmount - 225000) + 9000;
    } else if (dividendAmount <= 308333) {
      dividendTax = 0.30 * (dividendAmount - 266667) + 14000;
    } else {
      dividendTax = 0.36 * (dividendAmount - 308333) + 19500;
    }
  }

  return {
    amount: dividendTax,
    message: dividendTax > 0 ? undefined : "You don't have to pay Dividend Tax."
  };
};

export const calculatePayableTax = (monthlySalary: number): TaxResult => {
  if (monthlySalary <= 0) {
    throw new Error('Monthly salary must be greater than 0');
  }

  let payableTax = 0;
  if (monthlySalary > 100000) {
    if (monthlySalary <= 141667) {
      payableTax = 0.06 * (monthlySalary - 100000);
    } else if (monthlySalary <= 183333) {
      payableTax = 2500 + 0.12 * (monthlySalary - 141667);
    } else if (monthlySalary <= 225000) {
      payableTax = 5500 + 0.18 * (monthlySalary - 183333);
    } else if (monthlySalary <= 266667) {
      payableTax = 9000 + 0.24 * (monthlySalary - 225000);
    } else if (monthlySalary <= 308333) {
      payableTax = 14000 + 0.30 * (monthlySalary - 266667);
    } else {
      payableTax = 19500 + 0.36 * (monthlySalary - 308333);
    }
  }

  return {
    amount: payableTax,
    message: payableTax > 0 ? undefined : "You don't have to pay Payable Tax."
  };
};

export const calculateIncomeTax = (annualIncome: number): TaxResult => {
  if (annualIncome <= 0) {
    throw new Error('Annual income must be greater than 0');
  }

  let incomeTax = 0;
  if (annualIncome > 1200000) {
    if (annualIncome <= 1700000) {
      incomeTax = 0.06 * (annualIncome - 1200000);
    } else if (annualIncome <= 2200000) {
      incomeTax = 50000 + 0.12 * (annualIncome - 1700000);
    } else if (annualIncome <= 2700000) {
      incomeTax = 110000 + 0.18 * (annualIncome - 2200000);
    } else if (annualIncome <= 3200000) {
      incomeTax = 190000 + 0.24 * (annualIncome - 2700000);
    } else if (annualIncome <= 3700000) {
      incomeTax = 290000 + 0.30 * (annualIncome - 3200000);
    } else {
      incomeTax = 410000 + 0.36 * (annualIncome - 3700000);
    }
  }

  return {
    amount: incomeTax,
    message: incomeTax > 0 ? undefined : "You don't have to pay Income Tax."
  };
};

export const calculateSSCLTax = (valueOfGoods: number) => {
  if (valueOfGoods <= 0) {
    throw new Error('Value of goods must be greater than 0');
  }

  const saleTax = valueOfGoods * 0.025;
  const valueAfterSaleTax = valueOfGoods + saleTax;
  const vat = valueAfterSaleTax * 0.15;
  const totalSSCLTax = saleTax + vat;

  return {
    saleTax,
    vat,
    totalSSCLTax
  };
};

export const calculateMonthlyInstallment = (
  leaseAmount: number,
  annualInterestRate: number,
  numberOfYears: number
): LeasingResult => {
  if (leaseAmount <= 0) {
    throw new Error('Lease amount must be greater than 0');
  }
  if (annualInterestRate <= 0) {
    throw new Error('Interest rate must be greater than 0');
  }
  if (numberOfYears <= 0 || numberOfYears > 5) {
    throw new Error('Number of years must be between 1 and 5');
  }

  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const numberOfMonths = numberOfYears * 12;
  const monthlyInstallment = (leaseAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));

  return {
    monthlyInstallment
  };
};

export const searchLeasingCategory = (
  leaseAmount: number,
  annualInterestRate: number
): LeasingResult => {
  if (leaseAmount <= 0) {
    throw new Error('Lease amount must be greater than 0');
  }
  if (annualInterestRate <= 0) {
    throw new Error('Interest rate must be greater than 0');
  }

  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const categories = [];

  for (let years = 3; years <= 5; years++) {
    const numberOfMonths = years * 12;
    const monthlyPayment = (leaseAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));
    
    categories.push({
      years,
      monthlyPayment
    });
  }

  return {
    categories
  };
};

export const findLeasingAmount = (
  monthlyPayment: number,
  annualInterestRate: number,
  numberOfYears: number
): LeasingResult => {
  if (monthlyPayment <= 0) {
    throw new Error('Monthly payment must be greater than 0');
  }
  if (annualInterestRate <= 0) {
    throw new Error('Interest rate must be greater than 0');
  }
  if (numberOfYears <= 0 || numberOfYears > 5) {
    throw new Error('Number of years must be between 1 and 5');
  }

  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const numberOfMonths = numberOfYears * 12;
  const leasingAmount = monthlyPayment * 
    ((1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths)) / monthlyInterestRate);

  return {
    leasingAmount
  };
};