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
  await api.post("/auth/logout");
  localStorage.clear();
  window.location.href = "/auth";
};
