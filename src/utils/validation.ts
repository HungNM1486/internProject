export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any, values?: any) => string | null;
  message?: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

export const validateField = (
  value: any,
  rules: ValidationRule[],
  allValues?: any
): string | null => {
  for (const rule of rules) {
    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return rule.message || 'Trường này là bắt buộc';
    }

    // Skip other validations if field is empty and not required
    if (!value && !rule.required) continue;

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message || `Tối thiểu ${rule.minLength} ký tự`;
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message || `Tối đa ${rule.maxLength} ký tự`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || 'Định dạng không hợp lệ';
    }

    // Custom validation
    if (rule.custom) {
      const error = rule.custom(value, allValues);
      if (error) return error;
    }
  }

  return null;
};

// Validation rules for different forms
export const loginValidationRules: ValidationRules = {
  email: [
    { required: true, message: 'Vui lòng nhập email' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không hợp lệ' },
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu' },
    { minLength: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
  ],
};

export const registerValidationRules: ValidationRules = {
  username: [
    { required: true, message: 'Vui lòng nhập tên đăng nhập' },
    { minLength: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự' },
    { maxLength: 30, message: 'Tên đăng nhập không được vượt quá 30 ký tự' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới',
    },
  ],
  fullName: [
    { required: true, message: 'Vui lòng nhập họ và tên' },
    { minLength: 2, message: 'Họ tên phải có ít nhất 2 ký tự' },
    { maxLength: 50, message: 'Họ tên không được vượt quá 50 ký tự' },
  ],
  email: [
    { required: true, message: 'Vui lòng nhập email' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không hợp lệ' },
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu' },
    { minLength: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      message: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số',
    },
  ],
  confirmPassword: [
    { required: true, message: 'Vui lòng xác nhận mật khẩu' },
    {
      custom: (value, values) =>
        value !== values?.password ? 'Mật khẩu xác nhận không khớp' : null,
    },
  ],
  agreeToTerms: [
    {
      custom: (value) => (!value ? 'Vui lòng đồng ý với điều khoản sử dụng' : null),
    },
  ],
};

export const profileValidationRules: ValidationRules = {
  fullName: [
    { required: true, message: 'Vui lòng nhập họ và tên' },
    { minLength: 2, message: 'Họ tên phải có ít nhất 2 ký tự' },
    { maxLength: 50, message: 'Họ tên không được vượt quá 50 ký tự' },
  ],
  phone: [
    {
      pattern: /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/,
      message: 'Số điện thoại không hợp lệ',
    },
  ],
  address: [{ maxLength: 200, message: 'Địa chỉ không được vượt quá 200 ký tự' }],
  dateOfBirth: [
    {
      custom: (value) => {
        if (!value) return null;
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 13) return 'Bạn phải trên 13 tuổi';
        if (age > 120) return 'Ngày sinh không hợp lệ';
        return null;
      },
    },
  ],
};

export const changePasswordValidationRules: ValidationRules = {
  currentPassword: [{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }],
  newPassword: [
    { required: true, message: 'Vui lòng nhập mật khẩu mới' },
    { minLength: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
    {
      custom: (value, values) =>
        value === values?.currentPassword ? 'Mật khẩu mới phải khác mật khẩu hiện tại' : null,
    },
  ],
  confirmPassword: [
    { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
    {
      custom: (value, values) =>
        value !== values?.newPassword ? 'Mật khẩu xác nhận không khớp' : null,
    },
  ],
};

// === Book Validation Functions ===
import type { Book } from '@/types';

/**
 * Kiểm tra dữ liệu sách có hợp lệ không
 */
export function validateBookData(book: any): boolean {
  if (!book || typeof book !== 'object') {
    return false;
  }

  // Kiểm tra các trường bắt buộc
  if (!book.id || !book.title) {
    return false;
  }

  return true;
}

/**
 * Kiểm tra sách có đầy đủ thông tin cơ bản không
 */
export function isBookComplete(book: Book): boolean {
  return !!(book.id && book.title && book.list_price !== undefined && book.stock !== undefined);
}

/**
 * Kiểm tra sách có thông tin tác giả không
 */
export function hasAuthors(book: Book): boolean {
  return Array.isArray(book.authors) && book.authors.length > 0;
}

/**
 * Kiểm tra sách có thông tin danh mục không
 */
export function hasCategories(book: Book): boolean {
  return Array.isArray(book.categories) && book.categories.length > 0;
}

/**
 * Kiểm tra sách có ảnh không
 */
export function hasImages(book: Book): boolean {
  return Array.isArray(book.images) && book.images.length > 0;
}

/**
 * Lấy thông tin sách an toàn với fallback values
 */
export function getSafeBookInfo(book: Book) {
  return {
    id: book.id || 'unknown',
    title: book.title || book.name || 'Không có tên',
    description: book.description || book.short_description || 'Chưa có mô tả',
    price: book.list_price || book.price || 0,
    stock: book.stock || 0,
    rating: book.rating_average || book.rating || 0,
    authors: hasAuthors(book) ? book.authors : [{ name: 'Chưa rõ tác giả' }],
    categories: hasCategories(book) ? book.categories : [{ name: 'Chưa rõ danh mục' }],
    images: hasImages(book) ? book.images : [],
    cover: book.book_cover || null,
  };
}
