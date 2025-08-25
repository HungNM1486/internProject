import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { cartService } from '@/services/cartService';
import { bookService } from '@/services/bookService';
import type { Book } from '@/types';
import { authStore } from '@/store/authStore';

export type CartItem = {
  bookId: string;
  book: Book;
  quantity: number;
  price: number; // đơn giá tại thời điểm thêm
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (book: Book, qty?: number) => Promise<void>;
  updateQuantity: (bookId: string, qty: number) => Promise<void>;
  removeFromCart: (bookId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  count: number;
  total: number;
  loading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}

// Lấy đơn giá đúng từ Book backend (ưu tiên current_seller.price)
function getUnitPrice(b: Book): number {
  const raw =
    (b as any)?.current_seller?.price ??
    (b as any)?.price ??
    (b as any)?.list_price ??
    (b as any)?.original_price ??
    0;
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is authenticated
      if (!authStore.getState().isAuthenticated) {
        setItems([]);
        setLoading(false);
        return;
      }

      const response = await cartService.getCart();

      // Fetch book details for each cart item
      const cartItemsWithBooks = await Promise.all(
        response.items.map(async (item: any) => {
          try {
            const book = await bookService.getBookById(item.book_id || item.bookId);
            return {
              bookId: item.book_id || item.bookId,
              book,
              quantity: item.quantity,
              price: item.price || getUnitPrice(book),
            };
          } catch (err) {
            console.error('Failed to fetch book details:', err);
            return null;
          }
        })
      );

      setItems(cartItemsWithBooks.filter(Boolean) as CartItem[]);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        // User not authenticated, clear cart
        setItems([]);
        setError(null);
      } else {
        setError(err?.message || 'Không thể tải giỏ hàng');
        console.error('Failed to load cart:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (book: Book, qty = 1) => {
    try {
      setError(null);
      const bookId = String((book as any).id ?? '');
      if (!bookId) return;

      await cartService.addToCart(bookId, qty);
      await refreshCart();
    } catch (err: any) {
      setError(err?.message || 'Không thể thêm vào giỏ hàng');
      throw err;
    }
  };

  const updateQuantity = async (bookId: string, qty: number) => {
    try {
      setError(null);
      await cartService.updateCartItem(bookId, qty);
      await refreshCart();
    } catch (err: any) {
      setError(err?.message || 'Không thể cập nhật số lượng');
      throw err;
    }
  };

  const removeFromCart = async (bookId: string) => {
    try {
      setError(null);
      await cartService.removeFromCart(bookId);
      await refreshCart();
    } catch (err: any) {
      setError(err?.message || 'Không thể xóa khỏi giỏ hàng');
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      await cartService.clearCart();
      await refreshCart();
    } catch (err: any) {
      setError(err?.message || 'Không thể xóa giỏ hàng');
      throw err;
    }
  };

  const count = useMemo(() => items.reduce((s, it) => s + it.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((s, it) => s + it.quantity * it.price, 0), [items]);

  const value: CartContextValue = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    count,
    total,
    loading,
    error,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
