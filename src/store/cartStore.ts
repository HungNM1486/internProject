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

