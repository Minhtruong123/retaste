import api from "./api";

export const getListProduct = async (query = {}) => {
  try {
    const { data } = await api.get("/product/list-product", {
      params: query,
    });

    return data.metadata;
  } catch (error) {
    throw error.response?.data?.message || "Lấy danh sách sản phẩm thất bại";
  }
};
