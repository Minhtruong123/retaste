import api from "./api";

export const addToCart = async (cartData) => {
  try {
    const { data } = await api.post("/cart/add-to-cart", cartData);
    return data.metadata || data;
  } catch (error) {
    throw error.response?.data?.message || "Thêm vào giỏ hàng thất bại";
  }
};

export const getCartDetail = async () => {
  try {
    const { data } = await api.get("/cart/get-detail");

    return data.metadata || data;
  } catch (error) {
    throw error.response?.data?.message || "Lấy giỏ hàng thất bại";
  }
};

export const updateCartQuantity = async (productId, createdAt) => {
  try {
    const isoString =
      typeof createdAt === "string"
        ? createdAt
        : new Date(createdAt).toISOString();
    const { data } = await api.put("/cart/update-quantity", {
      productId,
      createdAt: isoString,
    });
    return data.metadata || data;
  } catch (error) {
    throw error.response?.data?.message || "Cập nhật số lượng thất bại";
  }
};

export const removeFromCart = async (productId, createdAt) => {
  try {
    const isoString = new Date(createdAt).toISOString();
    console.log(isoString);

    const { data } = await api.delete("/cart/remove-product", {
      data: {
        productId,
        createdAt: isoString,
      },
    });
    return data.metadata || data;
  } catch (error) {
    throw error.response?.data?.message || "Xóa sản phẩm thất bại";
  }
};
