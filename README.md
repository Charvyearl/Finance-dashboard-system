# 💰 Finance Dashboard

A full-stack financial dashboard application with separated backend and frontend services. Shows cryptocurrency prices, stock prices, and currency exchange rates.

## 🚀 What it does

### 📈 Cryptocurrency Prices
- Shows prices for Bitcoin, Ethereum, and other cryptocurrencies
- Updates prices every 30 seconds
- Shows how much prices went up or down
- Shows market value and trading volume

### 📊 Stock Prices
- Shows prices for big companies like Apple, Tesla, Google
- Interactive charts showing price history
- Click different stocks to see their charts
- Shows if prices went up or down

### 💱 Currency Converter
- Convert money from one currency to another
- Works with USD, EUR, GBP, JPY, and more
- Quick buttons for popular currency pairs
- Shows current exchange rates

## 🛠️ What it's made with

### Backend (Server)
- **Node.js** - Makes the server work
- **Express.js** - Helps create the server
- **Axios** - Gets data from other websites
- **CORS** - Allows websites to talk to our server

### Frontend (Website)
- **React.js** - Makes the website interactive
- **Recharts** - Makes the charts look nice
- **CSS3** - Makes everything look pretty
- **Responsive design** - Works on phones and computers

### Data Sources
- **CoinCap API** - Gets real cryptocurrency prices
- **Exchange Rate API** - Gets real currency exchange rates
- **Fake data** - For stock prices (easy to replace with real data)

## 📁 Project Structure

```
Finance/
├── backend/                 # Backend API service
│   ├── server.js           # Express API server
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Backend environment template
│   ├── start.bat           # Windows start script
│   ├── start.sh            # Linux/Mac start script
│   └── README.md           # Backend documentation
├── client/                  # Frontend React application
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
│   ├── package.json         # Frontend dependencies
│   ├── .env.example         # Frontend environment template
│   ├── start.bat            # Windows start script
│   ├── start.sh             # Linux/Mac start script
│   └── README.md            # Frontend documentation
└── README.md                # Main project documentation
```

## 🚀 How to run it

### What you need
- Node.js (version 14 or newer)
- npm (comes with Node.js)

### Step by step

#### Option 1: Run Both Services Separately (Recommended)

1. **Start the Backend API**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend will run on: http://localhost:5000

2. **Start the Frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm start
   ```
   Frontend will run on: http://localhost:3000

#### Option 2: Use Start Scripts

**Windows:**
```bash
# Terminal 1 - Backend
cd backend
start.bat

# Terminal 2 - Frontend
cd client
start.bat
```

**Linux/Mac:**
```bash
# Terminal 1 - Backend
cd backend
./start.sh

# Terminal 2 - Frontend
cd client
./start.sh
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🔧 Backend API Endpoints

The backend provides RESTful API endpoints for financial data:

### GET /api/crypto
Gets cryptocurrency prices.

**What it returns:**
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
  ]
}
```

### GET /api/stocks
Gets stock prices.

**What it returns:**
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
  ]
}
```

### GET /api/currency/{from}/{to}
Converts money from one currency to another.

**Example:** `/api/currency/USD/EUR`

**What it returns:**
```json
{
  "success": true,
  "data": {
    "from": "USD",
    "to": "EUR",
    "rate": 0.85,
    "amount": 1,
    "result": 0.85
  }
}
```

### GET /api/health
Checks if the server is working.

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

### Backend Environment Variables
Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
ALPHA_VANTAGE_API_KEY=your_api_key_here
CORS_ORIGIN=http://localhost:3000
```

### Frontend Environment Variables
Create a `.env` file in the `client/` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NODE_ENV=development
REACT_APP_DEBUG=false
```

### API Keys
- **CoinCap API**: No key required (free tier)
- **Exchange Rate API**: No key required (free tier)
- **Alpha Vantage**: Optional, for real stock data

## 🚀 Production Deployment

### Backend Deployment
```bash
cd backend
npm install --production
npm start
```

### Frontend Deployment
```bash
cd client
npm install
npm run build
# Deploy the 'build' folder to your web server/CDN
```

### Environment Setup
1. Set `NODE_ENV=production` in backend
2. Update `REACT_APP_API_URL` to point to your deployed backend
3. Configure your web server (nginx, Apache) to serve the React build
4. Set up process management (PM2, systemd) for the backend

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

**Backend not starting:**
```bash
# Check if port 5000 is available
npx kill-port 5000

# Or change port in backend/.env
PORT=3001
```

**Frontend can't connect to backend:**
- Make sure the backend is running on port 5000
- Check that `REACT_APP_API_URL` is set correctly in client/.env
- Verify CORS settings in backend

**API errors:**
- Check your internet connection
- Verify external APIs are accessible
- Check browser console for detailed error messages
- Ensure backend is running and accessible

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
