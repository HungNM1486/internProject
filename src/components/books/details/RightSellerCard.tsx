import { useState } from 'react';
import type { Book } from '@/types';
import { formatVND, hasDiscount, calcSalePercent, toNumber } from '@/utils/money';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/components/cart/CartContext';
import { authStore } from '@/store/authStore';

type Bx = Book & { current_seller?: { name?: string; logo?: string } };

const isOfficial = (b?: Bx) => /tiki trading/i.test(b?.current_seller?.name ?? '');

export default function RightSellerCard({ book }: { book: Bx }) {
  const price = toNumber((book as any).price);
  const original = toNumber((book as any).originalPrice);
  const off = hasDiscount(book) ? Math.max(0, Math.min(99, calcSalePercent(book))) : 0;

  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [buying, setBuying] = useState(false);
  // const disabled = (book.stock ?? 0) <= 0;
  const disabled = false; // Tạm thời disable để test - bỏ qua stock check
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const isAuthenticated = authStore((state) => state.isAuthenticated);

  const handleAddToCart = async () => {
    console.log('handleAddToCart called, isAuthenticated:', isAuthenticated);

    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      // Redirect to login page
      navigate('/login', { state: { from: `/books/${book.id}` } });
      return;
    }

    try {
      setAdding(true);
      console.log('Adding to cart:', { bookId: book.id, book: book, qty });
      await addToCart(book as Book, qty);
      console.log('Successfully added to cart');
      // Có thể thêm toast notification thành công
    } catch (error: any) {
      console.error('Failed to add to cart:', error);
      // Hiển thị thông báo lỗi cho user
      if (error?.response?.data?.error) {
        alert(error.response.data.error); // Tạm thời dùng alert, sau này có thể dùng toast
      } else {
        alert('Không thể thêm vào giỏ hàng');
      }
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    console.log('handleBuyNow called, isAuthenticated:', isAuthenticated);

    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      // Redirect to login page
      navigate('/login', { state: { from: `/books/${book.id}` } });
      return;
    }

    try {
      setBuying(true);
      console.log('Buying now:', { bookId: book.id, book: book, qty });
      await addToCart(book as Book, qty); // <- Mua ngay cũng add trước
      console.log('Successfully added to cart, navigating to cart page');
      navigate('/cart', { state: { buyNow: true, bookId: String((book as any).id), qty } });
    } catch (error: any) {
      console.error('Failed to buy now:', error);
      // Hiển thị thông báo lỗi cho user
      if (error?.response?.data?.error) {
        alert(error.response.data.error); // Tạm thời dùng alert, sau này có thể dùng toast
      } else {
        alert('Không thể mua hàng');
      }
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="sticky top-4 rounded-lg border bg-white p-4">
      {/* header: logo + tên shop + OFFICIAL */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-blue-600" />
          <div className="text-[13px] font-medium text-gray-800">
            {book.current_seller?.name || 'Tiki Trading'}
          </div>
        </div>
        {isOfficial(book) && (
          <span className="inline-flex items-center gap-1 rounded-md border bg-white px-2 py-0.5 text-[11px] font-bold text-blue-700">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
            </svg>
            OFFICIAL
          </span>
        )}
      </div>

      {/* Số lượng */}
      <div className="mt-3">
        <div className="mb-1 text-[12px] text-gray-600">Số Lượng</div>
        <div className="inline-flex items-center rounded-md border">
          <button
            className="px-2 py-1 text-gray-700 disabled:text-gray-300"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
          >
            −
          </button>
          <input
            className="w-12 border-x px-2 py-1 text-center text-[13px]"
            value={qty}
            onChange={(e) => {
              const v = parseInt(e.target.value || '1', 10);
              setQty(Number.isFinite(v) ? Math.max(1, v) : 1);
            }}
          />
          <button
            className="px-2 py-1 text-gray-700"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
          >
            +
          </button>
        </div>
      </div>

      {/* Tạm tính */}
      <div className="mt-3">
        <div className="text-[12px] text-gray-600">Tạm tính</div>
        <div className="text-[20px] font-normal text-rose-600">{formatVND(price * qty)}</div>
      </div>

      {/* Stock status */}
      {book.stock !== undefined && (
        <div className="mt-2 text-sm">
          {book.stock > 0 ? (
            <span className="text-green-600">✓ Còn {book.stock} sản phẩm</span>
          ) : (
            <span className="text-red-600">✗ Hết hàng</span>
          )}
        </div>
      )}

      {/* Nút hành động */}
      <div className="mt-3 flex flex-col gap-2">
        <button
          onClick={handleBuyNow}
          className="h-10 rounded-md bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
          disabled={disabled || buying}
          aria-busy={buying}
        >
          {buying ? 'Đang xử lý...' : 'Mua ngay'}
        </button>

        <button
          onClick={handleAddToCart}
          className="h-10 rounded-md border hover:bg-gray-50 disabled:opacity-50"
          disabled={disabled || adding}
          aria-busy={adding}
        >
          {adding ? 'Đang thêm...' : 'Thêm vào giỏ'}
        </button>

        <button
          className="h-10 rounded-md border text-blue-600 hover:bg-blue-50"
          disabled={disabled}
        >
          Mua trước trả sau
        </button>
      </div>

      {original > price && off > 0 && (
        <div className="mt-2 text-[12px] text-gray-600">
          Đang giảm <span className="font-semibold text-gray-800">-{off}%</span>
        </div>
      )}
    </div>
  );
}
