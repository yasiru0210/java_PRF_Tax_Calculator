package com.taxcalculator.model;

public class SSCLTaxResult {
    private double saleTax;
    private double vat;
    private double totalSSCLTax;
    private double valueOfGoods;

    public SSCLTaxResult() {}

    public SSCLTaxResult(double saleTax, double vat, double totalSSCLTax, double valueOfGoods) {
        this.saleTax = saleTax;
        this.vat = vat;
        this.totalSSCLTax = totalSSCLTax;
        this.valueOfGoods = valueOfGoods;
    }

    // Getters and Setters
    public double getSaleTax() { return saleTax; }
    public void setSaleTax(double saleTax) { this.saleTax = saleTax; }

    public double getVat() { return vat; }
    public void setVat(double vat) { this.vat = vat; }

    public double getTotalSSCLTax() { return totalSSCLTax; }
    public void setTotalSSCLTax(double totalSSCLTax) { this.totalSSCLTax = totalSSCLTax; }

    public double getValueOfGoods() { return valueOfGoods; }
    public void setValueOfGoods(double valueOfGoods) { this.valueOfGoods = valueOfGoods; }
}