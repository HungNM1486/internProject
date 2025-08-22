import { apiClient } from './api';

export interface Author {
  id: number;
  name: string;
  slug: string;
  book_count?: number;
}

export const authorService = {
  async getAll(): Promise<Author[]> {
    const res = await apiClient.get("/authors");
    // Handle paginated response similar to other services
    return res.data.results || res.data;
  },

  async getById(id: number): Promise<Author> {
    const res = await apiClient.get(`/authors/${id}`);
    return res.data;
  }
};
