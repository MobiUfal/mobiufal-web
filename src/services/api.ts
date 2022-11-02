import axios from "axios";
import { TOKEN_KEY } from "../hooks/useAuth";

const BASE_URL = "http://localhost:3000/";
const BASE_URL_DEV = "https://mobiufal-api.herokuapp.com/";

export const api = axios.create({
  baseURL: BASE_URL_DEV,
});

api.interceptors.request.use(async (config) => {
  const JWT = localStorage.getItem(TOKEN_KEY);
  if (JWT != null) {
    config.headers!.auth = JWT;
  }

  return config;
});
