// Import required libraries
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

// Create the web server
const app = express();
const PORT = process.env.PORT || 5000;

// Allow websites to talk to our server
app.use(cors());
app.use(express.json());

// URLs for getting real data from other websites
const COINCAP_API = 'https://api.coincap.io/v2';
const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const ALPHA_VANTAGE_API = 'https://www.alphavantage.co/query';
const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest';

// API Key for getting real stock data (optional)
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';

// Function to get cryptocurrency prices
app.get('/api/crypto', async (req, res) => {
  try {
    let cryptoData = null;
    let apiUsed = '';

    // Try CoinCap API first
    try {
      console.log('Trying CoinCap API...');
      const response = await axios.get(`${COINCAP_API}/assets?limit=20`, { timeout: 10000 });
      
      if (response.data && response.data.data) {
        cryptoData = response.data.data.map(coin => ({
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          price: parseFloat(coin.priceUsd).toFixed(2),
          change24h: parseFloat(coin.changePercent24Hr).toFixed(2),
          marketCap: parseFloat(coin.marketCapUsd).toFixed(0),
          volume24h: parseFloat(coin.volumeUsd24Hr).toFixed(0),
          rank: coin.rank
        }));
        apiUsed = 'CoinCap';
      }
    } catch (coincapError) {
      console.log('CoinCap API failed:', coincapError.message);
    }

    // Try CoinGecko API as fallback
    if (!cryptoData) {
      try {
        console.log('Trying CoinGecko API...');
        const response = await axios.get(`${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1`, { timeout: 10000 });
        
        if (response.data && Array.isArray(response.data)) {
          cryptoData = response.data.map(coin => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            price: coin.current_price.toFixed(2),
            change24h: coin.price_change_percentage_24h.toFixed(2),
            marketCap: coin.market_cap.toFixed(0),
            volume24h: coin.total_volume.toFixed(0),
            rank: coin.market_cap_rank
          }));
          apiUsed = 'CoinGecko';
        }
      } catch (coingeckoError) {
        console.log('CoinGecko API failed:', coingeckoError.message);
      }
    }

    if (cryptoData && cryptoData.length > 0) {
      res.json({
        success: true,
        data: cryptoData,
        timestamp: new Date().toISOString(),
        apiUsed: apiUsed
      });
    } else {
      throw new Error('All cryptocurrency APIs are currently unavailable');
    }
  } catch (error) {
    console.error('Failed to get cryptocurrency data from any API:', error.message);
    
    res.status(503).json({
      success: false,
      error: 'Cryptocurrency data service is currently unavailable',
      message: 'Unable to fetch real-time cryptocurrency prices. Please check your internet connection and try again.',
      timestamp: new Date().toISOString()
    });
  }
});

// Function to get stock prices
app.get('/api/stocks', async (req, res) => {
  try {
    // We use fake stock data for this demo
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
    console.error('Could not get stock data:', error.message);
    res.status(500).json({
      success: false,
      error: 'Could not get stock data'
    });
  }
});

// Function to convert money from one currency to another
app.get('/api/currency/:from/:to', async (req, res) => {
  try {
    const { from, to } = req.params;
    
    // Check if both currencies are provided
    if (!from || !to) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both currencies (from and to)'
      });
    }

    try {
      // Try to get real exchange rate from the internet
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
      // Use fake exchange rates when we can't get real ones
      const fakeRates = {
        'USD': { 'EUR': 0.85, 'GBP': 0.73, 'JPY': 110.0, 'CAD': 1.25, 'AUD': 1.35, 'CHF': 0.92, 'CNY': 6.45, 'INR': 74.0, 'BRL': 5.2, 'PHP': 50.0, 'KRW': 1180.0 },
        'EUR': { 'USD': 1.18, 'GBP': 0.86, 'JPY': 129.0, 'CAD': 1.47, 'AUD': 1.59, 'CHF': 1.08, 'CNY': 7.59, 'INR': 87.0, 'BRL': 6.12, 'PHP': 58.8, 'KRW': 1388.0 },
        'GBP': { 'USD': 1.37, 'EUR': 1.16, 'JPY': 150.0, 'CAD': 1.71, 'AUD': 1.85, 'CHF': 1.26, 'CNY': 8.84, 'INR': 101.0, 'BRL': 7.12, 'PHP': 68.5, 'KRW': 1616.0 }
      };

      const fromUpper = from.toUpperCase();
      const toUpper = to.toUpperCase();
      
      let exchangeRate = 1;
      if (fakeRates[fromUpper] && fakeRates[fromUpper][toUpper]) {
        exchangeRate = fakeRates[fromUpper][toUpper];
      } else if (fromUpper === toUpper) {
        exchangeRate = 1;
      } else {
        // Make up a random rate for other combinations
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
        note: 'Using fake data - real data not available'
      });
    }
  } catch (error) {
    console.error('Could not get currency data:', error.message);
    res.status(500).json({
      success: false,
      error: 'Could not get exchange rate'
    });
  }
});

// Function to check if the server is working
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Finance Dashboard is working!',
    timestamp: new Date().toISOString()
  });
});

// API routes only - no static file serving
// The frontend will be served separately

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Finance Dashboard is ready!`);
  console.log(`🔗 Available functions:`);
  console.log(`   GET /api/crypto - Get cryptocurrency prices`);
  console.log(`   GET /api/stocks - Get stock prices`);
  console.log(`   GET /api/currency/{from}/{to} - Convert currencies`);
  console.log(`   GET /api/health - Check if server is working`);
});
