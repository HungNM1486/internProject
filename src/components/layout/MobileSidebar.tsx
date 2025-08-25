// src/components/layout/MobileSidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { authStore } from '../../store/authStore';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose, onLoginClick }) => {
  const { user, isAuthenticated, logout } = authStore();

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-[2px_0_10px_rgba(0,0,0,0.1)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-[60vw] max-[480px]:w-[75vw]`}
    >
      {/* Header Section */}
      <div className="bg-[rgb(27,168,255)] h-[56px] flex items-center px-4 text-white">
        <div className="flex items-center w-full">
          <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 bg-transparent">
            <svg className="text-white w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-medium py-1 text-[14px] leading-[18px] text-white">
              {isAuthenticated ? (user?.fullName || user?.email) : 'Đăng nhập'}
            </div>
            <div className="text-[12px] leading-[16px] text-white">
              {isAuthenticated ? (user?.role === 'admin' ? 'Quản trị viên' : 'Khách hàng') : 'Nhận nhiều ưu đãi hơn'}
            </div>
          </div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="p-1 hover:bg-blue-100 rounded flex-shrink-0"
              title="Đăng xuất"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 
                    01-3 3H6a3 3 0 01-3-3V7a3 3 0 
                    013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          ) : (
            <button onClick={handleLoginClick} className="p-1 hover:bg-blue-100 rounded flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white flex-1 overflow-y-auto h-[calc(100vh-56px)]">
        {/* Navigation Group 1 */}
        <div className="py-4">
          <Link to="/" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 no-underline text-[14px]" onClick={onClose}>
            <svg className="w-5 h-5 mr-3 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 
                  10v10a1 1 0 001 1h3m10-11l2 
                  2m-2-2v10a1 1 0 01-1 
                  1h-3m-6 0a1 1 0 001-1v-4a1 
                  1 0 011-1h2a1 1 0 011 1v4a1 
                  1 0 001 1m-6 0h6" />
            </svg>
            <span>Trang chủ</span>
          </Link>

          <Link to="/categories" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 no-underline text-[14px]" onClick={onClose}>
            <svg className="w-5 h-5 mr-3 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>Danh sách ngành hàng</span>
          </Link>

          <Link to="/account" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 no-underline text-[14px]" onClick={onClose}>
            <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 
                  4-4s-1.79-4-4-4-4 1.79-4 
                  4 1.79 4 4 4zm0 2c-2.67 
                  0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <span>{isAuthenticated ? 'Hồ sơ của tôi' : 'Quản lý tài khoản'}</span>
          </Link>

          <Link to="/notifications" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 no-underline text-[14px]" onClick={onClose}>
            <svg className="w-5 h-5 mr-3 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-8a4 4 0 118 0v8z" />
            </svg>
            <span>Thông báo</span>
          </Link>
        </div>

        <div className="h-px bg-gray-200 mx-4"></div>

        {/* Promotion Group */}
        <div className="py-4">
          <div className="px-4 pb-2 text-sm font-semibold text-gray-800 uppercase tracking-wide">KHUYẾN MÃI HOT</div>
          <Link to="/tiki-deal" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-[14px]" onClick={onClose}>
            <span>Tiki deal</span>
          </Link>
          <Link to="/gift-voucher" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-[14px]" onClick={onClose}>
            <span>Phiếu quà tặng</span>
          </Link>
          <Link to="/bank-offers" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-[14px]" onClick={onClose}>
            <span>Ưu đãi cho chủ thẻ ngân hàng</span>
          </Link>
        </div>

        <div className="h-px bg-gray-200 mx-4"></div>

        {/* Support Group */}
        <div className="py-4">
          <div className="px-4 pb-2 text-sm font-semibold text-gray-800 uppercase tracking-wide">HỖ TRỢ</div>
          <div className="px-4 py-3 flex items-center flex-wrap gap-1 text-[14px]">
            <span className="font-medium text-gray-700">HOTLINE:</span>
            <a href="tel:19006035" className="text-blue-600 hover:text-blue-800 font-medium no-underline hover:underline">1900 - 6035</a>
            <span className="text-gray-500 text-xs">(1000đ/phút)</span>
          </div>
          <Link to="/customer-support" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-[14px]" onClick={onClose}>
            <span>Hỗ trợ khách hàng</span>
            <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
