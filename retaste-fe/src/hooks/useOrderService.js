import { useAuth } from "../context/AuthContext";
import { useCallback } from "react";

export const useOrderService = () => {
  const { api } = useAuth();

  const getOrderPreview = async ({ deliveryAddress, items }) => {
    const { data } = await api.post("/order/view-order", {
      deliveryAddress,
      items,
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

  const getList = useCallback(
    async (params = {}) => {
      const { data } = await api.get("/order/list", { params });
      console.log(data);
      return data.metadata || data.data || { orders: [], total: 0 };
    },
    [api]
  );

  const getDetail = useCallback(
    async (orderId) => {
      const { data } = await api.get(`/order/detail/${orderId}`);

      return data.metadata || data.data;
    },
    [api]
  );

  const changeStatus = useCallback(
    async (orderId, statusKey) => {
      const statusMap = {
        pending: "pending",
        processing: "confirmed",
        shipping: "out_for_delivery",
        completed: "success",
        cancelled: "cancelled",
      };

      const realStatus = statusMap[statusKey] || [statusKey];

      if (!realStatus) {
        throw new Error("Trạng thái không hợp lệ");
      }

      const { data } = await api.put(`/order/change-status/${orderId}`, {
        orderStatus: realStatus,
      });

      return data.metadata || data.data || data;
    },
    [api]
  );

  const cancelOrder = useCallback(
    async (orderId) => {
      const { data } = await api.put(`/order/cancel/${orderId}`);
      return data.metadata || data.data || data;
    },
    [api]
  );

  return {
    getOrderPreview,
    createOrder,
    getUserOrders,
    getOrderDetail,
    getList,
    getDetail,
    changeStatus,
    cancelOrder,
  };
};
