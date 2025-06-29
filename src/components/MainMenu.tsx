import React from 'react';
import { 
  Receipt, 
  CreditCard, 
  TrendingUp, 
  Shield, 
  Car,
  ArrowRight
} from 'lucide-react';

interface MainMenuProps {
  onSelectOption: (option: string) => void;
}

const menuOptions = [
  {
    id: 'withholding',
    title: 'Withholding Tax',
    description: 'Calculate rent, bank interest, and dividend taxes',
    icon: Receipt,
    color: 'bg-blue-500'
  },
  {
    id: 'payable',
    title: 'Payable Tax',
    description: 'Calculate tax based on monthly salary',
    icon: CreditCard,
    color: 'bg-green-500'
  },
  {
    id: 'income',
    title: 'Income Tax',
    description: 'Calculate tax based on annual income',
    icon: TrendingUp,
    color: 'bg-purple-500'
  },
  {
    id: 'sscl',
    title: 'SSCL Tax',
    description: 'Social Security Contribution Levy calculation',
    icon: Shield,
    color: 'bg-orange-500'
  },
  {
    id: 'leasing',
    title: 'Leasing Payment',
    description: 'Calculate leasing payments and amounts',
    icon: Car,
    color: 'bg-red-500'
  }
];

export const MainMenu: React.FC<MainMenuProps> = ({ onSelectOption }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose a Tax Calculator
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select from our comprehensive tax calculation tools to help you determine 
          your tax obligations accurately and efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className="card group hover:scale-105 transform transition-all duration-200 text-left"
            >
              <div className="flex items-start space-x-4">
                <div className={`${option.color} p-3 rounded-lg text-white`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {option.description}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};