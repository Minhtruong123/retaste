import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import * as authService from "../../../service/auth_service";

export default function Header() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
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

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setShowDropdown(false);
    }
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
                    <span className={styles.userIcon}>👤</span>
                    {user.fullName}
                    <span className={styles.arrowIcon}></span>
                  </div>
                  {showDropdown && (
                    <div className={styles.dropdown}>
                      <div className={styles.dropdownHeader}>
                        <span className={styles.userAvatarLarge}>👤</span>
                        <div className={styles.userInfo}>
                          <div className={styles.userFullName}>
                            {user.fullName}
                          </div>
                          <div className={styles.userEmail}>
                            {user.email || "Chưa có email"}
                          </div>
                        </div>
                      </div>
                      <div className={styles.dropdownDivider}></div>
                      <NavLink
                        to="/profile"
                        className={styles.dropdownItem}
                        onClick={() => setShowDropdown(false)}
                      >
                        <span className={styles.itemIcon}>👤</span>
                        Thông tin cá nhân
                      </NavLink>
                      <div className={styles.dropdownDivider}></div>
                      <button
                        onClick={handleLogout}
                        className={styles.dropdownItem}
                      >
                        <span className={styles.itemIcon}>🚪</span>
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to="/auth" className={styles.authButton}>
                  <span className={styles.userIcon}>👤</span>
                  Đăng nhập
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
