import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/components/cart/CartContext";
import { formatVND } from "@/utils/money";
import { getPrimaryCover } from "@/utils/image";
import type { Book } from "@/types";

type Selection = Set<string>; // bookId set

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();

  // ===== Selection state =====
  const [selected, setSelected] = useState<Selection>(new Set());

  // khi giỏ thay đổi -> mặc định chọn tất cả
  useEffect(() => {
    setSelected(new Set(items.map((i) => i.bookId)));
  }, [items]);

  const allSelected = selected.size > 0 && selected.size === items.length;

  const toggleSelectAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(items.map((i) => i.bookId)));
  };

  const toggleOne = (bookId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) next.delete(bookId);
      else next.add(bookId);
      return next;
    });
  };

  // ===== Group by Seller =====
  type Group = { seller: string; rows: typeof items };
  const groups: Group[] = useMemo(() => {
    const map = new Map<string, typeof items>();
    for (const it of items) {
      const seller = it.book?.current_seller?.name || "Không rõ";
      if (!map.has(seller)) map.set(seller, []);
      map.get(seller)!.push(it);
    }
    return Array.from(map.entries()).map(([seller, rows]) => ({ seller, rows }));
  }, [items]);

  // ===== Tính tiền theo selection =====
  const { selectedCount, selectedTotal } = useMemo(() => {
    let c = 0;
    let sum = 0;
    for (const it of items) {
      if (!selected.has(it.bookId)) continue;
      c += it.quantity;
      sum += it.price * it.quantity;
    }
    return { selectedCount: c, selectedTotal: sum };
  }, [items, selected]);

  const handleCheckout = () => {
    if (!selected.size) return;
    // có thể chuyển sang /checkout và truyền selectedIds
    navigate("/checkout", {
      state: {
        buyNow: false,
        items: items.filter((i) => selected.has(i.bookId)),
        total: selectedTotal,
      },
    });
  };

  if (!items.length) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4">Giỏ hàng</h1>
        <div className="rounded-lg border bg-white p-8 text-center">
          <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
          <Link
            to="/books"
            className="inline-block mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-3 sm:px-4 lg:px-6 py-6">
      <h1 className="text-2xl font-semibold mb-4">GIỎ HÀNG</h1>

      <div className="grid grid-cols-12 gap-4">
        {/* LEFT: danh sách */}
        <section className="col-span-12 lg:col-span-8">
          {/* Header row */}
          <div className="rounded-lg border bg-white">
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <label className="inline-flex items-center gap-3 select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
                <span className="font-medium">
                  Tất cả ({items.length} sản phẩm)
                </span>
              </label>

              {selected.size > 0 && (
                <button
                  className="ml-auto text-sm text-red-600 hover:underline"
                  onClick={() => {
                    for (const id of Array.from(selected)) {
                      removeFromCart(id);
                    }
                    setSelected(new Set());
                  }}
                >
                  Xoá mục đã chọn
                </button>
              )}
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={clearCart}
                title="Xoá tất cả"
              >
                Xoá tất cả
              </button>
            </div>

            {/* Nhóm theo seller */}
            <div className="divide-y">
              {groups.map((g, gi) => (
                <div key={gi} className="px-4 py-3">
                  {/* Seller bar */}
                  <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-gray-700">
                    {/* icon shop */}
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4 text-gray-500"
                      fill="currentColor"
                    >
                      <path d="M2 7l2-4h12l2 4v10a1 1 0 01-1 1h-4v-6H7v6H3a1 1 0 01-1-1V7z" />
                    </svg>
                    {g.seller}
                  </div>

                  {/* Rows */}
                  <ul className="space-y-3">
                    {g.rows.map((row) => (
                      <li
                        key={row.bookId}
                        className="rounded-lg border p-3 hover:shadow-sm"
                      >
                        <CartRow
                          item={row}
                          checked={selected.has(row.bookId)}
                          onToggle={() => toggleOne(row.bookId)}
                          onRemove={() => removeFromCart(row.bookId)}
                          onChangeQty={(q) =>
                            updateQuantity(row.bookId, q)
                          }
                        />
                      </li>
                    ))}
                  </ul>

                  {/* khu khuyến mãi của shop - placeholder */}
                  <div className="mt-3 rounded-md border px-3 py-2 text-sm text-blue-600 bg-blue-50/50">
                    Thêm mã khuyến mãi của Shop
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gợi ý mua kèm - placeholder gọn */}
          <div className="mt-4 rounded-lg border bg-white p-4">
            <h3 className="text-base font-semibold mb-3">Sản phẩm mua kèm</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-2 aspect-[3/4] bg-gray-50"
                />
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT: summary */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-4 space-y-3">
            {/* Địa chỉ giao tới */}
            <div className="rounded-lg border bg-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Giao tới</h3>
                <button className="text-blue-600 text-sm hover:underline">
                  Thay đổi
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-700">
                <span className="font-medium">Khách vãng lai</span>
              </p>
              <div className="mt-2 rounded-md bg-yellow-50 text-yellow-800 text-sm p-2">
                Lưu ý: Sử dụng địa chỉ nhận hàng trước khi đăng nhập
              </div>
            </div>

            {/* Khuyến mãi Tiki - placeholder */}
            <div className="rounded-lg border bg-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Tiki Khuyến Mãi</h3>
                <button className="text-blue-600 text-sm hover:underline">
                  Bỏ chọn
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-md border px-3 py-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-green-100 text-green-700 text-sm">
                  🚚
                </span>
                <span className="text-sm font-medium">Giảm 50K</span>
              </div>
            </div>

            {/* Tổng kết */}
            <div className="rounded-lg border bg-white p-4">
              <div className="flex items-center justify-between text-sm">
                <span>Tổng tiền hàng</span>
                <span className="font-medium">{formatVND(selectedTotal)}</span>
              </div>

              <div className="mt-1 flex items-center justify-between text-sm">
                <span>Phí vận chuyển</span>
                <span className="font-medium">{formatVND(0)}</span>
              </div>

              <div className="mt-3 border-t pt-3 flex items-center justify-between">
                <span className="text-gray-600">Tổng tiền thanh toán</span>
                <span className="text-rose-600 text-xl font-semibold">
                  {formatVND(selectedTotal)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!selected.size}
                className="mt-3 h-11 w-full rounded-md bg-rose-600 text-white font-semibold hover:bg-rose-700 disabled:opacity-50"
              >
                Mua Hàng{selectedCount ? ` (${selectedCount})` : ""}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ================= Row ================= */

type RowProps = {
  item: {
    bookId: string;
    book: Book;
    quantity: number;
    price: number;
  };
  checked: boolean;
  onToggle: () => void;
  onRemove: () => void;
  onChangeQty: (q: number) => void;
};

function CartRow({ item, checked, onToggle, onRemove, onChangeQty }: RowProps) {
  const cover = getPrimaryCover(item.book);

  const unit = item.price;
  const subtotal = unit * item.quantity;

  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      {/* Check + image + info */}
      <div className="col-span-12 md:col-span-6 flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-2 h-4 w-4"
          checked={checked}
          onChange={onToggle}
        />
        <img
          src={cover}
          alt={item.book?.name || "book"}
          className="h-20 w-16 rounded border object-cover bg-gray-50"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://via.placeholder.com/80x120?text=No+Image";
          }}
        />
        <div className="min-w-0">
          <Link
            to={`/books/${item.bookId}`}
            className="line-clamp-2 font-medium hover:underline"
            title={item.book?.name}
          >
            {item.book?.name}
          </Link>
          <div className="mt-1 text-xs text-gray-500">
            {item.book?.authors?.map((a) => a.name).join(", ") || "Không rõ tác giả"}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Có thể bọc bằng Bookcare
          </div>
        </div>
      </div>

      {/* Unit price */}
      <div className="col-span-4 md:col-span-2">
        <div className="text-sm font-semibold">{formatVND(unit)}</div>
        {item.book.originalPrice && item.book.originalPrice > unit && (
          <div className="text-xs text-gray-400 line-through">
            {formatVND(item.book.originalPrice)}
          </div>
        )}
      </div>

      {/* Qty stepper */}
      <div className="col-span-4 md:col-span-2">
        <QtyStepper
          value={item.quantity}
          onChange={(q) => onChangeQty(Math.max(1, q))}
        />
        {/* Hết hàng cảnh báo (placeholder) */}
        <div className="mt-1 text-xs text-yellow-600">Còn 1 sản phẩm</div>
      </div>

      {/* Subtotal + trash */}
      <div className="col-span-4 md:col-span-2 flex items-center justify-between md:justify-end gap-3">
        <div className="text-rose-600 font-semibold">{formatVND(subtotal)}</div>
        <button
          className="text-gray-400 hover:text-red-600"
          title="Xoá"
          onClick={onRemove}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M9 3h6a1 1 0 011 1v1h5v2H3V5h5V4a1 1 0 011-1zm-2 6h2v10H7V9zm4 0h2v10h-2V9zm4 0h2v10h-2V9z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ================= Qty Stepper ================= */

function QtyStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex h-9 items-center rounded border">
      <button
        className="w-8 h-9 text-gray-600 hover:bg-gray-50"
        onClick={() => onChange(value - 1)}
        aria-label="Giảm"
      >
        –
      </button>
      <input
        className="w-10 h-9 text-center outline-none"
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value || "0", 10);
          onChange(Number.isFinite(v) ? v : 1);
        }}
      />
      <button
        className="w-8 h-9 text-gray-600 hover:bg-gray-50"
        onClick={() => onChange(value + 1)}
        aria-label="Tăng"
      >
        +
      </button>
    </div>
  );
}
