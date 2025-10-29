import React, { useState } from "react";
import styles from "./AuthForm.module.css";

export default function AuthForm() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signInSuccess, setSignInSuccess] = useState("");

  const handleToggle = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setSignUpError("");
    setSignUpSuccess("");

    const { name, email, password, confirmPassword, agreeTerms } = signUpData;

    if (!name || !email || !password || !confirmPassword) {
      setSignUpError("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (password !== confirmPassword) {
      setSignUpError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (password.length < 6) {
      setSignUpError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (!agreeTerms) {
      setSignUpError("Vui lòng đồng ý với các điều khoản");
      return;
    }

    setSignUpSuccess("Đăng ký thành công! Chuyển đến trang đăng nhập...");
    setTimeout(() => {
      setIsRightPanelActive(false);
      e.target.reset();
      setSignUpData({
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
    setSignInError("");
    setSignInSuccess("");

    const { email, password } = signInData;

    if (!email || !password) {
      setSignInError("Vui lòng nhập email và mật khẩu");
      return;
    }

    setSignInSuccess("Đăng nhập thành công! Đang chuyển hướng...");
    setTimeout(() => {
      alert("Đăng nhập thành công! Sẽ chuyển về trang chủ.");
      e.target.reset();
      setSignInData({ email: "", password: "", rememberMe: false });
      setSignInSuccess("");
    }, 2000);
  };
  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #2a9d8f 0%, #ff6b35 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          className={`${styles.authContainer} ${
            isRightPanelActive ? styles.rightPanelActive : ""
          }`}
          id="container"
        >
          <FoodIcons />

          <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
            <form onSubmit={handleSignUpSubmit} id="signUpForm">
              <div className={styles.logo}>
                RE<span>TASTE</span>
              </div>
              <h1>Tạo tài khoản</h1>
              <div className={styles.socialContainer}>
                <a href="#" className={styles.social}>
                  Book
                </a>
                <a href="#" className={styles.social}>
                  Email
                </a>
                <a href="#" className={styles.social}>
                  Link
                </a>
              </div>
              <span>hoặc sử dụng email để đăng ký</span>
              <input
                type="text"
                placeholder="Họ và tên"
                onChange={(e) =>
                  setSignUpData({ ...signUpData, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                required
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                onChange={(e) =>
                  setSignUpData({ ...signUpData, phone: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      agreeTerms: e.target.checked,
                    })
                  }
                  required
                />
                <label htmlFor="agreeTerms">
                  Tôi đồng ý với các điều khoản và chính sách
                </label>
              </div>
              <div
                className={styles.errorMessage}
                style={{ display: signUpError ? "block" : "none" }}
              >
                {signUpError}
              </div>
              <div
                className={styles.successMessage}
                style={{ display: signUpSuccess ? "block" : "none" }}
              >
                {signUpSuccess}
              </div>
              <button type="submit">Đăng ký</button>
              <div className={styles.mobileToggle}>
                <button type="button" onClick={handleToggle}>
                  Đã có tài khoản? Đăng nhập
                </button>
              </div>
            </form>
          </div>

          {/* Sign In Form */}
          <div className={`${styles.formContainer} ${styles.signInContainer}`}>
            <form onSubmit={handleSignInSubmit} id="signInForm">
              <div className={styles.logo}>
                RE<span>TASTE</span>
              </div>
              <h1>Đăng nhập</h1>
              <div className={styles.socialContainer}>
                <a href="#" className={styles.social}>
                  Book
                </a>
                <a href="#" className={styles.social}>
                  Email
                </a>
                <a href="#" className={styles.social}>
                  Link
                </a>
              </div>
              <span>hoặc sử dụng tài khoản của bạn</span>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setSignInData({ ...signInData, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) =>
                  setSignInData({ ...signInData, password: e.target.value })
                }
                required
              />
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  onChange={(e) =>
                    setSignInData({
                      ...signInData,
                      rememberMe: e.target.checked,
                    })
                  }
                />
                <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
              </div>
              <div
                className={styles.errorMessage}
                style={{ display: signInError ? "block" : "none" }}
              >
                {signInError}
              </div>
              <div
                className={styles.successMessage}
                style={{ display: signInSuccess ? "block" : "none" }}
              >
                {signInSuccess}
              </div>
              <button type="submit">Đăng nhập</button>
              <a href="#" className={styles.forgotPassword}>
                Quên mật khẩu?
              </a>
              <div className={styles.mobileToggle}>
                <button type="button" onClick={handleToggle}>
                  Chưa có tài khoản? Đăng ký ngay
                </button>
              </div>
            </form>
          </div>

          {/* Overlay */}
          <div className={styles.overlayContainer}>
            <div className={styles.overlay}>
              <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                <h1>Chào mừng trở lại!</h1>
                <p>
                  Đăng nhập để tiếp tục khám phá những hương vị yêu thích và
                  nhận gợi ý món ăn cá nhân hóa
                </p>
                <button className={styles.ghost} onClick={handleToggle}>
                  Đăng nhập
                </button>
              </div>
              <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                <h1>Xin chào!</h1>
                <p>
                  Đăng ký tài khoản để bắt đầu hành trình khám phá ẩm thực tuyệt
                  vời cùng RETASTE
                </p>
                <button className={styles.ghost} onClick={handleToggle}>
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
