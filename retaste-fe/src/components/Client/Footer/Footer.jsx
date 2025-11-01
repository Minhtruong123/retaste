import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContainer}>
            <div className={styles.footerSection}>
              <a href="#" className={styles.footerLogo}>
                RE<span>TASTE</span>
              </a>
              <p>
                RETASTE - Khám phá hương vị yêu thích của bạn với công nghệ gợi
                ý thông minh.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialIcon}>
                  📘
                </a>
                <a href="#" className={styles.socialIcon}>
                  🐦
                </a>
                <a href="#" className={styles.socialIcon}>
                  📸
                </a>
                <a href="#" className={styles.socialIcon}>
                  📹
                </a>
              </div>
            </div>
            <div className={styles.footerSection}>
              <h3>Thông tin</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#">Về chúng tôi</a>
                </li>
                <li>
                  <a href="#">Điều khoản dịch vụ</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo mật</a>
                </li>
                <li>
                  <a href="#">Chính sách giao hàng</a>
                </li>
                <li>
                  <a href="#">Câu hỏi thường gặp</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>Danh mục</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#">Món mới</a>
                </li>
                <li>
                  <a href="#">Bán chạy nhất</a>
                </li>
                <li>
                  <a href="#">Khuyến mãi</a>
                </li>
                <li>
                  <a href="#">Combo tiết kiệm</a>
                </li>
                <li>
                  <a href="#">Tất cả sản phẩm</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>Liên hệ</h3>
              <ul className={styles.footerLinks}>
                <li>📍 123 Đường ABC, Quận XYZ, TP.HCM</li>
                <li>📞 1900-1234</li>
                <li>✉️ support@retaste.vn</li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>Đăng ký nhận tin</h3>
              <p>Nhận thông tin về ưu đãi và món mới</p>
              <form className={styles.subscribeForm}>
                <input type="email" placeholder="Email của bạn" />
                <button type="submit">Đăng ký</button>
              </form>
            </div>
          </div>
          <div className={styles.copyright}>
            <p>&copy; 2025 RETASTE. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
