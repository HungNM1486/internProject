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

  // Thêm state cho similarBooks
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [similarError, setSimilarError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setErr(null);
        setLoading(true);
        const raw = await bookService.getBookById(String(id));
        setBook(adaptApiBook(raw));
      } catch (e: any) {
        setErr(e?.message ?? 'Không tải được chi tiết sách');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Thêm useEffect để load similar books
  useEffect(() => {
    if (!book) return;

    (async () => {
      try {
        setSimilarError(null);
        setSimilarLoading(true);
        console.log('Loading similar books for book:', book);

        let response;
        let adaptedList: Book[] = [];

        // Thử lấy theo categoryId trước
        if (book.categories?.id) {
          try {
            console.log('Trying to load by categoryId:', book.categories.id);
            response = await bookService.getBooksByCategory(String(book.categories.id));
            if (response && response.data) {
              adaptedList = response.data
                .map(adaptApiBook)
                .filter((b: Book) => b.id !== book.id)
                // Đảm bảo sách có đầy đủ thông tin cần thiết
                .filter((b: Book) => b.name && b.price)
                .slice(0, 8);
            }
          } catch (categoryError) {
            console.log('Category search failed:', categoryError);
          }
        }

        // Nếu không có kết quả, thử lấy sách tương tự từ API
        if (adaptedList.length === 0) {
          console.log('Trying to get similar books from API');
          try {
            const similarResponse = await bookService.getSimilarBooks(book.id);
            if (similarResponse && Array.isArray(similarResponse)) {
              adaptedList = similarResponse
                .map(adaptApiBook)
                .filter((b: Book) => b.id !== book.id)
                .filter((b: Book) => b.name && b.price)
                .slice(0, 8);
            }
          } catch (similarError) {
            console.log('Similar books API failed:', similarError);
            // Fallback to general book list
            try {
              response = await bookService.getBooks({ page: 1, limit: 20 });
              if (response && response.data) {
                adaptedList = response.data
                  .map(adaptApiBook)
                  .filter((b: Book) => b.id !== book.id)
                  .filter((b: Book) => b.name && b.price)
                  .slice(0, 8);
              }
            } catch (generalError) {
              console.log('General search also failed:', generalError);
            }
          }
        }

        console.log('Final similar books:', adaptedList);
        setSimilarBooks(adaptedList);
      } catch (e) {
        console.error('Error loading similar books:', e);
        setSimilarError('Không tải được sách tương tự');
        setSimilarBooks([]);
      } finally {
        setSimilarLoading(false);
      }
    })();
  }, [book?.id]); // Chỉ depend vào book.id

  if (loading) return <div className="p-8 text-center">Đang tải chi tiết…</div>;
  if (err) return <div className="p-8 text-center text-red-600">{err}</div>;
  if (!book) return <div className="p-8 text-center">Không tìm thấy sách.</div>;

  return (
    <div className="container mx-auto px-4 py-5">
      {/* Breadcrumb mảnh */}
      <nav className="mb-3 text-[13px] text-gray-500">
        <Link to="/" className="hover:underline">
          Trang chủ
        </Link>
        <span className="mx-1.5">›</span>
        <Link to="/books" className="hover:underline">
          Nhà Sách Tiki
        </Link>
        <span className="mx-1.5">›</span>
        <span className="text-gray-700">{book.name}</span>
      </nav>

      {/* 3 cột giống mock: 4 | 5 | 3 */}
      <div className="grid grid-cols-12 gap-4">
        <section className="col-span-12 lg:col-span-4">
          <ImageGallery
            images={book.images.map((img: any) => img.large_url || img.medium_url || img.base_url)}
            title={book.name}
          />
        </section>

        <section className="col-span-12 lg:col-span-5">
          {/* title + tác giả + rating */}
          <div className="rounded-lg border bg-white p-4">
            <div className="text-[13px] text-gray-500">
              Tác giả:&nbsp;
              <span className="text-blue-600 hover:underline">
                {book.authors?.map((a) => a.name).join(', ') || 'Không rõ'}
              </span>
            </div>
            <h1 className="mt-1 text-[22px] font-semibold text-gray-900">{book.name}</h1>

            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center text-yellow-400">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="text-gray-300">★</span>
              </div>
              <span className="text-sm text-gray-800 font-medium">
                {(book.rating ?? 0).toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">• Đã bán {book.reviewCount ?? 0}</span>
            </div>

            {/* giá đỏ + % xám + gạch giá gốc nhỏ kế bên */}
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

          {/* Thông tin chi tiết (bảng) */}
          <div className="mt-3 rounded-lg border bg-white">
            <h2 className="px-4 pt-3 pb-2 text-[15px] font-semibold text-gray-900">
              Thông tin chi tiết
            </h2>
            <SpecsTable book={book} />
          </div>

          {/* Mô tả có "Xem thêm" */}
          <div className="mt-3 rounded-lg border bg-white">
            <h2 className="px-4 pt-3 pb-2 text-[15px] font-semibold text-gray-900">
              Mô tả sản phẩm
            </h2>
            <DescriptionBlock text={book.description} />
          </div>

          {/* THÊM PHẦN SIMILAR BOOKS */}
          {similarLoading && (
            <div className="mt-3 rounded-lg border bg-white p-4">
              <div className="text-center text-gray-500">Đang tải sách tương tự...</div>
            </div>
          )}

          {!similarLoading && similarBooks.length > 0 && <SimilarBooks books={similarBooks} />}

          {!similarLoading && similarBooks.length === 0 && (
            <div className="mt-3 rounded-lg border bg-white p-4">
              <h2 className="px-4 pt-3 pb-2 text-[15px] font-semibold text-gray-900">
                Sản phẩm tương tự
              </h2>
              <div className="text-center text-gray-500 py-8">Đang cập nhật sách tương tự...</div>
            </div>
          )}
        </section>

        <aside className="col-span-12 lg:col-span-3">
          <RightSellerCard book={book as any} />
        </aside>
      </div>
    </div>
  );
}
