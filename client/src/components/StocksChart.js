import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { stocksAPI } from '../services/api';

const StocksChart = () => {
  const [stocksData, setStocksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState('AAPL');

  const fetchStocksData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await stocksAPI.getData();
      setStocksData(response.data.data);
    } catch (err) {
      setError('Failed to fetch stock data');
      console.error('Stocks fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocksData();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchStocksData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Generate mock historical data for the selected stock
  const generateHistoricalData = (stock) => {
    const basePrice = stock.price;
    const data = [];
    const days = 30;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Generate realistic price movement
      const randomChange = (Math.random() - 0.5) * 0.1; // ±5% daily change
      const price = basePrice * (1 + randomChange * (days - i) / days);
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(price.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 100000
      });
    }
    
    return data;
  };

  const selectedStockData = stocksData.find(stock => stock.symbol === selectedStock);
  const historicalData = selectedStockData ? generateHistoricalData(selectedStockData) : [];

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading stock data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {error}
        <button 
          onClick={fetchStocksData}
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
    <div>
      {/* Stock Selector */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem', 
          fontWeight: '500',
          color: '#555'
        }}>
          Select Stock:
        </label>
        <select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '1rem',
            minWidth: '150px'
          }}
        >
          {stocksData.map((stock) => (
            <option key={stock.symbol} value={stock.symbol}>
              {stock.symbol} - {stock.name}
            </option>
          ))}
        </select>
      </div>

      {/* Current Stock Info */}
      {selectedStockData && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <div>
            <h3 style={{ margin: 0, color: '#333' }}>
              {selectedStockData.name} ({selectedStockData.symbol})
            </h3>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              Current Price
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              color: '#333'
            }}>
              {formatPrice(selectedStockData.price)}
            </div>
            <div className={selectedStockData.change >= 0 ? 'positive' : 'negative'}>
              {formatChange(selectedStockData.change)} ({selectedStockData.changePercent}%)
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="date" 
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value) => [formatPrice(value), 'Price']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#667eea"
              strokeWidth={2}
              dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#667eea', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {stocksData.slice(0, 4).map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => setSelectedStock(stock.symbol)}
            style={{
              padding: '0.75rem',
              background: selectedStock === stock.symbol ? '#667eea' : '#f8f9fa',
              color: selectedStock === stock.symbol ? 'white' : '#333',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              if (selectedStock !== stock.symbol) {
                e.target.style.background = '#e0e0e0';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedStock !== stock.symbol) {
                e.target.style.background = '#f8f9fa';
              }
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
              {stock.symbol}
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              {formatPrice(stock.price)}
            </div>
            <div style={{ 
              fontSize: '0.75rem',
              color: stock.change >= 0 ? '#10b981' : '#ef4444'
            }}>
              {formatChange(stock.change)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StocksChart;
