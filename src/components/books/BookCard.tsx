import {Book} from "@/types/index";
import { formatVND, hasDiscount, toNumber } from "@/utils/money";
import { coverOf } from "@/utils/image";

type Props = { book : Book; onClick?: () => void;};

export default function BookCard({book, onClick}: Props){
    const cover = coverOf(book.images);
    const isOut = book.stock <= 0;
    const showDiscount = hasDiscount(book);
    const price = toNumber(book.price);
    const original = toNumber(book.originalPrice);

    const rating = typeof book.rating === "number" ? book.rating : 0;
    const reviewCount = typeof book.reviewCount === "number" ? book.reviewCount : 0;
    
    const percent = typeof book.discount === "number" 
        ? Math.max(0, Math.min(100, Math.round(book.discount)))
        : book.originalPrice && book.originalPrice > book.price
        ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) : 0 ;
    
    return (
        <article 
            className={`relative rounded-xl border p-3 transition hover:shadow ${isOut ? "opacity-80" : ""}`}
            onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick?.()}
        >
            {/*Bage giam giá*/}
            {showDiscount && percent > 0 && (
                <div className="absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                    -{percent}%
                </div>
            )} 

            {/*Anh bia*/}
            <div className="aspect-[3/4] w-full overflow-hidden rouned-lg bg-gray-50 ">
                {cover ? (
                    <img src={cover} alt={book.title} className="h-full w-full object-cover" loading="lazy" 
                        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display="none")}/>
                ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        No Image
                    </div>
                )}
            </div>

            {/* Tiêu đề + tác giả */}
            <h3 className="mt-3 line-clamp-2 text-sm font-semibold">{book.title}</h3>
            <p className="text-xs text-gray-500">{book.author}</p>

            {/* Giá */}
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-base font-bold">{formatVND(price)}</span>
                {hasDiscount(book) && original > 0 && (
                <span className="text-xs text-gray-400 line-through">{formatVND(original)}</span>
                )}
            </div>

            {/* Rating + Reviews */}
            <div className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                <span>★ {rating.toFixed(1)}</span>
                <span className="text-gray-400 hidden sm:inline">({reviewCount})</span>
            </div>

            {/* Trạng thái kho */}
            {isOut && (
                <div className="mt-2 inline-block rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                Hết hàng
                </div>
            )}
        </article>
    )




    
}

