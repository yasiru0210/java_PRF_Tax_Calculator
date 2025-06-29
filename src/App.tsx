import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { MainMenu } from './components/MainMenu';
import { WithholdingTax } from './components/WithholdingTax';
import { PayableTax } from './components/PayableTax';
import { IncomeTax } from './components/IncomeTax';
import { SSCLTax } from './components/SSCLTax';
import { LeasingPayment } from './components/LeasingPayment';

function App() {
  const [currentView, setCurrentView] = useState<string>('menu');

  const handleSelectOption = (option: string) => {
    setCurrentView(option);
  };

  const handleBack = () => {
    setCurrentView('menu');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'withholding':
        return <WithholdingTax onBack={handleBack} />;
      case 'payable':
        return <PayableTax onBack={handleBack} />;
      case 'income':
        return <IncomeTax onBack={handleBack} />;
      case 'sscl':
        return <SSCLTax onBack={handleBack} />;
      case 'leasing':
        return <LeasingPayment onBack={handleBack} />;
      default:
        return <MainMenu onSelectOption={handleSelectOption} />;
    }
  };

  return (
    <Layout>
      {renderCurrentView()}
    </Layout>
  );
}

export default App;