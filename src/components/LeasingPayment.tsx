import React, { useState } from 'react';
import { ArrowLeft, Calculator } from 'lucide-react';
import { 
  calculateMonthlyInstallment, 
  searchLeasingCategory, 
  findLeasingAmount 
} from '../utils/taxCalculations';

interface LeasingPaymentProps {
  onBack: () => void;
}

export const LeasingPayment: React.FC<LeasingPaymentProps> = ({ onBack }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [formData, setFormData] = useState({
    leaseAmount: '',
    monthlyPayment: '',
    interestRate: '',
    years: ''
  });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const leasingOptions = [
    { id: 'monthly', label: 'Calculate Monthly Installment', description: 'Find monthly payment amount' },
    { id: 'category', label: 'Search Leasing Category', description: 'Compare payment options for different terms' },
    { id: 'amount', label: 'Find Leasing Amount', description: 'Determine maximum lease amount based on monthly payment' }
  ];

  const handleCalculate = () => {
    setError('');
    setResult(null);

    try {
      switch (selectedOption) {
        case 'monthly': {
          const leaseAmount = parseFloat(formData.leaseAmount);
          const interestRate = parseFloat(formData.interestRate);
          const years = parseInt(formData.years);
          
          if (!leaseAmount || !interestRate || !years) {
            setError('Please fill in all required fields');
            return;
          }
          
          const calculationResult = calculateMonthlyInstallment(leaseAmount, interestRate, years);
          setResult(calculationResult);
          break;
        }
        case 'category': {
          const leaseAmount = parseFloat(formData.leaseAmount);
          const interestRate = parseFloat(formData.interestRate);
          
          if (!leaseAmount || !interestRate) {
            setError('Please fill in lease amount and interest rate');
            return;
          }
          
          const calculationResult = searchLeasingCategory(leaseAmount, interestRate);
          setResult(calculationResult);
          break;
        }
        case 'amount': {
          const monthlyPayment = parseFloat(formData.monthlyPayment);
          const interestRate = parseFloat(formData.interestRate);
          const years = parseInt(formData.years);
          
          if (!monthlyPayment || !interestRate || !years) {
            setError('Please fill in all required fields');
            return;
          }
          
          const calculationResult = findLeasingAmount(monthlyPayment, interestRate, years);
          setResult(calculationResult);
          break;
        }
        default:
          setError('Please select a calculation option');
          return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const reset = () => {
    setFormData({
      leaseAmount: '',
      monthlyPayment: '',
      interestRate: '',
      years: ''
    });
    setResult(null);
    setError('');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Leasing Payment Calculator</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Calculation Type
            </label>
            <div className="grid grid-cols-1 gap-3">
              {leasingOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedOption === option.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="leasingOption"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {selectedOption && (
            <div className="space-y-4">
              {(selectedOption === 'monthly' || selectedOption === 'category') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lease Amount (Rs.)
                  </label>
                  <input
                    type="number"
                    value={formData.leaseAmount}
                    onChange={(e) => handleInputChange('leaseAmount', e.target.value)}
                    placeholder="Enter lease amount"
                    className="input-field"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

              {selectedOption === 'amount' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Payment (Rs.)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyPayment}
                    onChange={(e) => handleInputChange('monthlyPayment', e.target.value)}
                    placeholder="Enter monthly payment amount"
                    className="input-field"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={formData.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  placeholder="Enter interest rate"
                  className="input-field"
                  min="0"
                  step="0.01"
                />
              </div>

              {(selectedOption === 'monthly' || selectedOption === 'amount') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Years (Max 5)
                  </label>
                  <select
                    value={formData.years}
                    onChange={(e) => handleInputChange('years', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select years</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="4">4 Years</option>
                    <option value="5">5 Years</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={handleCalculate}
              disabled={!selectedOption}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate</span>
            </button>
            <button onClick={reset} className="btn-secondary">
              Reset
            </button>
          </div>

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Calculation Result</h3>
              
              {result.monthlyInstallment && (
                <p className="text-green-700">
                  Monthly Installment: <span className="font-bold">Rs. {result.monthlyInstallment.toFixed(2)}</span>
                </p>
              )}

              {result.leasingAmount && (
                <p className="text-green-700">
                  Maximum Leasing Amount: <span className="font-bold">Rs. {result.leasingAmount.toFixed(2)}</span>
                </p>
              )}

              {result.categories && (
                <div className="space-y-3">
                  <p className="text-green-800 font-semibold">Payment Options:</p>
                  {result.categories.map((category: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-green-200">
                      <span className="text-green-700">{category.years} Years:</span>
                      <span className="font-bold text-green-800">Rs. {category.monthlyPayment.toFixed(2)}/month</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};