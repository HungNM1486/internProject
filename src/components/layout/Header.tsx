// src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileSidebar from './MobileSidebar';
import AuthModal from '../auth/AuthModal';
<<<<<<< HEAD
import { authStore } from '../../store/authStore';
import { ShoppingCart } from "lucide-react";
import { useCart } from '../cart/CartContext';
=======
import { SearchComponent } from '../search';
import { authStore } from '../../store/authStore';

>>>>>>> 40115e6 (cập nhật code mới)
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
<<<<<<< HEAD
  const [searchQuery, setSearchQuery] = useState('');
=======
>>>>>>> 40115e6 (cập nhật code mới)
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

<<<<<<< HEAD
  const { count } = useCart();

=======
>>>>>>> 40115e6 (cập nhật code mới)
  const handleCartClick = () => {
    if (isAuthenticated) {
      window.location.href = '/cart';
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // Mobile Header Component
  const MobileHeader = () => (
    <div className="md:hidden block bg-white border-b border-gray-200" style={{height: '56px'}}>
      <div className="flex items-center h-full px-4 gap-3">
        {/* Back Button */}
        <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Hamburger Menu */}
        <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0" onClick={toggleSidebar}>
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search Bar */}
<<<<<<< HEAD
        <div className="flex items-center flex-1 h-9 border border-gray-300 rounded-lg px-3" style={{backgroundColor: '#f8f9fa'}}>
          <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm sách, tác giả..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{fontSize: '14px'}}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
=======
        <div className="flex-1">
          <SearchComponent 
            placeholder="Tìm kiếm sách, tác giả..."
            className="flex-1"
>>>>>>> 40115e6 (cập nhật code mới)
          />
        </div>

        {/* Cart Button */}
<<<<<<< HEAD
        
=======
        <button onClick={handleCartClick} className="relative p-2 hover:bg-gray-100 rounded-lg flex-shrink-0">
          <img 
            src="/header/header_cart.png" 
            alt="Giỏ hàng" 
            className="w-6 h-6"
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center" style={{fontSize: '10px'}}>3</span>
        </button>
