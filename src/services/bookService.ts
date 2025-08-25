import { apiClient } from './api';
import { Book, ApiResponse, PaginationParams } from '../types';

export const bookService = {
  async getBooks(params?: PaginationParams): Promise<ApiResponse<Book[]>> {
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
      totalPages: Math.ceil((response.data.count || 0) / (params?.limit || 10)),
    };
  },

  async getBookById(id: string): Promise<Book> {
    const response = await apiClient.get(`/books/${id}/`);
    return response.data;
  },

  async searchBooks(query: string): Promise<ApiResponse<Book[]>> {
    const response = await apiClient.get('/books/', {
      params: { search: query },
    });

    return {
      data: response.data.results || response.data,
      total: response.data.count || 0,
    };
  },

  async getBooksByCategory(
    categoryId: string,
    includeChildren: boolean = true
  ): Promise<ApiResponse<Book[]>> {
    const response = await apiClient.get(`/categories/${categoryId}/books/`, {
      params: {
        include_children: includeChildren,
        page: 1,
        page_size: 10,
      },
    });

    return {
      data: response.data.results || response.data,
      total: response.data.count || 0,
    };
  },

  async getFeaturedBooks(): Promise<Book[]> {
    const response = await apiClient.get('/books/featured/');
    return response.data;
  },

  async getSimilarBooks(bookId: string): Promise<Book[]> {
    const response = await apiClient.get(`/books/${bookId}/similar/`);
    return response.data;
  },

  async getTopProducts(): Promise<ApiResponse<Book[]>> {
    const response = await apiClient.get('/books/', {
      params: {
        ordering: '-quantity_sold',
        page_size: 10,
      },
    });

    return {
      data: response.data.results || response.data,
      total: response.data.count || 0,
    };
  },
};
