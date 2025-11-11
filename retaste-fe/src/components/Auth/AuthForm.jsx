import React, { useState, useEffect } from "react";
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
    gender: "male",
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSignUpError("");
      setSignInError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [signUpError, signInError]);

  const toggleForm = () => {
    setIsRightPanelActive(!isRightPanelActive);
    setSignUpError("");
    setSignInError("");
    setSignUpSuccess("");
    setSignInSuccess("");
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
    setIsLoading(true);
    setSignUpError("");
    setSignUpSuccess("");

    const emailErr = validateAuth.email(signUpForm.email);
    if (emailErr) {
      setSignUpError(emailErr);
      setIsLoading(false);
      return;
    }

    const phoneErr = validateAuth.phone(signUpForm.phoneNumber);
    if (phoneErr) {
      setSignUpError(phoneErr);
      setIsLoading(false);
      return;
    }

    const passErr = validateAuth.password(signUpForm.password);
    if (passErr) {
      setSignUpError(passErr);
      setIsLoading(false);
      return;
    }

    const confirmErr = validateAuth.confirm(
      signUpForm.password,
      signUpForm.confirmPassword
    );
    if (confirmErr) {
      setSignUpError(confirmErr);
      setIsLoading(false);
      return;
    }

    if (!signUpForm.agreeTerms) {
      setSignUpError("Vui lòng đồng ý với điều khoản dịch vụ");
      setIsLoading(false);
      return;
    }

    try {
      await authService.register({
        fullName: signUpForm.fullName,
        email: signUpForm.email,
        phoneNumber: signUpForm.phoneNumber,
        // gender: signUpForm.gender,
        // gender: ""
        password: signUpForm.password,
      });

      setSignUpSuccess(
        "Đăng ký thành công! Kiểm tra email để xác thực tài khoản."
      );
      setTimeout(() => setIsRightPanelActive(false), 2000);
    } catch (err) {
      setSignUpError(err?.message ?? "Đăng ký thất bại. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSignInError("");
    setSignInSuccess("");

    try {
      await authService.login({
        email: signInForm.email,
        password: signInForm.password,
      });

      setSignInSuccess("Đăng nhập thành công! Đang chuyển hướng...");
      setTimeout(() => (window.location.href = "/"), 1500);
    } catch (err) {
      setSignInError(
        err?.message ?? "Thông tin đăng nhập không chính xác. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div
        className={`${styles.authContainer} ${
          isRightPanelActive ? styles.rightPanelActive : ""
        }`}
      >
        {/* Sign Up Form */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form id="signUpForm" onSubmit={handleSignUpSubmit}>
            <div className={styles.brandLogo}>
              RE<span>TASTE</span>
            </div>
            <h1 className={styles.formTitle}>Tạo tài khoản</h1>
            <div className={styles.socialContainer}>
              <a href="#" className={styles.socialButton} aria-label="Facebook">
                <i className={styles.facebookIcon}>📘</i>
              </a>
              <a href="#" className={styles.socialButton} aria-label="Google">
                <i className={styles.googleIcon}>📧</i>
              </a>
              <a href="#" className={styles.socialButton} aria-label="LinkedIn">
                <i className={styles.linkedinIcon}>🔗</i>
              </a>
            </div>
            <span className={styles.formDivider}>
              hoặc sử dụng email để đăng ký
            </span>

            <div className={styles.formField}>
              <input
                type="text"
                placeholder="Họ và tên"
                name="fullName"
                value={signUpForm.fullName}
                onChange={handleSignUpChange}
                required
                autoComplete="name"
                className={styles.formInput}
              />
              <label className={styles.formLabel}>Họ và tên</label>
            </div>

            <div className={styles.formField}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signUpForm.email}
                onChange={handleSignUpChange}
                required
                autoComplete="email"
                className={styles.formInput}
              />
              <label className={styles.formLabel}>Email</label>
            </div>

            <div className={styles.formField}>
              <input
                type="tel"
                placeholder="Số điện thoại"
                name="phoneNumber"
                value={signUpForm.phoneNumber}
                onChange={handleSignUpChange}
                autoComplete="tel"
                className={styles.formInput}
              />
              <label className={styles.formLabel}>Số điện thoại</label>
            </div>

            <div className={styles.formField}>
              <select
                name="gender"
                value={signUpForm.gender}
                onChange={handleSignUpChange}
                className={`${styles.formSelect} ${
                  signUpForm.gender ? styles.hasValue : ""
                }`}
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className={styles.formField}>
              <input
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={signUpForm.password}
                onChange={handleSignUpChange}
                required
                autoComplete="new-password"
                className={styles.formInput}
              />
              <label className={styles.formLabel}>Mật khẩu</label>
            </div>

            <div className={styles.formField}>
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                name="confirmPassword"
                value={signUpForm.confirmPassword}
                onChange={handleSignUpChange}
                required
                autoComplete="new-password"
                className={styles.formInput}
              />
              <label className={styles.formLabel}>Xác nhận mật khẩu</label>
            </div>

            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={signUpForm.agreeTerms}
                onChange={handleSignUpChange}
                required
                className={styles.checkboxInput}
              />
              <label htmlFor="agreeTerms" className={styles.checkboxLabel}>
                Tôi đồng ý với{" "}
                <a href="#" className={styles.textLink}>
                  điều khoản
                </a>{" "}
                và{" "}
                <a href="#" className={styles.textLink}>
                  chính sách
                </a>
              </label>
            </div>

            {signUpError && (
              <div className={styles.errorAlert}>
                <i className={styles.errorIcon}>⚠️</i>
                {signUpError}
              </div>
            )}
            {signUpSuccess && (
              <div className={styles.successAlert}>
                <i className={styles.successIcon}>✓</i>
                {signUpSuccess}
              </div>
            )}

            <button
              type="submit"
              className={`${styles.submitButton} ${
                isLoading ? styles.loadingButton : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng ký"}
            </button>

            <div className={styles.mobileFormToggle}>
              <p className={styles.toggleText}>Đã có tài khoản?</p>
              <button
                type="button"
                onClick={toggleForm}
                className={styles.toggleLink}
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form id="signInForm" onSubmit={handleSignInSubmit}>
            <div className={styles.brandLogo}>
              RE<span>TASTE</span>
            </div>
            <h1 className={styles.formTitle}>Đăng nhập</h1>
            <div className={styles.socialContainer}>
              <a href="#" className={styles.socialButton} aria-label="Facebook">
                <i className={styles.facebookIcon}>📘</i>
              </a>
              <a href="#" className={styles.socialButton} aria-label="Google">
                <i className={styles.googleIcon}>📧</i>
              </a>
              <a href="#" className={styles.socialButton} aria-label="LinkedIn">
                <i className={styles.linkedinIcon}>🔗</i>
              </a>
            </div>
            <span className={styles.formDivider}>
              hoặc sử dụng tài khoản của bạn
            </span>

            <div className={styles.formField}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signInForm.email}
                onChange={handleSignInChange}
                required
                autoComplete="email"
                className={styles.formInput}
              />
              <label className={styles.formLabel}>Email</label>
            </div>

            <div className={styles.formField}>
              <input
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={signInForm.password}
                onChange={handleSignInChange}
                required
                autoComplete="current-password"
                className={styles.formInput}
              />
              <label className={styles.formLabel}>Mật khẩu</label>
            </div>

            <div className={styles.loginOptions}>
              <div className={styles.checkboxField}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={signInForm.rememberMe}
                  onChange={handleSignInChange}
                  className={styles.checkboxInput}
                />
                <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <a href="#" className={styles.forgotPasswordLink}>
                Quên mật khẩu?
              </a>
            </div>

            {signInError && (
              <div className={styles.errorAlert}>
                <i className={styles.errorIcon}>⚠️</i>
                {signInError}
              </div>
            )}
            {signInSuccess && (
              <div className={styles.successAlert}>
                <i className={styles.successIcon}>✓</i>
                {signInSuccess}
              </div>
            )}

            <button
              type="submit"
              className={`${styles.submitButton} ${
                isLoading ? styles.loadingButton : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            <div className={styles.mobileFormToggle}>
              <p className={styles.toggleText}>Chưa có tài khoản?</p>
              <button
                type="button"
                onClick={toggleForm}
                className={styles.toggleLink}
              >
                Đăng ký ngay
              </button>
            </div>
          </form>
        </div>

        {/* Overlay Container */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlayBackground}>
            <div className={styles.foodIconsContainer}>
              <div className={styles.foodIcon}>🍕</div>
              <div className={styles.foodIcon}>🍔</div>
              <div className={styles.foodIcon}>🥗</div>
              <div className={styles.foodIcon}>🧋</div>
              <div className={styles.foodIcon}>🍰</div>
              <div className={styles.foodIcon}>🍜</div>
            </div>

            <div
              className={`${styles.overlayPanel} ${styles.overlayPanelLeft}`}
            >
              <h1 className={styles.overlayTitle}>Chào mừng trở lại!</h1>
              <p className={styles.overlayDescription}>
                Đăng nhập để tiếp tục khám phá những hương vị yêu thích và nhận
                gợi ý món ăn cá nhân hóa dành riêng cho bạn
              </p>
              <button
                className={styles.ghostButton}
                onClick={toggleForm}
                type="button"
              >
                Đăng nhập ngay
              </button>
            </div>

            <div
              className={`${styles.overlayPanel} ${styles.overlayPanelRight}`}
            >
              <h1 className={styles.overlayTitle}>Xin chào bạn mới!</h1>
              <p className={styles.overlayDescription}>
                Đăng ký tài khoản để bắt đầu hành trình khám phá ẩm thực tuyệt
                vời cùng RETASTE và cộng đồng yêu ẩm thực
              </p>
              <button
                className={styles.ghostButton}
                onClick={toggleForm}
                type="button"
              >
                Tham gia ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
