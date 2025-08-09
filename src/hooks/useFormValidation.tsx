import { useState, useCallback } from 'react';
import { validateField, ValidationRules } from '../utils/validation';

interface UseFormValidationParams {
initialValues: { [key: string]: any };
validationRules: ValidationRules;
}

export const useFormValidation = ({ initialValues, validationRules }: UseFormValidationParams) => {
const [values, setValues] = useState(initialValues);
const [errors, setErrors] = useState<{ [key: string]: string }>({});
const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

const validateSingleField = useCallback((name: string, value: any): string | null => {
    const rules = validationRules[name];
    if (!rules) return null;
    return validateField(value, rules, values);
}, [validationRules, values]);

const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setValues(prev => ({ ...prev, [name]: finalValue }));

    // Validate on change if field was already touched
    if (touched[name]) {
    const error = validateSingleField(name, finalValue);
    setErrors(prev => ({ ...prev, [name]: error || '' }));
    }
}, [touched, validateSingleField]);

const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateSingleField(name, value);
    setErrors(prev => ({ ...prev, [name]: error || '' }));
}, [validateSingleField]);

const validateForm = useCallback((): boolean => {
    const newErrors: { [key: string]: string } = {};
    let hasErrors = false;

    Object.keys(validationRules).forEach(fieldName => {
    const error = validateSingleField(fieldName, values[fieldName]);
    if (error) {
        newErrors[fieldName] = error;
        hasErrors = true;
    }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => {
    acc[key] = true;
    return acc;
    }, {} as { [key: string]: boolean }));

    return !hasErrors;
}, [validationRules, values, validateSingleField]);

const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
}, [initialValues]);

const setValue = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
}, []);

const setFieldError = useCallback((name: string, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
}, []);

return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    reset,
    setValue,
    setValues,
    setFieldError
};
};

