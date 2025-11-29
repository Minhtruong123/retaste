// import { useApi } from "../hooks/use_api";
// import qs from "qs";

// const api = useApi();

// export const getListProduct = async (query = {}) => {
//   try {
//     const processedQuery = {
//       ...query,
//       sortOrder: query.sortValue,
//       sortValue: undefined,
//     };

//     const queryString = qs.stringify(processedQuery, {
//       encode: false,
//       skipNulls: true,
//     });

//     const url = `/product/list-product${queryString ? `?${queryString}` : ""}`;

//     const { data } = await api.get(url);

//     return data.metadata || data;
//   } catch (error) {
//     throw error.response?.data?.message || "Lấy danh sách sản phẩm thất bại";
//   }
// };

// export const createProductAdmin = async (productData) => {
//   try {
//     const { data } = await api.post("/product/create", productData);
//     return data.metadata || data;
//   } catch (error) {
//     throw error.response?.data?.message || "Tạo sản phẩm thất bại";
//   }
// };

// export const updateProductAdmin = async (productId, productData) => {
//   try {
//     const { data } = await api.patch(
//       `/product/update/${productId}`,
//       productData
//     );
//     return data.metadata || data;
//   } catch (error) {
//     throw error.response?.data?.message || "Cập nhật sản phẩm thất bại";
//   }
// };

// export const deleteProductAdmin = async (productId) => {
//   try {
//     const { data } = await api.delete(`/product/delete/${productId}`);
//     return data.metadata || data;
//   } catch (error) {
//     throw error.response?.data?.message || "Xóa sản phẩm thất bại";
//   }
// };

// export const getDetailProduct = async (productId) => {
//   try {
//     const data = await api.get(`/product/detail/${productId}`);
//     console.log(data.data.metadata);

//     return data.data.metadata;
//   } catch (error) {
//     throw error.response?.data?.message || "Lấy chi tiết sản phẩm thất bại";
//   }
// };

// export const getRetasteProducts = async () => {
//   try {
//     const { data } = await api.get("/product/retaste");

//     console.log("Retaste response:", data);
//     const products = data.metadata ?? data;

//     if (Array.isArray(products)) {
//       return products;
//     }

//     return [];
//   } catch (error) {
//     console.warn(
//       "Không lấy được retaste (có thể chưa có đơn):",
//       error.response?.data || error.message
//     );
//     return [];
//   }
// };
