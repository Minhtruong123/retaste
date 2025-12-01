import { useAuth } from "../context/AuthContext";

export const useCartService = () => {
  const { api } = useAuth();

  const addToCart = async (cartData) => {
    try {
      const { data } = await api.post("/cart/add-to-cart", cartData);
      return data.metadata || data;
    } catch (error) {
      throw error.response?.data?.message || "Thêm vào giỏ hàng thất bại";
    }
  };

  const getCartDetail = async () => {
    try {
      const { data } = await api.get("/cart/get-detail");
      console.log(data.metadata);
      
      return data.metadata || data;
    } catch (error) {
      throw error.response?.data?.message || "Lấy giỏ hàng thất bại";
    }
  };

  const updateCartQuantity = async (id, action) => {
    try {
      console.log(id);
      console.log(action);
      
      
      const { data } = await api.put(`/cart/update-quantity/${id}`, {
        
        action,
      });
      return data.metadata || data;
    } catch (error) {
      throw error.response?.data?.message || "Cập nhật số lượng thất bại";
    }
  };

  const removeFromCart = async (id) => {
    try {
      const { data } = await api.delete(`/cart/remove-product/${id}`);
      return data.metadata || data;
    } catch (error) {
      throw (
        error.response?.data?.message || "Xóa sản phẩm khỏi giỏ hàng thất bại"
      );
    }
  };

  return {
    addToCart,
    getCartDetail,
    updateCartQuantity,
    removeFromCart,
  };
};
