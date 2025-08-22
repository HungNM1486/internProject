import React, { useState } from 'react';

export interface SortOption {
  id: string;
  label: string;
  field: string;
  order: 'asc' | 'desc';
  icon?: string;
}

export const SORT_OPTIONS: SortOption[] = [
  {
    id: 'default',
    label: 'Mặc định',
    field: 'id',
    order: 'asc',
    icon: '📋'
  },
  {
    id: 'popular',
    label: 'Bán chạy',
    field: 'quantity_sold',
    order: 'desc',
    icon: '🔥'
  },
  {
    id: 'rating',
    label: 'Đánh giá cao',
    field: 'rating_average',
    order: 'desc',
    icon: '⭐'
  },
  {
    id: 'price_low',
    label: 'Giá thấp đến cao',
    field: 'list_price',
    order: 'asc',
    icon: '💰'
  },
  {
    id: 'price_high',
    label: 'Giá cao đến thấp',
    field: 'list_price',
    order: 'desc',
    icon: '💎'
  },
  {
    id: 'newest',
    label: 'Mới nhất',
    field: 'created_at',
    order: 'desc',
    icon: '🆕'
  },
  {
    id: 'name_az',
    label: 'Tên A-Z',
    field: 'title',
    order: 'asc',
    icon: '🔤'
  }
];

interface SortComponentProps {
  selectedSort: string;
  onSortChange: (sortId: string) => void;
  className?: string;
  showTitle?: boolean;
}

export default function SortComponent({ 
  selectedSort, 
  onSortChange, 
  className = "",
  showTitle = true 
}: SortComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const currentSort = SORT_OPTIONS.find(option => option.id === selectedSort) || SORT_OPTIONS[0];

  const handleSortSelect = (sortId: string) => {
    onSortChange(sortId);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {showTitle && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sắp xếp theo
        </label>
      )}
      
      {/* Dropdown Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-left cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">{currentSort.icon}</span>
              <span className="text-sm font-medium text-gray-900">
                {currentSort.label}
              </span>
            </div>
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {SORT_OPTIONS.map((option) => {
                const isSelected = option.id === selectedSort;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSortSelect(option.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-3">{option.icon}</span>
                        <span className="text-sm font-medium">
                          {option.label}
                        </span>
                      </div>
                      
                      {isSelected && (
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Sort direction indicator */}
                    <div className="text-xs text-gray-500 mt-1 ml-6">
                      {option.order === 'desc' ? '↓ Giảm dần' : '↑ Tăng dần'}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
      
      {/* Mobile Quick Sort Buttons */}
      <div className="mt-3 flex gap-2 md:hidden">
        <button
          onClick={() => handleSortSelect('popular')}
          className={`flex-1 text-xs px-3 py-2 rounded-lg border transition-colors ${
            selectedSort === 'popular' 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
          }`}
        >
          🔥 Bán chạy
        </button>
        <button
          onClick={() => handleSortSelect('rating')}
          className={`flex-1 text-xs px-3 py-2 rounded-lg border transition-colors ${
            selectedSort === 'rating' 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
          }`}
        >
          ⭐ Đánh giá
        </button>
        <button
          onClick={() => handleSortSelect('price_low')}
          className={`flex-1 text-xs px-3 py-2 rounded-lg border transition-colors ${
            selectedSort === 'price_low' 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
          }`}
        >
          💰 Giá rẻ
        </button>
      </div>
    </div>
  );
}
