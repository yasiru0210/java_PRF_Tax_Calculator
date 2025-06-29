package com.taxcalculator.service;

import com.taxcalculator.model.TaxResult;
import com.taxcalculator.model.SSCLTaxResult;
import com.taxcalculator.model.LeasingResult;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaxCalculationService {

    public TaxResult calculateRentTax(double paymentAmount) {
        if (paymentAmount <= 0) {
            throw new IllegalArgumentException("Payment amount must be greater than 0");
        }

        double rentTax = paymentAmount > 100000 ? 0.1 * (paymentAmount - 100000) : 0;
        
        if (rentTax > 0) {
            return new TaxResult(rentTax, null, paymentAmount - rentTax, paymentAmount);
        } else {
            return new TaxResult(0, "You don't have to pay Rent Tax.", paymentAmount, paymentAmount);
        }
    }

    public TaxResult calculateBankInterestTax(double annualInterest) {
        if (annualInterest <= 0) {
            throw new IllegalArgumentException("Annual interest amount must be greater than 0");
        }

        double bankInterestTax = 0.05 * annualInterest;
        return new TaxResult(bankInterestTax, null, annualInterest - bankInterestTax, annualInterest);
    }

    public TaxResult calculateDividendTax(double dividendAmount) {
        if (dividendAmount <= 0) {
            throw new IllegalArgumentException("Dividend amount must be greater than 0");
        }

        double dividendTax = 0;
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

        if (dividendTax > 0) {
            return new TaxResult(dividendTax, null, dividendAmount - dividendTax, dividendAmount);
        } else {
            return new TaxResult(0, "You don't have to pay Dividend Tax.", dividendAmount, dividendAmount);
        }
    }

    public TaxResult calculatePayableTax(double monthlySalary) {
        if (monthlySalary <= 0) {
            throw new IllegalArgumentException("Monthly salary must be greater than 0");
        }

        double payableTax = 0;
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

        if (payableTax > 0) {
            return new TaxResult(payableTax, null, monthlySalary - payableTax, monthlySalary);
        } else {
            return new TaxResult(0, "You don't have to pay Payable Tax.", monthlySalary, monthlySalary);
        }
    }

    public TaxResult calculateIncomeTax(double annualIncome) {
        if (annualIncome <= 0) {
            throw new IllegalArgumentException("Annual income must be greater than 0");
        }

        double incomeTax = 0;
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

        if (incomeTax > 0) {
            return new TaxResult(incomeTax, null, annualIncome - incomeTax, annualIncome);
        } else {
            return new TaxResult(0, "You don't have to pay Income Tax.", annualIncome, annualIncome);
        }
    }

    public SSCLTaxResult calculateSSCLTax(double valueOfGoods) {
        if (valueOfGoods <= 0) {
            throw new IllegalArgumentException("Value of goods must be greater than 0");
        }

        double saleTax = valueOfGoods * 0.025;
        double valueAfterSaleTax = valueOfGoods + saleTax;
        double vat = valueAfterSaleTax * 0.15;
        double totalSSCLTax = saleTax + vat;

        return new SSCLTaxResult(saleTax, vat, totalSSCLTax, valueOfGoods);
    }

    public LeasingResult calculateMonthlyInstallment(double leaseAmount, double annualInterestRate, int numberOfYears) {
        if (leaseAmount <= 0) {
            throw new IllegalArgumentException("Lease amount must be greater than 0");
        }
        if (annualInterestRate <= 0) {
            throw new IllegalArgumentException("Interest rate must be greater than 0");
        }
        if (numberOfYears <= 0 || numberOfYears > 5) {
            throw new IllegalArgumentException("Number of years must be between 1 and 5");
        }

        double monthlyInterestRate = annualInterestRate / 12 / 100;
        int numberOfMonths = numberOfYears * 12;
        double monthlyInstallment = (leaseAmount * monthlyInterestRate) /
                (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));

        return new LeasingResult(monthlyInstallment);
    }

    public LeasingResult searchLeasingCategory(double leaseAmount, double annualInterestRate) {
        if (leaseAmount <= 0) {
            throw new IllegalArgumentException("Lease amount must be greater than 0");
        }
        if (annualInterestRate <= 0) {
            throw new IllegalArgumentException("Interest rate must be greater than 0");
        }

        double monthlyInterestRate = annualInterestRate / 12 / 100;
        List<LeasingResult.LeasingCategory> categories = new ArrayList<>();

        for (int years = 3; years <= 5; years++) {
            int numberOfMonths = years * 12;
            double monthlyPayment = (leaseAmount * monthlyInterestRate) /
                    (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));
            
            categories.add(new LeasingResult.LeasingCategory(years, monthlyPayment));
        }

        return new LeasingResult(categories);
    }

    public LeasingResult findLeasingAmount(double monthlyPayment, double annualInterestRate, int numberOfYears) {
        if (monthlyPayment <= 0) {
            throw new IllegalArgumentException("Monthly payment must be greater than 0");
        }
        if (annualInterestRate <= 0) {
            throw new IllegalArgumentException("Interest rate must be greater than 0");
        }
        if (numberOfYears <= 0 || numberOfYears > 5) {
            throw new IllegalArgumentException("Number of years must be between 1 and 5");
        }

        double monthlyInterestRate = annualInterestRate / 12 / 100;
        int numberOfMonths = numberOfYears * 12;
        double leasingAmount = monthlyPayment * 
                ((1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths)) / monthlyInterestRate);

        LeasingResult result = new LeasingResult();
        result.setLeasingAmount(leasingAmount);
        return result;
    }
}