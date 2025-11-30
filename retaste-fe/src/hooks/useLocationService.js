import axios from "axios";

export const useLocationService = () => {
  const validateAddressInHCM = async (address) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: `${address}, Hồ Chí Minh, Vietnam`,
            format: "json",
            limit: 1,
            countrycodes: "vn",
          },
          headers: {
            "User-Agent": "RetasteApp/1.0",
          },
        }
      );

      if (response.data.length === 0) {
        return { isValid: false, message: "Không tìm thấy địa chỉ này" };
      }

      const { lat, lon } = response.data[0];
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);

      const isInHCM =
        latitude >= 10.3 &&
        latitude <= 11.2 &&
        longitude >= 106.3 &&
        longitude <= 107.1;

      return {
        isValid: isInHCM,
        message: isInHCM ? "" : "Chỉ giao trong khu vực TP. Hồ Chí Minh",
      };
    } catch (error) {
      return {
        isValid: false,
        message: "Lỗi kiểm tra địa chỉ, vui lòng thử lại",
      };
    }
  };

  return { validateAddressInHCM };
};
