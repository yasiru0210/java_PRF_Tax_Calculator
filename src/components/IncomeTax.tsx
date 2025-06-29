import React, { useState } from 'react';
import { ArrowLeft, Calculator } from 'lucide-react';
import { calculateIncomeTax } from '../utils/taxCalculations';

interface IncomeTaxProps {
  onBack: () => void;
}

export const IncomeTax: React.FC<IncomeTaxProps> = ({ onBack }) => {
  const [income, setIncome] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const numIncome = parseFloat(income);
    if (!numIncome || numIncome <= 0) {
      setError('Please enter a valid income amount greater than 0');
      return;
    }

    try {
      const calculationResult = calculateIncomeTax(numIncome);
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const reset = () => {
    setIncome('');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Income Tax Calculator</h2>

        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">Annual Income Tax Brackets</h3>
            <div className="text-sm text-purple-700 space-y-1">
              <p>• Up to Rs. 1,200,000: No tax</p>
              <p>• Rs. 1,200,001 - Rs. 1,700,000: 6%</p>
              <p>• Rs. 1,700,001 - Rs. 2,200,000: 12%</p>
              <p>• Rs. 2,200,001 - Rs. 2,700,000: 18%</p>
              <p>• Rs. 2,700,001 - Rs. 3,200,000: 24%</p>
              <p>• Rs. 3,200,001 - Rs. 3,700,000: 30%</p>
              <p>• Above Rs. 3,700,000: 36%</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Income (Rs.)
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your annual income"
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
              disabled={!income}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate Tax</span>
            </button>
            <button onClick={reset} className="btn-secondary">
              Reset
            </button>
          </div>

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Tax Calculation Result</h3>
              {result.message ? (
                <p className="text-green-700">{result.message}</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-green-700">
                    Annual Income: <span className="font-bold">Rs. {parseFloat(income).toFixed(2)}</span>
                  </p>
                  <p className="text-green-700">
                    Income Tax: <span className="font-bold">Rs. {result.amount.toFixed(2)}</span>
                  </p>
                  <p className="text-green-700">
                    Net Income: <span className="font-bold">Rs. {(parseFloat(income) - result.amount).toFixed(2)}</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};