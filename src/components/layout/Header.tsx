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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { user, isAuthenticated, logout } = authStore();

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
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
    window.location.href = '/profile';
  };

  const handleOrdersClick = () => {
    setIsUserMenuOpen(false);
    window.location.href = '/orders';
  };

  const handleAdminClick = () => {
    setIsUserMenuOpen(false);
    window.location.href = '/admin';
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isUserMenuOpen && !target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

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
                <div className="user-menu-container" style={{ position: 'relative' }}>
                  <button onClick={handleAccountClick} className={styles.actionBtn}>
                    <img 
                      src="/header/header_account.png" 
                      alt="Account" 
                      className={styles.actionIcon}
                    />
                    <span style={{ color: '#808089' }}>
                      {isAuthenticated ? (user?.fullName || 'Tài khoản') : 'Đăng nhập'}
                    </span>
                    {isAuthenticated && (
                      <svg 
                        className={styles.dropdownIcon} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        style={{ 
                          width: '16px', 
                          height: '16px', 
                          marginLeft: '4px',
                          transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* User Dropdown Menu */}
                  {isAuthenticated && isUserMenuOpen && (
                    <div className={styles.userDropdown}>
                      <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                          {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </div>
                        <div className={styles.userDetails}>
                          <div className={styles.userName}>{user?.fullName || user?.email}</div>
                          <div className={styles.userRole}>{user?.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</div>
                        </div>
                      </div>
                      
                      <div className={styles.menuDivider}></div>
                      
                      <button onClick={handleOrdersClick} className={styles.menuItem}>
                        <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Hồ sơ của tôi</span>
                      </button>
                      
                      <button onClick={handleProfileClick} className={styles.menuItem}>
                        <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span>Đơn hàng của tôi</span>
                      </button>

                      {user?.role === 'admin' && (
                        <button onClick={handleAdminClick} className={styles.menuItem}>
                          <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span>Quản trị</span>
                        </button>
                      )}
                      
                      <div className={styles.menuDivider}></div>
                      
                      <button onClick={handleLogout} className={styles.menuItem}>
                        <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
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