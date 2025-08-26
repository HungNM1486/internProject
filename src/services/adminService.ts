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
    const response = await apiClient.get('/admin/dashboard/stats/');
    return response.data;
  },

  async getRevenueStats(): Promise<any> {
    const response = await apiClient.get('/admin/dashboard/revenue/');
    return response.data;
  },

  async getRecentOrders(): Promise<any> {
    const response = await apiClient.get('/admin/dashboard/orders/');
    return response.data;
  },

  // Book Management (Admin)
  async getBooks(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<AdminResponse<Book[]>> {
    const queryParams: any = {};
    if (params?.page) queryParams.page = params.page;
    if (params?.limit) queryParams.page_size = params.limit;
    if (params?.search) queryParams.search = params.search;
    if (params?.sortBy) queryParams.ordering = params.sortBy;

    const response = await apiClient.get('/books/', { params: queryParams });
    return {
      data: response.data.results || response.data,
      total: response.data.count || 0,
      page: params?.page || 1,
      limit: params?.limit || 10,
    };
  },

  async getBook(id: string): Promise<Book> {
    const response = await apiClient.get(`/books/${id}/`);
    return response.data;
  },

  async createBook(bookData: {
    title: string;
    slug: string;
    description: string;
    short_description: string;
    list_price: number;
    original_price: number;
    stock_quantity: number;
    is_available: boolean;
    is_featured: boolean;
    authors: number[];
    categories: number[];
  }): Promise<Book> {
    const response = await apiClient.post('/books/', bookData);
    return response.data;
  },

  async updateBook(id: string, bookData: Partial<Book>): Promise<Book> {
    const response = await apiClient.put(`/books/${id}/`, bookData);
    return response.data;
  },

  async deleteBook(id: string): Promise<void> {
    await apiClient.delete(`/books/${id}/delete/`);
  },

  // User Management (Admin)
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: 'user' | 'admin';
    status?: 'active' | 'blocked';
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<AdminResponse<User[]>> {
    const queryParams: any = {};
    if (params?.page) queryParams.page = params.page;
    if (params?.limit) queryParams.page_size = params.limit;
    if (params?.search) queryParams.search = params.search;
    if (params?.role) queryParams.role = params.role;

    const response = await apiClient.get('/users/', { params: queryParams });
    return {
      data: response.data.results || response.data,
      total: response.data.count || 0,
      page: params?.page || 1,
      limit: params?.limit || 10,
    };
  },

  async getUser(id: string): Promise<User> {
    const response = await apiClient.get(`/users/${id}/`);
    return response.data;
  },

  async createUser(userData: {
    email: string;
    password: string;
    fullName?: string;
    phone?: string;
    role?: 'user' | 'admin';
  }): Promise<User> {
    const response = await apiClient.post('/users/', userData);
    return response.data;
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await apiClient.put(`/users/${id}/`, userData);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}/`);
  },

  async blockUser(id: string): Promise<User> {
    const response = await apiClient.put(`/users/${id}/block/`, { isBlocked: true });
    return response.data;
  },

  async unblockUser(id: string): Promise<User> {
    const response = await apiClient.put(`/users/${id}/block/`, { isBlocked: false });
    return response.data;
  },

  // Order Management (Admin)
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
    const queryParams: any = {};
    if (params?.page) queryParams.page = params.page;
    if (params?.limit) queryParams.page_size = params.limit;
    if (params?.search) queryParams.search = params.search;
    if (params?.status) queryParams.status = params.status;

    const response = await apiClient.get('/orders/', { params: queryParams });
    return {
      data: response.data.results || response.data,
      total: response.data.count || 0,
      page: params?.page || 1,
      limit: params?.limit || 10,
    };
  },

  async getOrder(id: string): Promise<Order> {
    const response = await apiClient.get(`/orders/${id}/`);
    return response.data;
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const response = await apiClient.put(`/orders/${id}/status/`, { status });
    return response.data;
  },

  // Recent Activity (Admin)
  async getRecentActivity(): Promise<any[]> {
    const response = await apiClient.get('/admin/dashboard/activity/');
    return response.data || [];
  },

  // Category Management (Admin)
  async getCategories(): Promise<any[]> {
    const response = await apiClient.get('/categories/');
    return response.data;
  },

  async createCategory(categoryData: {
    name: string;
    slug: string;
    description?: string;
    parent?: number | null;
  }): Promise<any> {
    const response = await apiClient.post('/categories/', categoryData);
    return response.data;
  },

  async updateCategory(id: string, categoryData: any): Promise<any> {
    const response = await apiClient.put(`/categories/${id}/`, categoryData);
    return response.data;
  },

  async deleteCategory(id: string): Promise<void> {
    await apiClient.delete(`/categories/${id}/delete/`);
  },

  // File Upload (Admin)
  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await apiClient.post('/admin/upload/image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async uploadCover(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('cover', file);

    const response = await apiClient.post('/admin/upload/cover/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async uploadMultipleImages(files: File[]): Promise<{ urls: string[] }> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await apiClient.post('/admin/upload/multiple/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteImage(filename: string): Promise<void> {
    await apiClient.delete('/admin/upload/delete/', {
      data: { filename },
    });
  },
};

export default adminService;
