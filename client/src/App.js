import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CryptoTable from './components/CryptoTable';
import StocksChart from './components/StocksChart';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  const [activeSection, setActiveSection] = useState('crypto');

  const showSection = () => {
    switch (activeSection) {
      case 'crypto':
        return (
          <div className="dashboard-section full-width">
            <h2>📈 Cryptocurrency Prices</h2>
            <CryptoTable />
          </div>
        );
      case 'stocks':
        return (
          <div className="dashboard-section full-width">
            <h2>📊 Stock Prices</h2>
            <StocksChart />
          </div>
        );
      case 'currency':
        return (
          <div className="dashboard-section full-width">
            <h2>💱 Currency Converter</h2>
            <CurrencyConverter />
          </div>
        );
      default:
        return (
          <div className="dashboard-section full-width">
            <h2>📈 Cryptocurrency Prices</h2>
            <CryptoTable />
          </div>
        );
    }
  };

  return (
    <div className="App">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="main-content">
        <div className="dashboard-container">
          {showSection()}
        </div>
      </main>
    </div>
  );
}

export default App;
