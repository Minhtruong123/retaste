import React, { useState, useEffect } from "react";
import styles from "./OrderConfirmation.module.css";

export default function OrderConfirmation() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic Burger",
      price: 69000,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
      options: ["Thêm phô mai", "Không hành tây"],
    },
    {
      id: 2,
      name: "Gà Rán Sốt Cay",
      price: 89000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710",
      options: ["Cay vừa"],
    },
    {
      id: 3,
      name: "Khoai Tây Chiên",
      price: 35000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d",
      options: ["Size lớn"],
    },
  ]);

  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState({
    name: "Nguyễn Văn A",
    phone: "0912345678",
    address: "123 Đường ABC, Quận 1",
    city: "TP. Hồ Chí Minh",
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = deliveryOption === "standard" ? 15000 : 30000;
  const total = subtotal + deliveryFee - discount;

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleApplyPromo = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (promoCode.toUpperCase() === "WELCOME10") {
        setDiscount(Math.round(subtotal * 0.1));
      } else {
        setDiscount(0);
        alert("Mã khuyến mãi không hợp lệ!");
      }
      setIsLoading(false);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      alert(
        "Đặt hàng thành công! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi."
      );
      setIsLoading(false);
    }, 1500);
  };
  return (
    <>
      <div className={styles.orderConfirmation}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Xác nhận đơn hàng</h1>

          <div className={styles.orderContent}>
            <div className={styles.orderSummary}>
              <div className={styles.orderItems}>
                <h2>Món đã chọn ({cartItems.length})</h2>

                {cartItems.map((item) => (
                  <div key={item.id} className={styles.orderItem}>
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.itemDetails}>
                      <h3>{item.name}</h3>
                      <p className={styles.itemOptions}>
                        {item.options.join(", ")}
                      </p>
                      <div className={styles.itemPrice}>
                        {item.price.toLocaleString()}₫
                      </div>
                    </div>
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControl}>
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={styles.removeButton}
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <span>✕</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.orderNote}>
                <h2>Ghi chú</h2>
                <textarea
                  placeholder="Ghi chú về đơn hàng của bạn (tùy chọn)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className={styles.checkoutInfo}>
              <div className={styles.deliveryAddress}>
                <div className={styles.sectionHeader}>
                  <h2>Địa chỉ giao hàng</h2>
                  <button
                    className={styles.editButton}
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                  >
                    {isEditingAddress ? "Lưu" : "Sửa"}
                  </button>
                </div>

                {isEditingAddress ? (
                  <div className={styles.addressForm}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Họ tên</label>
                        <input
                          type="text"
                          value={address.name}
                          onChange={(e) =>
                            setAddress({ ...address, name: e.target.value })
                          }
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Số điện thoại</label>
                        <input
                          type="text"
                          value={address.phone}
                          onChange={(e) =>
                            setAddress({ ...address, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Địa chỉ</label>
                      <input
                        type="text"
                        value={address.address}
                        onChange={(e) =>
                          setAddress({ ...address, address: e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Tỉnh/Thành phố</label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.addressDisplay}>
                    <div className={styles.addressName}>{address.name}</div>
                    <div className={styles.addressPhone}>{address.phone}</div>
                    <div className={styles.addressDetails}>
                      {address.address}, {address.city}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.deliveryOptions}>
                <h2>Phương thức giao hàng</h2>
                <div className={styles.optionCards}>
                  <label
                    className={`${styles.optionCard} ${
                      deliveryOption === "standard" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={deliveryOption === "standard"}
                      onChange={() => setDeliveryOption("standard")}
                    />
                    <div className={styles.optionContent}>
                      <div className={styles.optionTitle}>
                        <span className={styles.optionIcon}>🚚</span>
                        <span>Giao hàng tiêu chuẩn</span>
                      </div>
                      <div className={styles.optionDescription}>
                        Nhận hàng trong 30-45 phút
                      </div>
                      <div className={styles.optionPrice}>15.000₫</div>
                    </div>
                  </label>

                  <label
                    className={`${styles.optionCard} ${
                      deliveryOption === "express" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={deliveryOption === "express"}
                      onChange={() => setDeliveryOption("express")}
                    />
                    <div className={styles.optionContent}>
                      <div className={styles.optionTitle}>
                        <span className={styles.optionIcon}>⚡</span>
                        <span>Giao hàng nhanh</span>
                      </div>
                      <div className={styles.optionDescription}>
                        Nhận hàng trong 15-20 phút
                      </div>
                      <div className={styles.optionPrice}>30.000₫</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className={styles.paymentOptions}>
                <h2>Phương thức thanh toán</h2>
                <div className={styles.optionCards}>
                  <label
                    className={`${styles.optionCard} ${
                      paymentMethod === "cash" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                    />
                    <div className={styles.optionContent}>
                      <div className={styles.optionTitle}>
                        <span className={styles.optionIcon}>💵</span>
                        <span>Tiền mặt</span>
                      </div>
                      <div className={styles.optionDescription}>
                        Thanh toán khi nhận hàng
                      </div>
                    </div>
                  </label>

                  <label
                    className={`${styles.optionCard} ${
                      paymentMethod === "card" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <div className={styles.optionContent}>
                      <div className={styles.optionTitle}>
                        <span className={styles.optionIcon}>💳</span>
                        <span>Thẻ tín dụng/ghi nợ</span>
                      </div>
                      <div className={styles.optionDescription}>
                        Visa, MasterCard, JCB
                      </div>
                    </div>
                  </label>

                  <label
                    className={`${styles.optionCard} ${
                      paymentMethod === "momo" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="momo"
                      checked={paymentMethod === "momo"}
                      onChange={() => setPaymentMethod("momo")}
                    />
                  </label>
                </div>
              </div>

              <div className={styles.orderSummaryBox}>
                <h2>Tổng cộng</h2>
                <div className={styles.summaryRow}>
                  <span>Tạm tính</span>
                  <span>{subtotal.toLocaleString()}₫</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Phí giao hàng</span>
                  <span>{deliveryFee.toLocaleString()}₫</span>
                </div>
                {discount > 0 && (
                  <div className={styles.summaryRow}>
                    <span>Giảm giá</span>
                    <span>-{discount.toLocaleString()}₫</span>
                  </div>
                )}
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Tổng thanh toán</span>
                  <span>{total.toLocaleString()}₫</span>
                </div>

                <button
                  className={styles.checkoutButton}
                  onClick={handleSubmit}
                  disabled={isLoading || cartItems.length === 0}
                >
                  {isLoading ? "Đang xử lý..." : "Đặt hàng ngay"}
                </button>

                <p className={styles.termsNote}>
                  Bằng cách đặt hàng, bạn đồng ý với{" "}
                  <a href="#">Điều khoản dịch vụ</a> và{" "}
                  <a href="#">Chính sách bảo mật</a> của RETASTE
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
