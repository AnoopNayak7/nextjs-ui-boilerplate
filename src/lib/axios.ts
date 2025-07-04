import axios from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';

const API_URL = 'http://localhost:8080/api/v1';

console.log("API URL:", API_URL)

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

const getToken = () => {
  let token: any = null;
  
  try {
    token = getCookie('auth_token');
    console.log("Token from cookies-next:", token);

    if (!token && typeof window !== 'undefined') {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth_token='))
        ?.split('=')[1];
      token = cookieValue;
      console.log("Token from document.cookie:", token);
    }

    if (!token && typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsedStorage = JSON.parse(authStorage);
        token = parsedStorage?.state?.token;
        console.log("Token from localStorage:", token);
      }
    }
    
  } catch (error) {
    console.error("Error getting token:", error);
  }
  
  return token;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log("Final token being used:", token);
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      deleteCookie('auth_token');
      deleteCookie('auth_token', { path: '/' });
      deleteCookie('auth_token', { path: '/', domain: 'localhost' });

      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;