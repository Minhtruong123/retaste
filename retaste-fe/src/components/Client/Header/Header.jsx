import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import * as authService from "../../../service/auth_service";

export default function Header() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Cơm rang dưa bò",
      price: 75000,
      quantity: 1,
      image: "🍚",
    },
    {
      id: 2,
      name: "Gà sốt chua ngọt",
      price: 120000,
      quantity: 2,
      image: "🍗",
    },
    {
      id: 3,
      name: "Trà đào cam sả",
      price: 35000,
      quantity: 1,
      image: "🍹",
    },
  ]);

  const cartDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }

    const handleClickOutside = (event) => {
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target)
      ) {
        setShowCartDropdown(false);
      }

      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  const toggleCartDropdown = (e) => {
    e.preventDefault();
    setShowCartDropdown(!showCartDropdown);
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

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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
              <div className={styles.cartContainer} ref={cartDropdownRef}>
                <a
                  href="#"
                  className={styles.cartIcon}
                  onClick={toggleCartDropdown}
                >
                  🛒{" "}
                  <span className={styles.cartCount}>
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </a>

                {showCartDropdown && (
                  <div className={styles.cartDropdown}>
                    <div className={styles.cartHeader}>
                      <h3>Giỏ hàng của bạn</h3>
                      <span className={styles.cartItemCount}>
                        {cartItems.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}{" "}
                        món
                      </span>
                    </div>

                    {cartItems.length > 0 ? (
                      <>
                        <div className={styles.cartItems}>
                          {cartItems.map((item) => (
                            <div key={item.id} className={styles.cartItem}>
                              <div className={styles.cartItemImage}>
                                {item.image}
                              </div>
                              <div className={styles.cartItemInfo}>
                                <div className={styles.cartItemName}>
                                  {item.name}
                                </div>
                                <div className={styles.cartItemPrice}>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.price)}
                                </div>
                              </div>
                              <div className={styles.cartItemActions}>
                                <div className={styles.quantityControl}>
                                  <button
                                    className={styles.quantityBtn}
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <span className={styles.quantity}>
                                    {item.quantity}
                                  </span>
                                  <button
                                    className={styles.quantityBtn}
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  className={styles.removeBtn}
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className={styles.cartFooter}>
                          <div className={styles.cartTotal}>
                            <span>Tổng cộng:</span>
                            <span className={styles.totalAmount}>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(calculateTotal())}
                            </span>
                          </div>
                          <div className={styles.cartActions}>
                            <NavLink
                              to="/order_confirmation"
                              className={styles.viewCartBtn}
                              onClick={() => setShowCartDropdown(false)}
                            >
                              Xem giỏ hàng
                            </NavLink>
                            <NavLink
                              to="/checkout"
                              className={styles.checkoutBtn}
                              onClick={() => setShowCartDropdown(false)}
                            >
                              Thanh toán
                            </NavLink>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className={styles.emptyCart}>
                        <div className={styles.emptyCartIcon}>🛒</div>
                        <p>Giỏ hàng của bạn đang trống</p>
                        <NavLink
                          to="/menu"
                          className={styles.continueShoppingBtn}
                          onClick={() => setShowCartDropdown(false)}
                        >
                          Tiếp tục mua sắm
                        </NavLink>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {user ? (
                <div className={styles.userProfile} ref={userDropdownRef}>
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
