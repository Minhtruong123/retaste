import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCartService } from "../../../hooks/useCartService";
import { useAddressService } from "../../../hooks/useAddressService";
import { useOrderService } from "../../../hooks/useOrderService";
import { useLocationService } from "../../../hooks/useLocationService";
import styles from "./OrderConfirmation.module.css";
import axios from "axios";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  const { getCartDetail, updateCartQuantity, removeFromCart } =
    useCartService();
  const { getAddresses, addAddress } = useAddressService();
  const { getOrderPreview, createOrder } = useOrderService();
  const { validateAddressInHCM } = useLocationService();

  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [note, setNote] = useState("");
  const [addresses, setAddresses] = useState([]);

  const [orderPreview, setOrderPreview] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    streetAddress: "",
    isDefault: false,
  });
  const [addressValidation, setAddressValidation] = useState({
    isValid: true,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!user) {
          setError("Vui lòng đăng nhập để xem giỏ hàng");
          setIsLoading(false);
          return;
        }

        setIsLoading(true);

        const data = await getCartDetail();
        setCartItems(data.products || []);

        const addrList = await getAddresses();
        setAddresses(addrList);

        const defaultAddr = addrList.find((a) => a.isDefault) || addrList[0];
        if (defaultAddr) setSelectedAddressId(defaultAddr._id);
      } catch (err) {
        setError(err?.message || "Không thể tải giỏ hàng");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!selectedAddressId || cartItems.length === 0) {
      setOrderPreview(null);
      return;
    }

    const preview = async () => {
      setIsLoading(true);
      try {
        const itemIds = cartItems.map((item) => item._id.toString());
        const result = await getOrderPreview({
          deliveryAddress: selectedAddressId,
          items: itemIds,
        });
        setOrderPreview(result);
      } catch (err) {
        setError("Không thể tính phí giao hàng. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    preview();
  }, [selectedAddressId, cartItems]);

  const handleAddAddress = async () => {
    if (!newAddress.streetAddress.trim()) {
      setAddressValidation({
        isValid: false,
        message: "Vui lòng nhập địa chỉ",
      });
      return;
    }

    setIsLoading(true);
    const validation = await validateAddressInHCM(newAddress.streetAddress);
    if (!validation.isValid) {
      setAddressValidation({ isValid: false, message: validation.message });
      setIsLoading(false);
      return;
    }

    try {
      const added = await addAddress(newAddress);
      setAddresses((prev) => [...prev, added]);
      setSelectedAddressId(added._id);
      setIsAddingAddress(false);
      setNewAddress({ streetAddress: "", isDefault: false });
      setAddressValidation({ isValid: true, message: "" });
    } catch (err) {
      setError("Không thể thêm địa chỉ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, delta) => {
    const action = delta > 0 ? "add" : "subtract";
    try {
      await updateCartQuantity(itemId, action);
      const updated = await getCartDetail();
      setCartItems(updated.products || []);
    } catch (err) {
      alert("Cập nhật số lượng thất bại");
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (!window.confirm("Xóa món này khỏi giỏ hàng?")) return;
    try {
      await removeFromCart(itemId);
      const updated = await getCartDetail();
      setCartItems(updated.products || []);
    } catch (err) {
      alert("Xóa món thất bại");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId || cartItems.length === 0) return;

    setIsLoading(true);
    setError("");

    try {
      const itemIds = cartItems.map((i) => i._id.toString());
      const result = await createOrder({
        deliveryAddress: selectedAddressId,
        items: itemIds,
        paymentMethod: paymentMethod === "cash" ? "cash" : "bank_transfer",
      });

      const newCart = await getCartDetail();
      setCartItems(newCart.products || []);

      if (paymentMethod === "cash") {
        alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại RETASTE");
        navigate("/orders");
      } else {
        console.log("okokokoko");
        console.log(result);
        document.body.insertAdjacentHTML("beforeend", result.form);
        document.querySelector(".form-payment")?.submit();
      }
    } catch (err) {
      setError(err?.message || "Đặt hàng thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = orderPreview?.order?.subtotal || 0;
  const deliveryFee = orderPreview?.order?.deliveryFee || 15000;
  const total = orderPreview?.order?.totalAmount || subtotal + deliveryFee;

  if (!user)
    return <div className={styles.errorMessage}>Vui lòng đăng nhập</div>;

  return (
    <>
      <div className={styles.orderConfirmation}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Xác nhận đơn hàng</h1>

          {error && <div className={styles.errorMessage}>{error}</div>}
          {isLoading && (
            <div className={styles.overlayLoading}>
              Đang tính phí giao hàng...
            </div>
          )}

          <div className={styles.orderContent}>
            <div className={styles.orderSummary}>
              <div className={styles.orderItems}>
                <h2>Món đã chọn ({cartItems.length})</h2>

                {isLoading && cartItems.length === 0 ? (
                  <div className={styles.loadingMessage}>
                    Đang tải giỏ hàng...
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className={styles.emptyCart}>
                    Giỏ hàng của bạn đang trống.
                    <button
                      onClick={() => navigate("/menu")}
                      className={styles.continueShopping}
                        style={{
                          background: "#ff4d6d",
                          color: "#fff",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontWeight: "600",
                          border: "none",
                          cursor: "pointer",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          transition: "0.3s",
                          marginLeft: '10px'
                        }}
                    >
                      Tiếp tục mua sắm
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const product = item.productId;
                    const size = item.sizeId;
                    const customs = item.customs || [];
                    const basePrice = product?.basePrice || 0;
                    const priceModifier = size?.priceModifier || 0;
                    const itemTotalPrice = (basePrice + priceModifier) * item.quantity;
                    return (
                      <div key={item._id} className={styles.orderItem}>
                        <div className={styles.itemImage}>
                          <img
                            src={
                              product?.imageUrl ||
                              "https://via.placeholder.com/80"
                            }
                            alt={product?.productName || "Sản phẩm"}
                          />
                        </div>
                        <div className={styles.itemDetails}>
                          <h3>{product?.productName || "Không có tên"}</h3>
                          {size && (
                            <p className={styles.itemSize}>
                              Kích thước: {size.sizeName}
                            </p>
                          )}
                          {customs.length > 0 && (
                            <p className={styles.itemOptions}>
                              {customs
                                .map((c) => {
                                  const optionName =
                                    c.optionId?.name || "Tùy chọn";
                                  return c.quantity
                                    ? `${optionName} × ${c.quantity}`
                                    : optionName;
                                })
                                .join(", ")}
                            </p>
                          )}
                          <div className={styles.itemPrice}>
                            {itemTotalPrice.toLocaleString()} ₫
                            ₫
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
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
                  {!isAddingAddress && (
                    <button
                      className={styles.editButton}
                      onClick={() => setIsAddingAddress(true)}
                    >
                      + Thêm địa chỉ mới
                    </button>
                  )}
                </div>

                {isAddingAddress ? (
                  <div className={styles.addressForm}>
                    <div className={styles.formGroup}>
                      <label>Địa chỉ</label>
                      <input
                        type="text"
                        value={newAddress.streetAddress}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            streetAddress: e.target.value,
                          })
                        }
                        placeholder="Nhập địa chỉ chi tiết (Số nhà, đường, phường/xã, quận/huyện)"
                      />
                      {!addressValidation.isValid && (
                        <p className={styles.validationError}>
                          {addressValidation.message}
                        </p>
                      )}
                    </div>
                    <div className={styles.formCheckbox}>
                      <input
                        type="checkbox"
                        id="isDefault"
                        checked={newAddress.isDefault}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            isDefault: e.target.checked,
                          })
                        }
                      />
                      <label htmlFor="isDefault">
                        Đặt làm địa chỉ mặc định
                      </label>
                    </div>
                    <div className={styles.formActions}>
                      <button
                        className={styles.cancelButton}
                        onClick={() => {
                          setIsAddingAddress(false);
                          setAddressValidation({ isValid: true, message: "" });
                          setNewAddress({
                            streetAddress: "",
                            isDefault: false,
                          });
                        }}
                      >
                        Hủy
                      </button>
                      <button
                        className={styles.saveButton}
                        onClick={handleAddAddress}
                        disabled={isLoading}
                      >
                        {isLoading ? "Đang lưu..." : "Lưu địa chỉ"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {addresses.length > 0 ? (
                      <div className={styles.addressList}>
                        {addresses.map((address) => (
                          <div
                            key={address._id}
                            className={`${styles.addressCard} ${
                              selectedAddressId === address._id
                                ? styles.selected
                                : ""
                            }`}
                            onClick={() => setSelectedAddressId(address._id)}
                          >
                            <input
                              type="radio"
                              name="address"
                              checked={selectedAddressId === address._id}
                              onChange={() => setSelectedAddressId(address._id)}
                            />
                            <div className={styles.addressContent}>
                              <div className={styles.addressDetails}>
                                <div className={styles.addressName}>
                                  {user?.fullName || ""}
                                  {address.isDefault && (
                                    <span className={styles.defaultBadge}>
                                      Mặc định
                                    </span>
                                  )}
                                </div>
                                <div className={styles.addressPhone}>
                                  {user?.phoneNumber || ""}
                                </div>
                                <div className={styles.addressStreet}>
                                  {address.streetAddress}
                                </div>
                                <div className={styles.addressCity}>
                                  {address.city}, {address.country}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.noAddress}>
                        Bạn chưa có địa chỉ giao hàng. Vui lòng thêm địa chỉ
                        mới.
                      </div>
                    )}
                  </>
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
                      <div className={styles.optionPrice}>
                        {orderPreview
                          ? `${(
                              orderPreview.order?.deliveryFee || 15000
                            ).toLocaleString()}₫`
                          : "15.000₫"}
                      </div>
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
                      paymentMethod === "bank_transfer" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="bank_transfer"
                      checked={paymentMethod === "bank_transfer"}
                      onChange={() => setPaymentMethod("bank_transfer")}
                    />
                    <div className={styles.optionContent}>
                      <div className={styles.optionTitle}>
                        <span className={styles.optionIcon}>💳</span>
                        <span>Chuyển khoản ngân hàng</span>
                      </div>
                      <div className={styles.optionDescription}>
                        Thanh toán trực tuyến an toàn
                      </div>
                    </div>
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
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Tổng thanh toán</span>
                  <span>{total.toLocaleString()}₫</span>
                </div>

                <button
                  className={styles.checkoutButton}
                  onClick={handlePlaceOrder}
                  disabled={
                    isLoading || cartItems.length === 0 || !selectedAddressId
                  }
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
