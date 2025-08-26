import { apiClient } from './api';
import type { User } from '../types';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post('/auth/login/', {
      email,
      password,
    });
    return response.data;
  },

  async register(userData: {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    role?: string;
  }): Promise<RegisterResponse> {
    const response = await apiClient.post('/auth/register/', userData);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get('/auth/profile/');
    return response.data;
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiClient.put('/auth/profile/', userData);
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await apiClient.post('/auth/change-password/', {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await apiClient.post('/auth/refresh/', {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  async logout(refreshToken: string): Promise<void> {
    try {
      await apiClient.post('/auth/logout/', {
        refresh_token: refreshToken,
      });
    } catch (error) {
      // Even if server logout fails, we still clear local state
      console.warn('Server logout failed:', error);
    }
  },

  async requestPasswordReset(email: string): Promise<void> {
    const response = await apiClient.post('/auth/forgot-password/', { email });
    return response.data;
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await apiClient.post('/auth/reset-password/', {
      token,
      password: newPassword,
    });
    return response.data;
  },

  async verifyEmail(token: string): Promise<void> {
    const response = await apiClient.post('/auth/verify-email/', { token });
    return response.data;
  },

  async resendVerificationEmail(): Promise<void> {
    const response = await apiClient.post('/auth/resend-verification/');
    return response.data;
  },
};

export default authService;
