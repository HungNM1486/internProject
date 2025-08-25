import { apiClient } from './api';
import { Book, ApiResponse, PaginationParams } from '../types';

export const bookService = {
  async getBooks(params?: PaginationParams & { 
    categories?: number[]; 
    ordering?: string; 
    priceMin?: number; 
    priceMax?: number;
    authors?: number[];
  }): Promise<ApiResponse<Book[]>> {
    let queryParams: any = { ...params };
    
    // Handle categories filter
    if (params?.categories && params.categories.length > 0) {
      queryParams.categories = params.categories.join(',');
    }
    
    // Handle sorting/ordering
    if (params?.ordering) {
      queryParams.ordering = params.ordering;
    }
    
    // Handle price range filter
    if (params?.priceMin !== undefined && params.priceMin !== null) {
      queryParams.list_price__gte = params.priceMin;
      console.log('🔍 Setting price filter MIN:', params.priceMin);
    }
    if (params?.priceMax !== undefined && params.priceMax !== null) {
      queryParams.list_price__lte = params.priceMax;
      console.log('🔍 Setting price filter MAX:', params.priceMax);
    }
    
    // Handle authors filter
    if (params?.authors && params.authors.length > 0) {
      queryParams.authors = params.authors.join(',');
    }
    
    console.log('📡 API Call params:', queryParams);
    const response = await apiClient.get('/books', { params: queryParams });
    
    // API returns { count, results, ... } - extract results
    const apiData = response.data;
    console.log('📊 API Response count:', apiData.count, 'results:', apiData.results?.length);
    return {
      data: apiData.results || apiData, // Use results if available
      total: apiData.count || parseInt(response.headers['x-total-count'] || '0'),
      page: params?.page || 1,
      limit: params?.limit || 10
    };
  },

  async getBookById(id: string): Promise<Book> {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },

  async searchBooks(query: string, params?: PaginationParams & { 
    ordering?: string; 
    priceMin?: number; 
    priceMax?: number;
    authors?: number[];
  }): Promise<ApiResponse<Book[]>> {
    let queryParams: any = { 
      q: query,
      ...params 
    };
    
    // Handle sorting/ordering for search
    if (params?.ordering) {
      queryParams.ordering = params.ordering;
    }
    
    // Handle price range filter for search
    if (params?.priceMin !== undefined && params.priceMin !== null) {
      queryParams.list_price__gte = params.priceMin;
      console.log('🔍 SEARCH Setting price filter MIN:', params.priceMin);
    }
    if (params?.priceMax !== undefined && params.priceMax !== null) {
      queryParams.list_price__lte = params.priceMax;
      console.log('🔍 SEARCH Setting price filter MAX:', params.priceMax);
    }
    
    // Handle authors filter for search
    if (params?.authors && params.authors.length > 0) {
      queryParams.authors = params.authors.join(',');
    }
    
    console.log('📡 SEARCH API Call params:', queryParams);
    const response = await apiClient.get(`/books`, { params: queryParams });
    
    // Handle paginated response same as getBooks
    const apiData = response.data;
    console.log('📊 SEARCH API Response count:', apiData.count, 'results:', apiData.results?.length);
    return {
      data: apiData.results || apiData,
      total: apiData.count || parseInt(response.headers['x-total-count'] || '0'),
      page: params?.page || 1,
      limit: params?.limit || 10
    };
  },

  async getBooksByCategory(categoryIds: number | number[], params?: PaginationParams): Promise<ApiResponse<Book[]>> {
    const categoryParam = Array.isArray(categoryIds) ? categoryIds.join(',') : categoryIds;
    const response = await apiClient.get('/books', {
      params: { 
        categories: categoryParam,
        ...params 
      }
    });
    
    // Handle paginated response
    const apiData = response.data;
    return {
      data: apiData.results || apiData,
      total: apiData.count || parseInt(response.headers['x-total-count'] || '0'),
      page: params?.page || 1,
      limit: params?.limit || 10
    };
  },

  async getFeaturedBooks(): Promise<Book[]> {
    const response = await apiClient.get('/books', {
      params: { _sort: 'rating', _order: 'desc', _limit: 8 }
    });
    return response.data;
  }
};