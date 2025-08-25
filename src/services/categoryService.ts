import { apiClient } from './api';
import { Category } from '@/types';

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const res = await apiClient.get('/categories/');
    return res.data;
  },

  async getTree(): Promise<Category[]> {
    const res = await apiClient.get('/categories/tree/');
    return res.data;
  },

  async getById(id: string): Promise<Category> {
    const res = await apiClient.get(`/categories/${id}/`);
    return res.data;
  },

  async getChildren(categoryId: string): Promise<Category[]> {
    const res = await apiClient.get(`/categories/${categoryId}/children/`);
    return res.data;
  },
};
