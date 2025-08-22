import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  FilterState, 
  createEmptyFilterState, 
  hasActiveFilters, 
  getActiveFilterCount,
  createFilterSummary,
  filtersToUrlParams,
  urlParamsToFilters,
  saveFiltersToStorage,
  loadFiltersFromStorage,
  clearFiltersFromStorage,
  debounce,
  validateFilters
} from '@/utils/filterUtils';
import { PriceRange } from '@/components/filters';

interface UseFiltersOptions {
  persistToStorage?: boolean;
  debounceDelay?: number;
  enableUrlSync?: boolean;
}

interface UseFiltersReturn {
  // Filter state
  filters: FilterState;
  
  // State flags
  hasFilters: boolean;
  activeFilterCount: number;
  filterSummary: ReturnType<typeof createFilterSummary>;
  isValid: boolean;
  validationErrors: string[];
  
  // Actions
  setCategories: (categories: number[]) => void;
  setSort: (sort: string) => void;
  setPriceRange: (range: PriceRange) => void;
  setAuthors: (authors: number[]) => void;
  setQuery: (query: string) => void;
  clearAllFilters: () => void;
  clearFilter: (filterType: string) => void;
  
  // Utils
  resetToDefaults: () => void;
  loadFromStorage: () => void;
  clearStorage: () => void;
}

export const useFilters = (options: UseFiltersOptions = {}): UseFiltersReturn => {
  const {
    persistToStorage = true,
    debounceDelay = 300,
    enableUrlSync = true
  } = options;
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => {
    // Initialize from URL params first, then storage
    if (enableUrlSync) {
      return urlParamsToFilters(searchParams);
    }
    
    if (persistToStorage) {
      const stored = loadFiltersFromStorage();
      if (stored) {
        return { ...createEmptyFilterState(), ...stored };
      }
    }
    
    return createEmptyFilterState();
  });

  // Debounced URL sync
  const debouncedUpdateUrl = useMemo(
    () => debounce((newFilters: FilterState) => {
      if (enableUrlSync) {
        const params = filtersToUrlParams(newFilters);
        setSearchParams(params, { replace: true });
      }
    }, debounceDelay),
    [setSearchParams, enableUrlSync, debounceDelay]
  );

  // Debounced storage sync  
  const debouncedSaveToStorage = useMemo(
    () => debounce((newFilters: FilterState) => {
      if (persistToStorage) {
        saveFiltersToStorage(newFilters);
      }
    }, debounceDelay),
    [persistToStorage, debounceDelay]
  );

  // Update filters helper
  const updateFilters = useCallback((updater: (prev: FilterState) => FilterState) => {
    setFilters(prev => {
      const newFilters = updater(prev);
      
      // Sync to URL and storage
      debouncedUpdateUrl(newFilters);
      debouncedSaveToStorage(newFilters);
      
      return newFilters;
    });
  }, [debouncedUpdateUrl, debouncedSaveToStorage]);

  // Sync from URL params when they change externally
  useEffect(() => {
    if (enableUrlSync) {
      const urlFilters = urlParamsToFilters(searchParams);
      setFilters(urlFilters);
    }
  }, [searchParams, enableUrlSync]);

  // Filter setters
  const setCategories = useCallback((categories: number[]) => {
    updateFilters(prev => ({ ...prev, categories }));
  }, [updateFilters]);

  const setSort = useCallback((sort: string) => {
    updateFilters(prev => ({ ...prev, sort }));
  }, [updateFilters]);

  const setPriceRange = useCallback((priceRange: PriceRange) => {
    updateFilters(prev => ({ ...prev, priceRange }));
  }, [updateFilters]);

  const setAuthors = useCallback((authors: number[]) => {
    updateFilters(prev => ({ ...prev, authors }));
  }, [updateFilters]);

  const setQuery = useCallback((query: string) => {
    updateFilters(prev => ({ ...prev, query: query || undefined }));
  }, [updateFilters]);

  // Clear actions
  const clearAllFilters = useCallback(() => {
    const empty = createEmptyFilterState();
    setFilters(empty);
    
    if (enableUrlSync) {
      setSearchParams(new URLSearchParams(), { replace: true });
    }
    
    if (persistToStorage) {
      clearFiltersFromStorage();
    }
  }, [setSearchParams, enableUrlSync, persistToStorage]);

  const clearFilter = useCallback((filterType: string) => {
    updateFilters(prev => {
      switch (filterType) {
        case 'categories':
          return { ...prev, categories: [] };
        case 'sort':
          return { ...prev, sort: 'default' };
        case 'price':
          return { ...prev, priceRange: { min: null, max: null } };
        case 'authors':
          return { ...prev, authors: [] };
        case 'search':
          return { ...prev, query: undefined };
        default:
          return prev;
      }
    });
  }, [updateFilters]);

  // Utility actions
  const resetToDefaults = useCallback(() => {
    clearAllFilters();
  }, [clearAllFilters]);

  const loadFromStorage = useCallback(() => {
    if (persistToStorage) {
      const stored = loadFiltersFromStorage();
      if (stored) {
        setFilters(prev => ({ ...prev, ...stored }));
      }
    }
  }, [persistToStorage]);

  const clearStorage = useCallback(() => {
    if (persistToStorage) {
      clearFiltersFromStorage();
    }
  }, [persistToStorage]);

  // Computed values
  const hasFilters = useMemo(() => hasActiveFilters(filters), [filters]);
  const activeFilterCount = useMemo(() => getActiveFilterCount(filters), [filters]);
  const filterSummary = useMemo(() => createFilterSummary(filters), [filters]);
  const validation = useMemo(() => validateFilters(filters), [filters]);

  return {
    // State
    filters,
    hasFilters,
    activeFilterCount,
    filterSummary,
    isValid: validation.isValid,
    validationErrors: validation.errors,
    
    // Actions
    setCategories,
    setSort,
    setPriceRange,
    setAuthors,
    setQuery,
    clearAllFilters,
    clearFilter,
    
    // Utils
    resetToDefaults,
    loadFromStorage,
    clearStorage
  };
};
