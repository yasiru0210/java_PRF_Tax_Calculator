
import java.util.Scanner;

public class taxcalculator {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int option;
        do {
            System.out.println("TAX CALCULATOR");
            System.out.println("[1] Withholding Tax");
            System.out.println("[2] Payable Tax");
            System.out.println("[3] Income Tax");
            System.out.println("[4] Social Security Contribution Levy (55CL) Tax");
            System.out.println("[5] Leasing Payment");
            System.out.println("[6] Exit");
            System.out.print("Enter an option to continue: ");
            option = scanner.nextInt();

            switch (option) {
                case 1:
                    calculateWithholdingTax();
                    break;
                case 2:
                    calculatePayableTax();
                    break;
                case 3:
                    calculateIncomeTax();
                    break;
                case 4:
                    calculateSocialSecurityContributionTax();
                    break;
                case 5:
            
                calculateLeasingPayment(scanner); // Pass the Scanner object as an argument
                break;
                
                case 6:
                    System.out.println("Exiting...");
                    break;
                default:
                    System.out.println("Invalid option. Please enter a number between 1 and 6.");
                    break;
            }
        } while (option != 6);

        scanner.close();
    }

    private static void calculateWithholdingTax() {
        Scanner scanner = new Scanner(System.in);

        int option;
        do {
            System.out.println("WITHHOLDING TAX");
            System.out.println("[1] Rent Tax");
            System.out.println("[2] Bank Interest Tax");
            System.out.println("[3] Dividend Tax");
            System.out.println("[4] Exit");
            System.out.print("Enter an option to continue: ");
            option = scanner.nextInt();

            switch (option) {
                case 1:
                    calculateRentTax();
                    break;
                case 2:
                    calculateBankInterestTax();
                    break;
                case 3:
                    calculateDividendTax();
                    break;
                case 4:
                    System.out.println("Exiting...");
                    break;
                default:
                    System.out.println("Invalid option. Please enter a number between 1 and 4.");
                    break;
            }
        } while (option != 4);

        scanner.close();
    }

    private static void calculateRentTax() {
        Scanner scanner = new Scanner(System.in);

        double paymentAmount;
        do {
            System.out.print("Enter the payment amount: Rs.");
            while (!scanner.hasNextDouble()) {
                System.out.println("Invalid input. Please enter a valid payment amount.");
                scanner.next();
            }
            paymentAmount = scanner.nextDouble();
            if (paymentAmount <= 0) {
                System.out.println("Payment amount cannot be negative or zero. Please enter a valid payment amount.");
            }
        } while (paymentAmount <= 0);

        double rentTax = 0;
        if (paymentAmount > 100000) {
            rentTax = 0.1 * (paymentAmount - 100000);
        }

        if (rentTax > 0) {
            System.out.println("Rent Tax: Rs." + rentTax);
        } else {
            System.out.println("You don't have to pay Rent Tax.");
        }

        char choice;
        do {
            System.out.print("Do you want to calculate Rent Tax again? (Y/N): ");
            choice = scanner.next().charAt(0);
            if (choice != 'Y' && choice != 'N') {
                System.out.println("Invalid choice. Please enter 'Y' or 'N'.");
            }
        } while (choice != 'Y' && choice != 'N');

        if (choice == 'Y') {
            calculateRentTax();
        }

        scanner.close();
    }

    private static void calculateBankInterestTax() {
        Scanner scanner = new Scanner(System.in);

        double annualInterest;
        do {
            System.out.print("Enter the annual bank interest amount: Rs.");
            while (!scanner.hasNextDouble()) {
                System.out.println("Invalid input. Please enter a valid annual interest amount.");
                scanner.next();
            }
            annualInterest = scanner.nextDouble();
            if (annualInterest <= 0) {
                System.out.println("Annual interest amount cannot be negative or zero. Please enter a valid amount.");
            }
        } while (annualInterest <= 0);

        double bankInterestTax = 0.05 * annualInterest;

        System.out.println("Bank Interest Tax: Rs." + bankInterestTax);

        char choice;
        do {
            System.out.print("Do you want to calculate Bank Interest Tax again? (Y/N): ");
            choice = scanner.next().charAt(0);
            if (choice != 'Y' && choice != 'N') {
                System.out.println("Invalid choice. Please enter 'Y' or 'N'.");
            }
        } while (choice != 'Y' && choice != 'N');

        if (choice == 'Y') {
            calculateBankInterestTax();
        }

        scanner.close();
    }

    private static void calculateDividendTax() {
        Scanner scanner = new Scanner(System.in);

        double dividendAmount;
        do {
            System.out.print("Enter the dividend amount: Rs.");
            while (!scanner.hasNextDouble()) {
                System.out.println("Invalid input. Please enter a valid dividend amount.");
                scanner.next();
            }
            dividendAmount = scanner.nextDouble();
            if (dividendAmount <= 0) {
                System.out.println("Dividend amount cannot be negative or zero. Please enter a valid amount.");
            }
        } while (dividendAmount <= 0);

        double dividendTax = 0;
        if (dividendAmount > 100000) {
            if (dividendAmount <= 141667) {
                dividendTax = 0.06 * (dividendAmount - 100000);
            } else if (dividendAmount <= 183333) {
                dividendTax = 0.12 * (dividendAmount - 141667) + 2500; // Rs.41,667 * 6%
            } else if (dividendAmount <= 225000) {
                dividendTax = 0.18 * (dividendAmount - 183333) + 5500; // Rs.41,666 * 6% + Rs.41,667 * 12%
            } else if (dividendAmount <= 266667) {
                dividendTax = 0.24 * (dividendAmount - 225000) + 9000; // Rs.41,666 * 6% + Rs.41,667 * 12% + Rs.41,667 * 18%
            } else if (dividendAmount <= 308333) {
                dividendTax = 0.30 * (dividendAmount - 266667) + 14000; // Rs.41,666 * 6% + Rs.41,667 * 12% + Rs.41,667 * 18% + Rs.41,667 * 24%
            } else {
                dividendTax = 0.36 * (dividendAmount - 308333) + 19500; // Rs.41,666 * 6% + Rs.41,667 * 12% + Rs.41,667 * 18% + Rs.41,667 * 24% + Rs.41,667 * 30%
            }
        }

        if (dividendTax > 0) {
            System.out.println("Dividend Tax: Rs." + dividendTax);
        } else {
            System.out.println("You don't have to pay Dividend Tax.");
        }

        char choice;
        do {
            System.out.print("Do you want to calculate Dividend Tax again? (Y/N): ");
            choice = scanner.next().charAt(0);
            if (choice != 'Y' && choice != 'N') {
                System.out.println("Invalid choice. Please enter 'Y' or 'N'.");
            }
        } while (choice != 'Y' && choice != 'N');

        if (choice == 'Y') {
            calculateDividendTax();
        }

        scanner.close();
    }

    private static void calculatePayableTax() {
        Scanner scanner = new Scanner(System.in);

        double monthlySalary;
        do {
            System.out.print("Enter your monthly salary: Rs.");
            while (!scanner.hasNextDouble()) {
                System.out.println("Invalid input. Please enter a valid salary amount.");
                scanner.next();
            }
            monthlySalary = scanner.nextDouble();
            if (monthlySalary <= 0) {
                System.out.println("Monthly salary cannot be negative or zero. Please enter a valid amount.");
            }
        } while (monthlySalary <= 0);

        double payableTax = 0;
        if (monthlySalary > 100000) {
            if (monthlySalary <= 141667) {
                payableTax = 0.06 * (monthlySalary - 100000);
            } else if (monthlySalary <= 183333) {
                payableTax = 2500 + 0.12 * (monthlySalary - 141667); // Rs.41,667 * 6%
            } else if (monthlySalary <= 225000) {
                payableTax = 5500 + 0.18 * (monthlySalary - 183333); // Rs.41,667 * 6% + Rs.41,667 * 12%
            } else if (monthlySalary <= 266667) {
                payableTax = 9000 + 0.24 * (monthlySalary - 225000); // Rs.41,667 * 6% + Rs.41,667 * 12% + Rs.41,667 * 18%
            } else if (monthlySalary <= 308333) {
                payableTax = 14000 + 0.30 * (monthlySalary - 266667); // Rs.41,667 * 6% + Rs.41,667 * 12% + Rs.41,667 * 18% + Rs.41,667 * 24%
            } else {
                payableTax = 19500 + 0.36 * (monthlySalary - 308333); // Rs.41,667 * 6% + Rs.41,667 * 12% + Rs.41,667 * 18% + Rs.41,667 * 24% + Rs.41,667 * 30%
            }
        }

        if (payableTax > 0) {
            System.out.println("Payable Tax: Rs." + payableTax);
        } else {
            System.out.println("You don't have to pay Payable Tax.");
        }

        char choice;
        do {
            System.out.print("Do you want to calculate Payable Tax again? (Y/N): ");
            choice = scanner.next().charAt(0);
            if (choice != 'Y' && choice != 'N') {
                System.out.println("Invalid choice. Please enter 'Y' or 'N'.");
            }
        } while (choice != 'Y' && choice != 'N');

        if (choice == 'Y') {
            calculatePayableTax();
        }
         scanner.close();
    }
        
         private static void calculateIncomeTax() {
        Scanner scanner = new Scanner(System.in);

        double annualIncome;
        do {
            System.out.print("Enter your annual income: Rs.");
            while (!scanner.hasNextDouble()) {
                System.out.println("Invalid input. Please enter a valid income amount.");
                scanner.next();
            }
            annualIncome = scanner.nextDouble();
            if (annualIncome <= 0) {
                System.out.println("Annual income cannot be negative or zero. Please enter a valid amount.");
            }
        } while (annualIncome <= 0);

        double incomeTax = 0;
        if (annualIncome > 1200000) {
            if (annualIncome <= 1700000) {
                incomeTax = 0.06 * (annualIncome - 1200000);
            } else if (annualIncome <= 2200000) {
                incomeTax = 50000 + 0.12 * (annualIncome - 1700000); // Rs.500000 * 6%
            } else if (annualIncome <= 2700000) {
                incomeTax = 110000 + 0.18 * (annualIncome - 2200000); // Rs.500000 * 6% + Rs.500000 * 12%
            } else if (annualIncome <= 3200000) {
                incomeTax = 190000 + 0.24 * (annualIncome - 2700000); // Rs.500000 * 6% + Rs.500000 * 12% + Rs.500000 * 18%
            } else if (annualIncome <= 3700000) {
                incomeTax = 290000 + 0.30 * (annualIncome - 3200000); // Rs.500000 * 6% + Rs.500000 * 12% + Rs.500000 * 18% + Rs.500000 * 24%
            } else {
                incomeTax = 410000 + 0.36 * (annualIncome - 3700000); // Rs.500000 * 6% + Rs.500000 * 12% + Rs.500000 * 18% + Rs.500000 * 24% + (remainder * 30%)
            }
        }

        if (incomeTax > 0) {
            System.out.println("Income Tax: Rs." + incomeTax);
        } else {
            System.out.println("You don't have to pay Income Tax.");
        }

        char choice;
        do {
            System.out.print("Do you want to calculate Income Tax again? (Y/N): ");
            choice = scanner.next().charAt(0);
            if (choice != 'Y' && choice != 'N') {
                System.out.println("Invalid choice. Please enter 'Y' or 'N'.");
            }
        } while (choice != 'Y' && choice != 'N');

        if (choice == 'Y') {
            calculateIncomeTax();
        }
         scanner.close();
    }
    
    private static void calculateSocialSecurityContributionTax() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("\nCalculating Social Security Contribution Levy (SSCL) Tax...");

        System.out.print("Enter the value of goods: ");
        double valueOfGoods = scanner.nextDouble();
        double saleTax = valueOfGoods * 0.025;
        double valueAfterSaleTax = valueOfGoods + saleTax;

        double vat = valueAfterSaleTax * 0.15;
        double totalSSCLTax = saleTax + vat;

        System.out.println("Sale Tax: " + saleTax);
        System.out.println("VAT: " + vat);
        System.out.println("Total SSCL Tax: " + totalSSCLTax);

        System.out.print("Do you want to calculate SSCL Tax again? (Y/N): ");
        String choice = scanner.next();
        if (!choice.equalsIgnoreCase("Y")) {
            System.out.println("Returning to Main Menu...");
            scanner.close();
            return;
        }
        
        scanner.close();
        calculateSSCLTax(); // Recursive call to calculate SSCL Tax again
    }

    
    private static void calculateLeasingPayment(Scanner scanner) {
        System.out.println("\nLeasing Payment System");
        System.out.println("1. Calculate Monthly Installment");
        System.out.println("2. Search Leasing Category");
        System.out.println("3. Find Leasing Amount");
        System.out.println("4. Exit to Main Menu");
        System.out.print("Enter an option to continue -> ");
        int option = scanner.nextInt();

        switch (option) {
            case 1:
                calculateMonthlyInstallment(scanner);
                break;
            case 2:
                searchLeasingCategory(scanner);
                break;
            case 3:
                findLeasingAmount(scanner);
                break;
            case 4:
                System.out.println("Exiting to Main Menu...");
                break;
            default:
                System.out.println("Invalid option selected. Please select a valid option.");
                break;
        }
    }

    private static void calculateMonthlyInstallment(Scanner scanner) {
        System.out.println("\nCalculate Monthly Installment System");
        System.out.print("Enter the lease amount: ");
        double leaseAmount = scanner.nextDouble();
        if (leaseAmount <= 0) {
            System.out.println("Invalid lease amount. Please enter a valid amount.");
            return;
        }

        System.out.print("Enter the annual interest rate (%): ");
        double annualInterestRate = scanner.nextDouble();
        if (annualInterestRate <= 0) {
            System.out.println("Invalid annual interest rate. Please enter a rate greater than 0.");
            return;
        }

        System.out.print("Enter the number of years (max 5 years): ");
        int numberOfYears = scanner.nextInt();
        if (numberOfYears <= 0 || numberOfYears > 5) {
            System.out.println("Invalid number of years. Please enter a number between 1 and 5.");
            return;
        }

        double monthlyInterestRate = annualInterestRate / 12 / 100;
        int numberOfMonths = numberOfYears * 12;
        double monthlyInstallment = (leaseAmount * monthlyInterestRate) /
                (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));

        System.out.println("Monthly Installment: " + monthlyInstallment);

        // Prompt whether to calculate Monthly Installment again or go back to the main menu
        System.out.print("Do you want to calculate Monthly Installment again? (Y/N): ");
        String choice = scanner.next();
        if (!choice.equalsIgnoreCase("Y")) {
            System.out.println("Returning to Main Menu...");
        }
    }

    private static void searchLeasingCategory(Scanner scanner) {
        System.out.println("\nSearch Leasing Category System");
        System.out.print("Enter the lease amount: ");
        double leaseAmount = scanner.nextDouble();
        if (leaseAmount <= 0) {
            System.out.println("Invalid lease amount. Please enter a valid amount.");
            return;
        }

        System.out.print("Enter the annual interest rate (%): ");
        double annualInterestRate = scanner.nextDouble();
        if (annualInterestRate <= 0) {
            System.out.println("Invalid annual interest rate. Please enter a rate greater than 0.");
            return;
        }

        double monthlyInterestRate = annualInterestRate / 12 / 100;

        System.out.println("Monthly payments for 3 years:");
        calculateMonthlyPayments(leaseAmount, monthlyInterestRate, 3);
        System.out.println("Monthly payments for 4 years:");
        calculateMonthlyPayments(leaseAmount, monthlyInterestRate, 4);
        System.out.println("Monthly payments for 5 years:");
        calculateMonthlyPayments(leaseAmount, monthlyInterestRate, 5);
    }

    private static void calculateMonthlyPayments(double leaseAmount, double monthlyInterestRate, int numberOfYears) {
        int numberOfMonths = numberOfYears * 12;
        double monthlyInstallment = (leaseAmount * monthlyInterestRate) /
                (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));
        System.out.println("Monthly Installment for " + numberOfYears + " years: " + monthlyInstallment);
    }

    private static void findLeasingAmount(Scanner scanner) {
        System.out.println("\nFind Leasing Amount System");
        System.out.print("Enter the monthly lease payment amount you can pay: ");
        double monthlyPayment = scanner.nextDouble();

        System.out.print("Enter the annual interest rate (%): ");
        double annualInterestRate = scanner.nextDouble();
        if (annualInterestRate <= 0) {
            System.out.println("Invalid annual interest rate. Please enter a rate greater than 0.");
            return;
        }

        System.out.print("Enter the number of years (max 5 years): ");
        int numberOfYears = scanner.nextInt();
        if (numberOfYears <= 0 || numberOfYears > 5) {
            System.out.println("Invalid number of years. Please enter a number between 1 and 5.");
            return;
        }

        double monthlyInterestRate = annualInterestRate / 12 / 100;
        int numberOfMonths = numberOfYears * 12;

        double leasingAmount = monthlyPayment * ((1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths)) / monthlyInterestRate);
        System.out.println("Total leasing amount available: " + leasingAmount);
    }
}
        
    

   

        


        
   

    

   

   


