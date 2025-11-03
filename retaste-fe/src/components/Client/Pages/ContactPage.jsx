import React, { useState } from "react";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [messageState, setMessageState] = useState({
    text: "",
    type: "",
    visible: false,
  });

  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFaqClick = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const showMessage = (text, type) => {
    setMessageState({
      text,
      type,
      visible: true,
    });

    setTimeout(() => {
      setMessageState((prev) => ({
        ...prev,
        visible: false,
      }));
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      showMessage("Vui lòng điền đầy đủ thông tin bắt buộc.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showMessage("Vui lòng nhập email hợp lệ.", "error");
      return;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      showMessage("Vui lòng nhập số điện thoại hợp lệ.", "error");
      return;
    }

    showMessage("Đang gửi...", "info");

    setTimeout(() => {
      showMessage(
        "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
        "success"
      );
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 2000);
  };

  const faqItems = [
    {
      question: "Thời gian giao hàng của RETASTE là bao lâu?",
      answer:
        "RETASTE cam kết giao hàng trong vòng 30-45 phút từ khi xác nhận đơn hàng. Đối với khu vực xa trung tâm, thời gian có thể kéo dài thêm 15-20 phút.",
    },
    {
      question: "Làm thế nào để theo dõi đơn hàng?",
      answer:
        "Bạn có thể theo dõi đơn hàng qua ứng dụng RETASTE hoặc nhận SMS thông báo. Chúng tôi sẽ cập nhật trạng thái đơn hàng theo thời gian thực.",
    },
    {
      question: "RETASTE có giao hàng miễn phí không?",
      answer:
        "Chúng tôi miễn phí giao hàng cho đơn hàng từ 150.000đ trở lên trong bán kính 5km. Các đơn hàng khác sẽ có phí giao hàng từ 15.000đ-25.000đ tùy khoảng cách.",
    },
    {
      question: "Tôi có thể hủy đơn hàng không?",
      answer:
        "Bạn có thể hủy đơn hàng trong vòng 5 phút sau khi đặt. Sau thời gian này, vui lòng liên hệ hotline 1900-1234 để được hỗ trợ.",
    },
    {
      question: "Làm thế nào để được hoàn tiền?",
      answer:
        "Trong trường hợp cần hoàn tiền, chúng tôi sẽ xử lý trong vòng 3-5 ngày làm việc. Tiền sẽ được hoàn về phương thức thanh toán ban đầu của bạn.",
    },
  ];
  return (
    <>
      <section className={styles.contactHero}>
        <div className={styles.container}>
          <h1>Liên hệ với chúng tôi</h1>
          <p>
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với
            RETASTE để được tư vấn và giải đáp mọi thắc mắc.
          </p>
        </div>
      </section>

      <div className={styles.breadcrumb}>
        <div className={styles.container}>
          <ul className={styles.breadcrumbList}>
            <li>
              <a href="/">Trang chủ</a> /{" "}
            </li>
            <li>
              <span>Liên hệ</span>
            </li>
          </ul>
        </div>
      </div>

      <section className={styles.contactContent}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Thông tin liên hệ</h2>
              <p>
                Đội ngũ RETASTE luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ với
                chúng tôi qua các kênh dưới đây hoặc điền form để được tư vấn
                nhanh nhất.
              </p>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📍</div>
                  <div className={styles.contactText}>
                    <h3>Địa chỉ</h3>
                    <p>
                      123 Đường Nguyễn Văn Linh
                      <br />
                      Quận 7, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📞</div>
                  <div className={styles.contactText}>
                    <h3>Hotline</h3>
                    <p>
                      1900-1234 (Miễn phí)
                      <br />
                      028-1234-5678
                    </p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>✉️</div>
                  <div className={styles.contactText}>
                    <h3>Email</h3>
                    <p>
                      support@retaste.vn
                      <br />
                      info@retaste.vn
                    </p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>⏰</div>
                  <div className={styles.contactText}>
                    <h3>Giờ làm việc</h3>
                    <p>
                      Thứ 2 - Chủ Nhật
                      <br />
                      06:00 - 23:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.contactForm}>
              <h2>Gửi tin nhắn cho chúng tôi</h2>

              {messageState.visible && (
                <div
                  className={`${styles.message} ${styles[messageState.type]}`}
                >
                  {messageState.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={`${styles.formGroup} ${styles.required}`}>
                    <label htmlFor="firstName">Họ</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.required}`}>
                    <label htmlFor="lastName">Tên</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={`${styles.formGroup} ${styles.required}`}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.required}`}>
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className={`${styles.formGroup} ${styles.required}`}>
                  <label htmlFor="subject">Chủ đề</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="order">Hỗ trợ đặt hàng</option>
                    <option value="delivery">Vấn đề giao hàng</option>
                    <option value="quality">Chất lượng sản phẩm</option>
                    <option value="account">Tài khoản & Thanh toán</option>
                    <option value="suggestion">Góp ý & Đề xuất</option>
                    <option value="partnership">Hợp tác kinh doanh</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div className={`${styles.formGroup} ${styles.required}`}>
                  <label htmlFor="message">Nội dung</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Vui lòng mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>

          {/* Social Contact */}
          <div className={styles.socialContact}>
            <h3>Kết nối với chúng tôi</h3>
            <p>
              Theo dõi RETASTE trên các mạng xã hội để cập nhật thông tin mới
              nhất
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={`${styles.socialLink} ${styles.facebook}`}>
                📘
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.zalo}`}>
                💬
              </a>
              <a
                href="#"
                className={`${styles.socialLink} ${styles.instagram}`}
              >
                📸
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.youtube}`}>
                📹
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={styles.container}>
          <h2>Vị trí của chúng tôi</h2>
          <div className={styles.mapContainer}>
            <p>🗺️ Bản đồ sẽ được hiển thị tại đây</p>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2>Câu hỏi thường gặp</h2>
          <div className={styles.faqContainer}>
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${
                  activeFaqIndex === index ? styles.active : ""
                }`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => handleFaqClick(index)}
                >
                  {item.question}
                  <span>{activeFaqIndex === index ? "−" : "+"}</span>
                </button>
                <div className={styles.faqAnswer}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
