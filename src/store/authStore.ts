// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  initializeAuth: () => void;
}

export const authStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authService.login(email, password);
          
          set({
            user: response.user,
            token: response.accessToken,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error: any) {
          set({
            error: error.message || 'Đăng nhập thất bại',
            isLoading: false
          });
          throw error;
        }
      },

      register: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authService.register(email, password);
          
          set({
            user: response.user,
            token: response.accessToken,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error: any) {
          set({
            error: error.message || 'Đăng ký thất bại',
            isLoading: false
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        });
      },

      clearError: () => {
        set({ error: null });
      },

      initializeAuth: () => {
        const state = get();
        if (state.token && state.user) {
          set({ isAuthenticated: true });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// src/store/bookStore.ts
import { create } from 'zustand';
import { bookService } from '../services/bookService';
import { Book, PaginationParams } from '../types';

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
        totalBooks: response.total,
        currentPage: response.page,
        totalPages: Math.ceil(response.total / (params?.limit || 10)),
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.message || 'Không thể tải danh sách sách',
        isLoading: false
      });
    }
  },

  fetchBookById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const book = await bookService.getBookById(id);
      
      set({
        currentBook: book,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.message || 'Không thể tải thông tin sách',
        isLoading: false
      });
    }
  },

  searchBooks: async (query: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await bookService.searchBooks(query);
      
      set({
        books: response.data,
        totalBooks: response.total,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.message || 'Tìm kiếm thất bại',
        isLoading: false
      });
    }
  },

  filterBooksByCategory: async (categoryId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await bookService.getBooksByCategory(categoryId);
      
      set({
        books: response.data,
        totalBooks: response.total,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.message || 'Lọc sách theo danh mục thất bại',
        isLoading: false
      });
    }
  },

  clearError: () => set({ error: null })
}));