import { useState } from "react";
import type { Book } from "@/types";
import { formatVND, hasDiscount, calcSalePercent, toNumber } from "@/utils/money";

type Bx = Book & { current_seller?: { name?: string; logo?: string } };

const isOfficial = (b?: Bx) => /tiki trading/i.test(b?.current_seller?.name ?? "");

export default function RightSellerCard({ book }: { book: Bx }) {
  const price = toNumber(book.price);
  const original = toNumber(book.originalPrice);
  const off = hasDiscount(book) ? Math.max(0, Math.min(99, calcSalePercent(book))) : 0;
  const [qty, setQty] = useState(1);
  const disabled = (book.stock ?? 0) <= 0;

  return (
    <div className="sticky top-4 rounded-lg border bg-white p-4">
      {/* header: logo + tên shop + OFFICIAL */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* logo giả lập nếu thiếu */}
          <div className="h-6 w-6 rounded bg-blue-600" />
          <div className="text-[13px] font-medium text-gray-800">
            {book.current_seller?.name || "Tiki Trading"}
          </div>
        </div>
        {isOfficial(book) && (
          <span className="inline-flex items-center gap-1 rounded-md border bg-white px-2 py-0.5 text-[11px] font-bold text-blue-700">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"/>
            </svg>
            OFFICIAL
          </span>
        )}
      </div>

      {/* “Số Lượng” + stepper kiểu nhỏ */}
      <div className="mt-3">
        <div className="text-[12px] text-gray-600 mb-1">Số Lượng</div>
        <div className="inline-flex items-center rounded-md border">
          <button
            className="px-2 py-1 text-gray-700 disabled:text-gray-300"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
          >−</button>
          <input
            className="w-12 border-x px-2 py-1 text-center text-[13px]"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          />
          <button className="px-2 py-1 text-gray-700" onClick={() => setQty((q) => q + 1)}>+</button>
        </div>
      </div>

      {/* Tạm tính */}
      <div className="mt-3">
        <div className="text-[12px] text-gray-600">Tạm tính</div>
        <div className="text-[20px] text-rose-600 font-normal">{formatVND(price * qty)}</div>
      </div>

      {/* Nút hành động (full width) */}
      <div className="mt-3 flex flex-col gap-2">
        <button className="h-10 rounded-md bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50" disabled={disabled}>
          Mua ngay
        </button>
        <button className="h-10 rounded-md border hover:bg-gray-50 disabled:opacity-50" disabled={disabled}>
          Thêm vào giỏ
        </button>
        <button className="h-10 rounded-md border text-blue-600 hover:bg-blue-50">
          Mua trước trả sau
        </button>
      </div>

      {/* Nếu muốn hiển thị % giảm ngay trong card */}
      {original > price && off > 0 && (
        <div className="mt-2 text-[12px] text-gray-600">
          Đang giảm <span className="font-semibold text-gray-800">-{off}%</span>
        </div>
      )}
    </div>
  );
}
