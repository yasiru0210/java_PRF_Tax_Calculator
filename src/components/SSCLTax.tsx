import React, { useState } from 'react';
import { ArrowLeft, Calculator } from 'lucide-react';
import { calculateSSCLTax } from '../utils/taxCalculations';

interface SSCLTaxProps {
  onBack: () => void;
}

export const SSCLTax: React.FC<SSCLTaxProps> = ({ onBack }) => {
  const [valueOfGoods, setValueOfGoods] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const numValue = parseFloat(valueOfGoods);
    if (!numValue || numValue <= 0) {
      setError('Please enter a valid value greater than 0');
      return;
    }

    try {
      const calculationResult = calculateSSCLTax(numValue);
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const reset = () => {
    setValueOfGoods('');
    setResult(null);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Menu</span>
        </button>
      </div>

      <div className="card max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Social Security Contribution Levy (SSCL) Tax Calculator
        </h2>

        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-2">SSCL Tax Components</h3>
            <div className="text-sm text-orange-700 space-y-1">
              <p>• Sale Tax: 2.5% of goods value</p>
              <p>• VAT: 15% of (goods value + sale tax)</p>
              <p>• Total SSCL Tax: Sale Tax + VAT</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Value of Goods (Rs.)
            </label>
            <input
              type="number"
              value={valueOfGoods}
              onChange={(e) => setValueOfGoods(e.target.value)}
              placeholder="Enter the value of goods"
              className="input-field"
              min="0"
              step="0.01"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={handleCalculate}
              disabled={!valueOfGoods}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate SSCL Tax</span>
            </button>
            <button onClick={reset} className="btn-secondary">
              Reset
            </button>
          </div>

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">SSCL Tax Calculation Result</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-green-700">Value of Goods:</span>
                  <span className="font-bold text-green-800">Rs. {parseFloat(valueOfGoods).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-green-700">Sale Tax (2.5%):</span>
                  <span className="font-bold text-green-800">Rs. {result.saleTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-green-700">VAT (15%):</span>
                  <span className="font-bold text-green-800">Rs. {result.vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 bg-green-100 rounded px-3">
                  <span className="text-green-800 font-semibold">Total SSCL Tax:</span>
                  <span className="font-bold text-green-900 text-lg">Rs. {result.totalSSCLTax.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};