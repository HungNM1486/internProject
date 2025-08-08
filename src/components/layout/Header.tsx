// src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import MobileSidebar from './MobileSidebar';
import AuthModal from '../auth/AuthModal';
import { authStore } from '../../store/authStore';

// API service
const fetchTopProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/products?_sort=quantity_sold.value&_order=desc&_limit=10');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch top products:', error);
    return [];
  }
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [topProducts, setTopProducts] = useState<{ id: string; name: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const { user, isAuthenticated } = authStore();

  useEffect(() => {
    fetchTopProducts().then(setTopProducts);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleAccountClick = () => {
    if (isAuthenticated) {
      window.location.href = '/profile';
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      window.location.href = '/cart';
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // Mobile Header Component
  const MobileHeader = () => (
    <div className={styles.mobileHeader}>
      <div className={styles.mobileHeaderContent}>
        {/* Back Button */}
        <button className={styles.mobileBackBtn}>
          <svg className={styles.backIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Hamburger Menu */}
        <button className={styles.mobileMenuBtn} onClick={toggleSidebar}>
          <svg className={styles.hamburgerIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search Bar */}
        <div className={styles.mobileSearchBox}>
          <svg className={styles.mobileSearchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm sách, tác giả..."
            className={styles.mobileSearchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Cart Button */}
        <button onClick={handleCartClick} className={styles.mobileCartBtn}>
          <img 
            src="/header/header_cart.png" 
            alt="Giỏ hàng" 
            className={styles.mobileCartIcon}
          />
          <span className={styles.mobileCartBadge}>3</span>
        </button>
      </div>
    </div>
  );

  // Desktop Header Component  
  const DesktopHeader = () => (
    <>
      {/* Top banner */}
      <div className={styles.topBanner}>
        <div className={`${styles.topBannerText} font-bold`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '12px', color: '#00AB56' }}>Freeship đơn từ 45k, giảm nhiều hơn với</span>
          <img 
            src="/header/header_freeship.png" 
            alt="Freeship Extra" 
            style={{ height: '16px', width: 'auto', marginLeft: '4px' }}
          />
        </div>
      </div>

      {/* Main header */}
      <div className={styles.mainHeader}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img 
              src="/header/logo.png" 
              alt="Tiki Logo" 
              style={{ width: '96px', height: '40px' }}
            />
            <span className={styles.logoText}>Tốt & Nhanh</span>
          </Link>

          {/* Search section */}
          <div className={styles.searchSection}>
            <div className={styles.searchRow}>
              <div className={styles.searchBox}>
                <svg className={styles.searchIconLeft} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                
                <input
                  type="text"
                  placeholder="Tìm kiếm sách, tác giả..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <div className={styles.searchDivider}></div>
                
                <button className={styles.searchSubmitBtn}>
                  Tìm kiếm
                </button>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                {/* Home button */}
                <Link to="/" className={styles.actionBtn}>
                <img 
                    src="/header/header_home.png" 
                    alt="Trang chủ" 
                    className={styles.actionIcon}
                  />
                  <span style={{ color: '#0a68ff' }}>Trang chủ</span>
                </Link>
                {/* Account button */}
                <button onClick={handleAccountClick} className={styles.actionBtn}>
                  <img 
                    src="/header/header_account.png" 
                    alt="Account" 
                    className={styles.actionIcon}
                  />
                  <span style={{ color: '#808089' }}>
                    {isAuthenticated ? 'Tài khoản' : 'Đăng nhập'}
                  </span>
                </button>
                {/* Divider */}
                <div className={styles.actionDivider}></div>
                {/* Cart */}
                <button onClick={handleCartClick} className={styles.cartBtn}>
                <img 
                    src="/header/header_cart.png" 
                    alt="Giỏ hàng" 
                    className={styles.actionIcon}
                  />
                  <span className={styles.cartBadge}>3</span>
                </button>
              </div>
            </div>

            <div className={styles.topProducts}>
              {topProducts.map((product) => (
                <span key={product.id} className={styles.topProductItem}>
                  {product.name.length > 25 ? 
                    product.name.substring(0, 25) + '...' : product.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
          <div className={styles.commitmentSection}>
            <Link to="/commitment" className={styles.commitmentText}>Cam kết</Link>
            
            <div className={styles.featuresSection}>
              <Link to="/guarantee" className={styles.featureItem}>
                <img src="/header/nav1.png" alt="100% hàng thật" className={styles.featureIcon} />
                <span className={styles.featureText}>100% hàng thật</span>
              </Link>
              
              <div className={styles.featureDivider}></div>
              
              <Link to="/shipping" className={styles.featureItem}>
                <img src="/header/nav2.png" alt="Freeship mọi nơi" className={styles.featureIcon} />
                <span className={styles.featureText}>Freeship mọi nơi</span>
              </Link>
              
              <div className={styles.featureDivider}></div>
              
              <Link to="/refund" className={styles.featureItem}>
                <img src="/header/nav3.png" alt="Hoàn 200% nếu hàng giả" className={styles.featureIcon} />
                <span className={styles.featureText}>Hoàn 200% nếu hàng giả</span>
              </Link>

              <div className={styles.featureDivider}></div>
              
              <Link to="/return" className={styles.featureItem}>
                <img src="/header/nav4.png" alt="30 ngày đổi trả" className={styles.featureIcon} />
                <span className={styles.featureText}>30 ngày đổi trả</span>
              </Link>

              <div className={styles.featureDivider}></div>
              
              <Link to="/fast-delivery" className={styles.featureItem}>
                <img src="/header/nav5.png" alt="Giao nhanh 2h" className={styles.featureIcon} />
                <span className={styles.featureText}>Giao nhanh 2h</span>
              </Link>

              <div className={styles.featureDivider}></div>
              
              <Link to="/cheap-price" className={styles.featureItem}>
                <img src="/header/nav6.png" alt="Giá siêu rẻ" className={styles.featureIcon} />
                <span className={styles.featureText}>Giá siêu rẻ</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );

  return (
    <>
      <header className={styles.header}>
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
      </header>
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar}
        onLoginClick={() => {
          closeSidebar();
          setIsAuthModalOpen(true);
        }}
      />
      
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className={styles.overlay} 
          onClick={closeSidebar}
        />
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </>
  );
};

export default Header;