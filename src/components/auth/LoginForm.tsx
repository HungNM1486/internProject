import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { authStore } from '../../store/authStore';
import { useFormValidation } from '../../hooks/useFormValidation';
import { loginValidationRules } from '../../utils/validation';

interface LoginFormProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSwitchToRegister }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = authStore();

  const { values, errors, touched, handleChange, handleBlur, validateForm, reset } = useFormValidation({
    initialValues: { email: '', password: '' },
    validationRules: loginValidationRules
  });

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await login(values.email, values.password);
      onClose();
      reset();
    } catch (error: any) {
      console.error('Login error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password logic
    console.log('Forgot password clicked');
  };

  const handleBack = () => {
    // TODO: Implement back navigation logic
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 font-[Inter,Arial,sans-serif]">
      <div className="relative">
        {/* Close Button - Outside and on top */}
        <button 
          onClick={onClose}
          className="absolute -right-4 -top-4 w-[42px] h-[42px] bg-none border-none cursor-pointer z-50"
          style={{
            background: 'none',
            border: 'none'
          }}
        >
          <img
            src="/auth/x.png"
            alt="Close"
            className="w-full h-full"
            style={{
              overflowClipMargin: 'content-box',
              overflow: 'clip'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              if (target.parentElement) {
                target.parentElement.innerHTML = '<div class="w-[42px] h-[42px] bg-gray-600 rounded-full flex items-center justify-center"><span class="text-white text-xl">×</span></div>';
              }
            }}
          />
        </button>
        
        {/* Form Container - Behind X button */}
        <div className="bg-white rounded-[20px] shadow-xl w-[800px] flex overflow-hidden z-40">

        {/* Left Section - Login Form */}
        <div className="w-[500px] p-8 flex flex-col">
          {/* Back Arrow */}
          <button 
            onClick={handleBack}
            className="w-8 h-8 flex items-center justify-center mb-[10px] hover:bg-gray-100 rounded transition-colors"
          >
            <img 
              src="/auth/back.png" 
              alt="Back" 
              width={21} 
              height={21} 
              className="object-contain"
            />
          </button>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#242424] mb-[10px]">Đăng nhập bằng email</h2>
            <p className="text-[#242424] text-[15px] font-medium">Nhập email và mật khẩu tài khoản Tiki</p>
          </div>

          {/* Form */}
          <div className="flex flex-col space-y-6">
            {/* Email Input */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-0 py-[10px] border-0 border-b-2 bg-transparent focus:outline-none focus:border-red-500 transition-colors placeholder-gray-400 ${
                  errors.email && touched.email 
                    ? 'border-red-500' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="abc@gmail.com"
                disabled={isLoading}
              />
              {errors.email && touched.email && (
                <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-0 py-[10px] pr-16 border-0 border-b-2 bg-transparent focus:outline-none focus:border-red-500 transition-colors placeholder-gray-400 ${
                    errors.password && touched.password 
                      ? 'border-red-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Mật khẩu"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[#0d5bc6] transition-colors text-sm"
                  disabled={isLoading}
                >
                  {showPassword ? 'Ẩn' : 'Hiện'}
                </button>
              </div>
              {errors.password && touched.password && (
                <span className="text-red-500 text-sm mt-1 block">{errors.password}</span>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-[26px] bg-[#ff424e] hover:opacity-80 text-white text-[20px] font-medium py-[13px] px-0 rounded-md transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang đăng nhập...
                </div>
              ) : (
                'Đăng nhập'
              )}
            </button>


            {/* Forgot + Sign Up nhóm chung */}
            <div className="flex flex-col space-y-1">
              {/* Forgot Password */}
              <div className="text-left">
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[#0d5cb6] text-[13px] font-medium transition-colors"
                  disabled={isLoading}
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-left">
                <span className="text-gray-600 text-sm">Chưa có tài khoản? </span>
                <button 
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-[#0d5cb6] text-[13px] transition-colors"
                  disabled={isLoading}
                >
                  Tạo tài khoản
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Promotional Content */}
        <div className="w-[300px] bg-[#deebff] flex flex-col items-center justify-center p-8">
          <div className="text-center">
            {/* Image */}
            <div className="mb-6">
              <img
                src="/auth/1.png"
                alt="Tiki Shopping"
                className="w-[200px] h-[200px] object-cover rounded-lg mx-auto"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.nextElementSibling) {
                    (target.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              {/* Fallback placeholder */}
              <div className="w-[200px] h-[200px] bg-gradient-to-br from-red-400 to-red-600 rounded-lg mx-auto hidden items-center justify-center shadow-md">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">📚</div>
                  <div className="text-lg font-bold">BOOKSTORE</div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div>
              <h3 className="text-[#0a68ff] text-[18px] font-bold text-gray-800 mb-2">Mua sắm tại Tiki</h3>
              <p className="text-[#0a68ff] text-[14px] font-medium">Siêu ưu đãi mỗi ngày</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;