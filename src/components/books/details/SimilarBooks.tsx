// src/components/books/details/SimilarBooks.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Book } from '@/types';

interface SimilarBooksProps {
  books: Book[];
}

export default function SimilarBooks({ books }: SimilarBooksProps) {
  const [currentPage, setCurrentPage] = useState(0);

  if (!books || books.length === 0) return null;

  return (
    <div className="mt-3 rounded-lg border bg-white">
      <h2 className="px-4 pt-3 pb-2 text-[15px] font-semibold text-gray-900">
        Sản phẩm tương tự
      </h2>
      
      <div className="px-4 pb-4 relative">
        <div className="grid grid-cols-4 gap-3 overflow-hidden">
          {books.slice(currentPage * 8, (currentPage + 1) * 8).map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="group block"
            >
              <div className="bg-white rounded-md overflow-hidden hover:shadow-md transition-shadow duration-200">
                {/* Hình ảnh sách */}
                <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center relative">
                  {book.images && book.images.length > 0 ? (
                    <img
                      src={book.images[0]}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                    </div>
                  )}
                  {/* AD badge cho một số sách */}
                  {Math.random() > 0.7 && (
                    <span className="absolute top-1 right-1 bg-gray-200 text-gray-600 text-[10px] px-1 py-0.5 rounded">
                      AD
                    </span>
                  )}
                </div>

                {/* Thông tin sách */}
                <div className="p-2">
                  {/* Tiêu đề */}
                  <h3 className="text-[12px] text-gray-900 font-normal leading-tight mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {book.title}
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
                    </div>
                  )}

                  {/* Giá */}
                  <div className="flex flex-col">
                    <span className="text-[13px] text-rose-600 font-medium">
                      {Intl.NumberFormat('vi-VN').format(book.price)}đ
                    </span>
                    {book.originalPrice && book.originalPrice > book.price && (
                      <span className="text-[10px] text-gray-400 line-through">
                        {Intl.NumberFormat('vi-VN').format(book.originalPrice)}đ
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Next button */}
        {(currentPage + 1) * 8 < books.length && (
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Previous button */}
        {currentPage > 0 && (
          <button
            className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Page indicator lines */}
        {Math.ceil(books.length / 8) > 1 && (
          <div className="flex justify-center mt-3 gap-1">
            {Array.from({ length: Math.ceil(books.length / 8) }).map((_, index) => (
              <button
                key={index}
                className={`h-0.5 transition-all duration-200 ${
                  index === currentPage 
                    ? 'bg-blue-500 w-6' 
                    : 'bg-gray-300 w-2 hover:w-3'
                }`}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Utility CSS classes cần thêm vào tailwind hoặc global CSS
// .line-clamp-2 {
//   overflow: hidden;
//   display: -webkit-box;
//   -webkit-box-orient: vertical;
//   -webkit-line-clamp: 2;
// }

// .scrollbar-hide {
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }
// .scrollbar-hide::-webkit-scrollbar {
//   display: none;
// }