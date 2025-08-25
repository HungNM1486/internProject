import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Trang không tìm thấy</h2>
      <p className="text-gray-600 mb-8">Trang bạn đang tìm kiếm không tồn tại.</p>
      <Link to="/" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;