// Import required libraries
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Create the web server
const app = express();
const PORT = process.env.PORT || 5000;

// Allow frontend to talk to our server
app.use(cors());
app.use(express.json());

// API URLs
const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest';
const FINNHUB_API = 'https://finnhub.io/api/v1';

// API Keys
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || '';

// Get cryptocurrency prices
app.get('/api/crypto', async (req, res) => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1`,
      { timeout: 10000 }
    );
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response from CoinGecko');
    }
    
    const cryptoData = response.data.map(coin => ({
      id: coin.id,
      symbol: String(coin.symbol || '').toUpperCase(),
      name: coin.name,
      price: Number(coin.current_price || 0).toFixed(2),
      change24h: Number(coin.price_change_percentage_24h || 0).toFixed(2),
      marketCap: Number(coin.market_cap || 0).toFixed(0),
      volume24h: Number(coin.total_volume || 0).toFixed(0),
      rank: coin.market_cap_rank
    }));
    
    res.json({ 
      success: true, 
      data: cryptoData, 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Crypto API error:', error.message);
    res.status(503).json({ 
      success: false, 
      error: 'Could not get crypto data' 
    });
  }
});

// Get stock prices
app.get('/api/stocks', async (req, res) => {
  try {
    if (!FINNHUB_API_KEY) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing API key', 
        message: 'Set FINNHUB_API_KEY in backend/.env and restart the server.' 
      });
    }
    
    const symbols = ['AAPL', 'MSFT', 'NVDA', 'TSLA', 'AMZN', 'META', 'GOOGL', 'NFLX', 'AMD', 'INTC', 'SHOP', 'BA', 'DIS', 'JPM', 'BAC', 'V', 'MA', 'KO', 'PEP', 'NKE'];
    
    // Fetch all stock quotes in parallel
    const requests = symbols.map(symbol => 
      axios.get(`${FINNHUB_API}/quote`, {
        params: { symbol, token: FINNHUB_API_KEY }, 
        timeout: 10000
      })
      .then(r => ({ symbol, data: r.data }))
      .catch(err => ({ symbol, error: err }))
    );
    
    const results = await Promise.all(requests);
    
    const stocks = results.map(r => {
      if (r.error || !r.data || typeof r.data.c !== 'number') {
        console.warn(`Failed to get quote for ${r.symbol}`);
        return null;
      }
      
      const price = Number(r.data.c || 0);
      const prevClose = Number(r.data.pc || price);
      const change = price - prevClose;
      const changePercent = prevClose ? (change / prevClose) * 100 : 0;
      
      return { 
        symbol: r.symbol, 
        name: r.symbol, 
        price, 
        change, 
        changePercent 
      };
    }).filter(Boolean);
    
    if (!stocks.length) {
      throw new Error('No data from Finnhub');
    }
    
    res.json({ 
      success: true, 
      data: stocks, 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Stock API error:', error.message);
    res.status(503).json({ 
      success: false, 
      error: 'Could not get stock data' 
    });
  }
});



// Convert currency
app.get('/api/currency/:from/:to', async (req, res) => {
  try {
    const { from, to } = req.params;
    
    if (!from || !to) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both currencies (from and to)'
      });
    }

    try {
      // Get real exchange rate
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
      // Fallback rates if API fails
      const fallbackRates = {
        'USD': { 'EUR': 0.85, 'GBP': 0.73, 'JPY': 110.0, 'CAD': 1.25, 'AUD': 1.35, 'CHF': 0.92, 'CNY': 6.45, 'INR': 74.0, 'BRL': 5.2, 'PHP': 50.0, 'KRW': 1180.0 },
        'EUR': { 'USD': 1.18, 'GBP': 0.86, 'JPY': 129.0, 'CAD': 1.47, 'AUD': 1.59, 'CHF': 1.08, 'CNY': 7.59, 'INR': 87.0, 'BRL': 6.12, 'PHP': 58.8, 'KRW': 1388.0 },
        'GBP': { 'USD': 1.37, 'EUR': 1.16, 'JPY': 150.0, 'CAD': 1.71, 'AUD': 1.85, 'CHF': 1.26, 'CNY': 8.84, 'INR': 101.0, 'BRL': 7.12, 'PHP': 68.5, 'KRW': 1616.0 }
      };

      const fromUpper = from.toUpperCase();
      const toUpper = to.toUpperCase();
      
      let exchangeRate = 1;
      if (fallbackRates[fromUpper] && fallbackRates[fromUpper][toUpper]) {
        exchangeRate = fallbackRates[fromUpper][toUpper];
      } else if (fromUpper === toUpper) {
        exchangeRate = 1;
      } else {
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
        note: 'Using fallback data'
      });
    }
  } catch (error) {
    console.error('Currency API error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Could not get exchange rate'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Finance Dashboard API is running',
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Finance Dashboard API ready!`);
  console.log(`\nAvailable endpoints:`);
  console.log(`   GET /api/crypto - Cryptocurrency prices`);
  console.log(`   GET /api/stocks - Stock prices`);
  console.log(`   GET /api/currency/{from}/{to} - Currency converter`);
  console.log(`   GET /api/health - Health check`);
});
