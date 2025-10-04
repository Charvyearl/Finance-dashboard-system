# 💰 Finance Dashboard

A comprehensive financial dashboard that provides real-time cryptocurrency prices, stock market updates, and currency exchange rates through a modern web interface.

## 🚀 Features

### 📈 Cryptocurrency Prices
- Live cryptocurrency prices (BTC, ETH, and 18+ other major cryptocurrencies)
- Real-time price updates every 30 seconds
- Market cap, volume, and 24h change data
- Responsive table with sorting and filtering

### 📊 Stock Market Updates
- Interactive stock charts with 30-day historical data
- Real-time stock prices for major companies (AAPL, TSLA, GOOGL, etc.)
- Interactive stock selector
- Price change indicators and percentages

### 💱 Currency Exchange
- Real-time exchange rates for 12+ major currencies
- Interactive currency converter
- Popular currency pairs quick selection
- Support for USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, BRL, PHP, KRW

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **RESTful API** design
- **CORS** enabled for cross-origin requests
- **Axios** for external API calls
- **dotenv** for environment variables

### Frontend
- **React.js** 18 with functional components and hooks
- **Recharts** for interactive charts
- **Axios** for API communication
- **CSS3** with modern styling and animations
- **Responsive design** for all screen sizes

### External APIs
- **CoinCap API** for cryptocurrency data
- **Exchange Rate API** for currency conversion
- **Mock data** for stock market (easily replaceable with real APIs)

## 📁 Project Structure

```
Finance/
├── server.js                 # Express server
├── package.json             # Backend dependencies
├── env.example              # Environment variables template
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.js
│   │   │   ├── CryptoTable.js
│   │   │   ├── StocksChart.js
│   │   │   ├── CurrencyConverter.js
│   │   │   └── LoadingSpinner.js
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── App.js           # Main App component
│   │   ├── App.css          # Main styles
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles
│   └── package.json         # Frontend dependencies
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd Finance
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables (optional)**
   ```bash
   cp env.example .env
   ```
   Edit `.env` and add your Alpha Vantage API key if you want real stock data.

5. **Start the development servers**

   **Option A: Start both servers separately**
   ```bash
   # Terminal 1 - Backend
   npm run dev

   # Terminal 2 - Frontend
   npm run client
   ```

   **Option B: Start both servers with one command**
   ```bash
   npm run dev:full
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 API Endpoints

### GET /api/crypto
Returns cryptocurrency prices and market data.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "bitcoin",
      "symbol": "BTC",
      "name": "Bitcoin",
      "price": "43250.12",
      "change24h": "2.45",
      "marketCap": "850000000000",
      "volume24h": "25000000000",
      "rank": "1"
    }
  ],
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET /api/stocks
Returns stock market data.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "price": 175.43,
      "change": 2.15,
      "changePercent": 1.24
    }
  ],
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET /api/currency/{from}/{to}
Returns exchange rate between two currencies.

**Example:** `/api/currency/USD/EUR`

**Response:**
```json
{
  "success": true,
  "data": {
    "from": "USD",
    "to": "EUR",
    "rate": 0.85,
    "amount": 1,
    "result": 0.85
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET /api/health
Health check endpoint.

## 🎨 Features in Detail

### Cryptocurrency Table
- **Auto-refresh**: Updates every 30 seconds
- **Real-time data**: Live prices from CoinCap API
- **Comprehensive info**: Price, change, market cap, volume
- **Responsive design**: Works on all screen sizes

### Stock Market Chart
- **Interactive charts**: Built with Recharts library
- **Historical data**: 30-day price movement simulation
- **Stock selector**: Switch between different stocks
- **Quick stats**: Overview of multiple stocks

### Currency Converter
- **Real-time rates**: Live exchange rates
- **12+ currencies**: Major world currencies supported
- **Quick pairs**: Popular currency combinations
- **Swap function**: Easy currency switching

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
PORT=5000
ALPHA_VANTAGE_API_KEY=your_api_key_here
```

### API Keys
- **CoinCap API**: No key required (free tier)
- **Exchange Rate API**: No key required (free tier)
- **Alpha Vantage**: Optional, for real stock data

## 🚀 Production Deployment

### Build for Production
```bash
# Build React app
cd client
npm run build
cd ..

# Start production server
npm start
```

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure your web server (nginx, Apache) to serve the React build
3. Set up process management (PM2, systemd)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change port in .env
PORT=3001
```

**CORS errors:**
- Make sure the backend is running on port 5000
- Check that the frontend proxy is configured correctly

**API errors:**
- Check your internet connection
- Verify external APIs are accessible
- Check browser console for detailed error messages

### Getting Help
- Check the browser console for errors
- Verify all dependencies are installed
- Ensure both servers are running
- Check the network tab for API calls

## 🎯 Future Enhancements

- [ ] Real-time WebSocket connections
- [ ] User authentication and portfolios
- [ ] More detailed stock analysis
- [ ] Cryptocurrency price alerts
- [ ] Dark/light theme toggle
- [ ] Mobile app version
- [ ] Advanced charting tools
- [ ] News integration
- [ ] Price prediction models

---

**Happy Trading! 📈💰**
