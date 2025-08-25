import { apiClient } from './api';
import type { User, Book, Order } from '../types';

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  todayOrders: number;
  pendingOrders: number;
  monthlyStats?: {
    month: string;
    revenue: number;
    orders: number;
  }[];
}

interface AdminResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export const adminService = {
  // Dashboard Operations
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get('/admin/dashboard/stats');
    return response.data;
  },

  async getRecentActivity(): Promise<any[]> {
    const response = await apiClient.get('/admin/dashboard/activity');
    return response.data;
  },

  // Product Management
  async getProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<AdminResponse<Book[]>> {
    const response = await apiClient.get('/admin/products', { params });
    return response.data;
  },

  async getProduct(id: string): Promise<Book> {
    const response = await apiClient.get(`/admin/products/${id}`);
    return response.data;
  },

  async createProduct(productData: Partial<Book>): Promise<Book> {
    const response = await apiClient.post('/admin/products', productData);
    return response.data;
  },

  async updateProduct(id: string, productData: Partial<Book>): Promise<Book> {
    const response = await apiClient.put(`/admin/products/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/admin/products/${id}`);
  },

  async updateProductStock(id: string, stock: number): Promise<Book> {
    const response = await apiClient.patch(`/admin/products/${id}/stock`, { stock });
    return response.data;
  },

  async bulkUpdateProducts(updates: { id: string; data: Partial<Book> }[]): Promise<Book[]> {
    const response = await apiClient.patch('/admin/products/bulk', { updates });
    return response.data;
  },

  // User Management  
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: 'user' | 'admin';
    status?: 'active' | 'blocked';
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<AdminResponse<User[]>> {
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
  },

  async getUser(id: string): Promise<User> {
    const response = await apiClient.get(`/admin/users/${id}`);
    return response.data;
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await apiClient.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  async updateUserRole(id: string, role: 'user' | 'admin'): Promise<User> {
    const response = await apiClient.patch(`/admin/users/${id}/role`, { role });
    return response.data;
  },

  async blockUser(id: string, reason?: string): Promise<User> {
    const response = await apiClient.patch(`/admin/users/${id}/block`, { reason });
    return response.data;
  },

  async unblockUser(id: string): Promise<User> {
    const response = await apiClient.patch(`/admin/users/${id}/unblock`);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/admin/users/${id}`);
  },

  // Order Management
  async getOrders(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: Order['status'];
    paymentMethod?: Order['paymentMethod'];
    dateFrom?: string;
    dateTo?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<AdminResponse<Order[]>> {
    const response = await apiClient.get('/admin/orders', { params });
    return response.data;
  },

  async getOrder(id: string): Promise<Order> {
    const response = await apiClient.get(`/admin/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(id: string, status: Order['status'], notes?: string): Promise<Order> {
    const response = await apiClient.patch(`/admin/orders/${id}/status`, { 
      status, 
      notes 
    });
    return response.data;
  },

  async updateOrderItems(id: string, items: any[]): Promise<Order> {
    const response = await apiClient.patch(`/admin/orders/${id}/items`, { items });
    return response.data;
  },

  async cancelOrder(id: string, reason: string): Promise<Order> {
    const response = await apiClient.patch(`/admin/orders/${id}/cancel`, { reason });
    return response.data;
  },

  async refundOrder(id: string, amount?: number, reason?: string): Promise<Order> {
    const response = await apiClient.post(`/admin/orders/${id}/refund`, { 
      amount, 
      reason 
    });
    return response.data;
  },

  // Category Management
  async getCategories(): Promise<any[]> {
    const response = await apiClient.get('/admin/categories');
    return response.data;
  },

  async createCategory(categoryData: any): Promise<any> {
    const response = await apiClient.post('/admin/categories', categoryData);
    return response.data;
  },

  async updateCategory(id: string, categoryData: any): Promise<any> {
    const response = await apiClient.put(`/admin/categories/${id}`, categoryData);
    return response.data;
  },

  async deleteCategory(id: string): Promise<void> {
    await apiClient.delete(`/admin/categories/${id}`);
  },

  // Reports & Analytics
  async getSalesReport(params?: {
    dateFrom?: string;
    dateTo?: string;
    groupBy?: 'day' | 'week' | 'month';
  }): Promise<any> {
    const response = await apiClient.get('/admin/reports/sales', { params });
    return response.data;
  },

  async getUserReport(params?: {
    dateFrom?: string;
    dateTo?: string;
  }): Promise<any> {
    const response = await apiClient.get('/admin/reports/users', { params });
    return response.data;
  },

  async getProductReport(params?: {
    dateFrom?: string;
    dateTo?: string;
    category?: string;
  }): Promise<any> {
    const response = await apiClient.get('/admin/reports/products', { params });
    return response.data;
  },

  // System Operations
  async getSystemHealth(): Promise<any> {
    const response = await apiClient.get('/admin/system/health');
    return response.data;
  },

  async getLogs(params?: {
    level?: 'error' | 'warn' | 'info';
    limit?: number;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<any> {
    const response = await apiClient.get('/admin/system/logs', { params });
    return response.data;
  },

  async backupDatabase(): Promise<any> {
    const response = await apiClient.post('/admin/system/backup');
    return response.data;
  },

  // File Upload
  async uploadImage(file: File, type: 'product' | 'user' | 'category'): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await apiClient.post('/admin/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async uploadBulkProducts(file: File): Promise<{ success: number; errors: any[] }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/admin/products/bulk-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Export Functions
  async exportProducts(format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> {
    const response = await apiClient.get(`/admin/export/products?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  async exportUsers(format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> {
    const response = await apiClient.get(`/admin/export/users?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  async exportOrders(format: 'csv' | 'xlsx' = 'csv', params?: {
    dateFrom?: string;
    dateTo?: string;
    status?: string;
  }): Promise<Blob> {
    const response = await apiClient.get(`/admin/export/orders?format=${format}`, {
      params,
      responseType: 'blob',
    });
    return response.data;
  }
};

export default adminService;