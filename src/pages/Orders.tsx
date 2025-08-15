import React from 'react';
import { Link } from 'react-router-dom';

const Orders: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 font-display">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Đơn hàng của tôi</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Main Content - Two Column Layout */}
      <div className="flex gap-6">
        {/* Left Sidebar - Account Information (1/5 width) */}
        <div className="w-1/5">
          <div className="p-4">
            {/* Account Header with Avatar and Name */}
            <div className="flex items-center mb-6">
              <img 
                src="/orders/avt.png" 
                alt="Avatar" 
                className="w-[45px] h-[45px] rounded-full mr-3"
              />
              <div>
                <p className="text-sm text-gray-500 mb-1">Tài khoản của</p>
                <p className="text-base font-semibold text-gray-900">Vũ Anh Tú</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <img 
                  src="/orders/1.png" 
                  alt="Account Info" 
                  className="w-6 h-6 flex-shrink-0"
                />
                <span className="text-sm text-gray-700 leading-none">Thông tin tài khoản</span>
              </div>
              
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <img 
                  src="/orders/2.png" 
                  alt="Notifications" 
                  className="w-6 h-6 flex-shrink-0"
                />
                <span className="text-sm text-gray-700 leading-none">Thông báo của tôi</span>
              </div>
              
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <img 
                  src="/orders/3.png" 
                  alt="Order Management" 
                  className="w-6 h-6 flex-shrink-0"
                />
                <span className="text-sm text-gray-700 leading-none">Quản lý đơn hàng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Order Details (4/5 width) */}
        <div className="w-4/5">
          <div className="p-6">
            {/* Order Header - Left Aligned */}
            <div className="text-left mb-4">
              <h1 className="text-[19px] font-[300] text-[#242424]">
                Chi tiết đơn hàng #861977987 - 
                <span className="ml-2 text-[#242424] text-[19px] font-[400]">Đang xử lý</span>
              </h1>
            </div>

            {/* Order Date - Right Aligned */}
            <div className="text-right mb-6">
              <p className="text-[14px] font-[400] text-[#242424]">
                Ngày đặt hàng: 10:47 28/03/2025
              </p>
            </div>

            {/* Three Column Layout */}
            <div className="mt-8">
              <div className="grid grid-cols-3 gap-6">
                {/* Column 1 */}
                <div>
                  <h3 className="text-[15px] font-[400] uppercase text-[#242424] mb-4">Địa chỉ người nhận</h3>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 min-h-[200px]">
                    <div className="space-y-3">
                      <div className="text-[15px] font-[500] text-[#242424]">
                        VŨ ANH TÚ
                      </div>
                      <div className="text-[13px] font-[400] text-[#242424]">
                        <span className="font-medium">Địa chỉ:</span> số 17 Duy Tân, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội, Việt Nam
                      </div>
                      <div className="text-[13px] font-[400] text-[#242424]">
                        <span className="font-medium">Điện thoại:</span> 0942438693
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div>
                  <h3 className="text-[15px] font-[400] uppercase text-[#242424] mb-4">Hình thức giao hàng</h3>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 min-h-[200px]">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <img 
                          src="/orders/now.png" 
                          alt="Giao Siêu Tốc" 
                          className="w-8 h-5"
                        />
                        <span className="text-[15px] font-[500] text-[#242424]">Giao Siêu Tốc</span>
                      </div>
                      <div className="text-[13px] font-[400] text-[#242424]">
                        Giao thứ 6, trước 13h, 28/03
                      </div>
                      <div className="text-[13px] font-[400] text-[#242424]">
                        Được giao bởi TikiNOW Smart Logistics (giao từ<br />
                        Hà Nội)
                      </div>
                      <div className="text-[13px] font-[400] text-[#0B74E5] font-medium">
                        Miễn phí vận chuyển
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div>
                  <h3 className="text-[15px] font-[400] uppercase text-[#242424] mb-4">Hình thức thanh toán</h3>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 min-h-[200px]">
                    <div className="text-[15px] font-[500] text-[#242424]">
                      Thanh toán tiền mặt khi nhận hàng
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Table and Summary */}
            <div className="mt-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Table Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="grid grid-cols-10 gap-4 text-[15px] font-[400] text-[#787878]">
                    <div className="col-span-3">Sản phẩm</div>
                    <div className="text-center col-span-1">Giá</div>
                    <div className="text-center col-span-1">Số lượng</div>
                    <div className="text-center col-span-2">Giảm giá</div>
                    <div className="text-right col-span-3">Tạm tính</div>
                  </div>
                </div>

                {/* Products List */}
                <div className="px-6 py-4">
                  {/* Product Item 1 */}
                  <div className="grid grid-cols-10 gap-4 items-start py-4">
                    <div className="col-span-3 flex items-start space-x-3">
                      <img 
                        src="/orders/gpt.png" 
                        alt="Chat GPT Thực Chiến" 
                        className="w-[60px] h-[60px] object-cover rounded flex-shrink-0"
                      />
                      <div className="space-y-1 ml-4">
                        <div className="text-[14px] font-[500] text-[#242424]">Chat GPT Thực Chiến</div>
                        <div className="space-y-1">
                          <img 
                            src="/orders/30.png" 
                            alt="Tiki Trading" 
                            className="w-[114px] h-[20px] object-contain"
                          />
                          <div className="text-[12px] text-gray-500">
                            Cung cấp bởi <span className="text-[#0B74E5]">Tiki Trading</span>
                          </div>
                        </div>
                        <div className="text-[12px] text-gray-500">Sku: 9831074249227</div>
                        <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[12px] font-medium rounded-[8px] border border-blue-200">
                          Chat với nhà bán
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-[14px] text-[#242424] col-span-1">150.000đ</div>
                    <div className="text-center text-[14px] text-[#242424] col-span-1">1</div>
                    <div className="text-center text-[14px] text-[#242424] col-span-2">-0đ</div>
                    <div className="text-right text-[14px] font-[500] text-[#242424] col-span-3">150.000đ</div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className=" px-6 py-4 border-t border-gray-200">
                  <div className="flex justify-end">
                    <div className="grid grid-cols-2 gap-8 items-start">
                      {/* Column 1 - Labels */}
                      <div className="space-y-2 text-right">
                        <div className="text-[14px] text-[#787878]">Tạm tính:</div>
                        <div className="text-[14px] text-[#787878]">Phí vận chuyển:</div>
                        <div className="text-[14px] text-[#787878]">Giảm giá vận chuyển:</div>
                        <div className="text-[14px] font-[400] text-[#787878]">Tổng cộng:</div>                        
                      </div>
                      
                      {/* Column 2 - Values */}
                      <div className="space-y-2 text-right">
                        <div className="text-[14px] text-[#242424]">550.000đ</div>
                        <div className="text-[14px] font-[400] text-[#242424]">0đ</div>
                        <div className="text-[14px] text-[#242424]">-0đ</div>
                        <div className="text-[18px] text-[#FF3B27]">550.000đ</div>
                        <div className="mt-4">
                          <button className="px-6 py-2 bg-[#FDD835] text-[#4A4A4A] rounded hover:bg-red-50 transition-colors duration-200 text-[14px] font-medium">
                            Hủy đơn hàng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;