import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Book } from '../../types';
import adminService from '../../services/adminService';
import styles from './AdminPages.module.css';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, categoryFilter, sortBy]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await adminService.getBooks({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm || undefined,
        category: categoryFilter || undefined,
        sortBy: sortBy,
      });

      setProducts(response.data);
      setTotalProducts(response.total || 0);
      setTotalPages(Math.ceil((response.total || 0) / itemsPerPage));
    } catch (err) {
      console.error('Lỗi khi tải danh sách sản phẩm:', err);
      setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await adminService.deleteBook(productId);
        // 重新加载数据
        fetchProducts();
      } catch (err) {
        console.error('Lỗi khi xóa sản phẩm:', err);
        alert('Không thể xóa sản phẩm. Vui lòng thử lại sau.');
      }
    }
  };

  // 移除本地过滤，因为现在使用API过滤
  // const filteredProducts = products.filter(
  //   (product) =>
  //     (product.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
  //     product.authors.some((author) => author.name.toLowerCase().includes(searchTerm.toLowerCase()))
  // );

  // const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getBookPrice = (book: Book): number => {
    if (typeof book.list_price === 'string') {
      return parseFloat(book.list_price) || 0;
    }
    return book.list_price || book.price || 0;
  };

  const getBookOriginalPrice = (book: Book): number => {
    if (typeof book.original_price === 'string') {
      return parseFloat(book.original_price) || 0;
    }
    return book.original_price || book.originalPrice || 0;
  };

  if (isLoading && products.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" text="Đang tải danh sách sản phẩm..." />
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h3>❌ Lỗi</h3>
          <p>{error}</p>
          <button className={styles.primaryButton} onClick={fetchProducts}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Quản lý sản phẩm</h1>
        <button className={styles.primaryButton}>
          <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm sản phẩm
        </button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên sách, tác giả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <select
          className={styles.filterSelect}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Tất cả danh mục</option>
          <option value="fiction">Văn học</option>
          <option value="children">Thiếu nhi</option>
          <option value="education">Giáo dục</option>
        </select>

        <select
          className={styles.filterSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Sắp xếp theo tên</option>
          <option value="list_price">Sắp xếp theo giá</option>
          <option value="rating_average">Sắp xếp theo đánh giá</option>
          <option value="created_at">Sắp xếp theo ngày tạo</option>
        </select>
      </div>

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <LoadingSpinner size="medium" text="Đang tải..." />
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Tác giả</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Đánh giá</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className={styles.productInfo}>
                    <img
                      src={
                        product.images[0]?.thumbnail_url ||
                        product.book_cover ||
                        '/placeholder-book.png'
                      }
                      alt={product.title || 'Book'}
                      className={styles.productImage}
                    />
                    <div>
                      <p className={styles.productTitle}>{product.title}</p>
                      <p className={styles.productDescription}>
                        {product.description?.slice(0, 50)}...
                      </p>
                    </div>
                  </div>
                </td>
                <td>{product.authors.map((author) => author.name).join(', ')}</td>
                <td>
                  <div>
                    <span className={styles.currentPrice}>
                      {formatCurrency(getBookPrice(product))}
                    </span>
                    {getBookOriginalPrice(product) > getBookPrice(product) && (
                      <span className={styles.originalPrice}>
                        {formatCurrency(getBookOriginalPrice(product))}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.stockBadge} ${(product.stock || 0) > 20 ? styles.inStock : styles.lowStock}`}
                  >
                    {product.stock || 0}
                  </span>
                </td>
                <td>
                  <div className={styles.rating}>
                    <span>⭐ {product.rating_average || 0}</span>
                    <span className={styles.reviewCount}>
                      ({product.quantity_sold?.value || 0} đã bán)
                    </span>
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${(product.stock || 0) > 0 ? styles.active : styles.inactive}`}
                  >
                    {(product.stock || 0) > 0 ? 'Hoạt động' : 'Hết hàng'}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={styles.editButton}>
                      <svg
                        className={styles.actionIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      className={styles.deleteButton}
                      title="Xóa"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <svg
                        className={styles.actionIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.summary}>
        <p>
          Hiển thị <strong>{products.length}</strong> / <strong>{totalProducts}</strong> sản phẩm
        </p>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Trước
          </button>

          <span className={styles.paginationInfo}>
            Trang {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
