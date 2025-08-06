import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartService } from '../services/cartService';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addToCart: (bookId: string, quantity?: number) => Promise<void>;
  updateQuantity: (bookId: string, quantity: number) => Promise<void>;
  removeFromCart: (bookId: string) => Promise<void>;
  clearCart: () => void;
  syncCartFromServer: () => Promise<void>;
  calculateTotals: () => void;
}

export const cartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isLoading: false,
      error: null,

      addToCart: async (bookId: string, quantity = 1) => {
        try {
          set({ isLoading: true, error: null });
          
          const existingItem = get().items.find(item => item.bookId === bookId);
          
          if (existingItem) {
            await get().updateQuantity(bookId, existingItem.quantity + quantity);
          } else {
            await cartService.addToCart(bookId, quantity);
            // Refresh cart from server
            await get().syncCartFromServer();
          }
        } catch (error: any) {
          set({
            error: error.message || 'Không thể thêm vào giỏ hàng',
            isLoading: false
          });
        }
      },

      updateQuantity: async (bookId: string, quantity: number) => {
        try {
          set({ isLoading: true, error: null });
          
          if (quantity <= 0) {
            await get().removeFromCart(bookId);
            return;
          }
          
          await cartService.updateCartItem(bookId, quantity);
          
          // Update local state
          const items = get().items.map(item =>
            item.bookId === bookId ? { ...item, quantity } : item
          );
          
          set({ items, isLoading: false });
          get().calculateTotals();
        } catch (error: any) {
          set({
            error: error.message || 'Không thể cập nhật số lượng',
            isLoading: false
          });
        }
      },

      removeFromCart: async (bookId: string) => {
        try {
          set({ isLoading: true, error: null });
          
          await cartService.removeFromCart(bookId);
          
          const items = get().items.filter(item => item.bookId !== bookId);
          set({ items, isLoading: false });
          get().calculateTotals();
        } catch (error: any) {
          set({
            error: error.message || 'Không thể xóa khỏi giỏ hàng',
            isLoading: false
          });
        }
      },

      clearCart: () => {
        set({ 
          items: [], 
          totalItems: 0, 
          totalPrice: 0,
          error: null 
        });
      },

      syncCartFromServer: async () => {
        try {
          const cartData = await cartService.getCart();
          set({ 
            items: cartData.items || [],
            isLoading: false 
          });
          get().calculateTotals();
        } catch (error: any) {
          set({
            error: error.message || 'Không thể đồng bộ giỏ hàng',
            isLoading: false
          });
        }
      },

      calculateTotals: () => {
        const items = get().items;
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        set({ totalItems, totalPrice });
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice
      })
    }
  )
);

// src/store/uiStore.ts
import { create } from 'zustand';

interface UIState {
  // Loading states
  isGlobalLoading: boolean;
  
  // Modal states
  isLoginModalOpen: boolean;
  isCartModalOpen: boolean;
  isSearchModalOpen: boolean;
  
  // Mobile responsive
  isMobileMenuOpen: boolean;
  
  // Search
  searchQuery: string;
  searchResults: any[];
  isSearching: boolean;
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>;
  
  // Actions
  setGlobalLoading: (loading: boolean) => void;
  openModal: (modalType: 'login' | 'cart' | 'search') => void;
  closeModal: (modalType: 'login' | 'cart' | 'search') => void;
  toggleMobileMenu: () => void;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: any[]) => void;
  setSearching: (searching: boolean) => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const uiStore = create<UIState>((set, get) => ({
  // Initial state
  isGlobalLoading: false,
  isLoginModalOpen: false,
  isCartModalOpen: false,
  isSearchModalOpen: false,
  isMobileMenuOpen: false,
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  notifications: [],

  // Actions
  setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),
  
  openModal: (modalType) => {
    switch (modalType) {
      case 'login':
        set({ isLoginModalOpen: true });
        break;
      case 'cart':
        set({ isCartModalOpen: true });
        break;
      case 'search':
        set({ isSearchModalOpen: true });
        break;
    }
  },
  
  closeModal: (modalType) => {
    switch (modalType) {
      case 'login':
        set({ isLoginModalOpen: false });
        break;
      case 'cart':
        set({ isCartModalOpen: false });
        break;
      case 'search':
        set({ isSearchModalOpen: false });
        break;
    }
  },
  
  toggleMobileMenu: () => {
    set({ isMobileMenuOpen: !get().isMobileMenuOpen });
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  setSearching: (searching) => set({ isSearching: searching }),
  
  addNotification: (notification) => {
    const id = Date.now().toString();
    set({
      notifications: [...get().notifications, { ...notification, id }]
    });
    
    // Auto remove after duration
    setTimeout(() => {
      get().removeNotification(id);
    }, notification.duration || 5000);
  },
  
  removeNotification: (id) => {
    set({
      notifications: get().notifications.filter(n => n.id !== id)
    });
  },
  
  clearNotifications: () => set({ notifications: [] })
}));