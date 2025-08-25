import React, { useState } from 'react';
import { CategoryFilter, SortComponent, PriceRangeFilter, AuthorFilter, PublisherFilter, type PriceRange } from './';

interface MobileFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  
  // Filter props
  selectedCategories: number[];
  onCategoryChange: (categories: number[]) => void;
  
  selectedSort: string;
  onSortChange: (sort: string) => void;
  
  selectedPriceRange: PriceRange;
  onPriceRangeChange: (range: PriceRange) => void;
  
  selectedAuthors: number[];
  onAuthorsChange: (authors: number[]) => void;
  
  // Actions
  onClearAll: () => void;
  
  // State
  activeFilterCount?: number;
}

export default function MobileFilterPanel({
  isOpen,
  onClose,
  selectedCategories,
  onCategoryChange,
  selectedSort,
  onSortChange,
  selectedPriceRange,
  onPriceRangeChange,
  selectedAuthors,
  onAuthorsChange,
  onClearAll,
  activeFilterCount = 0
}: MobileFilterPanelProps) {
  const [activeTab, setActiveTab] = useState<string>('categories');

  const tabs = [
    { id: 'categories', label: 'Danh mục', icon: '🏷️' },
    { id: 'sort', label: 'Sắp xếp', icon: '🔄' },
    { id: 'price', label: 'Giá', icon: '💰' },
    { id: 'authors', label: 'Tác giả', icon: '✍️' },
    { id: 'publishers', label: 'NXB', icon: '🏢' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl z-50 md:hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">Bộ lọc</h3>
            {activeFilterCount > 0 && (
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button
                onClick={onClearAll}
                className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded-lg hover:bg-red-50"
              >
                Xóa tất cả
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-2 text-center text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-base">{tab.icon}</span>
                <span className="text-xs">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'categories' && (
            <CategoryFilter
              selectedCategories={selectedCategories}
              onCategoryChange={onCategoryChange}
              showTitle={false}
              className="border-0 p-0 bg-transparent"
            />
          )}
          
          {activeTab === 'sort' && (
            <SortComponent
              selectedSort={selectedSort}
              onSortChange={onSortChange}
              showTitle={false}
              className="border-0"
            />
          )}
          
          {activeTab === 'price' && (
            <PriceRangeFilter
              selectedRange={selectedPriceRange}
              onRangeChange={onPriceRangeChange}
              showTitle={false}
              className="border-0 p-0 bg-transparent"
            />
          )}
          
          {activeTab === 'authors' && (
            <AuthorFilter
              selectedAuthors={selectedAuthors}
              onAuthorsChange={onAuthorsChange}
              showTitle={false}
              className="border-0 p-0 bg-transparent"
            />
          )}
          
          {activeTab === 'publishers' && (
            <PublisherFilter
              selectedPublishers={[]}
              onPublishersChange={() => {}}
              showTitle={false}
              className="border-0 p-0 bg-transparent"
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={onClearAll}
              disabled={activeFilterCount === 0}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Xóa bộ lọc
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
