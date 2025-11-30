import { useAuth } from "../context/AuthContext";

export const useAddressService = () => {
  const { api } = useAuth();

  const getAddresses = async () => {
    const { data } = await api.get("/addresses/get-list");
    return data.metadata || data.data || [];
  };

  const getAddressDetail = async (id) => {
    const { data } = await api.get(`/addresses/detail/${id}`);
    return data.metadata || data.data;
  };

  const addAddress = async (addressData) => {
    const { data } = await api.post("/addresses/create", addressData);
    return data.metadata || data.data;
  };

  const updateAddress = async (id, addressData) => {
    const { data } = await api.put(`/addresses/update/${id}`, addressData);
    return data.metadata || data.data;
  };

  const deleteAddress = async (id) => {
    const { data } = await api.delete(`/addresses/delete/${id}`);
    return data.metadata || data.data;
  };

  return {
    getAddresses,
    getAddressDetail,
    addAddress,
    updateAddress,
    deleteAddress,
  };
};
