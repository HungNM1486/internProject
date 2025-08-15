// src/components/books/details/SimilarBooks.tsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { Book } from '@/types';

interface SimilarBooksProps {
  books: Book[];
}

export default function SimilarBooks({ books }: SimilarBooksProps) {
  if (!books || books.length === 0) return null;

  // Debug: Log data để kiểm tra
  console.log('Similar books data:', books);

  // State cho carousel
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 8;
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Lấy sách cho trang hiện tại
  const getCurrentBooks = () => {
    const startIndex = currentPage * booksPerPage;
    return books.slice(startIndex, startIndex + booksPerPage);
  };

  const displayBooks = getCurrentBooks();

  // Navigation functions
  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  // Component để handle image loading
  const BookImage = ({ book }: { book: Book }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageError = () => {
      setImageError(true);
      setImageLoading(false);
      console.log('Image failed to load for book:', book.name);
    };

    const handleImageLoad = () => {
      setImageLoading(false);
    };

    // Lấy URL ảnh đầu tiên
    const getImageUrl = () => {
      if (!book.images || book.images.length === 0) return null;
      
      const firstImage = book.images[0];
      // Kiểm tra nếu ảnh là object có các thuộc tính URL khác nhau
      if (typeof firstImage === 'object' && firstImage !== null) {
        return firstImage.large_url || firstImage.medium_url || firstImage.base_url || firstImage.url;
      }
      // Nếu là string thì dùng trực tiếp
      return firstImage;
    };

    const imageUrl = getImageUrl();

    return (
      <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center relative overflow-hidden">
        {imageUrl && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 text-gray-400">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={book.name || book.title || 'Sách'}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </>
        ) : (
          // Fallback image
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-3 rounded-lg border bg-white">
      <h2 className="px-4 pt-3 pb-2 text-[15px] font-semibold text-gray-900">
        Sản phẩm tương tự
      </h2>
      
      <div className="px-4 pb-4">
        {/* Container với arrows */}
        <div className="relative">
          {/* Left Arrow - Chỉ hiện khi có trang trước */}
          {currentPage > 0 && (
            <button
              onClick={goToPrevPage}
              className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Arrow - Chỉ hiện khi có trang sau */}
          {currentPage < totalPages - 1 && (
            <button
              onClick={goToNextPage}
              className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Grid 4 cột x 2 hàng = 8 sách */}
          <div className="grid grid-cols-4 gap-3">
            {displayBooks.map((book) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className="group block"
              >
                <div className="bg-white rounded-md overflow-hidden hover:shadow-md transition-shadow duration-200 relative">
                  {/* AD badge */}
                  {Math.random() > 0.6 && (
                    <span className="absolute top-1 right-1 bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded z-10">
                      AD
                    </span>
                  )}

                  {/* Hình ảnh sách với error handling */}
                  <BookImage book={book} />

                  {/* Thông tin sách */}
                  <div className="p-2">
                    {/* Tiêu đề - SỬA ĐỂ DÙNG book.name THAY VÌ book.title */}
                    <h3 
                      className="text-[12px] text-gray-900 font-normal leading-tight mb-2 group-hover:text-blue-600 transition-colors min-h-[32px]"
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden'
                      }}
                    >
                      {book.name || book.title || 'Tên sách'}
                    </h3>

                    {/* Rating */}
                    {book.rating && book.rating > 0 && (
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex text-yellow-400 text-[10px]">
                          {'★'.repeat(Math.floor(book.rating))}
                          <span className="text-gray-300">
                            {'★'.repeat(5 - Math.floor(book.rating))}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500">
                          {book.rating.toFixed(1)}
                        </span>
                      </div>
                    )}

                    {/* Giá */}
                    <div className="flex flex-col">
                      <span className="text-[13px] text-rose-600 font-medium">
                        {book.price ? new Intl.NumberFormat('vi-VN').format(book.price) : '0'}₫
                      </span>
                      {book.originalPrice && book.originalPrice > (book.price || 0) && (
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-gray-400 line-through">
                            {new Intl.NumberFormat('vi-VN').format(book.originalPrice)}₫
                          </span>
                          <span className="text-[10px] text-gray-500">
                            -{Math.round(((book.originalPrice - (book.price || 0)) / book.originalPrice) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Dash indicator - Chỉ hiện khi có nhiều hơn 1 trang */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`h-px transition-colors ${
                  currentPage === index 
                    ? 'w-4 bg-blue-500' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}