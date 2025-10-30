import React, { useState } from "react";
import styles from "./AuthForm.module.css";

export default function AuthForm() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signInSuccess, setSignInSuccess] = useState("");

  const toggleForm = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  const handleSignUpChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignUpForm({
      ...signUpForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignInChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignInForm({
      ...signInForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    // Reset messages
    setSignUpError("");
    setSignUpSuccess("");

    // Validation
    if (
      !signUpForm.name ||
      !signUpForm.email ||
      !signUpForm.password ||
      !signUpForm.confirmPassword
    ) {
      setSignUpError("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setSignUpError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (signUpForm.password.length < 6) {
      setSignUpError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (!signUpForm.agreeTerms) {
      setSignUpError("Vui lòng đồng ý với các điều khoản");
      return;
    }

    // Simulate successful registration
    setSignUpSuccess("Đăng ký thành công! Chuyển đến trang đăng nhập...");

    setTimeout(() => {
      setIsRightPanelActive(false);
      setSignUpForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
      setSignUpSuccess("");
    }, 2000);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();

    // Reset messages
    setSignInError("");
    setSignInSuccess("");

    // Validation
    if (!signInForm.email || !signInForm.password) {
      setSignInError("Vui lòng nhập email và mật khẩu");
      return;
    }

    // Simulate successful login
    setSignInSuccess("Đăng nhập thành công! Đang chuyển hướng...");

    setTimeout(() => {
      // Redirect to main page
      alert("Đăng nhập thành công! Sẽ chuyển về trang chủ.");
      setSignInForm({
        email: "",
        password: "",
        rememberMe: false,
      });
      setSignInSuccess("");
    }, 2000);
  };
  return (
    <>
      <div
        className={`${styles.authContainer} ${
          isRightPanelActive ? styles.rightPanelActive : ""
        }`}
        id="container"
      >
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form id="signUpForm" onSubmit={handleSignUpSubmit}>
            <div className={styles.logo}>
              RE<span>TASTE</span>
            </div>
            <h1>Tạo tài khoản</h1>
            <div className={styles.socialContainer}>
              <a href="#" className={styles.social}>
                📘
              </a>
              <a href="#" className={styles.social}>
                📧
              </a>
              <a href="#" className={styles.social}>
                🔗
              </a>
            </div>
            <span>hoặc sử dụng email để đăng ký</span>
            <input
              type="text"
              placeholder="Họ và tên"
              name="name"
              value={signUpForm.name}
              onChange={handleSignUpChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={signUpForm.email}
              onChange={handleSignUpChange}
              required
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              name="phone"
              value={signUpForm.phone}
              onChange={handleSignUpChange}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={signUpForm.password}
              onChange={handleSignUpChange}
              required
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              name="confirmPassword"
              value={signUpForm.confirmPassword}
              onChange={handleSignUpChange}
              required
            />
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={signUpForm.agreeTerms}
                onChange={handleSignUpChange}
                required
              />
              <label htmlFor="agreeTerms">
                Tôi đồng ý với các điều khoản và chính sách
              </label>
            </div>
            {signUpError && (
              <div className={styles.errorMessage}>{signUpError}</div>
            )}
            {signUpSuccess && (
              <div className={styles.successMessage}>{signUpSuccess}</div>
            )}
            <button type="submit">Đăng ký</button>
            <div className={styles.mobileToggle}>
              <button type="button" onClick={toggleForm}>
                Đã có tài khoản? Đăng nhập
              </button>
            </div>
          </form>
        </div>

        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form id="signInForm" onSubmit={handleSignInSubmit}>
            <div className={styles.logo}>
              RE<span>TASTE</span>
            </div>
            <h1>Đăng nhập</h1>
            <div className={styles.socialContainer}>
              <a href="#" className={styles.social}>
                📘
              </a>
              <a href="#" className={styles.social}>
                📧
              </a>
              <a href="#" className={styles.social}>
                🔗
              </a>
            </div>
            <span>hoặc sử dụng tài khoản của bạn</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={signInForm.email}
              onChange={handleSignInChange}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={signInForm.password}
              onChange={handleSignInChange}
              required
            />
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={signInForm.rememberMe}
                onChange={handleSignInChange}
              />
              <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
            </div>
            {signInError && (
              <div className={styles.errorMessage}>{signInError}</div>
            )}
            {signInSuccess && (
              <div className={styles.successMessage}>{signInSuccess}</div>
            )}
            <button type="submit">Đăng nhập</button>
            <a href="#" className={styles.forgotPassword}>
              Quên mật khẩu?
            </a>
            <div className={styles.mobileToggle}>
              <button type="button" onClick={toggleForm}>
                Chưa có tài khoản? Đăng ký ngay
              </button>
            </div>
          </form>
        </div>

        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={styles.foodIcons}>
              <div className={styles.foodIcon}>🍕</div>
              <div className={styles.foodIcon}>🍔</div>
              <div className={styles.foodIcon}>🥗</div>
              <div className={styles.foodIcon}>🧋</div>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1>Chào mừng trở lại!</h1>
              <p>
                Đăng nhập để tiếp tục khám phá những hương vị yêu thích và nhận
                gợi ý món ăn cá nhân hóa
              </p>
              <button className={styles.ghost} onClick={toggleForm}>
                Đăng nhập
              </button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1>Xin chào!</h1>
              <p>
                Đăng ký tài khoản để bắt đầu hành trình khám phá ẩm thực tuyệt
                vời cùng RETASTE
              </p>
              <button className={styles.ghost} onClick={toggleForm}>
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
