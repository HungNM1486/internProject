import { create } from 'zustand';
import { bookService } from '../services/bookService';
import type { Book, PaginationParams } from '../types';
import { validateBookData } from '../utils/validation';

interface BookState {
  books: Book[];
  currentBook: Book | null;
  totalBooks: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchBooks: (params?: PaginationParams) => Promise<void>;
  fetchBookById: (id: string) => Promise<void>;
  searchBooks: (query: string) => Promise<void>;
  filterBooksByCategory: (categoryId: string) => Promise<void>;
  clearError: () => void;
}

export const bookStore = create<BookState>((set) => ({
  books: [],
  currentBook: null,
  totalBooks: 0,
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  error: null,

  fetchBooks: async (params?: PaginationParams) => {
    try {
      set({ isLoading: true, error: null });
      const response = await bookService.getBooks(params);

      set({
        books: response.data,
        totalBooks: response.total || 0,
        currentPage: response.page || 1,
        totalPages: Math.ceil((response.total || 0) / (params?.limit || 10)),
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Không thể tải danh sách sách',
        isLoading: false,
      });
    }
  },

  fetchBookById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const book = await bookService.getBookById(id);

      // Kiểm tra dữ liệu sách có đầy đủ không
      if (!validateBookData(book)) {
        throw new Error('Dữ liệu sách không hợp lệ');
      }

      set({
        currentBook: book,
        isLoading: false,
      });
    } catch (error: any) {
      console.error('Error fetching book:', error);
      set({
        error: error.message || 'Không thể tải thông tin sách',
        isLoading: false,
      });
    }
  },

  searchBooks: async (query: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await bookService.searchBooks(query);

      set({
        books: response.data,
        totalBooks: response.total || 0,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Tìm kiếm thất bại',
        isLoading: false,
      });
    }
  },

  filterBooksByCategory: async (categoryId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await bookService.getBooksByCategory(categoryId);

      set({
        books: response.data,
        totalBooks: response.total || 0,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Lọc sách theo danh mục thất bại',
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
