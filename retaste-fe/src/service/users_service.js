import api from "./api";

export const getAllEmployees = async () => {
  try {
    const data = await api.get("")
  } catch (error) {
    console.log(error);
  }
};
