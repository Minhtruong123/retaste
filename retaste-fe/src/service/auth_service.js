import axios from "axios";
import api from "./api";

export const register = async (values) => {
  try {
    await api.post("/access/register", {
      ...values,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (values) => {
  try {
    const { data } = await axios.post("http://localhost:8017/api/v1/access/login", {
      ...values,
    });

    const { accessToken, refreshToken, user } = data.metadata;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  await api.post("/auth/logout");
  localStorage.clear();
  window.location.href = "/login";
};
