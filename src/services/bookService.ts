import { apiClient } from './api';
import { Book, ApiResponse, PaginationParams } from '../types';
import { validateBookData } from '../utils/validation';

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
    try {
      const response = await apiClient.get(`/books/${id}/`);

      // Kiểm tra dữ liệu trả về
      if (!validateBookData(response.data)) {
        throw new Error('Dữ liệu sách không hợp lệ từ API');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error in getBookById:', error);
      if (error.response?.status === 404) {
        throw new Error('Không tìm thấy sách');
      }
      throw new Error(error.message || 'Lỗi khi lấy thông tin sách');
    }
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
