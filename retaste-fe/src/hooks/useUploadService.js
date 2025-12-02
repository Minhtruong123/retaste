import { useAuth } from "../context/AuthContext";

export const useUploadService = () => {
  const { api } = useAuth();
  const uploadImage = async (file) => {
    if (!file) {
      throw new Error("Không có file để upload");
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Chỉ hỗ trợ định dạng JPG, PNG, WEBP");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Ảnh không được quá 5MB");
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await api.post("/upload/update", formData, {
        timeout: 30000,
      });
      console.log(data.metadata);

      const url = data.metadata?.image;

      if (!url) {
        throw new Error("Upload thành công nhưng không nhận được URL ảnh");
      }

      return url;
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Upload ảnh thất bại";
      throw new Error(msg);
    }
  };

  return {
    uploadImage,
  };
};
