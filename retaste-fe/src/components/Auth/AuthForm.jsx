import React, { useState } from "react";
import styles from "./AuthForm.module.css";
import * as authService from "../../service/auth_service";
import { validateAuth } from "../../utils/validate";

export default function AuthForm() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    gender: "",
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

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    setSignUpError("");
    setSignUpSuccess("");

    const emailErr = validateAuth.email(signUpForm.email);
    if (emailErr) return setSignUpError(emailErr);

    const phoneErr = validateAuth.phone(signUpForm.phoneNumber);
    if (phoneErr) return setSignUpError(phoneErr);

    const passErr = validateAuth.password(signUpForm.password);
    if (passErr) return setSignUpError(passErr);

    const confirmErr = validateAuth.confirm(
      signUpForm.password,
      signUpForm.confirmPassword
    );
    if (confirmErr) return setSignUpError(confirmErr);

    if (!signUpForm.agreeTerms)
      return setSignUpError("Vui lòng đồng ý điều khoản");

    try {
      await authService.register({
        fullName: signUpForm.fullName,
        email: signUpForm.email,
        phoneNumber: signUpForm.phoneNumber,
        gender: signUpForm.gender,
        password: signUpForm.password,
      });

      setSignUpSuccess("Đăng ký thành công! Kiểm tra email để xác thực.");
      setTimeout(() => setIsRightPanelActive(false), 1500);
    } catch (err) {
      setSignUpError(err?.message ?? "Đăng ký thất bại");
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      await authService.login({
        email: signInForm.email,
        password: signInForm.password,
      });

      setSignInSuccess("Đăng nhập thành công!");
      setTimeout(() => (window.location.href = "/"), 1000);
    } catch (err) {
      setSignInError(err?.message ?? "Đăng nhập thất bại");
    }
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
              name="fullName"
              value={signUpForm.fullName}
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
              name="phoneNumber"
              value={signUpForm.phoneNumber}
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
