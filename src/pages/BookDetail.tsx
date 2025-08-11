import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetail: React.FC = () => {
  const { id } = useParams();

  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Chi tiết sách</h1>
      <p className="text-gray-600">Thông tin chi tiết về sách ID: {id}</p>
    </div>
  );
};

export default BookDetail;