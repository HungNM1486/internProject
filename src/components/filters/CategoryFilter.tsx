import React, { useState, useEffect } from 'react';
import { Category } from '@/types';
import { categoryService } from '@/services/categoryService';

interface CategoryFilterProps {
  selectedCategories: number[];
  onCategoryChange: (categoryIds: number[]) => void;
  showTitle?: boolean;
  className?: string;
}

export default function CategoryFilter({ 
  selectedCategories, 
  onCategoryChange, 
  showTitle = true,
  className = ""
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchCategories();
  }, []);

  const handleCategoryToggle = (categoryId: number) => {
    const isSelected = selectedCategories.includes(categoryId);
    let newSelected: number[];

    if (isSelected) {
      // Remove category
      newSelected = selectedCategories.filter(id => id !== categoryId);
    } else {
      // Add category
      newSelected = [...selectedCategories, categoryId];
    }

    onCategoryChange(newSelected);
  };

  const handleClearAll = () => {
    onCategoryChange([]);
  };

  const handleSelectAll = () => {
    const allIds = categories.filter(cat => cat.book_count && cat.book_count > 0).map(cat => cat.id);
    onCategoryChange(allIds);
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
        {showTitle && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Danh mục</h3>
          </div>
        )}
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center animate-pulse">
              <div className="w-4 h-4 bg-gray-200 rounded mr-3"></div>
              <div className="h-4 bg-gray-200 rounded flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const availableCategories = categories.filter(cat => cat.book_count && cat.book_count > 0);
  const unavailableCategories = categories.filter(cat => !cat.book_count || cat.book_count === 0);
  const hasSelectedCategories = selectedCategories.length > 0;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Danh mục</h3>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg 
              className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {!isCollapsed && (
        <div className="space-y-3">
          {/* Filter Actions */}
          {availableCategories.length > 1 && (
            <div className="flex gap-2 pb-3 border-b border-gray-100">
              {hasSelectedCategories ? (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Bỏ chọn tất cả
                </button>
              ) : (
                <button
                  onClick={handleSelectAll}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Chọn tất cả
                </button>
              )}
            </div>
          )}

          {/* Available Categories */}
          {availableCategories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <label
                key={category.id}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded -m-2"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-3 flex-1 text-sm text-gray-900">
                  {category.name}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {category.book_count}
                </span>
              </label>
            );
          })}

          {/* Unavailable Categories (Disabled) */}
          {unavailableCategories.length > 0 && availableCategories.length > 0 && (
            <div className="border-t border-gray-100 pt-3 mt-3">
              <div className="text-xs text-gray-400 mb-2">Không có sách</div>
            </div>
          )}
          
          {unavailableCategories.map((category) => (
            <label
              key={category.id}
              className="flex items-center cursor-not-allowed opacity-50"
            >
              <input
                type="checkbox"
                disabled
                className="w-4 h-4 text-gray-300 bg-gray-100 border-gray-300 rounded"
              />
              <span className="ml-3 flex-1 text-sm text-gray-500">
                {category.name}
              </span>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                0
              </span>
            </label>
          ))}

          {/* No categories available */}
          {categories.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">
              Không có danh mục nào
            </div>
          )}

          {/* Selected Summary */}
          {hasSelectedCategories && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-600">
                Đã chọn {selectedCategories.length} danh mục
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedCategories.map(id => {
                  const category = categories.find(cat => cat.id === id);
                  if (!category) return null;
                  
                  return (
                    <button
                      key={id}
                      onClick={() => handleCategoryToggle(id)}
                      className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200"
                    >
                      {category.name}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
