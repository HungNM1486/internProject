import React, { useState, useEffect } from 'react';
import { Category } from '@/types';
import { categoryService } from '@/services/categoryService';

export default function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-gray-500">⏳ Đang tải danh mục...</div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-gray-500">📂 Không có danh mục nào</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
        >
          {/* Category Icon/Image placeholder */}
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100">
            <span className="text-xl">📚</span>
          </div>
          
          {/* Category Name */}
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
            {category.name}
          </h3>
          
          {/* Book Count */}
          {category.book_count !== undefined && (
            <p className="mt-1 text-xs text-gray-500">
              {category.book_count} sách
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
