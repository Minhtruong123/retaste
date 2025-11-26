import React, { useState, useEffect, useCallback } from "react";
import * as productsService from "../../../service/products_service";
import styles from "./ProductManagement.module.css";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [formData, setFormData] = useState({
    _id: "",
    productName: "",
    category: "",
    basePrice: "",
    imageUrl: "",
    bestSeller: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productsService.getListProduct();
      setProducts(data.products || data || []);
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const stats = [
    { id: 1, title: "Tổng sản phẩm", value: 127, change: 8.5, icon: "🍽️" },
    { id: 2, title: "Sản phẩm sắp hết", value: 12, change: -3.2, icon: "⚠️" },
    {
      id: 3,
      title: "Doanh thu hôm nay",
      value: "8.6 triệu ₫",
      change: 12.4,
      icon: "💰",
    },
    {
      id: 4,
      title: "Đơn hàng mới",
      value: 34,
      change: 15.7,
      icon: "🛍️",
    },
  ];

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "Đồ uống", name: "Đồ uống" },
    { id: "Đồ ăn", name: "Đồ ăn" },
    { id: "Bánh ngọt", name: "Bánh ngọt" },
    { id: "Món chính", name: "Món chính" },
    { id: "Tráng miệng", name: "Tráng miệng" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleAddProduct = () => {
    setFormData({
      _id: "",
      productName: "",
      category: "",
      basePrice: "",
      stock: 0,
      imageUrl: "https://via.placeholder.com/300",
      bestSeller: false,
    });
    setEditMode(false);
    setShowAddModal(true);
  };

  const handleEditProduct = (product) => {
    setFormData({
      _id: product._id,
      productName: product.productName,
      category: product.category?.[0]?.categoryName || "",
      basePrice: product.basePrice,
      imageUrl: product.imageUrl || "",
      bestSeller: product.bestSeller || false,
    });
    setEditMode(true);
    setShowAddModal(true);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductId) return;
    try {
      await productsService.deleteProductAdmin(deleteProductId);
      setProducts((prev) => prev.filter((p) => p._id !== deleteProductId));
    } catch (err) {
      alert("Xóa thất bại");
    } finally {
      setShowDeleteModal(false);
      setDeleteProductId(null);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const payload = {
      productName: formData.productName,
      basePrice: Number(formData.basePrice),
      imageUrl: formData.imageUrl || undefined,
      bestSeller: formData.bestSeller,
      category: formData.category,
    };

    try {
      if (editMode) {
        await updateProductAdmin(formData._id, payload);
      } else {
        await createProductAdmin(payload);
      }
      setShowAddModal(false);
      loadProducts();
    } catch (err) {
      alert(err);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product._id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category?.[0]?.categoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  if (loading)
    return <div className={styles.loading}>Đang tải sản phẩm...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  return (
    <>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>Quản lý sản phẩm</div>
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
                placeholder="Tìm kiếm..."
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

        <div className={styles.breadcrumbContainer}>
          <div className={styles.breadcrumb}>
            <div className={styles.breadcrumbItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
              </svg>
              <a href="#">Trang chủ</a>
            </div>
            <div className={styles.breadcrumbDivider}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
            <div className={styles.breadcrumbItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
              </svg>
              <a href="#">Quản lý</a>
            </div>
            <div className={styles.breadcrumbDivider}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
            <div className={styles.breadcrumbCurrent}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
              </svg>
              Danh sách sản phẩm
            </div>
          </div>

          <div className={styles.pageHeader}>
            <div className={styles.pageTitleSection}>
              <h1 className={styles.pageTitle}>Quản lý sản phẩm</h1>
              <p className={styles.pageSubtitle}>
                Quản lý tất cả đồ ăn và thức uống của cửa hàng
              </p>
            </div>
            <button className={styles.addButton} onClick={handleAddProduct}>
              <span className={styles.addIcon}>+</span> Thêm sản phẩm
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {/* Thống kê sản phẩm */}
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div className={styles.statCard} key={stat.id}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statInfo}>
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                  <div className={styles.statPercentage}>
                    <span
                      className={
                        stat.change >= 0
                          ? styles.percentageUp
                          : styles.percentageDown
                      }
                    >
                      {stat.change >= 0 ? "↗" : "↘"} {Math.abs(stat.change)}%
                    </span>
                    <span>so với hôm qua</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.filterContainer}>
            <div className={styles.filterSection}>
              <div className={styles.filterLabel}>Danh mục:</div>
              <div className={styles.categoryTabs}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`${styles.categoryTab} ${
                      selectedCategory === category.id ? styles.active : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.filterActions}>
              <button className={styles.filterButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                  <path
                    fillRule="evenodd"
                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                  />
                </svg>
                <span>Làm mới</span>
              </button>
              <button className={styles.exportButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                </svg>
                <span>Xuất Excel</span>
              </button>
            </div>
          </div>

          <div className={styles.productTableCard}>
            <div className={styles.tableContainer}>
              <table className={styles.productTable}>
                <thead>
                  <tr>
                    <th>Mã SP</th>
                    <th>Sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product._id}>
                      <td className={styles.productId}>
                        {product._id.slice(-6)}
                      </td>
                      <td>
                        <div className={styles.productCell}>
                          <div className={styles.productImage}>
                            <img
                              src={
                                product.imageUrl ||
                                "https://via.placeholder.com/300"
                              }
                              alt={product.productName}
                            />
                          </div>
                          <span className={styles.productName}>
                            {product.productName}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={styles.categoryBadge}>
                          {product.category?.[0]?.categoryName || "Chưa có"}
                        </span>
                      </td>
                      <td className={styles.productPrice}>
                        {formatPrice(product.basePrice)}
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${styles.statusActive}`}
                        >
                          Đang bán
                        </span>
                      </td>
                      <td>{formatDate(product.createdAt)}</td>
                      <td className={styles.actionCell}>
                        <button
                          className={`${styles.actionButton} ${styles.editButton}`}
                          title="Sửa sản phẩm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 8.5-3.5 3.5-1.646-1.646a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0-.708-.708" />
                            <path d="M2 13.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1H3V2.5a.5.5 0 0 0-1 0z" />
                          </svg>
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          title="Xóa sản phẩm"
                          onClick={() => handleDeleteConfirmation(product._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className={styles.emptyState}>
                <h3>Không tìm thấy sản phẩm</h3>
                <p>Thử thay đổi bộ lọc</p>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className={styles.pagination}>
                <div className={styles.paginationInfo}>
                  Hiển thị 1-{filteredProducts.length} của{" "}
                  {filteredProducts.length} sản phẩm
                </div>
                <div className={styles.paginationControls}>
                  <button className={styles.paginationButton} disabled>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                  </button>
                  <div className={styles.pageNumbers}>
                    <button
                      className={`${styles.pageNumber} ${styles.activePage}`}
                    >
                      1
                    </button>
                    <button className={styles.pageNumber}>2</button>
                    <button className={styles.pageNumber}>3</button>
                    <span className={styles.pageEllipsis}>...</span>
                    <button className={styles.pageNumber}>10</button>
                  </div>
                  <button className={styles.paginationButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {showAddModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>{editMode ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowAddModal(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmitForm} className={styles.productForm}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Tên sản phẩm</label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Danh mục</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Giá (VND)</label>
                    <input
                      type="number"
                      name="basePrice"
                      value={formData.basePrice}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Hình ảnh URL</label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>
                      <input
                        type="checkbox"
                        name="bestSeller"
                        checked={formData.bestSeller}
                        onChange={handleInputChange}
                      />
                      Bán chạy (Hot)
                    </label>
                  </div>
                </div>
                <div className={styles.formFooter}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => setShowAddModal(false)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    {editMode ? "Cập nhật" : "Thêm sản phẩm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className={styles.modalOverlay}>
            <div className={`${styles.modal} ${styles.deleteModal}`}>
              <div className={styles.deleteIconContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </div>
              <h2 className={styles.deleteTitle}>Xác nhận xóa</h2>
              <p className={styles.deleteMessage}>
                Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể
                hoàn tác.
              </p>
              <div className={styles.deleteActions}>
                <button
                  className={styles.cancelDeleteButton}
                  onClick={() => setShowDeleteModal(false)}
                >
                  Hủy
                </button>
                <button
                  className={styles.confirmDeleteButton}
                  onClick={handleDeleteProduct}
                >
                  Xác nhận xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
