package com.taxcalculator.model;

import java.util.List;

public class LeasingResult {
    private double monthlyInstallment;
    private double leasingAmount;
    private List<LeasingCategory> categories;

    public LeasingResult() {}

    public LeasingResult(double monthlyInstallment) {
        this.monthlyInstallment = monthlyInstallment;
    }

    public LeasingResult(double leasingAmount, boolean isAmount) {
        this.leasingAmount = leasingAmount;
    }

    public LeasingResult(List<LeasingCategory> categories) {
        this.categories = categories;
    }

    // Getters and Setters
    public double getMonthlyInstallment() { return monthlyInstallment; }
    public void setMonthlyInstallment(double monthlyInstallment) { this.monthlyInstallment = monthlyInstallment; }

    public double getLeasingAmount() { return leasingAmount; }
    public void setLeasingAmount(double leasingAmount) { this.leasingAmount = leasingAmount; }

    public List<LeasingCategory> getCategories() { return categories; }
    public void setCategories(List<LeasingCategory> categories) { this.categories = categories; }

    public static class LeasingCategory {
        private int years;
        private double monthlyPayment;

        public LeasingCategory() {}

        public LeasingCategory(int years, double monthlyPayment) {
            this.years = years;
            this.monthlyPayment = monthlyPayment;
        }

        public int getYears() { return years; }
        public void setYears(int years) { this.years = years; }

        public double getMonthlyPayment() { return monthlyPayment; }
        public void setMonthlyPayment(double monthlyPayment) { this.monthlyPayment = monthlyPayment; }
    }
}