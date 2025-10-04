const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// External API configurations
const COINCAP_API = 'https://api.coincap.io/v2';
const ALPHA_VANTAGE_API = 'https://www.alphavantage.co/query';
const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest';

// API Key for Alpha Vantage (you'll need to get one from https://www.alphavantage.co/support/#api-key)
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';

// GET /crypto - Get cryptocurrency prices
app.get('/api/crypto', async (req, res) => {
  try {
    // Try to fetch from external API first
    const response = await axios.get(`${COINCAP_API}/assets?limit=20`, { timeout: 5000 });
    const cryptoData = response.data.data.map(coin => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      price: parseFloat(coin.priceUsd).toFixed(2),
      change24h: parseFloat(coin.changePercent24Hr).toFixed(2),
      marketCap: parseFloat(coin.marketCapUsd).toFixed(0),
      volume24h: parseFloat(coin.volumeUsd24Hr).toFixed(0),
      rank: coin.rank
    }));
    
    res.json({
      success: true,
      data: cryptoData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Crypto API Error:', error.message);
    
    // Fallback to mock data when external API fails
    const mockCryptoData = [
      { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: '43250.12', change24h: '2.45', marketCap: '850000000000', volume24h: '25000000000', rank: '1' },
      { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: '2650.45', change24h: '-1.23', marketCap: '320000000000', volume24h: '15000000000', rank: '2' },
      { id: 'binancecoin', symbol: 'BNB', name: 'BNB', price: '315.67', change24h: '3.21', marketCap: '48000000000', volume24h: '1200000000', rank: '3' },
      { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: '0.45', change24h: '1.87', marketCap: '16000000000', volume24h: '800000000', rank: '4' },
      { id: 'solana', symbol: 'SOL', name: 'Solana', price: '98.34', change24h: '-2.15', marketCap: '42000000000', volume24h: '2100000000', rank: '5' },
      { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', price: '6.78', change24h: '0.95', marketCap: '8500000000', volume24h: '450000000', rank: '6' },
      { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: '0.082', change24h: '4.32', marketCap: '12000000000', volume24h: '1800000000', rank: '7' },
      { id: 'avalanche', symbol: 'AVAX', name: 'Avalanche', price: '12.45', change24h: '-0.67', marketCap: '2900000000', volume24h: '320000000', rank: '8' },
      { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', price: '14.23', change24h: '2.18', marketCap: '8200000000', volume24h: '650000000', rank: '9' },
      { id: 'litecoin', symbol: 'LTC', name: 'Litecoin', price: '68.90', change24h: '1.45', marketCap: '5100000000', volume24h: '380000000', rank: '10' }
    ];
    
    res.json({
      success: true,
      data: mockCryptoData,
      timestamp: new Date().toISOString(),
      note: 'Using mock data - external API unavailable'
    });
  }
});

// GET /stocks - Get stock market updates
app.get('/api/stocks', async (req, res) => {
  try {
    // For demo purposes, we'll use a mock data approach
    // In production, you'd use real stock APIs like Alpha Vantage
    const stocks = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.15, changePercent: 1.24 },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.87, change: -5.23, changePercent: -2.06 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change: 1.89, changePercent: 1.34 },
      { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.91, change: 3.45, changePercent: 0.92 },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 155.23, change: -1.12, changePercent: -0.72 },
      { symbol: 'META', name: 'Meta Platforms Inc.', price: 325.67, change: 4.78, changePercent: 1.49 },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 875.34, change: 12.45, changePercent: 1.44 },
      { symbol: 'NFLX', name: 'Netflix Inc.', price: 485.12, change: -8.34, changePercent: -1.69 }
    ];

    res.json({
      success: true,
      data: stocks,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Stocks API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stock data'
    });
  }
});

// GET /currency/{from}/{to} - Get exchange rate
app.get('/api/currency/:from/:to', async (req, res) => {
  try {
    const { from, to } = req.params;
    
    if (!from || !to) {
      return res.status(400).json({
        success: false,
        error: 'Both from and to currency codes are required'
      });
    }

    try {
      const response = await axios.get(`${EXCHANGE_RATE_API}/${from.toUpperCase()}`, { timeout: 5000 });
      const rates = response.data.rates;
      const exchangeRate = rates[to.toUpperCase()];

      if (!exchangeRate) {
        throw new Error('Exchange rate not found');
      }

      res.json({
        success: true,
        data: {
          from: from.toUpperCase(),
          to: to.toUpperCase(),
          rate: exchangeRate,
          amount: 1,
          result: exchangeRate
        },
        timestamp: new Date().toISOString()
      });
    } catch (apiError) {
      // Fallback to mock exchange rates
      const mockRates = {
        'USD': { 'EUR': 0.85, 'GBP': 0.73, 'JPY': 110.0, 'CAD': 1.25, 'AUD': 1.35, 'CHF': 0.92, 'CNY': 6.45, 'INR': 74.0, 'BRL': 5.2, 'PHP': 50.0, 'KRW': 1180.0 },
        'EUR': { 'USD': 1.18, 'GBP': 0.86, 'JPY': 129.0, 'CAD': 1.47, 'AUD': 1.59, 'CHF': 1.08, 'CNY': 7.59, 'INR': 87.0, 'BRL': 6.12, 'PHP': 58.8, 'KRW': 1388.0 },
        'GBP': { 'USD': 1.37, 'EUR': 1.16, 'JPY': 150.0, 'CAD': 1.71, 'AUD': 1.85, 'CHF': 1.26, 'CNY': 8.84, 'INR': 101.0, 'BRL': 7.12, 'PHP': 68.5, 'KRW': 1616.0 }
      };

      const fromUpper = from.toUpperCase();
      const toUpper = to.toUpperCase();
      
      let exchangeRate = 1;
      if (mockRates[fromUpper] && mockRates[fromUpper][toUpper]) {
        exchangeRate = mockRates[fromUpper][toUpper];
      } else if (fromUpper === toUpper) {
        exchangeRate = 1;
      } else {
        // Generate a random rate for other combinations
        exchangeRate = (Math.random() * 2 + 0.5).toFixed(4);
      }

      res.json({
        success: true,
        data: {
          from: fromUpper,
          to: toUpper,
          rate: parseFloat(exchangeRate),
          amount: 1,
          result: parseFloat(exchangeRate)
        },
        timestamp: new Date().toISOString(),
        note: 'Using mock data - external API unavailable'
      });
    }
  } catch (error) {
    console.error('Currency API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch exchange rate'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Finance Dashboard API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve static files from React app
app.use(express.static('client/build'));

// Catch all handler for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Finance Dashboard API is ready!`);
  console.log(`🔗 Available endpoints:`);
  console.log(`   GET /api/crypto - Cryptocurrency prices`);
  console.log(`   GET /api/stocks - Stock market data`);
  console.log(`   GET /api/currency/{from}/{to} - Exchange rates`);
  console.log(`   GET /api/health - Health check`);
});
