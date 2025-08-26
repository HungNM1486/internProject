import { apiClient } from './api';
import { Order, ApiResponse, PaginationParams } from '../types';

export interface CreateOrderRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  payment_method: 'cod' | 'card' | 'bank_transfer';
  shipping_method: 'standard' | 'express';
  notes?: string;
  items: {
    book_id: string;
    quantity: number;
  }[];
}

export const orderService = {
  async getOrders(params?: PaginationParams): Promise<ApiResponse<Order[]>> {
    const queryParams: any = {};

    if (params?.page) queryParams.page = params.page;
    if (params?.limit) queryParams.page_size = params.limit;
    if (params?.search) queryParams.search = params.search;

    const response = await apiClient.get('/orders/', { params: queryParams });

    return {
      data: response.data.results || response.data,
      total: response.data.count || 0,
      page: params?.page || 1,
      limit: params?.limit || 10,
    };
  },

  async getOrderById(id: string): Promise<Order> {
    const response = await apiClient.get(`/orders/${id}/`);
    return response.data;
  },

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const response = await apiClient.post('/orders/', orderData);
    return response.data;
  },

  async cancelOrder(orderId: string): Promise<void> {
    await apiClient.post(`/orders/${orderId}/cancel/`);
  },
};
