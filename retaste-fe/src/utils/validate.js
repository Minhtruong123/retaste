const EMAIL_RULE = /^[\w.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_RULE =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]).{6,}$/;

export const validateAuth = {
  email: (value) =>
    EMAIL_RULE.test(value) ? "" : "Email không đúng định dạng",

  phone(phone) {
    if (!phone) return null;
    if (!/^(0|\+84)[0-9]{9}$/.test(phone)) return "Số điện thoại không hợp lệ";
    return null;
  },

  password: (value) =>
    PASSWORD_RULE.test(value)
      ? ""
      : "Mật khẩu phải có chữ in hoa và ký tự đặc biệt, tối thiểu 6 ký tự",

  confirm: (password, confirm) =>
    password === confirm ? "" : "Mật khẩu nhập lại không khớp",
};
