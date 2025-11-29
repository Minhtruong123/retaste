import { useAuth } from "../context/AuthContext";
import qs from "qs";

export const useProductService = () => {
  const { api } = useAuth(); 

  const getListProduct = async (query = {}) => {
    try {
      const processedQuery = {
        ...query,
        sortOrder: query.sortValue,
        sortValue: undefined,
      };

      const queryString = qs.stringify(processedQuery, {
        encode: false,
        skipNulls: true,
      });

      const url = `/product/list-product${
        queryString ? `?${queryString}` : ""
      }`;
      const { data } = await api.get(url);

      return data.metadata || data;
    } catch (error) {
      throw error.response?.data?.message || "Lấy danh sách sản phẩm thất bại";
    }
  };

  const createProductAdmin = async (productData) => {
    try {
      const { data } = await api.post("/product/create", productData);
      return data.metadata || data;
    } catch (error) {
      throw error.response?.data?.message || "Tạo sản phẩm thất bại";
    }
  };

  const updateProductAdmin = async (productId, productData) => {
    try {
      const { data } = await api.patch(
        `/product/update/${productId}`,
        productData
      );
      return data.metadata || data;
    } catch (error) {
      throw error.response?.data?.message || "Cập nhật sản phẩm thất bại";
    }
  };

  const deleteProductAdmin = async (productId) => {
    try {
      const { data } = await api.delete(`/product/delete/${productId}`);
      return data.metadata || data;
    } catch (error) {
      throw error.response?.data?.message || "Xóa sản phẩm thất bại";
    }
  };

  const getDetailProduct = async (productId) => {
    try {
      const { data } = await api.get(`/product/detail/${productId}`);
      return data.data.metadata;
    } catch (error) {
      throw error.response?.data?.message || "Lấy chi tiết sản phẩm thất bại";
    }
  };

  const getRetasteProducts = async () => {
    try {
      const { data } = await api.get("/product/retaste");
      const products = data.metadata ?? data;

      return Array.isArray(products) ? products : [];
    } catch (error) {
      console.warn(
        "Không lấy được món Retaste:",
        error.response?.data || error.message
      );
      return [];
    }
  };

  return {
    getListProduct,
    createProductAdmin,
    updateProductAdmin,
    deleteProductAdmin,
    getDetailProduct,
    getRetasteProducts,
  };
};
