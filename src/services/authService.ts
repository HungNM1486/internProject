import { apiClient } from './api';
import type { User } from '../types';

interface LoginResponse {
  accessToken: string;
  user: User;
}

// RegisterRequest interface removed as it's not used

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  },

  async register(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post('/register', { email, password });
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get('/profile');
    return response.data;
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiClient.put('/profile', userData);
    return response.data;
  }
};

export default authService;