import { apiClient } from './api';
import { CartItem } from '../types';

export const cartService = {
  async getCart(): Promise<{ items: CartItem[] }> {
    const response = await apiClient.get('/carts/cart_items/');
    return response.data;
  },

  async addToCart(bookId: string, quantity: number): Promise<CartItem> {
    const response = await apiClient.post('/carts/add/', {
      bookId,
      quantity,
    });
    return response.data;
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
