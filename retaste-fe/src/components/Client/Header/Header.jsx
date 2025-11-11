import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Kiểm tra thông tin người dùng từ localStorage khi component được mount
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuActive(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    setShowDropdown(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerTop}>
            <NavLink to="/" className={styles.logo}>
              RE<span>TASTE</span>
            </NavLink>

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

              {user ? (
                <div className={styles.userProfile}>
                  <div className={styles.userName} onClick={toggleDropdown}>
                    {user.name}
                  </div>
                  {showDropdown && (
                    <div className={styles.dropdown}>
                      <NavLink
                        to="/profile"
                        className={styles.dropdownItem}
                        onClick={() => setShowDropdown(false)}
                      >
                        Thông tin cá nhân
                      </NavLink>
                      <NavLink
                        to="/orders"
                        className={styles.dropdownItem}
                        onClick={() => setShowDropdown(false)}
                      >
                        Đơn hàng của tôi
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className={styles.dropdownItem}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to="/auth" className={styles.userIcon}>
                  👤
                </NavLink>
              )}
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
                <NavLink to="/" onClick={handleNavLinkClick}>
                  Trang chủ
                </NavLink>
              </li>
              <li>
                <NavLink to="/menu" onClick={handleNavLinkClick}>
                  Thực đơn
                </NavLink>
              </li>
              <li>
                <NavLink to="/suggest" onClick={handleNavLinkClick}>
                  Món được gợi ý
                </NavLink>
              </li>
              <li>
                <NavLink to="/combo" onClick={handleNavLinkClick}>
                  Combo
                </NavLink>
              </li>
              <li>
                <NavLink to="/promotion" onClick={handleNavLinkClick}>
                  Khuyến mãi
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={handleNavLinkClick}>
                  Về chúng tôi
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={handleNavLinkClick}>
                  Liên hệ
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
