import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8017/api/v1",
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
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!refreshToken || !user?._id) return Promise.reject(err);

      try {
        const { data } = await axios.post(
          "http://localhost:8017/api/v1/access/refresh-token",
          {},
          {
            headers: {
              "x-rt": refreshToken,
              "x-client-id": user._id,
            },
          }
        );

        localStorage.setItem("accessToken", data.metadata.accessToken);
        localStorage.setItem("refreshToken", data.metadata.refreshToken);

        err.config.headers.Authorization = `Bearer ${data.metadata.accessToken}`;
        return api(err.config);
      } catch (e) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
