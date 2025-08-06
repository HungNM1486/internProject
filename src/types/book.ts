export interface Book {
    id: string;
    title: string;
    author: string;
    images: string[];
    price: number;
    salePrice?: number;
    description: string;
    detailedDescription: string;
    publisher: string;
    category: string;
    categoryId: string;
    rating: number;
    reviewCount: number;
    isBestSeller: boolean;
    stock: number;
    isbn: string;
    publishedDate: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface BookFilter {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    search?: string;
    sortBy?: 'price' | 'rating' | 'bestseller' | 'newest';
    sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}