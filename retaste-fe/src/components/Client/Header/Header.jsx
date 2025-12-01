import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useCart } from "../Pages/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useCartService } from "../../../hooks/useCartService";

export default function Header() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  const { cartItems, fetchCart, setCartItems } = useCart();
  const [loadingCart, setLoadingCart] = useState(false);
  const { user, logout } = useAuth();
  const { updateCartQuantity, removeFromCart } = useCartService();

  const cartDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    console.log(cartItems);
    
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

    const handleCartBounce = () => {
      setCartBounce(true);
      setTimeout(() => {
        setCartBounce(false);
      }, 600);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("cartBounce", handleCartBounce);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("cartBounce", handleCartBounce);
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
    if (!showCartDropdown) {
      fetchCart?.();
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // setUser(null);
      setCartItems([]);
      setShowDropdown(false);
    }
  };

  const handleUpdateQuantity = async (
    id,
    currentQuantity,
    action
  ) => {
    try {
      if (action ==='remove'){
        await removeFromCart(id)
      } else if (action === "subtract" && currentQuantity <= 1) {
        if (window.confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?")) {
          await removeFromCart(id);
        }
        return;
      } else {await updateCartQuantity(id, action);}

      
      await fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert(error || "Cập nhật số lượng thất bại");
    }
  };

  const calculateTotal = () => {
    if (!cartItems || cartItems.length === 0) return 0;

    return cartItems.reduce((total, item) => {
      let itemPrice = item.productId?.basePrice || 0;

      if (item.sizeId?.priceModifier) {
        itemPrice += item.sizeId.priceModifier;
      }

      if (item.customs && item.customs.length > 0) {
        item.customs.forEach((custom) => {
          if (custom.optionId?.price) {
            itemPrice += custom.optionId.price * (custom.quantity || 1);
          }
        });
      }

      return total + itemPrice * item.quantity;
    }, 0);
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
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
                  className={`${styles.cartIcon} ${
                    cartBounce ? styles.bounce : ""
                  }`}
                  onClick={toggleCartDropdown}
                >
                  🛒{" "}
                  <span
                    className={`${styles.cartCount} ${
                      cartBounce ? styles.pulse : ""
                    }`}
                  >
                    {getTotalQuantity()}
                  </span>
                </a>

                {showCartDropdown && (
                  <div className={styles.cartDropdown}>
                    <div className={styles.cartHeader}>
                      <h3>Giỏ hàng của bạn</h3>
                      <span className={styles.cartItemCount}>
                        {getTotalQuantity()} món
                      </span>
                    </div>

                    {loadingCart ? (
                      <div className={styles.loadingCart}>
                        <p>Đang tải giỏ hàng...</p>
                      </div>
                    ) : cartItems.length > 0 ? (
                      <>
                        <div className={styles.cartItems}>
                          {cartItems.map((item, index) => {
                            const itemPrice = (() => {
                              let price = item.productId?.basePrice || 0;
                              if (item.sizeId?.priceModifier) {
                                price += item.sizeId.priceModifier;
                              }
                              if (item.customs && item.customs.length > 0) {
                                item.customs.forEach((custom) => {
                                  if (custom.optionId?.price) {
                                    price +=
                                      custom.optionId.price *
                                      (custom.quantity || 1);
                                  }
                                });
                              }
                              return price;
                            })();

                            return (
                              <div
                                key={`${item.productId?._id}-${index}`}
                                className={styles.cartItem}
                              >
                                <div className={styles.cartItemImage}>
                                  <img
                                    src={
                                      item.productId?.imageUrl ||
                                      "https://via.placeholder.com/60"
                                    }
                                    alt={
                                      item.productId?.productName || "Product"
                                    }
                                    style={{
                                      width: "60px",
                                      height: "60px",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                    }}
                                  />
                                </div>
                                <div className={styles.cartItemInfo}>
                                  <div className={styles.cartItemName}>
                                    {item.productId?.productName || "Sản phẩm"}
                                  </div>
                                  <div className={styles.cartItemSize}>
                                    {item.sizeId?.sizeName &&
                                      `Size: ${item.sizeId.sizeName}`}
                                  </div>
                                  <div className={styles.cartItemPrice}>
                                    {new Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(itemPrice)}
                                  </div>
                                </div>
                                <div className={styles.cartItemActions}>
                                  <div className={styles.quantityControl}>
                                    <button
                                      className={styles.quantityBtn}
                                      onClick={() =>
                                        handleUpdateQuantity(
                                          item._id,
                                          item.quantity,
                                          "subtract"
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
                                          item._id,
                                          item.quantity,
                                          "add"
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                  <button
                                    className={styles.removeBtn}
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item._id,
                                        item.quantity,"remove"
                                      )
                                    }
                                  >
                                    ×
                                  </button>
                                </div>
                              </div>
                            );
                          })}
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
