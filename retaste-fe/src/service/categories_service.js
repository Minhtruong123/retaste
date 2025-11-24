import api from "./api";

export const getListCategory = async (query = {}) => {
  try {
    const { data } = await api.get("/category/list-category", {
      params: query,
    });
    console.log(data);

    return data.metadata || [];
  } catch (error) {
    throw error.response?.data?.message || "Lấy danh mục thất bại";
  }
};
