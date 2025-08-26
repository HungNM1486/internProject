import { getSafeBookInfo, hasAuthors, hasCategories, hasImages } from '@/utils/validation';
import type { Book } from '@/types';

interface BookInfoDisplayProps {
  book: Book;
  showDetails?: boolean;
}

export default function BookInfoDisplay({ book, showDetails = false }: BookInfoDisplayProps) {
  const safeInfo = getSafeBookInfo(book);

  return (
    <div className="book-info-display">
      {/* Thông tin cơ bản */}
      <div className="basic-info">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{safeInfo.title}</h2>

        {safeInfo.description && <p className="text-gray-600 mb-3">{safeInfo.description}</p>}

        {/* Giá */}
        <div className="price-info mb-4">
          <span className="text-2xl font-bold text-red-600">
            {safeInfo.price.toLocaleString('vi-VN')} ₫
          </span>
          {book.original_price && book.original_price > safeInfo.price && (
            <span className="text-lg text-gray-500 line-through ml-2">
              {book.original_price.toLocaleString('vi-VN')} ₫
            </span>
          )}
        </div>

        {/* Đánh giá */}
        <div className="rating-info mb-4">
          <div className="flex items-center">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="ml-1 text-gray-700">
              {safeInfo.rating.toFixed(1)} (
              {safeInfo.rating > 0 ? 'Có đánh giá' : 'Chưa có đánh giá'})
            </span>
          </div>
        </div>

        {/* Tình trạng kho */}
        <div className="stock-info mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              safeInfo.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {safeInfo.stock > 0 ? `Còn ${safeInfo.stock} cuốn` : 'Hết hàng'}
          </span>
        </div>
      </div>

      {/* Thông tin chi tiết nếu cần */}
      {showDetails && (
        <div className="detailed-info mt-6">
          {/* Tác giả */}
          <div className="authors mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tác giả</h3>
            {hasAuthors(book) ? (
              <div className="flex flex-wrap gap-2">
                {book.authors.map((author, index) => (
                  <span
                    key={author.id || index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {author.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Chưa có thông tin tác giả</p>
            )}
          </div>

          {/* Danh mục */}
          <div className="categories mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Danh mục</h3>
            {hasCategories(book) ? (
              <div className="flex flex-wrap gap-2">
                {book.categories.map((category, index) => (
                  <span
                    key={category.id || index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Chưa có thông tin danh mục</p>
            )}
          </div>

          {/* Ảnh */}
          <div className="images mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Hình ảnh</h3>
            {hasImages(book) ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {book.images.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image.thumbnail_url || image.small_url || image.medium_url}
                    alt={`${safeInfo.title} - Ảnh ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Chưa có hình ảnh</p>
            )}
          </div>

          {/* Thông tin bổ sung */}
          <div className="additional-info">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Thông tin bổ sung</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {book.isbn && (
                <div>
                  <span className="font-medium text-gray-700">ISBN:</span>
                  <span className="ml-2 text-gray-600">{book.isbn}</span>
                </div>
              )}
              {book.publisher && (
                <div>
                  <span className="font-medium text-gray-700">Nhà xuất bản:</span>
                  <span className="ml-2 text-gray-600">{book.publisher}</span>
                </div>
              )}
              {book.language && (
                <div>
                  <span className="font-medium text-gray-700">Ngôn ngữ:</span>
                  <span className="ml-2 text-gray-600">{book.language}</span>
                </div>
              )}
              {book.pageCount && (
                <div>
                  <span className="font-medium text-gray-700">Số trang:</span>
                  <span className="ml-2 text-gray-600">{book.pageCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
