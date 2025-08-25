import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Book } from '../../types';
import styles from './AdminPages.module.css';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProducts: Book[] = [
        {
          id: '1',
          title: 'Tắt Đèn',
          author: 'Ngô Tất Tố',
          description: 'Tiểu thuyết nổi tiếng của văn học Việt Nam',
          price: 85000,
          originalPrice: 100000,
          discount: 15,
          categoryId: '1',
          images: ['/book1.jpg'],
          stock: 50,
          rating: 4.5,
          reviewCount: 125,
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        },
        {
          id: '2',
          title: 'Số Đỏ',
          author: 'Vũ Trọng Phụng',
          description: 'Tác phẩm kinh điển văn học hiện thực',
          price: 95000,
          originalPrice: 110000,
          discount: 14,
          categoryId: '1',
          images: ['/book2.jpg'],
          stock: 30,
          rating: 4.3,
          reviewCount: 89,
          createdAt: '2024-01-16',
          updatedAt: '2024-01-16'
        },
        {
          id: '3',
          title: 'Dế Mèn Phiêu Lưu Ký',
          author: 'Tô Hoài',
          description: 'Truyện thiếu nhi kinh điển',
          price: 65000,
          originalPrice: 75000,
          discount: 13,
          categoryId: '2',
          images: ['/book3.jpg'],
          stock: 100,
          rating: 4.8,
          reviewCount: 256,
          createdAt: '2024-01-17',
          updatedAt: '2024-01-17'
        }
      ];
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className={styles.loadingContainer}>
          <LoadingSpinner size="large" text="Đang tải danh sách sản phẩm..." />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sách, tác giả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <select className={styles.filterSelect}>
            <option value="">Tất cả danh mục</option>
            <option value="fiction">Văn học</option>
            <option value="children">Thiếu nhi</option>
            <option value="education">Giáo dục</option>
          </select>
        </div>

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
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.productInfo}>
                      <img 
                        src={product.images[0] || '/placeholder-book.png'} 
                        alt={product.title}
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
                  <td>{product.author}</td>
                  <td>
                    <div>
                      <span className={styles.currentPrice}>{formatCurrency(product.price)}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className={styles.originalPrice}>
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.stockBadge} ${product.stock > 20 ? styles.inStock : styles.lowStock}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <div className={styles.rating}>
                      <span>⭐ {product.rating}</span>
                      <span className={styles.reviewCount}>({product.reviewCount})</span>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${product.stock > 0 ? styles.active : styles.inactive}`}>
                      {product.stock > 0 ? 'Hoạt động' : 'Hết hàng'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.editButton}>
                        <svg className={styles.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className={styles.deleteButton}>
                        <svg className={styles.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              Trước
            </button>
            
            <span className={styles.paginationInfo}>
              Trang {currentPage} / {totalPages}
            </span>
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;