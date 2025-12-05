import { useAuth } from "../context/AuthContext";

export const useCategoryService = () => {
  const { api } = useAuth();

  const getListCategory = async (query = {}) => {
    try {
      const { data } = await api.get("/category/list-category", {
        params: query,
      });
      console.log(data.metadata);

      return data.metadata || [];
    } catch (error) {
      throw error.response?.data?.message || "Lấy danh mục thất bại";
    }
  };

  const createCategory = async (formData) => {
    try {
      const { data } = await api.post("/category/create", formData);
      return data;
    } catch (error) {
      console.error("Lỗi tạo danh mục:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Tạo danh mục thất bại");
    }
  };

  const updateCategory = async (id, formData) => {
    try {
      const { data } = await api.put(`/category/update/${id}`, formData);
      return data;
    } catch (error) {
      console.error("Lỗi cập nhật:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Cập nhật thất bại");
    }
  };

  const deleteCategory = async (id) => {
    try {
      console.log(id);
      const { data } = await api.delete(`/category/delete/${id}`);
      return data;
    } catch (error) {
      console.error("Lỗi xóa:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Xóa thất bại");
    }
  };

  return {
    getListCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
