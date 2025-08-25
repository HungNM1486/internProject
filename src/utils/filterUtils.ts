import { PriceRange } from '@/components/filters';

// Filter state type
export interface FilterState {
  categories: number[];
  sort: string;
  priceRange: PriceRange;
  authors: number[];
  query?: string;
}

// Create empty filter state
export const createEmptyFilterState = (): FilterState => ({
  categories: [],
  sort: 'default',
  priceRange: { min: null, max: null },
  authors: [],
  query: undefined
});

// Check if filters are active
export const hasActiveFilters = (filters: FilterState): boolean => {
  return (
    filters.categories.length > 0 ||
    filters.sort !== 'default' ||
    filters.priceRange.min !== null ||
    filters.priceRange.max !== null ||
    filters.authors.length > 0 ||
    (filters.query && filters.query.trim().length > 0)
  );
};

// Get filter count
export const getActiveFilterCount = (filters: FilterState): number => {
  let count = 0;
  if (filters.categories.length > 0) count++;
  if (filters.sort !== 'default') count++;
  if (filters.priceRange.min !== null || filters.priceRange.max !== null) count++;
  if (filters.authors.length > 0) count++;
  if (filters.query && filters.query.trim().length > 0) count++;
  return count;
};

// Create filter summary for display
export const createFilterSummary = (filters: FilterState) => {
  const summary: Array<{ type: string; label: string; count?: number }> = [];
  
  if (filters.categories.length > 0) {
    summary.push({
      type: 'categories',
      label: `${filters.categories.length} danh mục`,
      count: filters.categories.length
    });
  }
  
  if (filters.sort !== 'default') {
    summary.push({
      type: 'sort',
      label: `Sắp xếp: ${filters.sort}`,
    });
  }
  
  if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
    const min = filters.priceRange.min ? `${filters.priceRange.min.toLocaleString()}đ` : '0đ';
    const max = filters.priceRange.max ? `${filters.priceRange.max.toLocaleString()}đ` : '∞';
    summary.push({
      type: 'price',
      label: `Giá: ${min} - ${max}`,
    });
  }
  
  if (filters.authors.length > 0) {
    summary.push({
      type: 'authors',
      label: `${filters.authors.length} tác giả`,
      count: filters.authors.length
    });
  }
  
  if (filters.query && filters.query.trim().length > 0) {
    summary.push({
      type: 'search',
      label: `Tìm kiếm: "${filters.query}"`,
    });
  }
  
  return summary;
};

// URL params utilities
export const filtersToUrlParams = (filters: FilterState): URLSearchParams => {
  const params = new URLSearchParams();
  
  if (filters.categories.length > 0) {
    params.set('categories', filters.categories.join(','));
  }
  
  if (filters.sort && filters.sort !== 'default') {
    params.set('sort', filters.sort);
  }
  
  if (filters.priceRange.min !== null) {
    params.set('priceMin', filters.priceRange.min.toString());
  }
  
  if (filters.priceRange.max !== null) {
    params.set('priceMax', filters.priceRange.max.toString());
  }
  
  if (filters.authors.length > 0) {
    params.set('authors', filters.authors.join(','));
  }
  
  if (filters.query && filters.query.trim().length > 0) {
    params.set('q', filters.query);
  }
  
  return params;
};

export const urlParamsToFilters = (params: URLSearchParams): FilterState => {
  const categoriesParam = params.get('categories');
  const categories = categoriesParam 
    ? categoriesParam.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
    : [];
    
  const authorsParam = params.get('authors');
  const authors = authorsParam 
    ? authorsParam.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
    : [];
    
  const priceMinParam = params.get('priceMin');
  const priceMaxParam = params.get('priceMax');
  
  return {
    categories,
    sort: params.get('sort') || 'default',
    priceRange: {
      min: priceMinParam ? parseInt(priceMinParam) : null,
      max: priceMaxParam ? parseInt(priceMaxParam) : null
    },
    authors,
    query: params.get('q') || undefined
  };
};

// LocalStorage utilities
const FILTER_STORAGE_KEY = 'tiki-book-filters';

export const saveFiltersToStorage = (filters: FilterState): void => {
  try {
    // Don't save query (search term) to localStorage
    const { query, ...persistentFilters } = filters;
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(persistentFilters));
  } catch (error) {
    console.warn('Failed to save filters to localStorage:', error);
  }
};

export const loadFiltersFromStorage = (): Partial<FilterState> | null => {
  try {
    const stored = localStorage.getItem(FILTER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to load filters from localStorage:', error);
    return null;
  }
};

export const clearFiltersFromStorage = (): void => {
  try {
    localStorage.removeItem(FILTER_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear filters from localStorage:', error);
  }
};

// Debounce utility for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Filter validation
export const validateFilters = (filters: FilterState): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Validate price range
  if (filters.priceRange.min !== null && filters.priceRange.max !== null) {
    if (filters.priceRange.min > filters.priceRange.max) {
      errors.push('Giá tối thiểu không thể lớn hơn giá tối đa');
    }
    if (filters.priceRange.min < 0) {
      errors.push('Giá tối thiểu không thể âm');
    }
  }
  
  // Validate categories (basic check)
  if (filters.categories.some(id => id <= 0)) {
    errors.push('ID danh mục không hợp lệ');
  }
  
  // Validate authors (basic check)
  if (filters.authors.some(id => id <= 0)) {
    errors.push('ID tác giả không hợp lệ');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
