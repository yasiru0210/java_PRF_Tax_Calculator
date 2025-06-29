import React, { useState } from 'react';
import { ArrowLeft, Calculator } from 'lucide-react';
import { calculateRentTax, calculateBankInterestTax, calculateDividendTax } from '../utils/taxCalculations';

interface WithholdingTaxProps {
  onBack: () => void;
}

export const WithholdingTax: React.FC<WithholdingTaxProps> = ({ onBack }) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const taxTypes = [
    { id: 'rent', label: 'Rent Tax', description: 'Tax on rental payments above Rs. 100,000' },
    { id: 'bank', label: 'Bank Interest Tax', description: '5% tax on annual bank interest' },
    { id: 'dividend', label: 'Dividend Tax', description: 'Progressive tax on dividend income' }
  ];

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    try {
      let calculationResult;
      switch (selectedType) {
        case 'rent':
          calculationResult = calculateRentTax(numAmount);
          break;
        case 'bank':
          calculationResult = calculateBankInterestTax(numAmount);
          break;
        case 'dividend':
          calculationResult = calculateDividendTax(numAmount);
          break;
        default:
          setError('Please select a tax type');
          return;
      }
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const reset = () => {
    setAmount('');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Withholding Tax Calculator</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Tax Type
            </label>
            <div className="grid grid-cols-1 gap-3">
              {taxTypes.map((type) => (
                <label
                  key={type.id}
                  className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedType === type.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="taxType"
                    value={type.id}
                    checked={selectedType === type.id}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{type.label}</div>
                    <div className="text-sm text-gray-600">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (Rs.)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
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
              disabled={!selectedType || !amount}
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
                <p className="text-green-700">
                  Tax Amount: <span className="font-bold">Rs. {result.amount.toFixed(2)}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};