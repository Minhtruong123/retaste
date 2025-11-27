import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./PaymentPage.module.css";

export default function PaymentPage() {
  const location = useLocation();
  const { cartItems, totalAmount } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(300);

  const onCancel = () => {
    console.log("Payment cancelled");
  };

  const onSuccess = (data) => {
    console.log("Payment success:", data);
  };

  const calculatedTotal =
    totalAmount ||
    cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) ||
    0;

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          onCancel && onCancel("timeout");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [onCancel]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "cardNumber") {
      const numbers = value.replace(/[^\d]/g, "");
      if (numbers.length <= 16) {
        formattedValue = numbers.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
      } else {
        return;
      }
    }

    if (name === "expiryDate") {
      const numbers = value.replace(/[^\d]/g, "");
      if (numbers.length <= 4) {
        if (numbers.length > 2) {
          formattedValue = `${numbers.substring(0, 2)}/${numbers.substring(2)}`;
        } else {
          formattedValue = numbers;
        }
      } else {
        return;
      }
    }

    if (name === "cvv") {
      const numbers = value.replace(/[^\d]/g, "");
      if (numbers.length <= 3) {
        formattedValue = numbers;
      } else {
        return;
      }
    }

    setCardInfo({
      ...cardInfo,
      [name]: formattedValue,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateCardInfo = () => {
    const newErrors = {};

    if (
      !cardInfo.cardNumber ||
      cardInfo.cardNumber.replace(/\s/g, "").length < 16
    ) {
      newErrors.cardNumber = "Vui lòng nhập đầy đủ số thẻ";
    }

    if (!cardInfo.cardHolder) {
      newErrors.cardHolder = "Vui lòng nhập tên chủ thẻ";
    }

    if (!cardInfo.expiryDate || cardInfo.expiryDate.length < 5) {
      newErrors.expiryDate = "Vui lòng nhập ngày hết hạn";
    } else {
      const [month, year] = cardInfo.expiryDate.split("/");
      if (!month || !year || parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = "Ngày hết hạn không hợp lệ";
      }
    }

    if (!cardInfo.cvv || cardInfo.cvv.length < 3) {
      newErrors.cvv = "Vui lòng nhập mã CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "card" && !validateCardInfo()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSuccess &&
        onSuccess({
          paymentMethod,
          transactionId: `TRX${Math.floor(Math.random() * 1000000)}`,
          amount: calculatedTotal,
          date: new Date().toISOString(),
        });
    }, 2000);
  };

  const handleCancel = () => {
    onCancel && onCancel("user-canceled");
  };
  return (
    <>
      <div className={styles.paymentPage}>
        <div className={styles.container}>
          <div className={styles.paymentHeader}>
            <h1>Thanh toán đơn hàng</h1>
            <div className={styles.timer}>
              <span className={styles.timerIcon}>⏱️</span>
              <span className={timer <= 60 ? styles.timerWarning : ""}>
                Thời gian thanh toán còn lại: {formatTime(timer)}
              </span>
            </div>
          </div>

          <div className={styles.paymentContent}>
            <div className={styles.paymentSummary}>
              <div className={styles.orderSummary}>
                <h2>Thông tin đơn hàng</h2>

                <div className={styles.orderItems}>
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item.id} className={styles.orderItem}>
                        <div className={styles.itemImage}>
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className={styles.itemDetails}>
                          <h3>{item.name}</h3>
                          <p className={styles.itemOptions}>
                            {item.options?.join(", ")}
                          </p>
                          <div className={styles.itemQuantity}>
                            SL: {item.quantity} x {item.price.toLocaleString()}₫
                          </div>
                        </div>
                        <div className={styles.itemTotal}>
                          {(item.price * item.quantity).toLocaleString()}₫
                        </div>
                      </div>
                    ))}
                </div>

                <div className={styles.totalAmount}>
                  <div className={styles.totalLabel}>Tổng thanh toán:</div>
                  <div className={styles.totalValue}>
                    {calculatedTotal.toLocaleString()}₫
                  </div>
                </div>
              </div>

              <div className={styles.securityNote}>
                <div className={styles.securityIcon}>🔒</div>
                <div className={styles.securityText}>
                  <p>
                    Thông tin thanh toán của bạn được bảo mật theo tiêu chuẩn
                    PCI DSS.
                  </p>
                  <p>SEPAY không lưu trữ thông tin thẻ của bạn.</p>
                </div>
              </div>
            </div>

            <div className={styles.paymentForm}>
              <h2>Chọn phương thức thanh toán</h2>

              <div className={styles.paymentMethods}>
                <label
                  className={`${styles.methodCard} ${
                    paymentMethod === "card" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <div className={styles.methodContent}>
                    <span className={styles.methodIcon}>💳</span>
                    <span>Thẻ tín dụng/ghi nợ</span>
                  </div>
                  <div className={styles.cardBrands}>
                    <span>Visa</span>
                    <span>Mastercard</span>
                    <span>JCB</span>
                  </div>
                </label>

                <label
                  className={`${styles.methodCard} ${
                    paymentMethod === "momo" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={paymentMethod === "momo"}
                    onChange={() => setPaymentMethod("momo")}
                  />
                  <div className={styles.methodContent}>
                    <span className={styles.methodIcon}>📱</span>
                    <span>Ví MoMo</span>
                  </div>
                </label>

                <label
                  className={`${styles.methodCard} ${
                    paymentMethod === "banking" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="banking"
                    checked={paymentMethod === "banking"}
                    onChange={() => setPaymentMethod("banking")}
                  />
                  <div className={styles.methodContent}>
                    <span className={styles.methodIcon}>🏦</span>
                    <span>Internet Banking</span>
                  </div>
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className={styles.cardForm}>
                  <div className={styles.formGroup}>
                    <label>Số thẻ</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardInfo.cardNumber}
                      onChange={handleCardInfoChange}
                      placeholder="1234 5678 9012 3456"
                      className={errors.cardNumber ? styles.inputError : ""}
                    />
                    {errors.cardNumber && (
                      <div className={styles.errorMessage}>
                        {errors.cardNumber}
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Tên chủ thẻ</label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={cardInfo.cardHolder}
                      onChange={handleCardInfoChange}
                      placeholder="NGUYEN VAN A"
                      className={errors.cardHolder ? styles.inputError : ""}
                    />
                    {errors.cardHolder && (
                      <div className={styles.errorMessage}>
                        {errors.cardHolder}
                      </div>
                    )}
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Ngày hết hạn</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardInfo.expiryDate}
                        onChange={handleCardInfoChange}
                        placeholder="MM/YY"
                        className={errors.expiryDate ? styles.inputError : ""}
                      />
                      {errors.expiryDate && (
                        <div className={styles.errorMessage}>
                          {errors.expiryDate}
                        </div>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Mã bảo mật (CVV)</label>
                      <input
                        type="password"
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={handleCardInfoChange}
                        placeholder="123"
                        className={errors.cvv ? styles.inputError : ""}
                      />
                      {errors.cvv && (
                        <div className={styles.errorMessage}>{errors.cvv}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "momo" && (
                <div className={styles.momoInfo}>
                  <div className={styles.qrContainer}>
                    <div className={styles.qrPlaceholder}>
                      <span>Mã QR MoMo</span>
                    </div>
                  </div>
                  <p className={styles.momoInstructions}>
                    Quét mã QR bằng ứng dụng MoMo để thanh toán
                  </p>
                </div>
              )}

              {paymentMethod === "banking" && (
                <div className={styles.bankingInfo}>
                  <div className={styles.bankList}>
                    <div className={styles.bankOption}>
                      <input type="radio" name="bank" id="vcb" checked />
                      <label htmlFor="vcb">Vietcombank</label>
                    </div>
                    <div className={styles.bankOption}>
                      <input type="radio" name="bank" id="tcb" />
                      <label htmlFor="tcb">Techcombank</label>
                    </div>
                    <div className={styles.bankOption}>
                      <input type="radio" name="bank" id="vtb" />
                      <label htmlFor="vtb">VietinBank</label>
                    </div>
                    <div className={styles.bankOption}>
                      <input type="radio" name="bank" id="bidv" />
                      <label htmlFor="bidv">BIDV</label>
                    </div>
                  </div>
                  <p className={styles.bankingInstructions}>
                    Bạn sẽ được chuyển đến cổng thanh toán của ngân hàng sau khi
                    xác nhận
                  </p>
                </div>
              )}

              <div className={styles.actionButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Hủy
                </button>
                <button
                  className={styles.payButton}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className={styles.loadingSpinner}></span>
                      Đang xử lý...
                    </>
                  ) : (
                    `Thanh toán ${calculatedTotal.toLocaleString()}₫`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
