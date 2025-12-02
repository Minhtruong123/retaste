import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useProductService } from "../../../hooks/useProductService";
import { useCategoryService } from "../../../hooks/useCategoryService";
import { useUploadService } from "../../../hooks/useUploadService";
import styles from "./ProductManagement.module.css";

export default function ProductManagement() {
  const { uploadImage } = useUploadService();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    getListProduct,
    createProductAdmin,
    updateProductAdmin,
    deleteProductAdmin,
    getDetailProduct,
  } = useProductService();
  const { getListCategory, createCategory, updateCategory, deleteCategory } =
    useCategoryService();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [formData, setFormData] = useState({
    _id: "",
    productName: "",
    productSlug: "",
    category: "",
    basePrice: "",
    imageUrl: "",
    imageFile: null,
    bestSeller: false,
    isFeatured: false,
    isAvailable: true,
    preparationTime: 10,
    description: "",
    special: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getListProduct();
      setProducts(data.products || data || []);
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getListProduct]);

  const loadCategories = useCallback(async () => {
    try {
      const data = await getListCategory();
      setCategories(data || []);
    } catch (err) {
      console.error("Không thể tải danh mục:", err);
    }
  }, [getListCategory]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([loadProducts(), loadCategories()]);
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      id: 1,
      title: "Tổng sản phẩm",
      value: products.length,
      change: 8.5,
      icon: "🍽️",
    },
    {
      id: 2,
      title: "Danh mục",
      value: categories.length,
      change: 5.7,
      icon: "📋",
    },
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

  const categoryOptions = useMemo(() => {
    const uniqueCategories = [
      { id: "all", name: "Tất cả" },
      ...categories.map((cat) => ({
        id: cat._id,
        name: cat.categoryName,
        isActive: cat.isActive,
      })),
    ];

    return uniqueCategories;
  }, [categories]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleAddProduct = () => {
    setFormData({
      _id: null,
      productName: "",
      productSlug: "",
      category: "",
      basePrice: "",
      imageUrl: "",
      imageFile: null,
      bestSeller: false,
      isFeatured: false,
      isAvailable: true,
      preparationTime: 10,
      description: "",
      special: [],
      sizes: [],
      customizationGroups: [],
    });
    setEditMode(false);
    setShowAddModal(true);
  };

  const handleEditProduct = async (product) => {
    try {
      let productDetails = product;
      if (!product.description || editMode) {
        const details = await getDetailProduct(product._id);
        if (details) {
          productDetails = details;
        }
      }

      const currentCategoryId =
        productDetails.category?._id ||
        productDetails.categoryId ||
        productDetails.category ||
        "";

      setFormData({
        _id: productDetails._id,
        productName: productDetails.productName || "",
        productSlug: productDetails.productSlug || "",
        category: currentCategoryId,
        basePrice: productDetails.basePrice || 0,
        imageUrl: productDetails.imageUrl || "",
        imageFile: null,
        bestSeller: productDetails.bestSeller || false,
        isFeatured: productDetails.isFeatured || false,
        isAvailable: productDetails.isAvailable !== false,
        preparationTime: productDetails.preparationTime || 10,
        description: productDetails.description || "",
        special: productDetails.special || [],
      });
      setEditMode(true);
      setShowAddModal(true);
    } catch (err) {
      console.error("Error fetching product details:", err);
      alert("Không thể lấy thông tin sản phẩm. Vui lòng thử lại.");
    }
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductId) return;
    try {
      await deleteProductAdmin(deleteProductId);
      setProducts((prev) => prev.filter((p) => p._id !== deleteProductId));

      const remainingFilteredProducts = filteredProducts.filter(
        (p) => p._id !== deleteProductId
      );
      if (remainingFilteredProducts.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      alert("Xóa thất bại");
    } finally {
      setShowDeleteModal(false);
      setDeleteProductId(null);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let imageUrlToSave = formData.imageUrl;

    try {
      if (formData.imageFile) {
        imageUrlToSave = await uploadImage(formData.imageFile);
      }

      const generateSlug = (name) => {
        return name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "d")
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
      };

      const payload = {
        categoryId: formData.category,
        productName: formData.productName.trim(),
        productSlug: generateSlug(formData.productName.trim()),
        basePrice: Number(formData.basePrice),
        bestSeller: formData.bestSeller,
        isFeatured: formData.isFeatured,
        isAvailable: formData.isAvailable,
        imageUrl: imageUrlToSave,
        preparationTime: Number(formData.preparationTime) || 10,
        description: formData.description,
        special: formData.special,
        sizes: [],
        customizationGroups: [],
      };

      if (editMode) {
        await updateProductAdmin(formData._id, payload);
      } else {
        await createProductAdmin(payload);
      }

      alert(editMode ? "Cập nhật thành công!" : "Thêm sản phẩm thành công!");
      setShowAddModal(false);
      loadProducts();
    } catch (err) {
      alert(err.message || "Có lỗi xảy ra");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category?._id === selectedCategory ||
        product.categoryId === selectedCategory ||
        product.category === selectedCategory ||
        (Array.isArray(product.category) &&
          product.category.some((cat) => cat._id === selectedCategory));

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageNumbers = useMemo(() => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = Math.min(totalPages - 1, 4);
      }

      if (currentPage >= totalPages - 1) {
        startPage = Math.max(2, totalPages - 3);
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.categoryName : "Chưa phân loại";
  };

  if (loading) return <div className={styles.loading}>Đang tải dữ liệu...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>Bảng điều khiển</div>
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
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={handleSearchChange}
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
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
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
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
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
                {categoryOptions.map((category) => (
                  <button
                    key={category.id}
                    className={`${styles.categoryTab} ${
                      selectedCategory === category.id ? styles.active : ""
                    }`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                    {category.id !== "all" && !category.isActive && " (Ẩn)"}
                  </button>
                ))}
              </div>
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
                  {currentProducts.map((product) => (
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
                            {product.bestSeller && (
                              <span className={styles.bestSellerBadge}>
                                {" "}
                                🔥
                              </span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={styles.categoryBadge}>
                          {product.category?.categoryName ||
                            getCategoryNameById(product.categoryId) ||
                            "Chưa phân loại"}
                        </span>
                      </td>
                      <td className={styles.productPrice}>
                        {formatPrice(product.basePrice)}
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            product.isDeleted || !product.isAvailable
                              ? styles.statusInactive
                              : styles.statusActive
                          }`}
                        >
                          {product.isDeleted
                            ? "Đã ẩn"
                            : !product.isAvailable
                            ? "Ngừng bán"
                            : "Đang bán"}
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
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
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
                <div className={styles.emptyIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                  </svg>
                </div>
                <h3>Không tìm thấy sản phẩm</h3>
                <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                <button
                  className={styles.emptyButton}
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  Làm mới tìm kiếm
                </button>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className={styles.pagination}>
                <div className={styles.paginationInfo}>
                  Hiển thị {(currentPage - 1) * productsPerPage + 1}-
                  {Math.min(
                    currentPage * productsPerPage,
                    filteredProducts.length
                  )}{" "}
                  của {filteredProducts.length} sản phẩm
                </div>
                <div className={styles.paginationControls}>
                  <button
                    className={styles.paginationButton}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
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
                    {pageNumbers.map((page, index) =>
                      page === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className={styles.pageEllipsis}
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          className={`${styles.pageNumber} ${
                            currentPage === page ? styles.activePage : ""
                          }`}
                          onClick={() => paginate(page)}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    className={styles.paginationButton}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
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

        {/* Modal thêm/sửa sản phẩm */}
        {showAddModal && (
          <div
            className={styles.modalOverlay}
            onClick={() => setShowAddModal(false)}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
                <div className={styles.imageUpload}>
                  <div className={styles.imagePreview}>
                    <img
                      src={
                        formData.imageUrl || "https://via.placeholder.com/150"
                      }
                      alt="Preview"
                    />
                  </div>
                  <div className={styles.uploadInfo}>
                    <h4>Hình ảnh sản phẩm</h4>
                    <p>
                      Tải lên hình ảnh sản phẩm có kích thước tối đa 2MB. Định
                      dạng hỗ trợ: JPG, PNG, WEBP.
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        if (file.size > 2 * 1024 * 1024) {
                          alert("Ảnh không được quá 2MB!");
                          return;
                        }

                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData((prev) => ({
                            ...prev,
                            imageUrl: reader.result,
                            imageFile: file,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }}
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Tên sản phẩm</label>
                    <input
                      type="text"
                      name="productName"
                      className={styles.formInput}
                      value={formData.productName}
                      onChange={handleInputChange}
                      placeholder="Nhập tên sản phẩm"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Danh mục</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className={styles.formInput}
                    >
                      <option value="">-- Chọn danh mục --</option>
                      {categoryOptions
                        .filter((cat) => cat.id !== "all")
                        .map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name} {!category.isActive ? "(Ẩn)" : ""}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Giá (VNĐ)</label>
                    <input
                      type="number"
                      name="basePrice"
                      className={styles.formInput}
                      value={formData.basePrice}
                      onChange={handleInputChange}
                      placeholder="Nhập giá sản phẩm"
                      required
                      min="0"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Thời gian chuẩn bị (phút)</label>
                    <input
                      type="number"
                      name="preparationTime"
                      className={styles.formInput}
                      value={formData.preparationTime || ""}
                      onChange={handleInputChange}
                      placeholder="VD: 10"
                      required
                      min="1"
                      max="120"
                    />
                    <small style={{ color: "var(--text-light)" }}>
                      Thời gian trung bình để chuẩn bị món này
                    </small>
                  </div>
                  <div
                    className={styles.formGroup}
                    style={{ gridColumn: "1 / span 2" }}
                  >
                    <label>Mô tả sản phẩm</label>
                    <textarea
                      name="description"
                      className={styles.formInput}
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      placeholder="Nhập mô tả chi tiết về sản phẩm"
                      rows="3"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="bestSeller"
                        checked={formData.bestSeller}
                        onChange={handleInputChange}
                      />
                      <span>Đánh dấu là sản phẩm bán chạy</span>
                    </label>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-light)",
                        marginTop: "5px",
                      }}
                    >
                      Sản phẩm sẽ được hiển thị trong mục "Bán chạy" trên trang
                      chủ
                    </p>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleInputChange}
                      />
                      <span>Đánh dấu là sản phẩm nổi bật</span>
                    </label>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-light)",
                        marginTop: "5px",
                      }}
                    >
                      Sản phẩm sẽ được hiển thị trong mục "Nổi bật" trên trang
                      chủ
                    </p>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="isAvailable"
                        checked={formData.isAvailable}
                        onChange={handleInputChange}
                      />
                      <span>Trạng thái có sẵn</span>
                    </label>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-light)",
                        marginTop: "5px",
                      }}
                    >
                      Nếu bỏ chọn, sản phẩm sẽ không thể đặt hàng
                    </p>
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
                    {editMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal xác nhận xóa */}
        {showDeleteModal && (
          <div
            className={styles.modalOverlay}
            onClick={() => setShowDeleteModal(false)}
          >
            <div
              className={`${styles.modal} ${styles.deleteModal}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.deleteIconContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </div>
              <h2 className={styles.deleteTitle}>Xác nhận xóa</h2>
              <p className={styles.deleteMessage}>
                Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể
                hoàn tác và sẽ xóa tất cả dữ liệu liên quan.
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
