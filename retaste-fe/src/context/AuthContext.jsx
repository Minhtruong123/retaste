import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshTokenPromise = useRef(null);
  const logoutRef = useRef(null);

  const api = useRef(
    axios.create({
      baseURL: "http://localhost:8017/api/v1",
      timeout: 15000,
    })
  ).current;

  const refreshAxios = useRef(
    axios.create({
      baseURL: "http://localhost:8017/api/v1",
      timeout: 15000,
    })
  ).current;

  const authDataRef = useRef({ accessToken: null, user: null });
  useEffect(() => {
    authDataRef.current = { accessToken, user };
  }, [accessToken, user]);

  useEffect(() => {
    const reqIntercept = api.interceptors.request.use((config) => {
      const token = authDataRef.current.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      const userId = authDataRef.current.user?._id;
      if (userId) {
        config.headers["x-client-id"] = userId;
      }
      return config;
    });

    const resIntercept = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 410 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem("refreshToken");
          const storedUser = JSON.parse(localStorage.getItem("user") || "null");
          if (!refreshToken || !storedUser?._id) {
            logoutRef.current?.();
            return Promise.reject(error);
          }

          if (!refreshTokenPromise.current) {
            refreshTokenPromise.current = refreshAxios
              .post(
                "/access/refresh-token",
                {},
                {
                  headers: {
                    "x-rtoken-id": refreshToken,
                    "x-client-id": storedUser._id,
                  },
                }
              )
              .finally(() => {
                refreshTokenPromise.current = null;
              });
          }

          try {
            const { data } = await refreshTokenPromise.current;
            const newAccessToken = data.metadata.accessToken;
            const newRefreshToken = data.metadata.refreshToken;

            if (!newAccessToken) {
              throw new Error("Missing new access token");
            }

            localStorage.setItem("accessToken", newAccessToken);
            if (newRefreshToken) {
              localStorage.setItem("refreshToken", newRefreshToken);
            }

            authDataRef.current.accessToken = newAccessToken;
            setAccessToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            logoutRef.current?.();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqIntercept);
      api.interceptors.response.eject(resIntercept);
    };
  }, [api, refreshAxios]);

  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("user");
        const savedRole = localStorage.getItem("role");

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setAccessToken(token);
          setUser(parsedUser);
          if (savedRole) setRole(savedRole);
        }
      } catch (err) {
        console.warn("Lỗi load auth:", err);
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setAccessToken(null);
    setUser(null);
    setRole(null);
    window.location.href = "/auth";
  }, []);

  logoutRef.current = logout;

  const login = async (values) => {
    const { data } = await api.post("/access/login", values);
    const { accessToken, refreshToken, user: userFromBE } = data.metadata;

    let finalUser = { ...userFromBE };
    let finalRole = null;

    if (!finalUser._id && accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        finalUser._id = decoded.userId || decoded.id;
        finalRole = decoded.role;
      } catch (e) {
        console.warn("Decode token thất bại");
      }
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(finalUser));
    if (finalRole) localStorage.setItem("role", finalRole);

    setAccessToken(accessToken);
    setUser(finalUser);
    setRole(finalRole);

    return data;
  };

  const handleLogout = async () => {
    try {
      await api.post("/access/logout");
    } catch (err) {
      console.error("Gọi logout API lỗi:", err);
    } finally {
      logout();
    }
  };

  const value = {
    user,
    role,
    loading,
    accessToken,
    api,
    login,
    logout: handleLogout,
    register: (values) => api.post("/access/register", values),
    verifyAccount: (token) =>
      api.put("/access/verify-account", { verifyToken: token }),
    isAuthenticated: !!user && !!accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
