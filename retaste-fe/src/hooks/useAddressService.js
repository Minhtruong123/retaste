import { useAuth } from "../context/AuthContext";

export const useAddressService = () => {
  const { api } = useAuth();

  const getAddresses = async () => {
    const { data } = await api.get("/address/get-list");
    return data.metadata || data.data || [];
  };

  const getAddressDetail = async (id) => {
    console.log(id);
    
    const { data } = await api.get(`/address/detail/${id}`);
    console.log(data);
    
    return data.metadata || data.data;
  };

  const addAddress = async (addressData) => {
    const { data } = await api.post("/address/create", addressData);
    return data.metadata || data.data;
  };

  const updateAddress = async (id, addressData) => {
    const { data } = await api.put(`/address/update/${id}`, addressData);
    return data.metadata || data.data;
  };

  const deleteAddress = async (id) => {
    const { data } = await api.delete(`/address/delete/${id}`);
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
