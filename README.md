# 💰 Finance Dashboard

A simple financial dashboard that displays cryptocurrency prices, stock prices, and currency exchange rates.

**🚀 Ready to Deploy to Railway!** See [START_HERE.md](./START_HERE.md) for deployment guides.

## 🚀 What It Does

### 📈 Cryptocurrency Prices
- Shows top 20 cryptocurrencies by market cap
- Real-time prices from CoinGecko API
- Auto-refreshes every 30 seconds
- Displays price changes, market cap, and trading volume

### 📊 Stock Prices
- Shows 20 popular stock symbols (AAPL, MSFT, NVDA, etc.)
- Real-time quotes from Finnhub API
- Auto-refreshes every 60 seconds
- Displays current prices and percentage changes

### 💱 Currency Converter
- Converts between major currencies (USD, EUR, GBP, JPY, etc.)
- Real-time exchange rates
- Quick buttons for popular currency pairs
- Fallback rates when API is unavailable

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- Axios for API calls
- CORS enabled

**Frontend:**
- React.js
- Axios for API calls
- Responsive CSS

**Data Sources:**
- CoinGecko API (cryptocurrency)
- Finnhub API (stocks)
- ExchangeRate API (currency)

## 📁 Project Structure

```
Finance/
├── backend/              # Backend API service
│   ├── server.js        # Express server
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Environment template
├── client/              # Frontend React app
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   └── App.js       # Main app
│   ├── package.json     # Frontend dependencies
│   └── .env.example     # Environment template
└── README.md            # This file
```

## 🚀 How to Run

### Prerequisites
- Node.js (v14 or higher)
- npm
- Finnhub API key (free at https://finnhub.io/register)

### Step 1: Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
FINNHUB_API_KEY=your_api_key_here
```

Start the backend:
```bash
npm run dev
```
Backend will run on: http://localhost:5000

### Step 2: Setup Frontend

Open a new terminal:
```bash
cd client
npm install
```

Create a `.env` file in the `client` folder (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```
Frontend will run on: http://localhost:3000

## 🔗 API Endpoints

### GET /api/crypto
Get cryptocurrency prices.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "symbol": "BTC",
      "name": "Bitcoin",
      "price": "43250.12",
      "change24h": "2.45",
      "marketCap": "850000000000",
      "volume24h": "25000000000",
      "rank": 1
    }
  ]
}
```

### GET /api/stocks
Get stock prices.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "symbol": "AAPL",
      "name": "AAPL",
      "price": 175.43,
      "change": 2.15,
      "changePercent": 1.24
    }
  ]
}
```

### GET /api/currency/:from/:to
Convert currency.

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
  }
}
```

### GET /api/health
Check server status.

## 🔧 Configuration

### API Keys
- **CoinGecko**: No key required (free tier)
- **ExchangeRate API**: No key required (free tier)
- **Finnhub**: Required - get free key at https://finnhub.io/register

### Rate Limits
- Finnhub Free Plan: 60 calls/minute, 30 calls/second
- Displays 20 stocks = 20 API calls per refresh
- Auto-refresh every 60 seconds = within rate limits

## 🎯 Features

✅ Real-time financial data  
✅ Auto-refresh intervals  
✅ Error handling with retry  
✅ Responsive design  
✅ Simple and clean UI  
✅ Separated backend/frontend  

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Or change port in backend/.env
PORT=3001
```

**API errors:**
- Check your Finnhub API key in `backend/.env`
- Restart the backend server after setting the API key
- Check internet connection
- Verify APIs are accessible

**Frontend can't connect:**
- Make sure backend is running on port 5000
- Check `REACT_APP_API_URL` in client/.env
- Clear browser cache and hard refresh

## 🚀 Deployment

### Deploy to Railway

This project is ready to deploy to Railway! Railway automatically handles both the backend and frontend services.

**Quick Start:** See [RAILWAY_QUICKSTART.md](./RAILWAY_QUICKSTART.md) for a 10-minute deployment guide.

**Full Guide:** See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed instructions.

**What's Included:**
- ✅ Railway configuration files (`railway.json`)
- ✅ CORS configuration for production
- ✅ Environment variable setup
- ✅ Serve package for frontend hosting

**Deployment Summary:**
1. Deploy backend → Get backend URL
2. Deploy frontend → Set backend URL in env vars
3. Update CORS → Done! 🎉

**Cost:** Free tier on Railway ($5 credit/month) is sufficient for this project.

---

## 📝 License

MIT License - feel free to use this project!

---

**Happy Trading! 📈💰**
