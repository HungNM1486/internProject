import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      {/* Main footer content */}
      <div className={styles.mainContent}>
        <div className={styles.grid}>
          {/* Company info */}
          <div className={styles.companySection}>
            <div className={styles.companyLogo}>
              <div className={styles.companyLogoIcon}>
                <span className="text-white font-bold">📖</span>
              </div>
              <span className={styles.companyLogoText}>BookStore</span>
            </div>
            <p className={styles.companyDescription}>
              Cửa hàng sách trực tuyến hàng đầu Việt Nam, mang đến cho bạn những cuốn sách hay nhất với giá cả hợp lý.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink}>
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink}>
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.219.085.339-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.754-1.378 0 0-.603 2.290-.751 2.853-.271 1.056-1.009 2.378-1.495 3.182C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017z.001"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className={styles.sectionTitle}>Liên kết nhanh</h3>
            <ul className={styles.linkList}>
              <li><Link to="/about" className={styles.footerLink}>Giới thiệu</Link></li>
              <li><Link to="/contact" className={styles.footerLink}>Liên hệ</Link></li>
              <li><Link to="/shipping" className={styles.footerLink}>Chính sách giao hàng</Link></li>
              <li><Link to="/return" className={styles.footerLink}>Chính sách đổi trả</Link></li>
              <li><Link to="/privacy" className={styles.footerLink}>Chính sách bảo mật</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className={styles.sectionTitle}>Danh mục</h3>
            <ul className={styles.linkList}>
              <li><Link to="/category/van-hoc" className={styles.footerLink}>Văn học</Link></li>
              <li><Link to="/category/kinh-te" className={styles.footerLink}>Kinh tế</Link></li>
              <li><Link to="/category/khoa-hoc" className={styles.footerLink}>Khoa học</Link></li>
              <li><Link to="/category/giao-duc" className={styles.footerLink}>Giáo dục</Link></li>
              <li><Link to="/category/thieu-nhi" className={styles.footerLink}>Thiếu nhi</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className={styles.sectionTitle}>Thông tin liên hệ</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
              </div>
              <div className={styles.contactItemCenter}>
                <svg className={styles.contactIconCenter} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>0123 456 789</span>
              </div>
              <div className={styles.contactItemCenter}>
                <svg className={styles.contactIconCenter} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>contact@bookstore.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <div className={styles.copyrightContent}>
          <div className={styles.copyrightFlex}>
            <p>&copy; 2024 BookStore. Tất cả quyền được bảo lưu.</p>
            <div className={styles.copyrightLinks}>
              <Link to="/terms" className={styles.copyrightLink}>Điều khoản sử dụng</Link>
              <Link to="/privacy" className={styles.copyrightLink}>Bảo mật</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;