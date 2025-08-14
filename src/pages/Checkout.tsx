import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartItem } from "@/types";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Lấy dữ liệu từ state, nếu không có thì về giỏ hàng
  const items: CartItem[] = state?.items || [];
  const total = state?.total || 0;

  // Tính toán tổng tiền thanh toán và số tiền tiết kiệm
  const shippingFee = 25000;
  const directDiscount = 59000;
  const shippingDiscount = 25000;   
  const savings = directDiscount + shippingDiscount;
  const payable = Math.max(0, total + shippingFee - savings);

  React.useEffect(() => {
    if (!state || !items.length) {
      navigate("/cart");
    }
  }, [state, items, navigate]);

  return (
    <div className="bg-white min-h-screen font-display">
      {/* 1. Link Section */}
      <div className="h-[42px] flex items-center justify-center bg-[#effff4] text-[#00ab56]">
        <p className="font-display font-[600] text-[12px] leading-[18px] text-center align-middle">
          Freeship đơn từ 45k, giảm nhiều hơn cùng
        </p>
        <img
          src="/payment/1.png"
          alt="Payment Partner Logo"
          className="w-[79px] h-[16px] ml-0.5"
        />
      </div>

      {/* 2. Header Section */}
      <div className="mx-auto w-11/12 md:w-4.5/5">
        <div className="w-full h-[100px] flex items-center bg-white px-4">
          <img
            src="/payment/tiki.png"
            alt="Tiki Logo"
            className="w-[72px] h-[72px]"
          />
          <div className="w-[1px] h-[32px] bg-[#1A94FF] mx-4"></div>
          <h1 className="font-display font-normal text-2xl leading-[32px] text-[#1AA7FF]">
            Thanh toán
          </h1>
        </div>
      </div>

      {/* 3. Main Section */}
      <div className="flex flex-col md:flex-row bg-[#F5F5FA] p-4 gap-4">
        <div className="mx-auto w-11/12 md:w-4.5/5 flex flex-col md:flex-row gap-4">
          {/* Cụm trái */}
          <div className="w-full md:w-5/6 flex flex-col space-y-4">
            {/* Chọn hình thức giao hàng */}
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-[18px] font-display font-bold text-[#38383d] mb-4">
                Chọn hình thức giao hàng
              </h2>

              {/* Khung lựa chọn */}
              <div className="w-[497px] h-auto bg-[#F0F8FF] border border-[#C2E1FF] rounded-lg p-4 flex flex-col justify-between">
                <label className="flex items-center space-x-2 cursor-pointer pb-2">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    className="w-4 h-4 text-[#1A94FF] border-[#1A94FF] focus:ring-[#1A94FF]"
                  />
                  <img
                    src="/payment/now.png"
                    alt="Icon giao hàng"
                    className="w-[32px] h-[16px]"
                  />
                  <span className="font-display text-[14px] font-normal text-[#38383d] flex items-center gap-2">
                    Giao hàng siêu tốc
                    <span className="bg-white h-[20px] rounded-md px-2 py-0.5 text-[#00AB56] text-[12px] font-[500]">
                      -25k
                    </span>
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="economy"
                    className="w-4 h-4 text-[#1A94FF] border-[#1A94FF] focus:ring-[#1A94FF]"
                  />
                  <span className="font-display text-[14px] font-normal text-[#38383d] flex items-center gap-2">
                    Giao hàng tiết kiệm
                    <span className="bg-white h-[20px] rounded-md px-2 py-0.5 text-[#00AB56] text-[12px] font-[500]">
                      -16k
                    </span>
                  </span>
                </label>
              </div>

              {/* Khung sản phẩm */}
              <div className="relative border border-[#DDDDE3] rounded-md p-4 mt-6">
                <div className="absolute -top-[12px] left-4 bg-white px-2 text-[14px] font-display text-[#079449]">
                  Gói: Giao siêu tốc 2h, trước 13h hôm nay
                </div>

                {/* Hàng chứa bên trái và bên phải */}
                  <label className="flex items-center w-full mb-3">
                    {/* Bên trái */}
                    <div className="flex items-center gap-2">
                      <img
                        src="/payment/now.png"
                        alt="Icon giao hàng"
                        className="w-[32px] h-[16px]"
                      />
                        <span className="font-display text-[12px] font-normal text-[#38383d] uppercase">
                          Giao hàng siêu tốc
                        </span>
                    </div>

                    {/* Bên phải */}
                    <div className="flex items-center space-x-2 ml-[300px]">
                      <span className="text-[12px] font-[500] text-[#808089] line-through">
                        25.000 ₫
                      </span>
                      <span className="text-[14px] font-bold text-[#00AB56] uppercase">
                        MIỄN PHÍ
                      </span>
                      <img
                        src="/payment/noti.png"
                        alt="Thông báo"
                        className="w-[14px] h-[14px] object-contain relative bottom-[1.5px]"
                      />
                    </div>
                  </label>



                {/* Render sản phẩm */}
                {items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 mb-4">
                    <img
                      src={item.book?.images?.[0]?.base_url || "/images/product.png"}
                      alt={item.book?.name || "Sản phẩm"}
                      className="w-[60px] h-[60px] object-cover rounded"
                    />
                    <div>
                      <p className="font-display text-[14px] text-[#38383d]">
                        {item.book?.name || "Tên sản phẩm"}
                      </p>
                      <p className="text-[13px] text-gray-500">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Khoảng cách 10px và đường kẻ ngang */}
              <div className="mt-[10px] border-t border-[#DDDDE3] pt-3">
                <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src="/payment/svg.png"
                  alt="Icon"
                  className="w-5 h-5 object-contain relative bottom-[1.5px]"
                />
                  <span className="text-[14px] font-inter text-[#38383d]">
                    Thêm mã khuyến mãi của Shop
                  </span>
                  {/* Mũi tên SVG sang phải */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-[#808089]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Chọn hình thức thanh toán */}
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-[18px] font-display font-bold text-[#38383d] mb-4">
                Chọn hình thức thanh toán
              </h2>
              {/* hình thức thanh toán */}
              <div>
                <label className="flex items-center space-x-2 cursor-pointer pb-4">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    className="w-4 h-4 text-[#1A94FF] border-[#1A94FF] focus:ring-[#1A94FF]"
                  />
                  <img
                    src="/payment/3.png"
                    alt="Icon giao hàng"
                    className="w-[32px] h-[32px]"
                  />
                  <span className="font-display text-[14px] font-[400] text-[#38383d] flex items-center gap-2">
                    Thanh toàn tiền mặt
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer pb-4">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    className="w-4 h-4 text-[#1A94FF] border-[#1A94FF] focus:ring-[#1A94FF]"
                  />
                  <img
                    src="/payment/4.png"
                    alt="Icon giao hàng"
                    className="w-[32px] h-[32px]"
                  />
                  <span className="font-display text-[14px] font-[400] text-[#38383d] flex items-center gap-2">
                    Viettel Money
                  </span>
                </label>
              </div>

              {/* Ưu đãi */}
              <div className="mt-6 bg-[#F5F5FA] w-[740px] h-auto">
                <div className="p-4">
                  {/* Tiêu đề */}
                  <h3 className="flex items-center text-[13px] font-display font-medium text-[#0D5CB6] mb-3">
                    <img
                      src="/payment/promo.png"
                      alt="Promo"
                      className="w-[20px] h-[20px] mr-2"
                    />
                    Ưu đãi thanh toán thẻ
                  </h3>

                  {/* Khung danh sách mã ưu đãi */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Lặp 4 hàng x 3 cột => 12 item */}
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                        key={i}
                        className="bg-[#ffffff] rounded-[4px] p-[6px] flex flex-col justify-between h-[87px] w-[228px] shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                        >        
                          {/* Hàng 1 */}
                          <div className="flex justify-between items-center">
                            <span className="text-[14px] font-medium text-[#0D5CB6]">
                              Freeship
                            </span>
                            <img
                              src="/payment/shinhan.png"
                              alt="Shinhan"
                              className="w-[80px] h-[14px]"
                            />
                          </div>

                          {/* Hàng 2 */}
                          <div className="flex justify-between items-center">
                            <span className="text-[13px] font-normal text-[#787878]">
                              Thẻ Shinhan Platinum
                            </span>
                            <img
                              src="/payment/noti.png"
                              alt="Thông báo"
                              className="w-[20px] h-[20px]"
                            />
                          </div>

                          {/* Hàng 3 */}
                          <span className="text-[11px] italic font-normal text-[#FD820A]">
                            Không giới hạn
                          </span>
                        </div>
                      ))}
                    
                  </div>
                </div>
              </div>   
            </div>
          </div>

          {/* Cụm phải */}
          <div className="w-full md:w-1/3 flex flex-col space-y-4">
            {/* Cụm 1: Thông tin giao hàng */}
            <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-[16px] font-[400] text-[#808089]">Giao tới</h2>
                <a href="#" className="font-[400] text-[#0B74E5] hover:underline text-[14px]">
                  Thay đổi
                </a>
              </div>
                  <div className="font-[600] text-[14px] text-[#38383D]">
                   <div className="flex items-center space-x-2 mb-2">
                     <span>Nguyễn Văn A</span>
                     <div className="w-[1px] h-[14px] bg-[#EBEBF0]"></div>
                     <span>0987654321</span>
                   </div>
                                        <div className="flex items-center space-x-2">
                       <span className="bg-[#FFF5EB] text-[#FC820A] px-2 py-1 rounded-full text-[12px] font-medium whitespace-nowrap">
                         văn phòng
                       </span>
                       <p className="whitespace-nowrap text-[14px] text-[#808089] font-[400]">số 17 Duy Tân, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội</p>
                     </div>
                 </div>
            </div>

            {/* Cụm 2: Tiki Khuyến Mãi */}
            <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <h2 className="text-[13px] font-[500] text-[#242424] mr-2">
                    Tiki Khuyến Mãi
                  </h2>
                </div>
                {/* Đã gộp "Có thể chọn 2" và ảnh noti.png vào cùng một div */}
                <div className="flex items-center">
                  <span className="text-[13px] font-[400] text-[#787878] mr-2">
                    Có thể chọn 2
                  </span>
                  <img
                    src="/payment/noti.png"
                    alt="Thông báo"
                    className="w-[18px] h-[18px]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#E5F2FF] border border-[#0A68FF] rounded-lg p-3 cursor-pointer hover:shadow-sm transition">
                <div className="flex items-center">
                  <div className="w-[40px] h-[40px] rounded-md bg-white flex items-center justify-center">
                    <img
                      src="/payment/ship.jpg"
                      alt="TIKI"
                      className="w-[44px] h-[44px] object-contain rounded-[12px]"
                    />
                  </div>
                  <div className="h-[40px] border-r border-dashed border-[#242424] mx-3"></div>
                    <div className="flex items-center gap-2 max-w-[220px]">
                      <span className="text-[13px] font-[500] text-[#242424] truncate">
                        Giảm 25k
                      </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/payment/notiblue.png"
                    alt="Thông báo"
                    className="w-[16px] h-[16px]"
                  />
                  <button className="px-3 py-1 rounded-md text-white bg-[#017FFF] text-[13px] font-medium">
                    Bỏ Chọn
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer pt-4">
                <img
                  src="/payment/svg.png"
                  alt="Icon"
                  className="w-5 h-5 object-contain relative bottom-[1.5px]"
                />
                  <span className="text-[14px] font-inter text-[#0A68FF]">
                    Chọn hoặc nhập mã khác
                  </span>
                  {/* Mũi tên SVG sang phải */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-[#0A68FF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
            </div>

            {/* Cụm 3: Đơn hàng */}
            <div className="bg-white p-6 rounded-lg">
                <div className="mb-2">
                  <h2 className="text-[#38383D] text-[16px] font-[500] mb-2">Đơn hàng</h2>
                  <div className="flex items-center space-x-2 text-[14px] text-[#787878]">
                    <span>{items.length} sản phẩm.</span>
                    <a href="#" className="text-[#0B74E5] hover:underline">
                      Xem thông tin
                    </a>
                  </div>
                </div>
                <hr className="my-4 border-t border-[#EBEBF0]" />
                {/* Phần thông tin đơn hàng */}
                <div className="space-y-3 text-[14px]">
                  {/* Tổng tiền hàng */}
                  <div className="flex justify-between">
                    <span className="text-[#808089]">Tổng tiền hàng</span>
                    <span className="text-[#27272A]">{total?.toLocaleString("vi-VN")}₫</span>
                  </div>
                  
                  {/* Phí vận chuyển */}
                  <div className="flex justify-between">
                    <span className="text-[#808089]">Phí vận chuyển</span>
                    <span className="text-[#27272A]">25.000₫</span>
                  </div>
                  
                  {/* Giảm giá trực tiếp */}
                  <div className="flex justify-between">
                    <span className="text-[#808089]">Giảm giá trực tiếp</span>
                    <span className="text-[#00AB56]">-59.000₫</span>
                  </div>
                  
                  {/* Giảm giá vận chuyển*/}
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-[#808089]">Giảm giá vận chuyển</span>
                      <img
                        src="/payment/noti.png"
                        alt="Thông báo"
                        className="w-[14px] h-[14px] object-contain"
                      />
                    </div>
                    <span className="text-[#00AB56]">-25.000₫</span>
                  </div>
                  <hr className="my-4 border-t border-gray-200" />

                  <div className="flex flex-col items-start">
                    <div className="flex w-full justify-between items-baseline">
                      <span className="text-[#27272A] font-[500] text-[14px]">Tổng tiền thanh toán</span>
                      <span className="text-[20px] font-[600] text-[#FF424E] text-right">
                        {payable.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                    <div className="mt-1 w-full flex justify-end">
                      <span className="text-[#00AB56] text-[14px] font-[400]">
                        Tiết kiệm {savings.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                  </div>
                  <div className="text-[12px] text-[#808089] mt-1 text-right w-full">
                    (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                  </div>
                  {/* Nút đặt hàng */}
                  <button className="w-full bg-[#FF424E] text-[#FFFFFF] py-3 mt-4 rounded-md font-semibold hover:bg-[#0B74E5] transition-colors">
                    Đặt hàng
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Footer */}
      <div className="bg-[#EBEBF0] h-[160px] flex flex-col justify-center px-4 md:px-4">
        <div className="mx-auto w-11/12 md:w-4.5/5">
          <p className="font-inter font-normal text-[11px] text-[#808089] mb-2">
            Bằng việc tiến hành Đặt Mua, bạn đồng ý với các Điều kiện Giao dịch
            chung:
          </p>
          <div className="flex flex-wrap items-center text-[11px] font-inter font-normal text-black mb-2">
            {[
              "Quy chế hoạt động",
              "Chính sách giải quyết khiếu nại",
              "Chính sách bảo hành",
              "Chính sách bảo mật thanh toán",
              "Chính sách bảo mật thông tin",
            ].map((item, index, arr) => (
              <React.Fragment key={index}>
                <span>{item}</span>
                {index < arr.length - 1 && (
                  <span className="mx-2 text-[#DDDDE3]">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="font-inter font-normal text-[11px] text-[#808089]">
            © 2019 - Bản quyền của Công Ty Cổ Phần Ti Ki - Tiki.vn
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
