import { Link } from "react-router-dom";
import type { Book } from "@/types";
import { formatVND, hasDiscount, calcSalePercent, toNumber } from "@/utils/money";

type Props = {
  book: Book & {
    current_seller?: { name?: string };
    soldCount?: number | string;           
    promoText?: string;                    
  };
  className?: string;
};

const isOfficial = (b: Props["book"]) =>  /tiki trading/i.test(b.current_seller?.name ?? "");

const formatSold = (v?: number | string) => {
  const n = toNumber(v);
  if (n >= 1000) return `${Math.floor(n / 1000)}k+`;
  return n > 0 ? String(n) : "0";
};

export default function BookCard({ book, className }: Props) {
  const cover = book.images?.[0] ?? "";
  const price = toNumber(book.price);
  const original = toNumber(book.originalPrice);
  const salePercent = Math.max(0, Math.min(99, calcSalePercent(book))); // tránh -100%
  const showDiscount = hasDiscount(book) && salePercent > 0;

  return (
    <Link
      to={`/books/${book.id}`}
      className={
        "block relative rounded-[16px] border border-gray-200 bg-white p-3 hover:shadow-md transition " +
        (className ?? "")
      }
      aria-label={book.title}
    >
      {/* Ảnh */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[14px] bg-gray-50">
        <img
            src={cover}
            alt={book.title}
            className="h-full w-full object-cover"
        />


        {/* Badge CHÍNH HÃNG – đè góc trái-dưới ảnh */}
        {isOfficial(book) && (
          <div className="absolute -bottom-3 left-3 rounded-xl bg-white px-3 py-1 shadow-sm border text-[12px] font-bold text-blue-700 flex items-center gap-1">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"/>
            </svg>
            CHÍNH HÃNG
          </div>
        )}
      </div>

      {/* Giá + % giảm */}
      <div className="mt-5 flex items-center gap-2">
        <span className="text-[18px] font-bold text-rose-600 leading-none">
          {formatVND(price)}
        </span>
        {showDiscount && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
            -{salePercent}%
          </span>
        )}
      </div>

      {/* Tác giả */}
      <div className="mt-3 text-[11px] font-semibold uppercase tracking-[.06em] text-gray-500">
        {book.author || "Không rõ"}
      </div>

      {/* Tiêu đề 2 dòng */}
      <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold text-gray-900">
        {book.title || "Sách"}
      </h3>

      {/* Rating + Đã bán */}
      <div className="mt-1 flex items-center gap-2">
        <Stars rating={toNumber(book.rating)} />
        <span className="text-xs text-gray-500">Đã bán {formatSold((book as any).soldCount)}</span>
      </div>

      {/* Giá gốc gạch xám nhạt dưới rating (trong ảnh nằm trên, nhưng Tiki có lúc đặt dưới) */}
      {original > price && (
        <div className="mt-1 text-xs text-gray-400 line-through">{formatVND(original)}</div>
      )}

      {/* Chip khuyến mãi */}
      {book.promoText && (
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-blue-600">
            <path d="M11 17a1 1 0 01-.894.553H4.118a1 1 0 01-.894-1.447l6-12A1 1 0 0110.118 3h6.988a1 1 0 01.894 1.447l-6 12A1 1 0 0111 17z" />
          </svg>
          {book.promoText}
        </div>
      )}
    </Link>
  );
}

/* Sao giống ảnh (có nửa sao) */
function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, rating || 0));
  const full = Math.floor(r);
  const half = r - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array.from({ length: full }).map((_, i) => <Star key={`f-${i}`} type="full" />)}
      {half && <Star type="half" />}
      {Array.from({ length: empty }).map((_, i) => <Star key={`e-${i}`} type="empty" />)}
      <span className="ml-1 text-xs font-medium text-gray-700">{r.toFixed(1)}</span>
    </div>
  );
}
function Star({ type }: { type: "full" | "half" | "empty" }) {
  const base = "h-4 w-4";
  if (type === "full")
    return (
      <svg viewBox="0 0 20 20" className={`${base} text-amber-500`} fill="currentColor" aria-hidden>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 14.347l-2.385 1.956c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.98 8.72c-.783-.57-.38-1.81.588-1.81H8.03a1 1 0 00.95-.69l1.07-3.292z"/>
      </svg>
    );
  if (type === "half")
    return (
      <svg viewBox="0 0 20 20" className={`${base} text-amber-500`} aria-hidden>
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 14.347l-2.385 1.956c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.98 8.72c-.783-.57-.38-1.81.588-1.81H8.03a1 1 0 00.95-.69l1.07-3.292z"
          fill="url(#half)"
          stroke="currentColor"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 20 20" className={`${base} text-gray-300`} fill="currentColor" aria-hidden>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 14.347l-2.385 1.956c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.98 8.72c-.783-.57-.38-1.81.588-1.81H8.03a1 1 0 00.95-.69l1.07-3.292z"/>
    </svg>
  );
}
