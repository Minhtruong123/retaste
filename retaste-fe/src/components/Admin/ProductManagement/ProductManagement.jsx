import React, { useState } from "react";
import styles from "./ProductManagement.module.css";

export default function ProductManagement() {
  const [products, setProducts] = useState([
    {
      id: "SP001",
      name: "Điện thoại iPhone 15 Pro Max",
      category: "Điện thoại",
      price: 29990000,
      stock: 45,
      image: "https://randomuser.me/api/portraits/men/1.jpg", // Sử dụng ảnh đại diện tạm
      status: "active",
      created: "15/10/2025",
    },
    {
      id: "SP002",
      name: "Laptop Dell XPS 15",
      category: "Laptop",
      price: 35000000,
      stock: 20,
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      status: "active",
      created: "10/10/2025",
    },
    {
      id: "SP003",
      name: "Máy ảnh Canon EOS R5",
      category: "Máy ảnh",
      price: 40500000,
      stock: 12,
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      status: "active",
      created: "05/10/2025",
    },
    {
      id: "SP004",
      name: "Tai nghe Sony WH-1000XM5",
      category: "Âm thanh",
      price: 6800000,
      stock: 30,
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      status: "inactive",
      created: "01/10/2025",
    },
    {
      id: "SP005",
      name: "iPad Pro M2",
      category: "Máy tính bảng",
      price: 25000000,
      stock: 22,
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      status: "active",
      created: "20/10/2025",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    status: "active",
  });
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mô phỏng dữ liệu thống kê
  const stats = [
    { id: 1, title: "Tổng sản phẩm", value: 247, change: 12.5, icon: "📦" },
    { id: 2, title: "Sản phẩm hết hàng", value: 15, change: -4.8, icon: "⚠️" },
    {
      id: 3,
      title: "Doanh thu sản phẩm",
      value: "1.2 tỷ ₫",
      change: 8.2,
      icon: "💰",
    },
    {
      id: 4,
      title: "Sản phẩm mới tháng này",
      value: 27,
      change: 15.7,
      icon: "🆕",
    },
  ];

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "Điện thoại", name: "Điện thoại" },
    { id: "Laptop", name: "Laptop" },
    { id: "Máy ảnh", name: "Máy ảnh" },
    { id: "Máy tính bảng", name: "Máy tính bảng" },
    { id: "Âm thanh", name: "Âm thanh" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    });
  };

  const handleAddProduct = () => {
    setFormData({
      id: `SP${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      status: "active",
      created: new Date().toLocaleDateString("vi-VN"),
    });
    setEditMode(false);
    setShowAddModal(true);
  };

  const handleEditProduct = (product) => {
    setFormData({ ...product });
    setEditMode(true);
    setShowAddModal(true);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteProduct = () => {
    if (deleteProductId) {
      setProducts(products.filter((product) => product.id !== deleteProductId));
      setShowDeleteModal(false);
      setDeleteProductId(null);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (editMode) {
      setProducts(
        products.map((product) =>
          product.id === formData.id ? { ...formData } : product
        )
      );
    } else {
      setProducts([...products, formData]);
    }

    setShowAddModal(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  return (
    <>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <button className={styles.toggleSidebar}>☰</button>
          <div className={styles.headerTitle}>Quản lý sản phẩm</div>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className={styles.actionBtn}>
              🔔
              <span className={styles.notificationBadge}>3</span>
            </button>
            <button className={styles.actionBtn}>✉️</button>
            <button className={styles.actionBtn}>🔄</button>
          </div>
        </header>

        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbItem}>
            <a href="#">Trang chủ</a>
          </div>
          <div className={styles.breadcrumbDivider}>/</div>
          <div className={styles.breadcrumbItem}>
            <a href="#">Sản phẩm</a>
          </div>
          <div className={styles.breadcrumbDivider}>/</div>
          <div className={styles.breadcrumbCurrent}>Quản lý sản phẩm</div>
        </div>

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Quản lý sản phẩm</h1>
            <button className={styles.addButton} onClick={handleAddProduct}>
              <span className={styles.addIcon}>+</span> Thêm sản phẩm
            </button>
          </div>

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
                    <span>so với tháng trước</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bộ lọc sản phẩm */}
          <div className={styles.filterContainer}>
            <div className={styles.filterSection}>
              <div className={styles.filterLabel}>Lọc theo danh mục:</div>
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
                <span>🔄 Làm mới</span>
              </button>
              <button className={styles.exportButton}>
                <span>📊 Xuất báo cáo</span>
              </button>
            </div>
          </div>

          {/* Bảng sản phẩm */}
          <div className={styles.productTableCard}>
            <div className={styles.tableContainer}>
              <table className={styles.productTable}>
                <thead>
                  <tr>
                    <th>Mã SP</th>
                    <th>Sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Tồn kho</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className={styles.productId}>{product.id}</td>
                      <td>
                        <div className={styles.productCell}>
                          <div className={styles.productImage}>
                            <img src={product.image} alt={product.name} />
                          </div>
                          <span className={styles.productName}>
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td className={styles.productPrice}>
                        {formatPrice(product.price)}
                      </td>
                      <td>
                        <span
                          className={`${styles.stockBadge} ${
                            product.stock <= 10
                              ? styles.lowStock
                              : product.stock <= 20
                              ? styles.mediumStock
                              : styles.highStock
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            product.status === "active"
                              ? styles.statusActive
                              : styles.statusInactive
                          }`}
                        >
                          {product.status === "active"
                            ? "Đang bán"
                            : "Ngừng kinh doanh"}
                        </span>
                      </td>
                      <td>{product.created}</td>
                      <td className={styles.actionCell}>
                        <button
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          title="Xem chi tiết"
                        >
                          👁️
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.editButton}`}
                          title="Sửa sản phẩm"
                          onClick={() => handleEditProduct(product)}
                        >
                          ✏️
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          title="Xóa sản phẩm"
                          onClick={() => handleDeleteConfirmation(product.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🔍</div>
                <h3>Không tìm thấy sản phẩm</h3>
                <p>
                  Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn
                </p>
              </div>
            )}

            {/* Phân trang */}
            <div className={styles.pagination}>
              <button className={styles.paginationButton} disabled>
                &laquo; Trước
              </button>
              <div className={styles.pageNumbers}>
                <button className={`${styles.pageNumber} ${styles.activePage}`}>
                  1
                </button>
                <button className={styles.pageNumber}>2</button>
                <button className={styles.pageNumber}>3</button>
                <span className={styles.pageEllipsis}>...</span>
                <button className={styles.pageNumber}>10</button>
              </div>
              <button className={styles.paginationButton}>Sau &raquo;</button>
            </div>
          </div>
        </div>

        {/* Modal thêm/sửa sản phẩm */}
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
                    <label>Mã sản phẩm</label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      disabled={editMode}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Tên sản phẩm</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Danh mục</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    >
                      <option value="">-- Chọn danh mục --</option>
                      <option value="Điện thoại">Điện thoại</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Máy ảnh">Máy ảnh</option>
                      <option value="Máy tính bảng">Máy tính bảng</option>
                      <option value="Âm thanh">Âm thanh</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Giá bán (VND)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Số lượng tồn</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Trạng thái</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    >
                      <option value="active">Đang bán</option>
                      <option value="inactive">Ngừng kinh doanh</option>
                    </select>
                  </div>
                </div>

                <div className={styles.imageUpload}>
                  <div className={styles.imagePreview}>
                    <img src={formData.image} alt="Product preview" />
                  </div>
                  <div className={styles.uploadInfo}>
                    <h4>Hình ảnh sản phẩm</h4>
                    <p>Hỗ trợ định dạng JPG, PNG, WEBP</p>
                    <button type="button" className={styles.uploadButton}>
                      Tải ảnh lên
                    </button>
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

        {/* Modal xác nhận xóa */}
        {showDeleteModal && (
          <div className={styles.modalOverlay}>
            <div className={`${styles.modal} ${styles.deleteModal}`}>
              <div className={styles.deleteIconContainer}>
                <span className={styles.deleteIcon}>🗑️</span>
              </div>
              <h2 className={styles.deleteTitle}>Xác nhận xóa</h2>
              <p className={styles.deleteMessage}>
                Bạn có chắc chắn muốn xóa sản phẩm này? Thao tác này không thể
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
