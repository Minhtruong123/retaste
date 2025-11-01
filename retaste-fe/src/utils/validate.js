export const validateAuth = {
  email(email) {
    if (!email) return "Vui lòng nhập email";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Email không hợp lệ";
    return null;
  },

  phone(phone) {
    if (!phone) return null;
    if (!/^(0|\+84)[0-9]{9}$/.test(phone)) return "Số điện thoại không hợp lệ";
    return null;
  },

  password(password) {
    if (!password) return "Vui lòng nhập mật khẩu";
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/.test(password))
      return "Mật khẩu phải gồm chữ hoa, chữ thường và số, tối thiểu 6 ký tự";
    return null;
  },

  confirm(pw, confirmPw) {
    if (!confirmPw) return "Vui lòng nhập xác nhận mật khẩu";
    if (pw !== confirmPw) return "Mật khẩu xác nhận không khớp";
    return null;
  },
};
