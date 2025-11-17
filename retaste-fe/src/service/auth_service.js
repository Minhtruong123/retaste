import axios from "axios";
import api from "./api";

export const register = async (values) => {
  try {
    await api.post("/access/register", {
      ...values,
    });
  } catch (error) {
    throw error.response?.data?.message || "Đăng ký thất bại";
  }
};

export const login = async (values) => {
  try {
    const { data } = await api.post("/access/login", {
      ...values,
    });

    const { accessToken, refreshToken, user } = data.metadata;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    return data;
  } catch (error) {
    throw error.response?.data?.message || "Đăng nhập thất bại";
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Logout API error:", error);
  } finally {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/auth";
  }
};

export const verifyAccount = async (token) => {
  try {
    const { data } = await api.put("/access/verify-account", {
      verifyToken: token,
    });
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Xác minh thất bại";
  }
};
