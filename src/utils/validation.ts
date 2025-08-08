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

export const validateField = (value: any, rules: ValidationRule[], allValues?: any): string | null => {
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
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không hợp lệ' }
],
password: [
    { required: true, message: 'Vui lòng nhập mật khẩu' },
    { minLength: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
]
};

export const registerValidationRules: ValidationRules = {
fullName: [
    { required: true, message: 'Vui lòng nhập họ và tên' },
    { minLength: 2, message: 'Họ tên phải có ít nhất 2 ký tự' },
    { maxLength: 50, message: 'Họ tên không được vượt quá 50 ký tự' }
],
email: [
    { required: true, message: 'Vui lòng nhập email' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không hợp lệ' }
],
password: [
    { required: true, message: 'Vui lòng nhập mật khẩu' },
    { minLength: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
    { 
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 
    message: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số' 
    }
],
confirmPassword: [
    { required: true, message: 'Vui lòng xác nhận mật khẩu' },
    { 
    custom: (value, values) => 
        value !== values?.password ? 'Mật khẩu xác nhận không khớp' : null 
    }
],
agreeToTerms: [
    { 
    custom: (value) => 
        !value ? 'Vui lòng đồng ý với điều khoản sử dụng' : null 
    }
]
};

export const profileValidationRules: ValidationRules = {
fullName: [
    { required: true, message: 'Vui lòng nhập họ và tên' },
    { minLength: 2, message: 'Họ tên phải có ít nhất 2 ký tự' },
    { maxLength: 50, message: 'Họ tên không được vượt quá 50 ký tự' }
],
phone: [
    { 
    pattern: /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/, 
    message: 'Số điện thoại không hợp lệ' 
    }
],
address: [
    { maxLength: 200, message: 'Địa chỉ không được vượt quá 200 ký tự' }
],
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
    }
    }
]
};

export const changePasswordValidationRules: ValidationRules = {
currentPassword: [
    { required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }
],
newPassword: [
    { required: true, message: 'Vui lòng nhập mật khẩu mới' },
    { minLength: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
    { 
    custom: (value, values) => 
        value === values?.currentPassword ? 'Mật khẩu mới phải khác mật khẩu hiện tại' : null 
    }
],
confirmPassword: [
    { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
    { 
    custom: (value, values) => 
        value !== values?.newPassword ? 'Mật khẩu xác nhận không khớp' : null 
    }
]
};
