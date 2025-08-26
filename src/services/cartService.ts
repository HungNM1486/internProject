import { apiClient } from './api';
import { CartItem } from '../types';

export const cartService = {
  async getCart(): Promise<{ items: CartItem[] }> {
    const response = await apiClient.get('/carts/cart_items/');
    return response.data;
  },

  async addToCart(bookId: string, quantity: number): Promise<CartItem> {
    console.log('cartService.addToCart called:', { bookId, quantity });
    try {
      // Sử dụng đúng format theo Postman collection
      const requestBody = {
        bookId: bookId, // camelCase như trong Postman collection
        quantity,
      };
      console.log('Request body:', requestBody);

      const response = await apiClient.post('/carts/add/', requestBody);
      console.log('cartService.addToCart response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('cartService.addToCart error:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  },

  async updateCartItem(bookId: string, quantity: number): Promise<CartItem> {
    const response = await apiClient.put(`/carts/update/${bookId}/`, {
      quantity,
    });
    return response.data;
  },

  async removeFromCart(bookId: string): Promise<void> {
    await apiClient.delete(`/carts/remove/${bookId}/`);
  },

  async clearCart(): Promise<void> {
    await apiClient.delete('/carts/clear/');
  },
};
