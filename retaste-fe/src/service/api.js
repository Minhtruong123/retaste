import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8017/api/v1",
  withCredentials: false,
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user?._id) {
          config.headers["x-client-id"] = user._id;
        }
      } catch (e) {
        console.warn("Lỗi parse user từ localStorage");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      const userStr = localStorage.getItem("user");

      if (!refreshToken || !userStr) {
        console.log("Thiếu refreshToken hoặc user → chuyển hướng login");
        logoutUser();
        return Promise.reject(err);
      }

      let user;
      try {
        user = JSON.parse(userStr);
      } catch (e) {
        console.warn("Parse user thất bại → logout");
        logoutUser();
        return Promise.reject(err);
      }

      if (!user?._id) {
        console.log("Chưa có user._id → không refresh, chờ load lại trang");
        return Promise.reject(err);
      }

      try {
        console.log("Đang refresh token...");

        const { data } = await axios.post(
          "http://localhost:8017/api/v1/access/refresh-token",
          {},
          {
            headers: {
              "x-rtoken-id": refreshToken,
              "x-client-id": user._id,
            },
          }
        );

        const { accessToken, refreshToken: newRefreshToken } =
          data.metadata || data;

        localStorage.setItem("accessToken", accessToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers["x-client-id"] = user._id;

        console.log("Refresh token thành công! Thử lại request...");
        return api(originalRequest);
      } catch (e) {
        console.error("Refresh token thất bại:", e.response?.data || e.message);
        logoutUser();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  }
);

export const logoutUser = (redirectTo = "/auth") => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  const currentPath = window.location.pathname + window.location.search;
  const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(
    currentPath
  )}`;

  window.location.href = redirectUrl;
};

export default api;
