export interface User {
    id: string;
    email: string;
    role?: 'user' | 'admin';
    createdAt?: string;
    updatedAt?: string;
}
  
export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    categoryId: string;
    category?: Category;
    images: string[];
    stock: number;
    rating: number;
    reviewCount: number;
    isbn?: string;
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    language?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
    slug: string;
    parentId?: string;
    createdAt: string;
}

export interface CartItem {
    id: string;
    userId: string;
    bookId: string;
    book: Book;
    quantity: number;
    price: number;
    createdAt: string;
}

export interface Order {
    id: string;
    userId: string;
    user: User;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
    shippingAddress: Address;
    paymentMethod: 'cash' | 'card' | 'bank_transfer';
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: string;
    orderId: string;
    bookId: string;
    book: Book;
    quantity: number;
    price: number;
}

export interface Address {
    fullName: string;
    phone: string;
    address: string;
    ward: string;
    district: string;
    city: string;
}

export interface Review {
    id: string;
    userId: string;
    user: User;
    bookId: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
    data: T;
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
}
