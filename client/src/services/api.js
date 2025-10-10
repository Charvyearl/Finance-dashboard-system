import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Log API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
export const cryptoAPI = {
  getPrices: () => api.get('/crypto'),
};

export const stocksAPI = {
  getData: () => api.get('/stocks'),
};

export const currencyAPI = {
  getExchangeRate: (from, to) => api.get(`/currency/${from}/${to}`),
};

export default api;
