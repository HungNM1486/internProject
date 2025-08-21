import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { bookService } from '@/services/bookService';
import { adaptApiBook } from '@/utils/adapters';
import { Book } from '@/types';
import BookCard from '@/components/books/BookCard';
import LoadingSkeleton from '@/components/books/LoadingSkeleton';
import ErrorState from '@/components/books/ErrorState';
import { SearchComponent } from '@/components/search';

const BOOKS_PER_PAGE = 12;

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Search function
  const searchBooks = async (searchQuery: string, pageNum: number = 1, append: boolean = false) => {
    if (!searchQuery.trim()) return;

    try {
      if (pageNum === 1) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const response = await bookService.searchBooks(searchQuery, {
        page: pageNum,
        limit: BOOKS_PER_PAGE
      });

      const adaptedBooks = (response.data || []).map(adaptApiBook);
      
      if (append && pageNum > 1) {
        setBooks(prev => [...prev, ...adaptedBooks]);
      } else {
        setBooks(adaptedBooks);
      }
      
      setTotalResults(response.total || 0);
      setHasMore(adaptedBooks.length === BOOKS_PER_PAGE && (response.total || 0) > pageNum * BOOKS_PER_PAGE);
      setPage(pageNum);

    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Có lỗi xảy ra khi tìm kiếm');
      if (pageNum === 1) {
        setBooks([]);
        setTotalResults(0);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Search when query changes
  useEffect(() => {
    if (query) {
      searchBooks(query, 1, false);
    } else {
      setBooks([]);
      setTotalResults(0);
      setLoading(false);
    }
  }, [query]);

  // Load more function
  const handleLoadMore = () => {
    if (!loadingMore && hasMore && query) {
      searchBooks(query, page + 1, true);
    }
  };

  // Handle new search from search component
  const handleNewSearch = (newQuery: string) => {
    // Update URL and trigger search
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(newQuery)}`);
    searchBooks(newQuery, 1, false);
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Tìm kiếm sách</h1>
            <SearchComponent 
              placeholder="Nhập từ khóa tìm kiếm..."
              onSearchSubmit={handleNewSearch}
            />
            <p className="text-gray-600 mt-4">Nhập từ khóa để tìm kiếm sách theo tên, tác giả hoặc mô tả</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
            <div className="flex-1">
              <SearchComponent 
                placeholder="Tìm kiếm sách, tác giả..."
                onSearchSubmit={handleNewSearch}
              />
            </div>
          </div>
          
          {/* Search Info */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Kết quả tìm kiếm cho: <span className="text-blue-600">"{query}"</span>
              </h1>
              {!loading && (
                <p className="text-gray-600 mt-1">
                  {totalResults > 0 
                    ? `Tìm thấy ${totalResults.toLocaleString()} kết quả`
                    : 'Không tìm thấy kết quả nào'
                  }
                </p>
              )}
            </div>
            
            {/* Back to home */}
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Về trang chủ
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg border p-4 animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <ErrorState 
            message={error} 
            onRetry={() => searchBooks(query, 1, false)} 
          />
        )}

        {/* No Results */}
        {!loading && !error && books.length === 0 && query && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy kết quả cho "{query}"
            </h3>
            <p className="text-gray-600 mb-6">
              Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra lại chính tả
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Thử từ khóa ngắn gọn hơn</p>
              <p>• Kiểm tra chính tả</p>
              <p>• Sử dụng từ đồng nghĩa</p>
            </div>
          </div>
        )}

        {/* Search Results */}
        {!loading && !error && books.length > 0 && (
          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loadingMore ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang tải...
                    </span>
                  ) : (
                    `Xem thêm (còn ${Math.max(0, totalResults - books.length)} sản phẩm)`
                  )}
                </button>
              </div>
            )}

            {/* Results Info */}
            {!hasMore && books.length > 0 && (
              <div className="mt-8 text-center text-gray-500">
                Đã hiển thị tất cả {books.length} kết quả
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
