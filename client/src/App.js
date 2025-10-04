import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CryptoTable from './components/CryptoTable';
import StocksChart from './components/StocksChart';
import CurrencyConverter from './components/CurrencyConverter';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('crypto');

  useEffect(() => {
    // Show loading screen for 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Show different sections based on what user clicks
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
