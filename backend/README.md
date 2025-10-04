# Finance Dashboard Backend

A Node.js/Express API server that provides financial data including cryptocurrency prices, stock information, and currency exchange rates.

## Features

- **Cryptocurrency API**: Real-time crypto prices from CoinCap API with fallback to mock data
- **Stock API**: Stock market data (currently using mock data)
- **Currency Exchange API**: Real-time exchange rates with fallback to mock data
- **Health Check**: API health monitoring endpoint
- **CORS Support**: Configured for cross-origin requests

## API Endpoints

- `GET /api/crypto` - Get cryptocurrency prices
- `GET /api/stocks` - Get stock market data
- `GET /api/currency/:from/:to` - Get exchange rate between currencies
- `GET /api/health` - Health check endpoint

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your configuration (optional API keys)

### Running the Server

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

#### Using Start Scripts
- Windows: `start.bat`
- Linux/Mac: `./start.sh`

The server will start on `http://localhost:5000` by default.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `ALPHA_VANTAGE_API_KEY` | Alpha Vantage API key | `demo` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |

## API Usage Examples

### Get Cryptocurrency Prices
```bash
curl http://localhost:5000/api/crypto
```

### Get Exchange Rate
```bash
curl http://localhost:5000/api/currency/USD/EUR
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

## External APIs

- **CoinCap API**: For cryptocurrency data
- **Exchange Rate API**: For currency exchange rates
- **Alpha Vantage**: For stock data (optional, currently using mock data)

## Development

The server uses:
- **Express.js** for the web framework
- **Axios** for HTTP requests
- **CORS** for cross-origin support
- **dotenv** for environment configuration
- **Nodemon** for development auto-restart

## Deployment

This backend is designed to be deployed independently. It only serves API endpoints and does not serve static files. The frontend should be deployed separately and configured to point to this backend API.
