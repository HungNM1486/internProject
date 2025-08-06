import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Top banner */}
      <div className={styles.topBanner}>
        <div className={styles.topBannerText}>
          📚 Miễn phí vận chuyển cho đơn hàng từ 200.000đ
        </div>
      </div>

      {/* Main header */}
      <div className={styles.mainHeader}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <span className="text-white font-bold text-xl">📖</span>
            </div>
            <span className={styles.logoText}>BookStore</span>
          </Link>

          {/* Search bar - Desktop */}
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Tìm kiếm sách, tác giả..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Search button - Mobile */}
            <button 
              className={styles.mobileSearchBtn}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link to="/cart" className={styles.cartLink}>
              <svg className={styles.cartIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v8m0-8H7" />
              </svg>
              <span className={styles.cartBadge}>3</span>
            </Link>

            {/* User menu */}
            <div className={styles.userMenu}>
              <Link to="/login" className={styles.loginLink}>
                <svg className={styles.userIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className={styles.loginText}>Đăng nhập</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className={styles.mobileMenuBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {isSearchOpen && (
          <div className={styles.mobileSearch}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Tìm kiếm sách, tác giả..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className={styles.navList}>
              <li><Link to="/" className={styles.navItem}>Trang chủ</Link></li>
              <li><Link to="/books" className={styles.navItem}>Tất cả sách</Link></li>
              <li><Link to="/category/van-hoc" className={styles.navItem}>Văn học</Link></li>
              <li><Link to="/category/kinh-te" className={styles.navItem}>Kinh tế</Link></li>
              <li><Link to="/category/khoa-hoc" className={styles.navItem}>Khoa học</Link></li>
              <li><Link to="/category/giao-duc" className={styles.navItem}>Giáo dục</Link></li>
              <li className="md:hidden"><Link to="/login" className={styles.mobileNavItem}>Đăng nhập</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;