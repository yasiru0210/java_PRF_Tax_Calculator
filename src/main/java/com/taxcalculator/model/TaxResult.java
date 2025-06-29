package com.taxcalculator.model;

public class TaxResult {
    private double amount;
    private String message;
    private double netAmount;
    private double grossAmount;

    public TaxResult() {}

    public TaxResult(double amount) {
        this.amount = amount;
    }

    public TaxResult(double amount, String message) {
        this.amount = amount;
        this.message = message;
    }

    public TaxResult(double amount, String message, double netAmount, double grossAmount) {
        this.amount = amount;
        this.message = message;
        this.netAmount = netAmount;
        this.grossAmount = grossAmount;
    }

    // Getters and Setters
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public double getNetAmount() { return netAmount; }
    public void setNetAmount(double netAmount) { this.netAmount = netAmount; }

    public double getGrossAmount() { return grossAmount; }
    public void setGrossAmount(double grossAmount) { this.grossAmount = grossAmount; }
}