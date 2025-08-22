import React from 'react';

const Footer: React.FC = () => {
  const brands = [
    'vascara', 'dior', 'esteelauder', 'th-truemilk', 'barbie', 'owen', 'ensure', 'durex', 
    'bioderma', 'elly', 'milo', 'skechers', 'aldo', 'triumph', 'nutifood', 'kindle', 
    'nerman', 'wacom', 'anessa', 'yoosee', 'olay', 'similac', 'comfort', 'bitas', 
    'shiseido', 'langfarm', 'hukan', 'vichy', 'fila', 'tsubaki'
  ];

  const paymentMethods = [
    // Row 1
    ['visa', 'mastercard', 'jcb', 'amex', 'cod'],
    // Row 2
    ['vnpay', 'momo', 'zalopay', 'airpay', 'fundiin'],
    // Row 3
    ['kredivo']
  ];

  let globalIndex = 0;

  return (
    <footer className="bg-white border-t border-gray-200 font-[Inter,Arial,sans-serif]">
      {/* Hàng đầu - 5 cột */}
      <div className="py-8 px-8">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Cột 1: Hỗ trợ khách hàng */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-base tracking-wide text-[#38383d]">Hỗ trợ khách hàng</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-[#808089]">Hotline: </span>
                  <span className="text-[#0B74E5] hover:underline">1900-6035</span>
                </div>
                <p className="text-xs text-gray-500 m-0">(1000 đ/phút, 8-21h kể cả T7, CN)</p>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 list-none p-0 m-0">
                <li><a href="/faq" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Các câu hỏi thường gặp</a></li>
                <li><a href="/support-request" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Gửi yêu cầu hỗ trợ</a></li>
                <li><a href="/order-guide" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Hướng dẫn đặt hàng</a></li>
                <li><a href="/shipping-methods" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Phương thức vận chuyển</a></li>
                <li><a href="/inspection-policy" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Chính sách kiểm hàng</a></li>
                <li><a href="/return-policy" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Chính sách đổi trả</a></li>
                <li><a href="/installment-guide" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Hướng dẫn trả góp</a></li>
                <li><a href="/import-policy" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Chính sách hàng nhập khẩu</a></li>
                <li className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Hỗ trợ khách hàng: <a href="mailto:hotro@tiki.vn">hotro@tiki.vn</a></li>
                <li className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Báo lỗi bảo mật: <a href="mailto:security@tiki.vn">security@tiki.vn</a></li>
              </ul>
            </div>

            {/* Cột 2: Về Tiki */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-base tracking-wide text-[#38383d]">Về Tiki</h3>
              <ul className="space-y-2 text-sm text-gray-600 list-none p-0 m-0">
                <li><a href="/about" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Giới thiệu Tiki</a></li>
                <li><a href="/blog" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Tiki Blog</a></li>
                <li><a href="/careers" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Tuyển dụng</a></li>
                <li><a href="/payment-security" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Chính sách bảo mật thanh toán</a></li>
                <li><a href="/privacy-policy" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Chính sách bảo mật thông tin cá nhân</a></li>
                <li><a href="/complaint-policy" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Chính sách giải quyết khiếu nại</a></li>
                <li><a href="/terms" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Điều khoản sử dụng</a></li>
                <li><a href="/tiki-xu" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Giới thiệu Tiki Xu</a></li>
                <li><a href="/affiliate" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Tiếp thị liên kết cùng Tiki</a></li>
                <li><a href="/business-sales" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Bán hàng doanh nghiệp</a></li>
                <li><a href="/shipping-terms" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Điều kiện vận chuyển</a></li>
              </ul>
            </div>

            {/* Cột 3: Hợp tác và liên kết */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-base tracking-wide text-[#38383d]">Hợp tác và liên kết</h3>
              <ul className="space-y-2 text-sm text-gray-600 list-none p-0 m-0">
                <li><a href="/marketplace-regulations" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Quy chế hoạt động Sàn GDTMĐT</a></li>
                <li><a href="/sell-on-tiki" className="text-sm text-[#808089] transition-colors duration-300 no-underline hover:underline">Bán hàng cùng Tiki</a></li>
              </ul>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 text-base tracking-wide text-[#38383d]">Chứng nhận bởi</h4>
                <div className="flex space-x-2">
                  <img src="/footer/bo-cong-thuong-2.png" alt="Bộ Công Thương" className="h-10 w-auto rounded" />
                  <img src="/footer/bo-cong-thuong.svg" alt="DMCA" className="h-10 w-auto rounded" />
                  <img src="/footer/dmca_protected_sml_120y.png" alt="Norton Secured" className="h-10 w-auto rounded" />
                </div>
              </div>
            </div>

            {/* Cột 4: Phương thức thanh toán và giao hàng */}
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 text-base tracking-wide text-[#38383d]">Phương thức thanh toán</h3>
                <div className="space-y-2 py-4">
                  {paymentMethods.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex space-x-1">
                      {row.map((method, methodIndex) => {
                        globalIndex++;
                        return (
                          <img
                            key={methodIndex}
                            src={`/footer/${globalIndex}.png`}
                            alt={method}
                            className="w-[40px] h-[25px] object-contain rounded"
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 text-base tracking-wide text-[#38383d]">Dịch vụ giao hàng</h3>
                <img src="/footer/tikinow.png" alt="Tiki Delivery" className="h-[33px] w-auto rounded block m-0" />
              </div>
            </div>

            {/* Cột 5: Kết nối và ứng dụng */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-base tracking-wide text-[#38383d]">Kết nối với chúng tôi</h3>
                <div className="flex space-x-3">
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                    <img src={`/footer/fb.png`} alt="facebook" className="w-8 h-8"/>
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                    <img src={`/footer/yt.png`} alt="youtube" className="w-8 h-8"/>
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                    <img src={`/footer/zalo.png`} alt="zalo" className="w-8 h-8"/>
                  </a>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-base tracking-wide text-[#38383d]">Tải ứng dụng điện thoại</h3>
                <div className="flex space-x-3">
                  <img src="/footer/qrcode.png" alt="QR Code" className="h-[80px] w-auto border border-gray-200 rounded" />
                  <div className="flex flex-col space-y-2">
                    <img src="/footer/appstore.png" alt="App Store" className="h-8 w-auto h-[36px] w-auto" />
                    <img src="/footer/playstore.png" alt="Google Play" className="h-8 w-auto h-[36px] w-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hàng hai - Thông tin công ty */}
      <div className="bg-gray-50 border-t border-gray-200 py-6 px-8">
        <div className="container-custom">
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm m-0">Công ty TNHH TI KI</h4>
            <p className="text-gray-600 text-sm m-0 leading-relaxed">Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh</p>
            <p className="text-gray-600 text-sm m-0 leading-relaxed">Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.</p>
            <p className="text-gray-600 text-sm m-0 leading-relaxed"> Hotline: <a href="tel:19006035" className="text-[#0B74E5] hover:underline">1900 6035</a></p>          
          </div>
        </div>
      </div>

      {/* Hàng ba - Thương hiệu nổi bật */}
      <div className="bg-white border-t border-gray-200 py-6 px-8">
        <div className="container-custom">
          <h3 className="font-semibold text-gray-900 text-base tracking-wide text-[#38383d]">Thương Hiệu Nổi Bật</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {brands.map((brand, index) => (
              <React.Fragment key={brand}>
                <a 
                  href={`https://tiki.vn/thuong-hieu/${brand}.html`}
                  className="text-gray-600 text-sm hover:text-blue-600 transition-colors duration-300 no-underline"
                >
                  {brand}
                </a>
                {index < brands.length - 1 && <span className="text-gray-400 select-none">/</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;