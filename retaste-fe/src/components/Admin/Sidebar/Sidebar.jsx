import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    await logout();
  };
  return (
    <div className={`${styles.sidebar} ${styles.open}`}>
      <div className={styles.sidebarBrand}>
        <h2>
          <span className={styles.brandHighlight}>RE</span>
          <span className={styles.brandText}>TASTE</span>
          <span className={styles.brandSuffix}>Admin</span>
        </h2>
      </div>

      <div className={styles.sidebarUser}>
        <div className={styles.avatarContainer}>
          <img
            src="https://randomuser.me/api/portraits/men/85.jpg"
            alt="Admin"
            className={styles.userAvatar}
          />
          <div className={styles.statusIndicator}></div>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Nguyễn Văn Quản Lý</div>
          <div className={styles.userRole}>Quản lý</div>
        </div>
      </div>

      <div className={styles.sidebarMenu}>
        <MenuSection
          title="Tổng quan"
          items={[
            { icon: "📊", label: "Bảng điều khiển", to: "/admin", end: true },
            {
              icon: "📈",
              label: "Quản lý doanh thu",
              to: "/admin/revenue_management",
            },
            {
              icon: "📝",
              label: "Quản lý đơn hàng",
              to: "/admin/order_management",
              badge: "15",
            },
            {
              icon: "🚚",
              label: "Quản lý giao hàng",
              to: "/admin/delivery_management",
              badge: "8",
            },
          ]}
        />

        <MenuSection
          title="Quản lý nội bộ"
          items={[
            {
              icon: "👥",
              label: "Quản lý nhân viên",
              to: "/admin/employee_management",
            },
            {
              icon: "⏰",
              label: "Quản lý lịch làm việc",
              to: "/admin/schedule_management",
            },
            {
              icon: "💰",
              label: "Quản lý lương",
              to: "/admin/salary_management",
            },
          ]}
        />

        <MenuSection
          title="Quản lý sản phẩm"
          items={[
            { icon: "🍔", label: "Sản phẩm", to: "/admin/product_management" },
            { icon: "🏷️", label: "Danh mục", to: "/admin/category_management" },
          ]}
        />

        <MenuSection
          title="Hệ thống"
          items={[
            { icon: "⚙️", label: "Cài đặt", to: "/admin/settings" },
            { icon: "🔒", label: "Quyền truy cập", to: "/admin/roles" },
            {
              icon: "📤",
              label: "Đăng xuất",
              onClick: handleLogout,
              isLogout: true,
              disabled: isLoggingOut,
            },
          ]}
        />
      </div>

      <div className={styles.sidebarFooter}>
        <div className={styles.sidebarVersion}>v1.2.0</div>
        <div className={styles.sidebarCopyright}>© 2025 RETASTE</div>
      </div>
    </div>
  );
}

function MenuSection({ title, items }) {
  return (
    <div className={styles.menuSection}>
      <div className={styles.menuHeading}>
        <span className={styles.headingText}>{title}</span>
        <div className={styles.headingLine}></div>
      </div>
      <ul className={styles.menuList}>
        {items.map((item, index) => (
          <li key={index} className={styles.menuItem}>
            {item.isLogout ? (
              <button
                onClick={item.onClick}
                disabled={item.disabled}
                className={`${styles.menuLink} ${styles.logoutBtn} ${
                  item.disabled ? styles.disabled : ""
                }`}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuText}>
                  {item.disabled ? "Đang đăng xuất..." : item.label}
                </span>
              </button>
            ) : (
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `${styles.menuLink} ${isActive ? styles.active : ""}`
                }
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuText}>{item.label}</span>
                {item.badge && (
                  <span className={styles.menuBadge}>{item.badge}</span>
                )}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
