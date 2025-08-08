import { apiClient } from './api';
import type { User } from '../types';

interface LoginResponse {
  accessToken: string;
  user: User;
}

interface RegisterResponse {
  accessToken: string;
  user: User;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  },

  async register(email: string, password: string): Promise<RegisterResponse> {
    const response = await apiClient.post('/register', { 
      email, 
      password,
      // Add default role if backend expects it
      role: 'user'
    });
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get('/profile');
    return response.data;
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiClient.put('/profile', userData);
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await apiClient.post('/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  async refreshToken(): Promise<LoginResponse> {
    const response = await apiClient.post('/refresh-token');
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/logout');
    } catch (error) {
      // Even if server logout fails, we still clear local state
      console.warn('Server logout failed:', error);
    }
  },

  async requestPasswordReset(email: string): Promise<void> {
    const response = await apiClient.post('/forgot-password', { email });
    return response.data;
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await apiClient.post('/reset-password', {
      token,
      password: newPassword
    });
    return response.data;
  },

  async verifyEmail(token: string): Promise<void> {
    const response = await apiClient.post('/verify-email', { token });
    return response.data;
  },

  async resendVerificationEmail(): Promise<void> {
    const response = await apiClient.post('/resend-verification');
    return response.data;
  }
};

export default authService;