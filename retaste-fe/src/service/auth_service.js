import axios from "axios";
import api from "./api";
import { jwtDecode } from "jwt-decode";

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

    let userWithId = { ...user };

    if (!userWithId._id) {
      try {
        const decodedToken = jwtDecode(accessToken);
        userWithId._id = decodedToken.userId;
      } catch (e) {
        console.warn("Không decode được token để lấy _id");
      }
    }
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(userWithId));

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
