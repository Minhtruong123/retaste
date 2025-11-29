// export const getListCategory = async (query = {}) => {
//   try {
//     const { data } = await api.get("/category/list-category", {
//       params: query,
//     });
//     console.log(data);

//     return data.metadata || [];
//   } catch (error) {
//     throw error.response?.data?.message || "Lấy danh mục thất bại";
//   }
// };

// export const createCategory = async (formData) => {
//   try {
//     console.log(formData);

//     const { data } = await api.post("/category/create", formData);
//     return data;
//   } catch (error) {
//     console.error("Lỗi tạo danh mục:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || "Tạo danh mục thất bại");
//   }
// };

// export const updateCategory = async (id, formData) => {
//   try {
//     const { data } = await api.put(`/category/update/${id}`, formData);
//     return data;
//   } catch (error) {
//     console.error(
//       "Lỗi cập nhật danh mục:",
//       error.response?.data || error.message
//     );
//     throw new Error(
//       error.response?.data?.message || "Cập nhật danh mục thất bại"
//     );
//   }
// };

// export const deleteCategory = async (id) => {
//   try {
//     const { data } = await api.delete(`/category/delete/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Lỗi xóa danh mục:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || "Xóa danh mục thất bại");
//   }
// };
