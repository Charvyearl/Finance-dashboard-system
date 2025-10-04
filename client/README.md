# Finance Dashboard Frontend

A React-based web application for displaying financial data including cryptocurrency prices, stock charts, and currency conversion.

## Features

- **Cryptocurrency Table**: Real-time crypto prices with market data
- **Stock Charts**: Interactive stock price visualization
- **Currency Converter**: Real-time currency exchange calculator
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live data from backend API

## Components

- `CryptoTable` - Displays cryptocurrency prices and market data
- `StocksChart` - Interactive stock price charts
- `CurrencyConverter` - Currency exchange calculator
- `Header` - Navigation and branding
- `LoadingSpinner` - Loading state indicator

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API server running (see backend README)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your backend API URL

### Running the Application

#### Development Mode
```bash
npm start
```

#### Using Start Scripts
- Windows: `start.bat`
- Linux/Mac: `./start.sh`

The application will start on `http://localhost:3000` by default.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `REACT_APP_NODE_ENV` | Environment | `development` |
| `REACT_APP_DEBUG` | Enable debug logging | `false` |

## API Integration

The frontend communicates with the backend API through the `services/api.js` module:

- **Crypto API**: `cryptoAPI.getPrices()`
- **Stocks API**: `stocksAPI.getData()`
- **Currency API**: `currencyAPI.getExchangeRate(from, to)`

## Dependencies

- **React** - UI framework
- **Axios** - HTTP client for API calls
- **Recharts** - Chart library for data visualization
- **Lucide React** - Icon library

## Development

### Project Structure
```
src/
├── components/          # React components
│   ├── CryptoTable.js
│   ├── CurrencyConverter.js
│   ├── Header.js
│   ├── LoadingSpinner.js
│   └── StocksChart.js
├── services/           # API service layer
│   └── api.js
├── App.js             # Main application component
├── App.css            # Application styles
├── index.js           # Application entry point
└── index.css          # Global styles
```

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Deployment

This frontend is designed to be deployed independently. It communicates with the backend API via HTTP requests. Make sure to:

1. Update `REACT_APP_API_URL` to point to your deployed backend
2. Build the application: `npm run build`
3. Deploy the `build` folder to your web server/CDN

## Backend Requirements

The frontend requires the backend API to be running and accessible. See the backend README for setup instructions.
