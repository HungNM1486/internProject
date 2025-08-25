import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookList from "@/components/books/BookList";
import CategorySidebar from "@/components/layout/CategorySidebar";
import { CategoriesGrid } from "@/components/categories";
import { CategoryFilter, SortComponent, PriceRangeFilter, AuthorFilter, PublisherFilter, type PriceRange } from "@/components/filters";

const Books: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('default');
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>({ min: null, max: null });
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  
  // Parse URL params
  useEffect(() => {
    const categoriesParam = searchParams.get('categories');
    if (categoriesParam) {
      const categoryIds = categoriesParam.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
      setSelectedCategories(categoryIds);
    } else {
      setSelectedCategories([]);
    }
    
    const sortParam = searchParams.get('sort');
    setSelectedSort(sortParam || 'default');
    
    const priceMinParam = searchParams.get('priceMin');
    const priceMaxParam = searchParams.get('priceMax');
    setSelectedPriceRange({
      min: priceMinParam ? parseInt(priceMinParam) : null,
      max: priceMaxParam ? parseInt(priceMaxParam) : null
    });
    
    const authorsParam = searchParams.get('authors');
    if (authorsParam) {
      const authorIds = authorsParam.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
      setSelectedAuthors(authorIds);
    } else {
      setSelectedAuthors([]);
    }
  }, [searchParams]);

  // Handle category filter change
  const handleCategoryChange = (categoryIds: number[]) => {
    setSelectedCategories(categoryIds);
    updateUrlParams({ categories: categoryIds });
  };

  // Handle sort change
  const handleSortChange = (sortId: string) => {
    setSelectedSort(sortId);
    updateUrlParams({ sort: sortId });
  };

  // Handle price range change
  const handlePriceRangeChange = (range: PriceRange) => {
    console.log('📝 Books page - Price range changed:', range);
    setSelectedPriceRange(range);
    updateUrlParams({ priceRange: range });
  };

  // Handle authors change
  const handleAuthorsChange = (authorIds: number[]) => {
    setSelectedAuthors(authorIds);
    updateUrlParams({ authors: authorIds });
  };

  // Update URL params helper
  const updateUrlParams = (updates: { categories?: number[]; sort?: string; priceRange?: PriceRange; authors?: number[] }) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (updates.categories !== undefined) {
      if (updates.categories.length > 0) {
        newParams.set('categories', updates.categories.join(','));
      } else {
        newParams.delete('categories');
      }
    }
    
    if (updates.sort !== undefined) {
      if (updates.sort && updates.sort !== 'default') {
        newParams.set('sort', updates.sort);
      } else {
        newParams.delete('sort');
      }
    }
    
    if (updates.priceRange !== undefined) {
      if (updates.priceRange.min !== null) {
        newParams.set('priceMin', updates.priceRange.min.toString());
      } else {
        newParams.delete('priceMin');
      }
      
      if (updates.priceRange.max !== null) {
        newParams.set('priceMax', updates.priceRange.max.toString());
      } else {
        newParams.delete('priceMax');
      }
    }
    
    if (updates.authors !== undefined) {
      if (updates.authors.length > 0) {
        newParams.set('authors', updates.authors.join(','));
      } else {
        newParams.delete('authors');
      }
    }
    
    setSearchParams(newParams, { replace: true });
  };

  // Handle results count change
  const handleResultsChange = (total: number) => {
    setTotalResults(total);
  };

  const hasFilters = selectedCategories.length > 0 || selectedSort !== 'default' || selectedPriceRange.min !== null || selectedPriceRange.max !== null || selectedAuthors.length > 0;

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      {/* Sidebar danh mục */}
      <div className="w-full lg:w-1/5 space-y-4">
        <CategorySidebar />
        
        {/* Category Filter */}
        <CategoryFilter
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
        
        {/* Sort Filter */}
        <SortComponent
          selectedSort={selectedSort}
          onSortChange={handleSortChange}
        />
        
        {/* Price Range Filter */}
        <PriceRangeFilter
          selectedRange={selectedPriceRange}
          onRangeChange={handlePriceRangeChange}
        />
        
        {/* Author Filter */}
        <AuthorFilter
          selectedAuthors={selectedAuthors}
          onAuthorsChange={handleAuthorsChange}
        />
        
        {/* Publisher Filter (Coming Soon) */}
        <PublisherFilter
          selectedPublishers={[]}
          onPublishersChange={() => {}}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 space-y-8">
        <h1 className="text-2xl font-bold">Nhà sách Tiki</h1>
        
        {/* Section 1: Khám phá theo danh mục */}
        {!hasFilters && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Khám phá theo danh mục</h2>
            </div>
            <CategoriesGrid />
          </section>
        )}

        {/* Section 2: Tất cả sản phẩm / Filtered Products */}
        <section>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {hasFilters ? 'Sản phẩm đã lọc' : 'Tất cả sản phẩm'}
              </h2>
              
              {/* Clear filters */}
              {hasFilters && (
                <button
                  onClick={() => {
                    handleCategoryChange([]);
                    handleSortChange('default');
                    handlePriceRangeChange({ min: null, max: null });
                    handleAuthorsChange([]);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
            
            {/* Results info */}
            <div className="flex items-center gap-4 mt-2">
              {totalResults > 0 && (
                <span className="text-sm text-gray-600">
                  {totalResults.toLocaleString()} sản phẩm
                </span>
              )}
              
              {/* Active filters */}
              {hasFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-500">Bộ lọc:</span>
                  {selectedCategories.length > 0 && (
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {selectedCategories.length} danh mục
                    </span>
                  )}
                  {selectedSort !== 'default' && (
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Sắp xếp: {selectedSort}
                    </span>
                  )}
                  {(selectedPriceRange.min !== null || selectedPriceRange.max !== null) && (
                    <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      Giá: {selectedPriceRange.min ? `${selectedPriceRange.min.toLocaleString()}đ` : '0đ'} - {selectedPriceRange.max ? `${selectedPriceRange.max.toLocaleString()}đ` : '∞'}
                    </span>
                  )}
                  {selectedAuthors.length > 0 && (
                    <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      {selectedAuthors.length} tác giả
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <BookList 
            categoryFilter={selectedCategories.length > 0 ? selectedCategories : undefined}
            sortOption={selectedSort}
            priceRange={selectedPriceRange}
            authorFilter={selectedAuthors.length > 0 ? selectedAuthors : undefined}
            onResultsChange={handleResultsChange}
          />
        </section>
      </div>
    </div>
  );
};

export default Books;