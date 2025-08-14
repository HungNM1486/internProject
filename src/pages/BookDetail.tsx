// src/pages/BookDetail.tsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { bookService } from '@/services/bookService';
import type { Book } from '@/types';
import { adaptApiBook } from '@/utils/adapters';
import ImageGallery from '@/components/books/details/ImageGallery';
import RightSellerCard from '@/components/books/details/RightSellerCard';
import { SpecsTable, DescriptionBlock } from '@/components/books/details/InfoSections';
import SimilarBooks from '@/components/books/details/SimilarBooks';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [similarError, setSimilarError] = useState<string | null>(null);

  // Lấy chi tiết sách
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setErr(null);
        setLoading(true);
        const raw = await bookService.getBookById(id);
        const adapted = adaptApiBook(raw);
        console.log('Book loaded:', adapted);
        setBook(adapted);
      } catch (e: any) {
        console.error('Error loading book:', e);
        setErr(e?.message ?? 'Không tải được chi tiết sách');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Lấy sách tương tự (cùng categoryId)
  useEffect(() => {
    if (!book?.categoryId) {
      return;
    }

    (async () => {
      try {
        setSimilarError(null);
        setSimilarLoading(true);
        console.log('Loading similar books for categoryId:', book.categoryId);
        
        const response = await bookService.getBooksByCategory(book.categoryId);
        
        const adaptedList = response.data
          .map(adaptApiBook)
          .filter((b: Book) => b.id !== book.id);
        
        setSimilarBooks(adaptedList);
      } catch (e) {
        console.error('Không tải được sách tương tự:', e);
        setSimilarError('Không tải được sách tương tự');
        
        // Fallback: Thử lấy sách ngẫu nhiên nếu không có categoryId hoặc lỗi API
        try {
          const fallbackResponse = await bookService.getBooks({ page: 1, limit: 8 });
          const fallbackBooks = fallbackResponse.data
            .map(adaptApiBook)
            .filter((b: Book) => b.id !== book.id)
            .slice(0, 8);
          setSimilarBooks(fallbackBooks);
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
        }
      } finally {
        setSimilarLoading(false);
      }
    })();
  }, [book]);

  if (loading) return <div className="p-8 text-center">Đang tải chi tiết…</div>;
  if (err) return <div className="p-8 text-center text-red-600">{err}</div>;
  if (!book) return <div className="p-8 text-center">Không tìm thấy sách.</div>;

  return (
    <div className="container mx-auto px-4 py-5">
      {/* Breadcrumb */}
      <nav className="mb-3 text-[13px] text-gray-500">
        <Link to="/" className="hover:underline">
          Trang chủ
        </Link>
        <span className="mx-1.5">›</span>
        <Link to="/books" className="hover:underline">
          Nhà Sách Tiki
        </Link>
        <span className="mx-1.5">›</span>
        <span className="text-gray-700">{book.title}</span>
      </nav>

      <div className="grid grid-cols-12 gap-4">
        <section className="col-span-12 lg:col-span-4">
          <ImageGallery images={book.images || []} title={book.title} />
        </section>

        <section className="col-span-12 lg:col-span-5">
          {/* Thông tin chính */}
          <div className="rounded-lg border bg-white p-4">
            <div className="text-[13px] text-gray-500">
              Tác giả:&nbsp;
              <span className="text-blue-600 hover:underline">
                {book.author || 'Không rõ'}
              </span>
            </div>
            <h1 className="mt-1 text-[22px] font-semibold text-gray-900">{book.title}</h1>

            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center text-yellow-400">
                {'★'.repeat(Math.floor(book.rating || 0))}
                <span className="text-gray-300">{'★'.repeat(5 - Math.floor(book.rating || 0))}</span>
              </div>
              <span className="text-sm text-gray-800 font-medium">
                {(book.rating ?? 0).toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">• Đã bán {book.reviewCount ?? 0}</span>
            </div>

            {/* Giá */}
            <div className="mt-2 flex items-center gap-2">
              <div className="text-[20px] text-rose-600 font-normal">
                {Intl.NumberFormat('vi-VN').format(book.price)}đ
              </div>
              {book.originalPrice && book.originalPrice > book.price && (
                <>
                  <span className="text-gray-400 line-through text-[13px]">
                    {Intl.NumberFormat('vi-VN').format(book.originalPrice)}đ
                  </span>
                  <span className="text-[12px] text-gray-600">
                    -{Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Thông tin chi tiết */}
          <div className="mt-3 rounded-lg border bg-white">
            <h2 className="px-4 pt-3 pb-2 text-[15px] font-semibold text-gray-900">
              Thông tin chi tiết
            </h2>
            <SpecsTable book={book} />
          </div>

          {/* Mô tả */}
          <div className="mt-3 rounded-lg border bg-white">
            <h2 className="px-4 pt-3 pb-2 text-[15px] font-semibold text-gray-900">
              Mô tả sản phẩm
            </h2>
            <DescriptionBlock text={book.description} />
          </div>



          {/* Sách tương tự */}
          {similarLoading && (
            <div className="mt-3 rounded-lg border bg-white p-4">
              <div className="text-center text-gray-500">Đang tải sách tương tự...</div>
            </div>
          )}

          {!similarLoading && similarBooks.length > 0 && (
            <SimilarBooks books={similarBooks} />
          )}

          {!similarLoading && similarBooks.length === 0 && !similarError && (
            <div className="mt-3 rounded-lg border bg-white p-4">
              <div className="text-center text-gray-500">Không có sách tương tự</div>
            </div>
          )}

          {similarError && (
            <div className="mt-3 rounded-lg border bg-white p-4">
              <div className="text-center text-red-500">{similarError}</div>
            </div>
          )}
        </section>

        <aside className="col-span-12 lg:col-span-3">
          <RightSellerCard book={book} />
        </aside>
      </div>
    </div>
  );
}