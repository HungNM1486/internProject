import React from 'react';
import styles from './Footer.module.css';

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
    <footer className={styles.footer}>
      {/* Hàng đầu - 5 cột */}
      <div className={styles.mainContent}>
        <div className={styles.footerContainer}>
          <div className={styles.gridContainer}>
            {/* Cột 1: Hỗ trợ khách hàng */}
            <div className={styles.column}>
              <h3 className={styles.sectionTitle}>Hỗ trợ khách hàng</h3>
              <div className={styles.hotlineInfo}>
                <div className={styles.hotline}>
                  <span className={styles.hotlineLabel}>Hotline: </span>
                  <span className={styles.hotlineNumber}>1900-6035</span>
                </div>
                <p className={styles.hotlineNote}>(1000 đ/phút, 8-21h kể cả T7, CN)</p>
              </div>
              <ul className={styles.linkList}>
                <li><a href="/faq" className={styles.footerLink}>Các câu hỏi thường gặp</a></li>
                <li><a href="/support-request" className={styles.footerLink}>Gửi yêu cầu hỗ trợ</a></li>
                <li><a href="/order-guide" className={styles.footerLink}>Hướng dẫn đặt hàng</a></li>
                <li><a href="/shipping-methods" className={styles.footerLink}>Phương thức vận chuyển</a></li>
                <li><a href="/inspection-policy" className={styles.footerLink}>Chính sách kiểm hàng</a></li>
                <li><a href="/return-policy" className={styles.footerLink}>Chính sách đổi trả</a></li>
                <li><a href="/installment-guide" className={styles.footerLink}>Hướng dẫn trả góp</a></li>
                <li><a href="/import-policy" className={styles.footerLink}>Chính sách hàng nhập khẩu</a></li>
                <li className={styles.footerLink}>Hỗ trợ khách hàng: <a href="mailto:hotro@tiki.vn">hotro@tiki.vn</a></li>
                <li className={styles.footerLink}>Báo lỗi bảo mật: <a href="mailto:security@tiki.vn">security@tiki.vn</a></li>
              </ul>
            </div>

            {/* Cột 2: Về Tiki */}
            <div className={styles.column}>
              <h3 className={styles.sectionTitle}>Về Tiki</h3>
              <ul className={styles.linkList}>
                <li><a href="/about" className={styles.footerLink}>Giới thiệu Tiki</a></li>
                <li><a href="/blog" className={styles.footerLink}>Tiki Blog</a></li>
                <li><a href="/careers" className={styles.footerLink}>Tuyển dụng</a></li>
                <li><a href="/payment-security" className={styles.footerLink}>Chính sách bảo mật thanh toán</a></li>
                <li><a href="/privacy-policy" className={styles.footerLink}>Chính sách bảo mật thông tin cá nhân</a></li>
                <li><a href="/complaint-policy" className={styles.footerLink}>Chính sách giải quyết khiếu nại</a></li>
                <li><a href="/terms" className={styles.footerLink}>Điều khoản sử dụng</a></li>
                <li><a href="/tiki-xu" className={styles.footerLink}>Giới thiệu Tiki Xu</a></li>
                <li><a href="/affiliate" className={styles.footerLink}>Tiếp thị liên kết cùng Tiki</a></li>
                <li><a href="/business-sales" className={styles.footerLink}>Bán hàng doanh nghiệp</a></li>
                <li><a href="/shipping-terms" className={styles.footerLink}>Điều kiện vận chuyển</a></li>
              </ul>
            </div>

            {/* Cột 3: Hợp tác và liên kết */}
            <div className={styles.column}>
              <h3 className={styles.sectionTitle}>Hợp tác và liên kết</h3>
              <ul className={styles.linkList}>
                <li><a href="/marketplace-regulations" className={styles.footerLink}>Quy chế hoạt động Sàn GDTMĐT</a></li>
                <li><a href="/sell-on-tiki" className={styles.footerLink}>Bán hàng cùng Tiki</a></li>
              </ul>
              
              <div className={styles.certifications}>
                <h4 className={styles.sectionTitle}>Chứng nhận bởi</h4>
                <div className={styles.certificationLogos}>
                  <img src="/footer/bo-cong-thuong-2.png" alt="Bộ Công Thương" className={styles.certificationImg} />
                  <img src="/footer/bo-cong-thuong.svg" alt="DMCA" className={styles.certificationImg} />
                  <img src="/footer/dmca_protected_sml_120y.png" alt="Norton Secured" className={styles.certificationImg} />
                </div>
              </div>
            </div>

            {/* Cột 4: Phương thức thanh toán và giao hàng */}
            <div className={styles.column}>
              <div className={styles.paymentSection}>
                <h3 className={styles.sectionTitle}>Phương thức thanh toán</h3>
                <div className={styles.paymentMethods}>
                  {paymentMethods.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.paymentRow}>
                      {row.map((method, methodIndex) => {
                        globalIndex++;
                        return (
                          <img
                            key={methodIndex}
                            src={`/footer/${globalIndex}.png`}
                            alt={method}
                            className={styles.paymentImg}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className={styles.sectionTitle}>Dịch vụ giao hàng</h3>
                <img src="/footer/tikinow.png" alt="Tiki Delivery" className={styles.shippingImg} />
              </div>
            </div>

            {/* Cột 5: Kết nối và ứng dụng */}
            <div className={styles.column}>
              <div className={styles.socialSection}>
                <h3 className={styles.sectionTitle}>Kết nối với chúng tôi</h3>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialLink}>
                    <img src={`/footer/fb.png`} alt="facebook" className={styles.socialIcon}/>
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <img src={`/footer/yt.png`} alt="youtube" className={styles.socialIcon}/>
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <img src={`/footer/zalo.png`} alt="zalo" className={styles.socialIcon}/>
                  </a>
                </div>
              </div>
              
              <div className={styles.appSection}>
                <h3 className={styles.sectionTitle}>Tải ứng dụng điện thoại</h3>
                <div className={styles.appDownload}>
                  <img src="/footer/qrcode.png" alt="QR Code" className={styles.qrCode} />
                  <div className={styles.appStores}>
                    <img src="/footer/appstore.png" alt="App Store" className={styles.storeImg} />
                    <img src="/footer/playstore.png" alt="Google Play" className={styles.storeImg} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hàng hai - Thông tin công ty */}
      <div className={styles.companyInfo}>
        <div className={styles.footerContainer}>
          <div className={styles.companyDetails}>
            <h4 className={styles.companyName}>Công ty TNHH TI KI</h4>
            <p className={styles.companyAddress}>Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh</p>
            <p className={styles.companyLicense}>Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.</p>
            <p className={styles.companyHotline}> Hotline: <a href="tel:19006035" className={styles.hotlineNumber}>1900 6035</a></p>          
          </div>
        </div>
      </div>

      {/* Hàng ba - Thương hiệu nổi bật */}
      <div className={styles.brandsSection}>
        <div className={styles.footerContainer}>
          <h3 className={styles.sectionTitle}>Thương Hiệu Nổi Bật</h3>
          <div className={styles.brandsList}>
            {brands.map((brand, index) => (
              <React.Fragment key={brand}>
                <a 
                  href={`https://tiki.vn/thuong-hieu/${brand}.html`}
                  className={styles.brandLink}
                >
                  {brand}
                </a>
                {index < brands.length - 1 && <span className={styles.brandSeparator}>/</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;