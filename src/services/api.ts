import axios from 'axios';
import { authStore } from '../store/authStore';
import { uiStore } from '../store/uiStore';

const API_BASE_URL = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_API_URL || 'https://intern.n8n-store.xyz/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor để thêm token
apiClient.interceptors.request.use((config) => {
  const token = authStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor để handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      // Token expired or invalid
      authStore.getState().logout();
      uiStore.getState().addNotification({
        type: 'error',
        message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
      });
    } else if (response?.status >= 500) {
      uiStore.getState().addNotification({
        type: 'error',
        message: 'Lỗi server. Vui lòng thử lại sau.',
      });
    }

    return Promise.reject(error);
  }
);
