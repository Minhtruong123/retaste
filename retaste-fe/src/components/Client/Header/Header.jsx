import React, { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuActive(false);
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerTop}>
            <a href="#" className={styles.logo}>
              RE<span>TASTE</span>
            </a>

            <button
              className={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
            >
              ☰
            </button>

            <div className={styles.searchBar}>
              <input type="text" placeholder="Tìm kiếm món ăn, thức uống..." />
              <button>🔍</button>
            </div>

            <div className={styles.userActions}>
              <a href="#" className={styles.cartIcon}>
                🛒 <span className={styles.cartCount}>3</span>
              </a>
              <a href="#" className={styles.userIcon}>
                👤
              </a>
            </div>
          </div>
        </div>

        <div
          className={`${styles.navMenu} ${
            isMobileMenuActive ? styles.active : ""
          }`}
        >
          <div className={styles.container}>
            <ul className={styles.navList}>
              <li>
                <a href="#" onClick={handleNavLinkClick}>
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" onClick={handleNavLinkClick}>
                  Thực đơn
                </a>
              </li>
              <li>
                <a href="#" onClick={handleNavLinkClick}>
                  Món được gợi ý
                </a>
              </li>
              <li>
                <a href="#" onClick={handleNavLinkClick}>
                  Combo
                </a>
              </li>
              <li>
                <a href="#" onClick={handleNavLinkClick}>
                  Khuyến mãi
                </a>
              </li>
              <li>
                <a href="#" onClick={handleNavLinkClick}>
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" onClick={handleNavLinkClick}>
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
