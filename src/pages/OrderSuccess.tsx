import React from "react";

const OrderSuccess = () => {

  return (
    <div className="bg-white min-h-screen font-display flex flex-col">
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
            </div>
        </div>

        {/* 3. Main Section */}
        <div className="flex flex-col md:flex-row bg-[#F5F5FA] p-6 gap-4 flex-grow">
            <div className="mx-auto flex flex-col md:flex-row gap-4">
                {/* Cụm trái */}
                <div className="relative bg-[#FFFFFF] rounded-lg w-[742px] h-[521px] flex flex-col space-y-4">
                    {/* Thanh trên cùng */}
                    <div className="relative w-[742px] h-[112px] bg-gradient-to-r from-[#6cbdfc] to-[#007bff]">
                        <img
                        src="/payment/5.png"
                        alt="Pháo hoa"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        />
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white w-fit">
                        <p className="font-display text-[24px] font-[500] leading-[32px]">
                            Yay, đặt hàng thành công!
                        </p>
                        <p className="font-display text-[18px] font-[500] leading-[24px]">
                            Chuẩn bị tiền mặt 110.000₫
                        </p>
                        </div>
                    </div>

                    {/* Robot */}
                    <img
                        src="/payment/robot.png"
                        alt="Robot"
                        className="absolute w-[150px] h-[150px] bottom-[330px] left-[10%]"
                    />

                    {/* Khung nội dung thanh toán */}
                    <div className="ml-[35%] mt-[20px] mr-6 bg-white">
                        {/* Hàng 1 */}
                        <div className="flex justify-between items-center py-4">
                        <span className="text-[14px] text-[#808089] font-[400]">Phương thức thanh toán</span>
                        <span className="text-[14px] text-[#38383D] font-[400]">Thanh toán tiền mặt</span>
                        </div>

                        {/* Hàng 2 */}
                        <hr className="border-t border-gray-300" />
                        <div className="flex justify-between items-center py-3">
                        <span className="text-[14px] text-[#808089] font-[400]">Tổng cộng</span>
                        <span className="text-[18px] text-[#38383D] font-[500]">110.000₫</span>
                        </div>

                        {/* Hàng 3 */}
                        <div className="flex justify-end pb-3">
                        <span className="text-[12px] text-gray-500">(Đã bao gồm VAT nếu có)</span>
                        </div>

                        {/* Nút quay lại trang chủ */}
                        <div className="mt-auto">
                            <button className="w-full h-[44px] border border-blue-500 text-[#0B74E5] rounded-lg py-2 text-[16px] font-[500] hover:bg-blue-50 transition">
                                Quay trở lại trang chủ
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cụm phải */}
                <div className="bg-[#FFFFFF] rounded-lg w-[318px] h-[165px] flex flex-col">
                    {/* Phần trên */}
                    <div className="flex items-center justify-between px-4 py-2">
                        <span className="text-[#38383D] font-[700] text-[14px]">
                        Mã đơn hàng: 861977987
                        </span>
                        <a href="#" className="text-[14px] font-[500] text-[#0B74E5] hover:underline">
                        Xem đơn hàng
                        </a>
                    </div>
                    <div className="border-t border-gray-200"></div>

                    {/* Phần dưới */}
                    <div className="px-4 py-3 flex flex-col gap-2">
                        {/* Hàng trên */}
                        <span className="text-[14px] text-[#38383D] font-[400]">
                        Giao thứ 6, trước 13h, 28/03
                        </span>
                        {/* Hàng dưới */}
                        <div className="flex items-center gap-2">
                        <img
                            src="/payment/gpt.png"
                            alt="GPT"
                            className="w-12 h-12 object-contain"
                        />
                        <span className="text-[14px] font-[400] text-[#808089]">
                            Chat GPT Thực Chiến
                        </span>
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

export default OrderSuccess;