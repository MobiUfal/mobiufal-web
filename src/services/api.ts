import axios from 'axios' 
import { TOKEN_KEY } from '../hooks/useAuth';

const BASE_URL = 'http://localhost:5000/';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async config => {
  const JWT = localStorage.getItem(TOKEN_KEY)
  if (JWT != null) {
    config.headers!.auth = JWT;
  }
  
  return config;
});