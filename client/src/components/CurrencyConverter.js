import React, { useState, useEffect } from 'react';
import { currencyAPI } from '../services/api';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const popularCurrencies = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
    { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
    { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭' },
    { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' }
  ];

  const convertCurrency = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (fromCurrency === toCurrency) {
      setError('Please select different currencies');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await currencyAPI.getExchangeRate(fromCurrency, toCurrency);
      const data = response.data.data;
      
      setRate(data.rate);
      setResult((parseFloat(amount) * data.rate).toFixed(2));
    } catch (err) {
      setError('Failed to fetch exchange rate. Please try again.');
      console.error('Currency conversion error:', err);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setRate(null);
    setError(null);
  };

  const getCurrencyInfo = (code) => {
    return popularCurrencies.find(currency => currency.code === code) || 
           { code, name: code, flag: '🌍' };
  };

  useEffect(() => {
    // Auto-convert when currencies change
    if (amount && fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      convertCurrency();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency]);

  return (
    <div>
      <div className="converter-form">
        <div className="input-group">
          <label>From Currency</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {popularCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onClick={swapCurrencies}
            style={{
              background: 'none',
              border: '2px solid #667eea',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: '#667eea',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#667eea';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = '#667eea';
            }}
          >
            ⇄
          </button>
        </div>

        <div className="input-group">
          <label>To Currency</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {popularCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="convert-button"
          onClick={convertCurrency}
          disabled={loading}
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {result && rate && (
        <div className="result">
          <h3>Conversion Result</h3>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>{amount} {getCurrencyInfo(fromCurrency).code}</strong> equals
          </div>
          <div className="result-value">
            {result} {getCurrencyInfo(toCurrency).code}
          </div>
          <div style={{ 
            marginTop: '0.5rem', 
            fontSize: '0.9rem', 
            color: '#666' 
          }}>
            Exchange Rate: 1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
          </div>
        </div>
      )}

      {/* Popular Currency Pairs */}
      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ marginBottom: '1rem', color: '#555' }}>Popular Pairs</h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '0.5rem' 
        }}>
          {[
            { from: 'USD', to: 'EUR' },
            { from: 'USD', to: 'GBP' },
            { from: 'USD', to: 'JPY' },
            { from: 'EUR', to: 'GBP' },
            { from: 'USD', to: 'CAD' },
            { from: 'USD', to: 'AUD' }
          ].map((pair) => (
            <button
              key={`${pair.from}-${pair.to}`}
              onClick={() => {
                setFromCurrency(pair.from);
                setToCurrency(pair.to);
                setResult(null);
                setRate(null);
                setError(null);
              }}
              style={{
                padding: '0.5rem',
                background: fromCurrency === pair.from && toCurrency === pair.to 
                  ? '#667eea' 
                  : '#f8f9fa',
                color: fromCurrency === pair.from && toCurrency === pair.to 
                  ? 'white' 
                  : '#333',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                transition: 'all 0.2s ease'
              }}
            >
              {pair.from}/{pair.to}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
