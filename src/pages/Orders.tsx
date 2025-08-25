import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '@/services/orderService';
import { authStore } from '@/store/authStore';
import { formatVND } from '@/utils/money';
import { getPrimaryCover } from '@/utils/image';
import type { Order } from '@/types';

const Orders: React.FC = () => {
  const { user } = authStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await orderService.getOrders();
        setOrders(response.data);
      } catch (err: any) {
        setError(err?.message || 'Không thể tải danh sách đơn hàng');
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    try {
      await orderService.cancelOrder(orderId);
      // Refresh orders after cancellation
      const response = await orderService.getOrders();
      setOrders(response.data);
    } catch (err: any) {
      console.error('Failed to cancel order:', err);
      alert('Không thể hủy đơn hàng: ' + (err?.message || 'Lỗi không xác định'));
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'shipping':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'confirmed':
        return 'text-blue-600';
      case 'shipping':
        return 'text-purple-600';
      case 'delivered':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Đang tải danh sách đơn hàng...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Bạn chưa có đơn hàng nào</h2>
          <Link
            to="/books"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Mua sắm ngay
          </Link>
        </div>
      </div>
    );
  }

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
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                Đơn hàng của tôi
              </span>
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
                <p className="text-base font-semibold text-gray-900">
                  {user?.fullName || user?.email || 'Khách'}
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <img src="/orders/1.png" alt="Account Info" className="w-6 h-6 flex-shrink-0" />
                <span className="text-sm text-gray-700 leading-none">Thông tin tài khoản</span>
              </div>

              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <img src="/orders/2.png" alt="Notifications" className="w-6 h-6 flex-shrink-0" />
                <span className="text-sm text-gray-700 leading-none">Thông báo của tôi</span>
              </div>

              <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50 cursor-pointer transition-colors duration-200">
                <img src="/orders/3.png" alt="Order Management" className="w-6 h-6 flex-shrink-0" />
                <span className="text-sm text-blue-700 leading-none">Quản lý đơn hàng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Orders List (4/5 width) */}
        <div className="w-4/5">
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Đơn hàng #{order.id.slice(-8).toUpperCase()}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Ngày đặt hàng: {new Date(order.createdAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                    <div className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  {/* Three Column Layout */}
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    {/* Column 1 - Shipping Address */}
                    <div>
                      <h3 className="text-[15px] font-[400] uppercase text-[#242424] mb-4">
                        Địa chỉ người nhận
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
                        <div className="space-y-3">
                          <div className="text-[15px] font-[500] text-[#242424]">
                            {order.shippingAddress?.fullName || 'Không có thông tin'}
                          </div>
                          <div className="text-[13px] font-[400] text-[#242424]">
                            <span className="font-medium">Địa chỉ:</span>{' '}
                            {order.shippingAddress?.address || 'Không có thông tin'}
                          </div>
                          <div className="text-[13px] font-[400] text-[#242424]">
                            <span className="font-medium">Điện thoại:</span>{' '}
                            {order.shippingAddress?.phone || 'Không có thông tin'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Column 2 - Shipping Method */}
                    <div>
                      <h3 className="text-[15px] font-[400] uppercase text-[#242424] mb-4">
                        Hình thức giao hàng
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <img src="/orders/now.png" alt="Giao hàng" className="w-8 h-5" />
                            <span className="text-[15px] font-[500] text-[#242424]">
                              Giao hàng tiêu chuẩn
                            </span>
                          </div>
                          <div className="text-[13px] font-[400] text-[#242424]">
                            Dự kiến giao trong 2-5 ngày
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Column 3 - Payment Method */}
                    <div>
                      <h3 className="text-[15px] font-[400] uppercase text-[#242424] mb-4">
                        Hình thức thanh toán
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
                        <div className="text-[15px] font-[500] text-[#242424]">
                          {order.paymentMethod === 'cod'
                            ? 'Thanh toán tiền mặt khi nhận hàng'
                            : order.paymentMethod === 'card'
                              ? 'Thanh toán bằng thẻ'
                              : order.paymentMethod === 'bank_transfer'
                                ? 'Chuyển khoản ngân hàng'
                                : 'Không xác định'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products Table */}
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="px-6 py-4 border-b border-gray-200">
                      <div className="grid grid-cols-10 gap-4 text-[15px] font-[400] text-[#787878]">
                        <div className="col-span-3">Sản phẩm</div>
                        <div className="text-center col-span-1">Giá</div>
                        <div className="text-center col-span-1">Số lượng</div>
                        <div className="col-span-2">Giảm giá</div>
                        <div className="text-right col-span-3">Tạm tính</div>
                      </div>
                    </div>

                    {/* Products List */}
                    <div className="px-6 py-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-10 gap-4 items-start py-4">
                          <div className="col-span-3 flex items-start space-x-3">
                            <img
                              src={getPrimaryCover(item.book)}
                              alt={item.book.name}
                              className="w-[60px] h-[60px] object-cover rounded flex-shrink-0"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                  'https://via.placeholder.com/60x60?text=No+Image';
                              }}
                            />
                            <div className="space-y-1 ml-4">
                              <div className="text-[14px] font-[500] text-[#242424]">
                                {item.book.name}
                              </div>
                              <div className="text-[12px] text-gray-500">
                                Cung cấp bởi <span className="text-[#0B74E5]">Tiki Trading</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-center text-[14px] text-[#242424] col-span-1">
                            {formatVND(item.price)}
                          </div>
                          <div className="text-center text-[14px] text-[#242424] col-span-1">
                            {item.quantity}
                          </div>
                          <div className="text-center text-[14px] text-[#242424] col-span-2">
                            -0đ
                          </div>
                          <div className="text-right text-[14px] font-[500] text-[#242424] col-span-3">
                            {formatVND(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="px-6 py-4 border-t border-gray-200">
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
                            <div className="text-[14px] text-[#242424]">
                              {formatVND(order.totalAmount)}
                            </div>
                            <div className="text-[14px] font-[400] text-[#242424]">0đ</div>
                            <div className="text-[14px] text-[#242424]">-0đ</div>
                            <div className="text-[18px] text-[#FF3B27]">
                              {formatVND(order.totalAmount)}
                            </div>
                            {order.status === 'confirmed' && (
                              <div className="mt-4">
                                <button
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="px-6 py-2 bg-[#FDD835] text-[#4A4A4A] rounded hover:bg-red-50 transition-colors duration-200 text-[14px] font-medium"
                                >
                                  Hủy đơn hàng
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
