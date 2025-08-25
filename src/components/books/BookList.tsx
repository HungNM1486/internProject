import { adaptApiBook } from "@/utils/adapters";
import { getSortOrdering } from "@/utils/sortUtils";
import BookCard from "./BookCard";
import ErrorState from "./ErrorState";
import LoadingSkeleton from "./LoadingSkeleton";
import { bookService } from "@/services/bookService";
import { Book } from "@/types";
import { useEffect, useState } from "react";
import EmptyState from "./EmptyState";


const INITIAL_COUNT = 16; // mặc định 16 sản phẩm (đã là bội số của 4)
const LOAD_MORE_COUNT = 8; // mỗi lần “Xem thêm” nạp thêm 8 (bội số của 4)


interface BookListProps {
  categoryFilter?: number[];
  searchQuery?: string;
  sortOption?: string;
  priceRange?: { min: number | null; max: number | null };
  authorFilter?: number[];
  onResultsChange?: (total: number) => void;
}

export default function BookList({ categoryFilter, searchQuery, sortOption, priceRange, authorFilter, onResultsChange }: BookListProps){
    const [books, setBooks] = useState<Book[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    
    // console.log('BookList render:', { loading, booksCount: books?.length, err });

    const [page, setPage] = useState(1);
    const [isEnd, setIsEnd] = useState(false);

    const fetchPage = async (p: number, limit: number) => {
        let res;
        const ordering = getSortOrdering(sortOption || 'default');
        
        console.log('📋 BookList - Fetching with filters:', {
            searchQuery,
            categoryFilter,
            priceRange,
            sortOption,
            authorFilter
        });

        if (searchQuery) {
            // Search mode with all filters
            res = await bookService.searchBooks(searchQuery, { 
                page: p, 
                limit: limit,
                ordering: ordering,
                priceMin: priceRange?.min || undefined,
                priceMax: priceRange?.max || undefined,
                authors: authorFilter && authorFilter.length > 0 ? authorFilter : undefined
            });
        } else {
            // Normal mode with all filters
            res = await bookService.getBooks({ 
                page: p, 
                limit: limit,
                categories: categoryFilter && categoryFilter.length > 0 ? categoryFilter : undefined,
                ordering: ordering,
                priceMin: priceRange?.min || undefined,
                priceMax: priceRange?.max || undefined,
                authors: authorFilter && authorFilter.length > 0 ? authorFilter : undefined
            });
        }
        
        const data: Book[] = (res.data ?? []).map(adaptApiBook);
        
        // Notify parent of results count
        if (onResultsChange && p === 1) {
            onResultsChange(res.total || 0);
        }
        
        return data;
    };


    const load = async () => {
        try {
            setErr(null);
            setLoading(true);

            const data = await fetchPage(1, INITIAL_COUNT);
            setBooks(data);
            setPage(1);
            setIsEnd(data.length < INITIAL_COUNT);

        } catch (e : any) {
            console.error('BookList: Error loading books:', e);
            setErr(e?.message ?? "Không thể tải danh sách");
            setBooks(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('BookList useEffect: Component mounted/updated, loading books...');
        let isMounted = true;
        
        const loadBooks = async () => {
            if (!isMounted) return;
            await load();
        };
        
        void loadBooks();
        
        return () => {
            console.log('BookList useEffect: Component unmounting...');
            isMounted = false;
        };
    }, [categoryFilter, searchQuery, sortOption, priceRange, authorFilter]); // Re-load when filters change

    const handleLoadMore = async () => {
    try {
        setLoadingMore(true);
        const nextPage = page + 1;
        const data = await fetchPage(nextPage, LOAD_MORE_COUNT);
        setBooks((prev) => [...(prev ?? []), ...data]);
        setPage(nextPage);
        if (data.length < LOAD_MORE_COUNT) setIsEnd(true); // nhận ít hơn limit => hết
        } catch (e: any) {
            console.error(e);
        } finally {
            setLoadingMore(false);
        }
    };

    // ==== Render theo trạng thái ====
    if (loading) return <LoadingSkeleton />;
    if (err) return <ErrorState message={err} onRetry={() => location.reload()} />;
    if (!books || books.length === 0) return <EmptyState onRefresh={() => location.reload()} />;

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">

        {/* GRID: đảm bảo 4 cột trên desktop để “đủ hàng 4 card” */}
        <div
            className="
            grid grid-cols-2 gap-3
            sm:grid-cols-3 sm:gap-4
            md:grid-cols-4
            "
        >
            {books.map((b, index) => {
              try {
                return <BookCard key={b.id} book={b} />;
              } catch (error) {
                console.error('BookCard error for book', index, ':', error);
                return (
                  <div key={b.id} className="border rounded-lg p-4 bg-red-100">
                    <div className="text-red-600">❌ BookCard Error #{index + 1}</div>
                    <div className="text-xs text-red-500">{String(error)}</div>
                  </div>
                );
              }
            })}
        </div>

        {!isEnd && (
            <div className="mt-6 flex justify-center">
                <button
                    className="px-12 py-1.5 border border-blue-500 text-blue-500 font-regular rounded hover:bg-blue-50 transition-colors disabled:opacity-50"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                >
                    {loadingMore ? "Đang tải..." : "Xem thêm"}
                </button>
            </div>
        )}
        </div>
    );
}