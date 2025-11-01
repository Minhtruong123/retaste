import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return Promise.reject(err);

      try {
        const { data } = await axios.post(
          "http://localhost:8080/api/auth/refresh-token",
          { refreshToken }
        );

        localStorage.setItem("accessToken", data.metadata.accessToken);
        localStorage.setItem("refreshToken", data.metadata.refreshToken);

        err.config.headers.Authorization = `Bearer ${data.metadata.accessToken}`;
        return api(err.config);
      } catch {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
