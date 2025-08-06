import { apiClient } from './api';
import { Book, ApiResponse, PaginationParams } from '../types';

export const bookService = {
  async getBooks(params?: PaginationParams): Promise<ApiResponse<Book[]>> {
    const response = await apiClient.get('/books', { params });
    return {
      data: response.data,
      total: parseInt(response.headers['x-total-count'] || '0'),
      page: params?.page || 1,
      limit: params?.limit || 10
    };
  },

  async getBookById(id: string): Promise<Book> {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },

  async searchBooks(query: string): Promise<ApiResponse<Book[]>> {
    const response = await apiClient.get(`/books`, {
      params: { q: query }
    });
    return {
      data: response.data,
      total: parseInt(response.headers['x-total-count'] || '0')
    };
  },

  async getBooksByCategory(categoryId: string): Promise<ApiResponse<Book[]>> {
    const response = await apiClient.get('/books', {
      params: { categoryId }
    });
    return {
      data: response.data,
      total: parseInt(response.headers['x-total-count'] || '0')
    };
  },

  async getFeaturedBooks(): Promise<Book[]> {
    const response = await apiClient.get('/books', {
      params: { _sort: 'rating', _order: 'desc', _limit: 8 }
    });
    return response.data;
  }
};