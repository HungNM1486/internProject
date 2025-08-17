import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ProductFeaturesBar = () => {
  const [nowChecked, setNowChecked] = useState(false);
  const [topDealChecked, setTopDealChecked] = useState(false);
  const [freeshipChecked, setFreeshipChecked] = useState(false);
  const [ratingChecked, setRatingChecked] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-xl font-medium text-gray-900 py-6">
          Tất cả sản phẩm
        </h2>
        
        {/* Features Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Left side - Features */}
          <div className="flex items-center space-x-8">
            {/* NOW - Giao siêu tốc - Checkbox */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={nowChecked}
                onChange={(e) => setNowChecked(e.target.checked)}
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
              />
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                NOW
              </span>
              <span className="text-sm text-gray-600">Giao siêu tốc 2H</span>
            </label>
            
            {/* TOP DEAL - Checkbox */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={topDealChecked}
                onChange={(e) => setTopDealChecked(e.target.checked)}
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
              />
              <div className="flex items-center">
                <span className="text-red-500 mr-1">⚡</span>
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                  TOP DEAL
                </span>
              </div>
              <span className="text-sm text-gray-600">Siêu rẻ</span>
            </label>
            
            {/* FREESHIP XTRA - Checkbox */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={freeshipChecked}
                onChange={(e) => setFreeshipChecked(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow-sm tracking-wide" 
                    style={{ fontStyle: 'italic', letterSpacing: '0.5px' }}>
                FREESHIP XTRA
              </span>
            </label>
            
            {/* Rating - Checkbox */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={ratingChecked}
                onChange={(e) => setRatingChecked(e.target.checked)}
                className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
              />
              <div className="flex items-center">
                <span className="text-yellow-400 text-sm">★★★★</span>
                <span className="text-gray-300 text-sm">★</span>
              </div>
              <span className="text-sm text-gray-600">từ 4 sao</span>
            </label>
          </div>
          
          {/* Right side - Sort */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Sắp xếp</span>
            
            <div className="relative">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-md hover:border-gray-300 hover:shadow-sm transition-all duration-200 min-w-[120px]">
                <span className="text-sm text-gray-700">Phổ biến</span>
                <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeaturesBar;