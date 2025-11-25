import React, { useEffect, useState } from "react";
import styles from "./MenuPage.module.css";
import * as productsService from "../../../service/products_service";

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState({
    category: "",
    sort: "popular",
    priceMin: "",
    priceMax: "",
    rating: "",
    features: "",
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productsService.getListProduct();
      setProducts(data);
      setError(null);
    } catch (error) {
      console.error("Error loading products:", error);
      setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category !== "all") {
      addFilter(`Danh mục: ${getCategoryName(category)}`, "category", category);
    } else {
      removeFilter("category");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    setActiveFilters([]);

    if (filters.category) {
      addFilter(
        `Danh mục: ${getCategoryName(filters.category)}`,
        "category",
        filters.category
      );
    }

    if (filters.features) {
      const featureNames = {
        vegetarian: "Chay",
        "gluten-free": "Không gluten",
        spicy: "Cay",
        bestseller: "Bán chạy",
        new: "Món mới",
      };
      addFilter(
        `Đặc tính: ${featureNames[filters.features] || filters.features}`,
        "features",
        filters.features
      );
    }

    if (filters.priceMin && filters.priceMax) {
      addFilter(
        `Giá: ${Number(filters.priceMin).toLocaleString("vi-VN")}₫ - ${Number(
          filters.priceMax
        ).toLocaleString("vi-VN")}₫`,
        "price",
        {
          min: filters.priceMin,
          max: filters.priceMax,
        }
      );
    }

    if (filters.rating) {
      addFilter(
        `Đánh giá: ${filters.rating} sao trở lên`,
        "rating",
        filters.rating
      );
    }

    setCurrentPage(1);

    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      sort: "popular",
      priceMin: "",
      priceMax: "",
      rating: "",
      features: "",
    });
    setActiveFilters([]);
    setActiveCategory("all");
  };

  const addFilter = (label, type, value) => {
    const updatedFilters = activeFilters.filter(
      (filter) => filter.type !== type
    );

    setActiveFilters([
      ...updatedFilters,
      { id: Date.now(), label, type, value },
    ]);
  };

  const removeFilter = (type) => {
    setActiveFilters(activeFilters.filter((filter) => filter.type !== type));

    if (type === "category") {
      setActiveCategory("all");
    }

    setFilters({
      ...filters,
      [type]: type === "price" ? { priceMin: "", priceMax: "" } : "",
    });
  };

  const filteredProducts = products.filter((product) => {
    let matchesAllFilters = true;

    for (const filter of activeFilters) {
      switch (filter.type) {
        case "category":
          if (product.category !== filter.value) {
            matchesAllFilters = false;
          }
          break;
        case "features":
          if (
            (filter.value === "vegetarian" && !product.isVegetarian) ||
            (filter.value === "spicy" && !product.isSpicy) ||
            (filter.value === "bestseller" && !product.isBestSeller) ||
            (filter.value === "new" && !product.isNew) ||
            (filter.value === "gluten-free" && !product.isGlutenFree)
          ) {
            matchesAllFilters = false;
          }
          break;
        case "price":
          if (
            product.price < filter.value.min ||
            product.price > filter.value.max
          ) {
            matchesAllFilters = false;
          }
          break;
        case "rating":
          if (product.rating < filter.value) {
            matchesAllFilters = false;
          }
          break;
        default:
          break;
      }
    }

    return matchesAllFilters;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "new":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "popular":
      default:
        return b.salesCount - a.salesCount;
    }
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = rating && rating % 1 >= 0.5;

    return (
      <>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`${styles.star} ${
              index < fullStars
                ? styles.filled
                : index === fullStars && hasHalfStar
                ? styles.half
                : styles.empty
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </span>
        ))}
      </>
    );
  };

  const getCategoryName = (category) => {
    const categories = {
      pizza: "Pizza",
      burger: "Burger",
      asian: "Món Á",
      drink: "Đồ uống",
      salad: "Salad",
      dessert: "Tráng miệng",
    };
    return categories[category] || category;
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <section className={styles.menuPage}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Thực đơn RETASTE</h1>
          <p className={styles.pageDescription}>
            Khám phá thực đơn đa dạng với các món ăn đậm đà hương vị, được chuẩn
            bị từ những nguyên liệu tươi ngon nhất.
          </p>
        </div>

        <div className={styles.menuControls}>
          <div className={styles.categoryTabs}>
            <button
              className={`${styles.tabButton} ${
                activeCategory === "all" ? styles.active : ""
              }`}
              onClick={() => handleCategoryChange("all")}
            >
              Tất cả
            </button>
            <button
              className={`${styles.tabButton} ${
                activeCategory === "pizza" ? styles.active : ""
              }`}
              onClick={() => handleCategoryChange("pizza")}
            >
              Pizza
            </button>
            <button
              className={`${styles.tabButton} ${
                activeCategory === "burger" ? styles.active : ""
              }`}
              onClick={() => handleCategoryChange("burger")}
            >
              Burger
            </button>
            <button
              className={`${styles.tabButton} ${
                activeCategory === "asian" ? styles.active : ""
              }`}
              onClick={() => handleCategoryChange("asian")}
            >
              Món Á
            </button>
            <button
              className={`${styles.tabButton} ${
                activeCategory === "drink" ? styles.active : ""
              }`}
              onClick={() => handleCategoryChange("drink")}
            >
              Đồ uống
            </button>
            <button
              className={`${styles.tabButton} ${
                activeCategory === "salad" ? styles.active : ""
              }`}
              onClick={() => handleCategoryChange("salad")}
            >
              Salad
            </button>
            <button
              className={`${styles.tabButton} ${
                activeCategory === "dessert" ? styles.active : ""
              }`}
              onClick={() => handleCategoryChange("dessert")}
            >
              Tráng miệng
            </button>
          </div>

          <div className={styles.sortFilterControls}>
            <div className={styles.sortControl}>
              <select
                className={styles.sortSelect}
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
              >
                <option value="popular">Phổ biến nhất</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="new">Mới nhất</option>
              </select>
            </div>

            <button
              className={styles.filterToggleBtn}
              onClick={toggleFilter}
              aria-expanded={isFilterOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
              </svg>
              Lọc
            </button>
          </div>
        </div>

        <div
          className={`${styles.menuFilter} ${isFilterOpen ? styles.open : ""}`}
        >
          <div className={styles.filterHeader}>
            <h2>Bộ lọc</h2>
            <button className={styles.closeFilter} onClick={toggleFilter}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>

          <div className={styles.filterContent}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Danh mục</label>
              <select
                className={styles.filterSelect}
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">Tất cả danh mục</option>
                <option value="pizza">Pizza</option>
                <option value="burger">Burger</option>
                <option value="asian">Món Á</option>
                <option value="drink">Đồ uống</option>
                <option value="salad">Salad</option>
                <option value="dessert">Tráng miệng</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Khoảng giá</label>
              <div className={styles.priceRange}>
                <input
                  type="number"
                  placeholder="Từ"
                  className={styles.priceInput}
                  min="0"
                  name="priceMin"
                  value={filters.priceMin}
                  onChange={handleFilterChange}
                />
                <div className={styles.priceDivider}></div>
                <input
                  type="number"
                  placeholder="Đến"
                  className={styles.priceInput}
                  min="0"
                  name="priceMax"
                  value={filters.priceMax}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Đánh giá</label>
              <div className={styles.ratingOptions}>
                {[5, 4, 3, 0].map((value, index) => (
                  <label key={index} className={styles.ratingOption}>
                    <input
                      type="radio"
                      name="rating"
                      value={value || ""}
                      checked={filters.rating === (value || "")}
                      onChange={handleFilterChange}
                    />
                    <div className={styles.ratingDisplay}>
                      {value > 0 ? (
                        <>
                          {renderStars(value)}
                          <span>
                            {value === 5 ? "Chính xác" : `${value}+ sao`}
                          </span>
                        </>
                      ) : (
                        <span>Tất cả đánh giá</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Đặc tính</label>
              <div className={styles.featureOptions}>
                {[
                  { value: "vegetarian", label: "Chay", icon: "🥗" },
                  { value: "gluten-free", label: "Không gluten", icon: "🌾" },
                  { value: "spicy", label: "Cay", icon: "🌶️" },
                  { value: "bestseller", label: "Bán chạy", icon: "🔥" },
                  { value: "new", label: "Món mới", icon: "✨" },
                ].map((feature) => (
                  <label key={feature.value} className={styles.featureOption}>
                    <input
                      type="radio"
                      name="features"
                      value={feature.value}
                      checked={filters.features === feature.value}
                      onChange={handleFilterChange}
                    />
                    <span className={styles.featureIcon}>{feature.icon}</span>
                    <span>{feature.label}</span>
                  </label>
                ))}
                <label className={styles.featureOption}>
                  <input
                    type="radio"
                    name="features"
                    value=""
                    checked={filters.features === ""}
                    onChange={handleFilterChange}
                  />
                  <span className={styles.featureIcon}>🍽️</span>
                  <span>Tất cả</span>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.filterActions}>
            <button className={styles.resetFilter} onClick={resetFilters}>
              Đặt lại
            </button>
            <button className={styles.applyFilter} onClick={applyFilters}>
              Áp dụng
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className={styles.filterOverlay} onClick={toggleFilter}></div>
        )}

        {activeFilters.length > 0 && (
          <div className={styles.filterTags}>
            {activeFilters.map((filter) => (
              <div key={filter.id} className={styles.filterTag}>
                {filter.label}
                <button
                  className={styles.removeTag}
                  onClick={() => removeFilter(filter.type)}
                  aria-label="Remove filter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>
            ))}

            {activeFilters.length > 1 && (
              <button className={styles.clearAllFilters} onClick={resetFilters}>
                Xóa tất cả
              </button>
            )}
          </div>
        )}

        <div className={styles.resultsInfo}>
          <span>Hiển thị {sortedProducts.length} kết quả</span>
        </div>

        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}>
              <svg
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.spinnerSvg}
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="5"
                  className={styles.spinnerCircle}
                ></circle>
              </svg>
            </div>
            <p>Đang tải sản phẩm...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="48"
                height="48"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </div>
            <h3>Rất tiếc, đã xảy ra lỗi</h3>
            <p>{error}</p>
            <button className={styles.retryButton} onClick={loadProducts}>
              Thử lại
            </button>
          </div>
        )}

        {!loading && !error && currentProducts.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="64"
                height="64"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
              </svg>
            </div>
            <h3>Không tìm thấy sản phẩm nào</h3>
            <p>Không có sản phẩm nào phù hợp với bộ lọc bạn đã chọn.</p>
            <button className={styles.resetFilterButton} onClick={resetFilters}>
              Xóa bộ lọc
            </button>
          </div>
        )}

        {!loading && !error && currentProducts.length > 0 && (
          <div className={styles.menuGrid}>
            {currentProducts.map((item) => (
              <div key={item._id} className={styles.menuItem}>
                <div className={styles.imageContainer}>
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/300"}
                    alt={item.name}
                    className={styles.itemImage}
                    loading="lazy"
                  />
                  <div className={styles.itemBadges}>
                    {item.discount > 0 && (
                      <div
                        className={`${styles.itemBadge} ${styles.discountBadge}`}
                      >
                        -{item.discount}%
                      </div>
                    )}
                    {!item.discount && item.isNew && (
                      <div className={`${styles.itemBadge} ${styles.newBadge}`}>
                        Mới
                      </div>
                    )}
                    {!item.discount && !item.isNew && item.isBestSeller && (
                      <div
                        className={`${styles.itemBadge} ${styles.bestsellerBadge}`}
                      >
                        Bán chạy
                      </div>
                    )}
                  </div>

                  <div className={styles.quickActions}>
                    <button
                      className={styles.quickActionBtn}
                      aria-label="Yêu thích"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                    <button
                      className={styles.quickActionBtn}
                      aria-label="Xem nhanh"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className={styles.itemInfo}>
                  <div className={styles.itemCategory}>
                    {getCategoryName(item.category) || "Không có danh mục"}
                  </div>

                  <h3 className={styles.itemTitle}>{item.name}</h3>

                  <div className={styles.itemRating}>
                    {renderStars(item.rating)}
                    <span className={styles.ratingCount}>
                      ({item.ratingCount || 0})
                    </span>
                  </div>

                  <div className={styles.itemTags}>
                    {item.isVegetarian && (
                      <span className={`${styles.itemTag} ${styles.vegTag}`}>
                        Chay
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className={`${styles.itemTag} ${styles.spicyTag}`}>
                        Cay
                      </span>
                    )}
                    {item.isGlutenFree && (
                      <span
                        className={`${styles.itemTag} ${styles.glutenFreeTag}`}
                      >
                        Không gluten
                      </span>
                    )}
                  </div>

                  <p className={styles.itemDescription}>
                    {item.description || "Chưa có mô tả"}
                  </p>

                  <div className={styles.itemPrice}>
                    {item.discount > 0 && (
                      <span className={styles.originalPrice}>
                        {item.originalPrice?.toLocaleString("vi-VN")}₫
                      </span>
                    )}
                    <span className={styles.currentPrice}>
                      {item.price?.toLocaleString("vi-VN")}₫
                    </span>
                  </div>

                  <button className={styles.addToCart}>
                    <svg
                      className={styles.cartIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z" />
                    </svg>
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={`${styles.pageButton} ${
                currentPage === 1 ? styles.disabled : ""
              }`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <div className={styles.pageNumbers}>
              {[...Array(totalPages).keys()].map((number) => {
                const pageNumber = number + 1;
                // Show first page, last page, current page, and one page before and after current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      className={`${styles.pageNumber} ${
                        currentPage === pageNumber ? styles.active : ""
                      }`}
                      onClick={() => paginate(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === totalPages - 1 &&
                    currentPage < totalPages - 2)
                ) {
                  return (
                    <span key={pageNumber} className={styles.pageDots}>
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              className={`${styles.pageButton} ${
                currentPage === totalPages ? styles.disabled : ""
              }`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
