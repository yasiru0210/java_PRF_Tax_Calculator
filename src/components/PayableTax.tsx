import React, { useState } from 'react';
import { ArrowLeft, Calculator } from 'lucide-react';
import { calculatePayableTax } from '../utils/taxCalculations';

interface PayableTaxProps {
  onBack: () => void;
}

export const PayableTax: React.FC<PayableTaxProps> = ({ onBack }) => {
  const [salary, setSalary] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const numSalary = parseFloat(salary);
    if (!numSalary || numSalary <= 0) {
      setError('Please enter a valid salary amount greater than 0');
      return;
    }

    try {
      const calculationResult = calculatePayableTax(numSalary);
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const reset = () => {
    setSalary('');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payable Tax Calculator</h2>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Tax Brackets</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Up to Rs. 100,000: No tax</p>
              <p>• Rs. 100,001 - Rs. 141,667: 6%</p>
              <p>• Rs. 141,668 - Rs. 183,333: 12%</p>
              <p>• Rs. 183,334 - Rs. 225,000: 18%</p>
              <p>• Rs. 225,001 - Rs. 266,667: 24%</p>
              <p>• Rs. 266,668 - Rs. 308,333: 30%</p>
              <p>• Above Rs. 308,333: 36%</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Salary (Rs.)
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter your monthly salary"
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
              disabled={!salary}
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
                    Monthly Salary: <span className="font-bold">Rs. {parseFloat(salary).toFixed(2)}</span>
                  </p>
                  <p className="text-green-700">
                    Payable Tax: <span className="font-bold">Rs. {result.amount.toFixed(2)}</span>
                  </p>
                  <p className="text-green-700">
                    Net Salary: <span className="font-bold">Rs. {(parseFloat(salary) - result.amount).toFixed(2)}</span>
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