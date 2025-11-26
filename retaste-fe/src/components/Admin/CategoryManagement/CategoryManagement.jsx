import React, { useState, useEffect } from "react";
import styles from "./CategoryManagement.module.css";
import * as categoryService from "../../../service/categories_service";
import toast, { Toaster } from "react-hot-toast";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getListCategory({
        limit: "21",
        page: "1",
        keyWord: "",
        sortKey: "",
        sortValue: undefined,
      });
      setCategories(data || []);
    } catch (error) {
      toast.error("Không tải được danh sách danh mục");
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories
    .filter((cat) => {
      if (
        filterStatus !== "all" &&
        cat.isActive?.toString() !== (filterStatus === "active").toString()
      )
        return false;
      return cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "name")
        return a.categoryName.localeCompare(b.categoryName);
      if (sortBy === "itemCount")
        return (b.itemCount || 0) - (a.itemCount || 0);
      if (sortBy === "dateCreated")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const description = form.description.value.trim();
    const status = form.status.value;
    const isActive = status === "active";

    if (!name) {
      toast.error("Tên danh mục không được để trống!");
      return;
    }

    const formData = new FormData();

    formData.append("categoryName", name);
    formData.append("description", description);
    formData.append("isActive", isActive);

    if (imageFile) {
      formData.append("imageUrl", imageFile);
    }

    try {
      if (selectedCategory) {
        await categoryService.updateCategory(selectedCategory._id, formData);
        toast.success("Cập nhật danh mục thành công!");
      } else {
        await categoryService.createCategory(formData);
        toast.success("Tạo danh mục mới thành công!");
      }

      fetchCategories();
      handleCloseModal();
    } catch (err) {
      console.error("Lỗi tạo/cập nhật:", err);
      toast.error(
        err?.response?.data?.message || "Không thể lưu danh mục, thử lại sau."
      );
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;

    try {
      await categoryService.deleteCategory(id);
      toast.success("Xóa danh mục thành công!");
      fetchCategories();
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  const toggleCategoryStatus = async (category) => {
    try {
      const formData = new FormData();
      formData.append("categoryName", category.categoryName);
      formData.append("isActive", !category.isActive);
      if (category.imageUrl) formData.append("imageUrl", category.imageUrl);

      await categoryService.updateCategory(category._id, formData);
      toast.success("Cập nhật trạng thái thành công!");
      fetchCategories();
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };

  return (
    <>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>Quản lý danh mục</div>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Tìm kiếm danh mục..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className={styles.actionBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
              </svg>
              <span className={styles.notificationBadge}>3</span>
            </button>
            <button className={styles.actionBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg>
            </button>
            <button className={styles.actionBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                <path
                  fillRule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                />
              </svg>
            </button>
          </div>
        </header>

        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbItem}>
            <a href="#">Trang chủ</a>
          </div>
          <div className={styles.breadcrumbDivider}>/</div>
          <div className={styles.breadcrumbItem}>
            <a href="#">Quản lý</a>
          </div>
          <div className={styles.breadcrumbDivider}>/</div>
          <div className={styles.breadcrumbCurrent}>
            Danh mục món ăn & thức uống
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <div className={styles.pageTitleSection}>
              <h1 className={styles.pageTitle}>Danh mục món ăn & thức uống</h1>
              <p className={styles.pageDescription}>
                Quản lý tất cả các danh mục món ăn và thức uống trong hệ thống
              </p>
            </div>
            <div className={styles.pageActions}>
              <button
                className={styles.addCategoryBtn}
                onClick={handleAddCategory}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg>
                <span>Thêm danh mục mới</span>
              </button>
            </div>
          </div>

          <div className={styles.toolbarRow}>
            <div className={styles.filterSection}>
              <div className={styles.filterItem}>
                <label className={styles.filterLabel}>
                  Lọc theo trạng thái:
                </label>
                <select
                  className={styles.filterSelect}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tất cả</option>
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Ngừng hoạt động</option>
                </select>
              </div>
              <div className={styles.filterItem}>
                <label className={styles.filterLabel}>Sắp xếp theo:</label>
                <select
                  className={styles.filterSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Tên danh mục</option>
                  <option value="itemCount">Số món ăn</option>
                  <option value="dateCreated">Ngày tạo</option>
                </select>
              </div>
            </div>

            <div className={styles.resultsInfo}>
              Hiển thị {filteredCategories.length} / {categories.length} danh
              mục
            </div>
          </div>

          {loading ? (
            <div className={styles.loading}>Đang tải danh mục...</div>
          ) : (
            <div className={styles.categoryGrid}>
              {filteredCategories.map((category) => (
                <div key={category._id} className={styles.categoryCard}>
                  <div className={styles.categoryImageContainer}>
                    <img
                      src={
                        category.imageUrl || "https://via.placeholder.com/100"
                      }
                      alt={category.categoryName}
                      className={styles.categoryImage}
                    />
                    {category.featured && (
                      <span className={styles.featuredBadge}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      </span>
                    )}
                    <div className={styles.categoryOverlay}>
                      <button
                        className={styles.editCategoryBtn}
                        onClick={() => handleEditCategory(category)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className={styles.categoryContent}>
                    <h3 className={styles.categoryName}>
                      {category.categoryName}
                    </h3>
                    <div className={styles.categoryMeta}>
                      <div className={styles.metaItem}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                        <span>{category.itemCount || 0} món</span>
                      </div>
                      <div className={styles.metaItem}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>
                        <span>
                          {new Date(category.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      </div>
                    </div>
                    <div className={styles.categoryActions}>
                      <div className={styles.statusToggleContainer}>
                        <span className={styles.statusLabel}>Trạng thái:</span>
                        <button
                          className={`${styles.statusToggle} ${
                            category.isActive
                              ? styles.statusActive
                              : styles.statusInactive
                          }`}
                          onClick={() => toggleCategoryStatus(category)}
                          aria-label={`${
                            category.status === "active"
                              ? "Vô hiệu hóa"
                              : "Kích hoạt"
                          } danh mục`}
                        >
                          <span className={styles.statusToggleSlider}></span>
                        </button>
                        <span className={styles.statusText}>
                          {category.isActive
                            ? "Đang hoạt động"
                            : "Ngừng hoạt động"}
                        </span>
                      </div>
                      <div className={styles.categoryActionButtons}>
                        <button
                          className={`${styles.iconBtn} ${styles.featureBtn} ${
                            category.featured ? styles.featured : ""
                          }`}
                          onClick={() => toggleFeatured(category.id)}
                          title={
                            category.featured
                              ? "Bỏ nổi bật"
                              : "Đánh dấu nổi bật"
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </button>
                        <button
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          onClick={() => handleDeleteCategory(category._id)}
                          title="Xóa danh mục"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredCategories.length === 0 && !loading && (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>No categories found</div>
              <h3>Không tìm thấy danh mục nào</h3>
              <button
                className={styles.emptyStateBtn}
                onClick={handleAddCategory}
              >
                Thêm danh mục mới
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {selectedCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
              </h2>
              <button
                className={styles.modalCloseBtn}
                onClick={handleCloseModal}
              >
                X
              </button>
            </div>

            <form onSubmit={handleSubmitCategory}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>
                    Tên danh mục <span className={styles.requiredMark}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className={styles.formInput}
                    defaultValue={selectedCategory?.categoryName || ""}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Hình ảnh danh mục</label>
                  <div className={styles.imageUploadContainer}>
                    {(selectedCategory?.imageUrl || imageFile) && (
                      <img
                        src={
                          imageFile
                            ? URL.createObjectURL(imageFile)
                            : selectedCategory.imageUrl
                        }
                        alt="Preview"
                        className={styles.previewImage}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ marginTop: 10 }}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Trạng thái</label>
                    <select
                      name="status"
                      className={styles.formSelect}
                      defaultValue={
                        selectedCategory?.isActive ? "active" : "inactive"
                      }
                    >
                      <option value="active">Đang hoạt động</option>
                      <option value="inactive">Ngừng hoạt động</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Mô tả</label>
                  <textarea
                    name="description"
                    className={styles.formTextarea}
                    defaultValue={selectedCategory?.description || ""}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={handleCloseModal}
                >
                  Hủy bỏ
                </button>
                <button type="submit" className={styles.saveBtn}>
                  {selectedCategory ? "Lưu thay đổi" : "Tạo danh mục"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
