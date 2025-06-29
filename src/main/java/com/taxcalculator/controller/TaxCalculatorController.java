package com.taxcalculator.controller;

import com.taxcalculator.model.TaxResult;
import com.taxcalculator.model.SSCLTaxResult;
import com.taxcalculator.model.LeasingResult;
import com.taxcalculator.service.TaxCalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class TaxCalculatorController {

    @Autowired
    private TaxCalculationService taxCalculationService;

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/withholding")
    public String withholdingTax() {
        return "withholding";
    }

    @GetMapping("/payable")
    public String payableTax() {
        return "payable";
    }

    @GetMapping("/income")
    public String incomeTax() {
        return "income";
    }

    @GetMapping("/sscl")
    public String ssclTax() {
        return "sscl";
    }

    @GetMapping("/leasing")
    public String leasingPayment() {
        return "leasing";
    }

    // REST API Endpoints
    @PostMapping("/api/calculate/rent-tax")
    @ResponseBody
    public TaxResult calculateRentTax(@RequestParam double amount) {
        return taxCalculationService.calculateRentTax(amount);
    }

    @PostMapping("/api/calculate/bank-interest-tax")
    @ResponseBody
    public TaxResult calculateBankInterestTax(@RequestParam double amount) {
        return taxCalculationService.calculateBankInterestTax(amount);
    }

    @PostMapping("/api/calculate/dividend-tax")
    @ResponseBody
    public TaxResult calculateDividendTax(@RequestParam double amount) {
        return taxCalculationService.calculateDividendTax(amount);
    }

    @PostMapping("/api/calculate/payable-tax")
    @ResponseBody
    public TaxResult calculatePayableTax(@RequestParam double salary) {
        return taxCalculationService.calculatePayableTax(salary);
    }

    @PostMapping("/api/calculate/income-tax")
    @ResponseBody
    public TaxResult calculateIncomeTax(@RequestParam double income) {
        return taxCalculationService.calculateIncomeTax(income);
    }

    @PostMapping("/api/calculate/sscl-tax")
    @ResponseBody
    public SSCLTaxResult calculateSSCLTax(@RequestParam double valueOfGoods) {
        return taxCalculationService.calculateSSCLTax(valueOfGoods);
    }

    @PostMapping("/api/calculate/monthly-installment")
    @ResponseBody
    public LeasingResult calculateMonthlyInstallment(@RequestParam double leaseAmount, 
                                                   @RequestParam double interestRate, 
                                                   @RequestParam int years) {
        return taxCalculationService.calculateMonthlyInstallment(leaseAmount, interestRate, years);
    }

    @PostMapping("/api/calculate/leasing-category")
    @ResponseBody
    public LeasingResult searchLeasingCategory(@RequestParam double leaseAmount, 
                                             @RequestParam double interestRate) {
        return taxCalculationService.searchLeasingCategory(leaseAmount, interestRate);
    }

    @PostMapping("/api/calculate/leasing-amount")
    @ResponseBody
    public LeasingResult findLeasingAmount(@RequestParam double monthlyPayment, 
                                         @RequestParam double interestRate, 
                                         @RequestParam int years) {
        return taxCalculationService.findLeasingAmount(monthlyPayment, interestRate, years);
    }
}