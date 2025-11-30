import { useAuth } from "../context/AuthContext";

export const useOrderService = () => {
  const { api } = useAuth();

  const getOrderPreview = async ({ deliveryAddress, items }) => {
    const { data } = await api.get("/order/view-order", {
      params: {
        deliveryAddress,
        items: items.join(","),
      },
    });
    return data.metadata || data.data;
  };

  const createOrder = async ({
    deliveryAddress,
    items,
    paymentMethod,
    note = "",
  }) => {
    const { data } = await api.post("/order/create", {
      deliveryAddress,
      items,
      paymentMethod,
      note,
    });
    return data.metadata || data.data;
  };

  const getUserOrders = async () => {
    const { data } = await api.get("/order/user/list");
    return data.metadata || data.data || [];
  };

  const getOrderDetail = async (orderId) => {
    const { data } = await api.get(`/order/user/detail/${orderId}`);
    return data.metadata || data.data;
  };

  return {
    getOrderPreview,
    createOrder,
    getUserOrders,
    getOrderDetail,
  };
};
