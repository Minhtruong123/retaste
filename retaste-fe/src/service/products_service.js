import api from "./api";
import qs from "qs";

export const getListProduct = async (query = {}) => {
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

    const url = `/product/list-product${queryString ? `?${queryString}` : ""}`;

    const { data } = await api.get(url);
    console.log(data);

    return data.metadata || data;
  } catch (error) {
    throw error.response?.data?.message || "Lấy danh sách sản phẩm thất bại";
  }
};

export const createProductAdmin = async (productData) => {
  try {
    const { data } = await api.post("/product/create", productData);
    return data.metadata || data;
  } catch (error) {
    throw error.response?.data?.message || "Tạo sản phẩm thất bại";
  }
};

export const updateProductAdmin = async (productId, productData) => {
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

export const deleteProductAdmin = async (productId) => {
  try {
    const { data } = await api.delete(`/product/delete/${productId}`);
    return data.metadata || data;
  } catch (error) {
    throw error.response?.data?.message || "Xóa sản phẩm thất bại";
  }
};

export const getProductDetailAdmin = async (productId) => {
  try {
    const { data } = await api.get(`/product/detail/${productId}`);
    return data.metadata || data;
  } catch (error) {
    throw error.response?.data?.message || "Lấy chi tiết sản phẩm thất bại";
  }
};
