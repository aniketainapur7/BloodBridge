import axios from 'axios';

const API_BASE_URL = 'http://192.168.159.86:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
