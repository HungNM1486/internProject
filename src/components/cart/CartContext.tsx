import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Book } from "@/types";

export type CartItem = {
  bookId: string;
  book: Book;
  quantity: number;
  price: number; // đơn giá tại thời điểm thêm
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (book: Book, qty?: number) => void;
  updateQuantity: (bookId: string, qty: number) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

const STORAGE_KEY = "cart:v1";

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
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (book: Book, qty = 1) => {
    const bookId = String((book as any).id ?? "");
    if (!bookId) return;

    setItems((prev) => {
      const idx = prev.findIndex((it) => it.bookId === bookId);
      if (idx >= 0) {
        // tăng số lượng nếu đã có
        const next = [...prev];
        const q = Math.min(99, next[idx].quantity + qty);
        next[idx] = { ...next[idx], quantity: q };
        return next;
      }
      // thêm mới
      const price = getUnitPrice(book);
      return [...prev, { bookId, book, quantity: Math.min(99, qty), price }];
    });
  };

  const updateQuantity = (bookId: string, qty: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.bookId === bookId
          ? { ...it, quantity: Math.max(1, Math.min(99, qty)) }
          : it
      )
    );
  };

  const removeFromCart = (bookId: string) => {
    setItems((prev) => prev.filter((it) => it.bookId !== bookId));
  };

  const clearCart = () => setItems([]);

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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
