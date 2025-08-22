import { SORT_OPTIONS, SortOption } from '@/components/filters/SortComponent';

/**
 * Convert sort option ID to Django API ordering parameter
 */
export function getSortOrdering(sortId: string): string | undefined {
  const sortOption = SORT_OPTIONS.find(option => option.id === sortId);
  
  if (!sortOption || sortId === 'default') {
    return undefined; // Use default API ordering
  }
  
  // Map frontend field names to Django model field names
  const fieldMapping: Record<string, string> = {
    'quantity_sold': 'quantity_sold',
    'rating_average': 'rating_average', 
    'list_price': 'list_price',
    'created_at': 'created_at',
    'title': 'title'
  };
  
  const djangoField = fieldMapping[sortOption.field] || sortOption.field;
  
  // Add negative sign for descending order
  return sortOption.order === 'desc' ? `-${djangoField}` : djangoField;
}

/**
 * Get sort option by ID
 */
export function getSortOption(sortId: string): SortOption | undefined {
  return SORT_OPTIONS.find(option => option.id === sortId);
}

/**
 * Get sort display name
 */
export function getSortDisplayName(sortId: string): string {
  const option = getSortOption(sortId);
  return option?.label || 'Mặc định';
}
