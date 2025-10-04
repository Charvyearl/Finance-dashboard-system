import React, { useState, useEffect } from 'react';
import { cryptoAPI } from '../services/api';

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get cryptocurrency data from our server
  const getCryptoData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cryptoAPI.getPrices();
      
      if (response.data.success) {
        setCryptoData(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to get cryptocurrency data');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Could not get cryptocurrency data';
      setError(errorMessage);
      console.error('Error getting crypto data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCryptoData();
    
    // Get new data every 30 seconds
    const interval = setInterval(getCryptoData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Make price look nice with dollar sign and commas
  const formatPrice = (price) => {
    return `$${parseFloat(price).toLocaleString()}`;
  };

  // Make percentage change look nice with + or - sign
  const formatChange = (change) => {
    const changeNum = parseFloat(change);
    const sign = changeNum >= 0 ? '+' : '';
    return `${sign}${changeNum.toFixed(2)}%`;
  };

  // Make big numbers shorter (1,000,000,000 becomes 1B)
  const formatMarketCap = (marketCap) => {
    const num = parseFloat(marketCap);
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  // Make volume numbers shorter
  const formatVolume = (volume) => {
    const num = parseFloat(volume);
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Getting crypto data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error" style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        background: '#fef2f2', 
        border: '1px solid #fecaca', 
        borderRadius: '8px',
        color: '#dc2626',
        margin: '1rem 0'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem' }}>⚠️ Service Unavailable</h3>
        <p style={{ margin: '0 0 1rem 0' }}>{error}</p>
        <button 
          onClick={getCryptoData}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#dc2626', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          🔄 Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto) => (
            <tr key={crypto.id} className="data-updated">
              <td>#{crypto.rank}</td>
              <td>
                <div style={{ fontWeight: '600' }}>{crypto.name}</div>
              </td>
              <td>
                <span style={{ 
                  background: '#f3f4f6', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem'
                }}>
                  {crypto.symbol}
                </span>
              </td>
              <td className="price">{formatPrice(crypto.price)}</td>
              <td className={parseFloat(crypto.change24h) >= 0 ? 'positive' : 'negative'}>
                {formatChange(crypto.change24h)}
              </td>
              <td>{formatMarketCap(crypto.marketCap)}</td>
              <td>{formatVolume(crypto.volume24h)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
