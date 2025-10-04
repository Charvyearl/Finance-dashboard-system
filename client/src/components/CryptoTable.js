import React, { useState, useEffect } from 'react';
import { cryptoAPI } from '../services/api';

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cryptoAPI.getPrices();
      setCryptoData(response.data.data);
    } catch (err) {
      setError('Failed to fetch cryptocurrency data');
      console.error('Crypto fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    return `$${parseFloat(price).toLocaleString()}`;
  };

  const formatChange = (change) => {
    const changeNum = parseFloat(change);
    const sign = changeNum >= 0 ? '+' : '';
    return `${sign}${changeNum.toFixed(2)}%`;
  };

  const formatMarketCap = (marketCap) => {
    const num = parseFloat(marketCap);
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

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
        <div className="loading-text">Loading crypto data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {error}
        <button 
          onClick={fetchCryptoData}
          style={{ 
            marginLeft: '1rem', 
            padding: '0.5rem 1rem', 
            background: '#dc2626', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
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