>>>>>>> 40115e6 (cập nhật code mới)
      </div>
    </div>
  );

  // Desktop Header Component  
  const DesktopHeader = () => (
    <>
      {/* Top banner */}
      <div className="text-green-700 md:block hidden" style={{backgroundColor: '#effff4', padding: '12px 16px', height: '42px'}}>
        <div className="container-custom text-center text-sm font-bold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
<<<<<<< HEAD
          <span style={{ fontSize: '12px', color: '#00AB56' }}>Freeship đơn từ 45k, giảm nhiều hơn cùng</span>
=======
          <span style={{ fontSize: '12px', color: '#00AB56' }}>Freeship đơn từ 45k, giảm nhiều hơn với</span>
>>>>>>> 40115e6 (cập nhật code mới)
          <img 
            src="/header/header_freeship.png" 
            alt="Freeship Extra" 
            style={{ height: '16px', width: 'auto', marginLeft: '4px' }}
          />
        </div>
      </div>

      {/* Main header */}
<<<<<<< HEAD
      <div className=" py-4 md:block hidden">
=======
      <div className="container-custom py-4 md:block hidden">
>>>>>>> 40115e6 (cập nhật code mới)
        <div className="flex items-start px-2 gap-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 w-32 flex flex-col items-center">
            <img 
              src="/header/logo.png" 
              alt="Tiki Logo" 
              style={{ width: '96px', height: '40px' }}
            />
            <span className="text-center w-24 h-4 text-sm font-bold mt-2" style={{color: '#003ea1', fontFamily: 'Inter, Arial, sans-serif'}}>Tốt & Nhanh</span>
          </Link>

          {/* Search section */}
          <div className="flex-1 min-w-0 h-16">
            <div className="flex items-center gap-4 w-full h-10">
<<<<<<< HEAD
              <div className="flex items-center h-10 border border-gray-300 rounded-lg px-3 min-w-0 flex-1">
                <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                
                <input
                  type="text"
                  placeholder="Tìm kiếm sách, tác giả..."
                  className="flex-1 bg-transparent outline-none text-sm min-w-0 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <div className="w-px h-6 bg-gray-300 mx-3 flex-shrink-0"></div>
                
                <button className="text-blue-600 font-normal px-4 py-1 text-sm hover:bg-blue-50 rounded flex-shrink-0">
                  Tìm kiếm
                </button>
              </div>
=======
              <SearchComponent 
                placeholder="Tìm kiếm sách, tác giả..."
                className="flex-1 min-w-0"
              />
>>>>>>> 40115e6 (cập nhật code mới)

              {/* Actions */}
              <div className="flex items-center space-x-3 h-12 flex-shrink-0 pl-9">
                {/* Home button */}
                <Link to="/" className="flex items-center space-x-2 font-medium px-3 py-2" style={{fontSize: '14px'}}>
                <img 
                    src="/header/header_home.png" 
                    alt="Trang chủ" 
                    className="w-6 h-6"
                  />
                  <span style={{ color: '#0a68ff' }}>Trang chủ</span>
                </Link>
                {/* Account button */}
                <div className="user-menu-container" style={{ position: 'relative' }}>
                  <button onClick={handleAccountClick} className="flex items-center space-x-2 font-medium px-3 py-2" style={{fontSize: '14px'}}>
                    <img 
                      src="/header/header_account.png" 
                      alt="Account" 
                      className="w-6 h-6"
                    />
                    <span style={{ color: '#808089' }}>
                      {isAuthenticated ? (user?.fullName || 'Tài khoản') : 'Đăng nhập'}
                    </span>
                    {isAuthenticated && (
                      <svg 
                        className="" 
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
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="flex items-center p-4 border-b border-gray-100">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                          {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </div>
                        <div className="">
                          <div className="font-medium text-gray-900">{user?.fullName || user?.email}</div>
                          <div className="text-sm text-gray-500">{user?.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100"></div>
                      
                      <button onClick={handleOrdersClick} className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Hồ sơ của tôi</span>
                      </button>
                      
                      <button onClick={handleProfileClick} className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span>Đơn hàng của tôi</span>
                      </button>

                      {user?.role === 'admin' && (
                        <button onClick={handleAdminClick} className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span>Quản trị</span>
                        </button>
                      )}
                      
                      <div className="border-t border-gray-100"></div>
                      
                      <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-red-600">
                        <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
                {/* Divider */}
                <div className="w-px h-8 bg-gray-300"></div>
                {/* Cart */}
<<<<<<< HEAD
                 <Link to="/cart" className="relative flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-2xl">
                    <ShoppingCart className="w-5 h-5" />

                    {/* Badge hiển thị số lượng */}
                    {count > 0 && (
                      <span className="absolute -top-1 -right-0 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-600 rounded-full">
                        {count}
                      </span>
                    )}
                  </Link>
=======
                <button onClick={handleCartClick} className="relative flex items-center text-gray-400 hover:text-blue-600 px-3 py-2">
                <img 
                    src="/header/header_cart.png" 
                    alt="Giỏ hàng" 
                    className="w-6 h-6"
                  />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>
>>>>>>> 40115e6 (cập nhật code mới)
              </div>
            </div>

            <div className="flex gap-3 mt-2 overflow-x-auto" style={{fontWeight: '400'}}>
              {topProducts.map((product) => (
                <span key={product.id} className="text-sm font-normal text-gray-400 hover:text-blue-600 cursor-pointer whitespace-nowrap py-0.5" style={{color: '#808089'}}>
                  {product.name.length > 25 ? 
                    product.name.substring(0, 25) + '...' : product.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-b border-gray-200 md:block hidden" style={{height: '47px'}}>
<<<<<<< HEAD
        <div className="h-full">
=======
        <div className="container-custom h-full">
>>>>>>> 40115e6 (cập nhật code mới)
          <div className="flex items-center h-full px-6">
            <Link to="/commitment" className="mr-6 hover:text-blue-400" style={{fontSize: '14px', color: '#003ea1', fontWeight: '600'}}>Cam kết</Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/guarantee" className="flex items-center space-x-1 hover:text-blue-400">
                <img src="/header/nav1.png" alt="100% hàng thật" className="w-5 h-5" />
                <span className="text-sm text-gray-600" style={{fontSize: '12px', color: '#27272a', fontWeight: '550'}}>100% hàng thật</span>
              </Link>
              
              <div className="w-px h-5 bg-gray-300"></div>
              
              <Link to="/shipping" className="flex items-center space-x-1 hover:text-blue-400">
                <img src="/header/nav2.png" alt="Freeship mọi nơi" className="w-5 h-5" />
                <span className="text-sm text-gray-600" style={{fontSize: '12px', color: '#27272a', fontWeight: '550'}}>Freeship mọi nơi</span>
              </Link>
              
              <div className="w-px h-5 bg-gray-300"></div>
              
              <Link to="/refund" className="flex items-center space-x-1 hover:text-blue-400">
                <img src="/header/nav3.png" alt="Hoàn 200% nếu hàng giả" className="w-5 h-5" />
                <span className="text-sm text-gray-600" style={{fontSize: '12px', color: '#27272a', fontWeight: '550'}}>Hoàn 200% nếu hàng giả</span>
              </Link>

              <div className="w-px h-5 bg-gray-300"></div>
              
              <Link to="/return" className="flex items-center space-x-1 hover:text-blue-400">
                <img src="/header/nav4.png" alt="30 ngày đổi trả" className="w-5 h-5" />
                <span className="text-sm text-gray-600" style={{fontSize: '12px', color: '#27272a', fontWeight: '550'}}>30 ngày đổi trả</span>
              </Link>

              <div className="w-px h-5 bg-gray-300"></div>
              
              <Link to="/fast-delivery" className="flex items-center space-x-1 hover:text-blue-400">
                <img src="/header/nav5.png" alt="Giao nhanh 2h" className="w-5 h-5" />
                <span className="text-sm text-gray-600" style={{fontSize: '12px', color: '#27272a', fontWeight: '550'}}>Giao nhanh 2h</span>
              </Link>

              <div className="w-px h-5 bg-gray-300"></div>
              
              <Link to="/cheap-price" className="flex items-center space-x-1 hover:text-blue-400">
                <img src="/header/nav6.png" alt="Giá siêu rẻ" className="w-5 h-5" />
                <span className="text-sm text-gray-600" style={{fontSize: '12px', color: '#27272a', fontWeight: '550'}}>Giá siêu rẻ</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );

  return (
    <>
      <header className="bg-white z-50" style={{fontFamily: 'Inter, Arial, sans-serif', fontWeight: '400', color: '#808089'}}>
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
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