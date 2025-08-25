import { adaptApiBook } from '@/utils/adapters';
import BookCard from './BookCard';
import ErrorState from './ErrorState';
import LoadingSkeleton from './LoadingSkeleton';
import { bookService } from '@/services/bookService';
import { Book } from '@/types';
import { useEffect, useState } from 'react';
import EmptyState from './EmptyState';

const INITIAL_COUNT = 16; // mặc định 16 sản phẩm (đã là bội số của 4)
const LOAD_MORE_COUNT = 8; // mỗi lần “Xem thêm” nạp thêm 8 (bội số của 4)

export default function BookList() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const fetchPage = async (p: number, limit: number) => {
    const res = await bookService.getBooks({ page: p, limit: limit });
    const data: Book[] = (res.data ?? []).map(adaptApiBook);
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
    } catch (e: any) {
      setErr(e?.message ?? 'Không thể tải danh sách');
      setBooks(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

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
      {/* Tiêu đề block (optional) */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Gợi ý hôm nay</h2>
      </div>

      {/* GRID: đảm bảo 4 cột trên desktop để “đủ hàng 4 card” */}
      <div
        className="
            grid grid-cols-2 gap-3
            sm:grid-cols-3 sm:gap-4
            md:grid-cols-4
            "
      >
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>

      {/* Nút Xem thêm */}
      {!isEnd && (
        <div className="mt-6 flex justify-center">
          <button className="btn btn-outline" onClick={handleLoadMore} disabled={loadingMore}>
            {loadingMore ? 'Đang tải...' : 'Xem thêm'}
          </button>
        </div>
      )}
    </div>
  );
}
