import React from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <h2>
            RE<span>TASTE</span> Admin
          </h2>
          <button className={styles.sidebarToggle}>✖</button>
        </div>

        <div className={styles.sidebarUser}>
          <img
            src="https://randomuser.me/api/portraits/men/85.jpg"
            alt="Admin"
            className={styles.userAvatar}
          />
          <div className={styles.userName}>Nguyễn Văn Quản Lý</div>
          <div className={styles.userRole}>Quản lý cấp cao</div>
        </div>

        <div className={styles.sidebarMenu}>
          <div className={styles.menuHeading}>Tổng quan</div>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="#" className={`${styles.menuLink} ${styles.active}`}>
                <span className={styles.menuIcon}>📊</span>
                <span>Bảng điều khiển</span>
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>📈</span>
                <span>Quản lý doanh thu</span>
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>📝</span>
                <span>Quản lý đơn hàng</span>
                <span className={styles.menuBadge}>15</span>
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>🚚</span>
                <span>Quản lý giao hàng</span>
                <span className={styles.menuBadge}>8</span>
              </a>
            </li>
          </ul>

          <div className={styles.menuHeading}>Quản lý nội bộ</div>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>👥</span>
                <span>Quản lý nhân viên</span>
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>⏰</span>
                <span>Chấm công</span>
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>💰</span>
                <span>Quản lý lương</span>
              </a>
            </li>
          </ul>

          <div className={styles.menuHeading}>Quản lý sản phẩm</div>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>🍔</span>
                <span>Sản phẩm</span>
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>🏷️</span>
                <span>Danh mục</span>
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>💯</span>
                <span>Khuyến mãi</span>
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>🧠</span>
                <span>Hệ thống gợi ý</span>
              </a>
            </li>
          </ul>

          <div className={styles.menuHeading}>Hệ thống</div>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>⚙️</span>
                <span>Cài đặt</span>
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>🔒</span>
                <span>Quyền truy cập</span>
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.menuIcon}>📤</span>
                <span>Đăng xuất</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
