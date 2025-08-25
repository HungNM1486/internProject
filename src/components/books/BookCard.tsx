import { Link } from "react-router-dom";
import type { Book } from "@/types";
import { formatVND, hasDiscount, calcSalePercent, toNumber } from "@/utils/money";
import { getPrimaryCover } from "@/utils/image";

type Props = {
  book: Book & {
    promoText?: string;
    isAd?: boolean;
  };
  className?: string;
};

const isOfficial = (b: Props["book"]) => /tiki trading/i.test(b.current_seller?.name ?? "");

const formatSold = (v?: number | string) => {
  const n = toNumber(v);
  if (n >= 1000) return `${Math.floor(n / 1000)}k+`;
  return n > 0 ? String(n) : "0";
};

const getBadges = (book: any) => {
  const badges = [];

  // TOP DEAL
  if (book.promoText?.toLowerCase().includes("top deal")) {
    badges.push({
      text: "TOP DEAL",
      bg: "bg-pink-100",
      textColor: "text-pink-600",
      icon: (
        <svg viewBox="0 0 20 20" className="h-4 w-4 text-pink-600" fill="currentColor">
          <path d="M2 10l4 4 10-10" />
        </svg>
      ),
    });
  }

  // FREESHIP
  if (book.promoText?.toLowerCase().includes("freeship")) {
    badges.push({
      text: "FREESHIP XTRA",
      bg: "bg-green-100",
      textColor: "text-green-700",
      icon: null,
    });
  }

  // CHÍNH HÃNG
  if (isOfficial(book)) {
    badges.push({
      text: "CHÍNH HÃNG",
      bg: "bg-blue-100",
      textColor: "text-blue-700",
      icon: (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
          <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
        </svg>
      ),
    });
  }

  return badges;
};



export default function BookCard({ book, className }: Props) {
  const cover = getPrimaryCover(book);
  const price = toNumber(book.price ?? book.current_seller?.price);
  const original = toNumber(book.originalPrice ?? book.original_price ?? book.list_price);
  const salePercent = Math.max(0, Math.min(99, calcSalePercent({ price, originalPrice: original } as any)));
  const showDiscount = hasDiscount({ price, originalPrice: original } as any) && salePercent > 0;

  // dữ liệu “đã bán” lấy từ quantity_sold nếu có
  const sold = book.quantity_sold?.value ?? 0;

  return (
    <Link
      to={`/books/${book.id}`}
      aria-label={book.name}
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white",
        "transition shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_6px_16px_rgba(0,0,0,.06)] hover:-translate-y-[1px]",
        className ?? "",
      ].join(" ")}
    >

      {/* Ảnh */}
      <div className="relative mx-3 mt-2 aspect-[3/4] overflow-hidden rounded-xl bg-gray-50">
        <img
          src={cover}
          alt={book.name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/vite.svg"; // đặt 1 ảnh placeholder trong /public nếu muốn
          }}
        />

        {/* Badges group – nằm trong ảnh, góc dưới trái */}
        <div className="absolute left-2 bottom-2 flex flex-wrap gap-1 z-10">
          {getBadges(book).map((badge, i) => (
            <div
              key={i}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-[2px] text-[11px] font-bold ${badge.bg} ${badge.textColor}`}
            >
              {badge.icon}
              {badge.text}
            </div>
          ))}
        </div>

      </div>

      {/* Nội dung */}
      <div className="px-3 pb-3 pt-5 flex flex-col flex-1">
        {/* Giá + % giảm */}
        <div className="flex items-center gap-2">
          <span className="text-[18px] font-bold leading-none text-[#d70018]">
            {formatVND(price)}
          </span>
          {showDiscount && (
            <span className="rounded-full bg-gray-100 px-2 py-[2px] text-xs font-semibold text-gray-700">
              -{salePercent}%
            </span>
          )}
        </div>

        {/* Tác giả */}
        <div className="mt-2 text-[11px] font-semibold uppercase tracking-[.06em] text-gray-500 line-clamp-1">
          {book.authors?.map((a) => a.name).join(", ") || "Không rõ"}
        </div>

        {/* Tiêu đề 2 dòng */}
        <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold text-gray-900">
          {book.name || "Sách"}
        </h3>

        {/* Rating + Đã bán */}
        <div className="mt-1 flex items-center gap-2">
          <Stars rating={toNumber(book.rating ?? book.rating_average)} />
          <span className="text-xs text-gray-500">Đã bán {formatSold(sold)}</span>
        </div>

        

        {/* lấp khoảng trống để đẩy “giao hàng” xuống đáy card */}
        <div className="flex-1" />

        {/* Dòng giao hàng ở đáy card */}
        <div className="mt-3 border-t border-gray-100 pt-3 text-[12px] text-gray-500">
          Giao thứ 3, 01/04
        </div>
      </div>
    </Link>
  );
}


/* ====== Stars ====== */
function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, rating || 0));
  const full = Math.floor(r);
  const half = r - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} type="full" />
      ))}
      {half && <Star type="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} type="empty" />
      ))}
      <span className="ml-1 text-xs font-medium text-gray-700">{r.toFixed(1)}</span>
    </div>
  );
}
function Star({ type }: { type: "full" | "half" | "empty" }) {
  const base = "h-4 w-4";
  if (type === "full")
    return (
      <svg viewBox="0 0 20 20" className={`${base} text-amber-500`} fill="currentColor" aria-hidden>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 14.347l-2.385 1.956c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.98 8.72c-.783-.57-.38-1.81.588-1.81H8.03a1 1 0 00.95-.69l1.07-3.292z" />
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
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 14.347l-2.385 1.956c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.98 8.72c-.783-.57-.38-1.81.588-1.81H8.03a1 1 0 00.95-.69l1.07-3.292z" />
    </svg>
  );
}
