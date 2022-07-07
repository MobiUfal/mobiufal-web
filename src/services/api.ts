import axios from 'axios' 
import { TOKEN_KEY } from '../hooks/useAuth';


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(async config => {
  const JWT = localStorage.getItem(TOKEN_KEY)
  if (JWT != null) {
    config.headers!.auth = JWT;
  }
  
  return config;
});