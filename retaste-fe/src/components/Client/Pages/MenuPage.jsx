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
      addFilter(`Danh mục: ${category}`, "category", category);
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
    // Reset current active filters
    setActiveFilters([]);

    // Add new filters based on current selection
    if (filters.category) {
      addFilter(`Danh mục: ${filters.category}`, "category", filters.category);
    }

    if (filters.features) {
      addFilter(`Đặc tính: ${filters.features}`, "features", filters.features);
    }

    if (filters.priceMin && filters.priceMax) {
      addFilter(`Giá: ${filters.priceMin}₫ - ${filters.priceMax}₫`, "price", {
        min: filters.priceMin,
        max: filters.priceMax,
      });
    }

    if (filters.rating) {
      addFilter(
        `Đánh giá: ${filters.rating} sao trở lên`,
        "rating",
        filters.rating
      );
    }

    // Reset to first page after applying filters
    setCurrentPage(1);
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
    // Remove existing filter of the same type
    const updatedFilters = activeFilters.filter(
      (filter) => filter.type !== type
    );

    // Add new filter
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

    // Reset specific filter in the form
    setFilters({
      ...filters,
      [type]: type === "price" ? { priceMin: "", priceMax: "" } : "",
    });
  };

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    // Filter by active filters
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
            (filter.value === "new" && !product.isNew)
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

  // Sort products
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

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate star rating display
  const renderStars = (rating) => {
    if (!rating) return "★★★★★";
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = "★".repeat(fullStars);
    if (halfStar) stars += "½";
    return stars;
  };

  // Get display name for categories
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

  return (
    <section className={styles.menuPage}>
      <div className={styles.container}>
        <div className={styles.pageTitle}>
          <h1>Thực đơn RETASTE</h1>
          <p>
            Khám phá thực đơn đa dạng với các món ăn đậm đà hương vị, được chuẩn
            bị từ những nguyên liệu tươi ngon nhất.
          </p>
        </div>

        <div className={styles.specialOffers}>
          <h2 className={styles.offerTitle}>Ưu đãi đặc biệt</h2>
          <div className={styles.offersContainer}>
            <div className={styles.offerCard}>
              <div className={styles.offerHeader}>
                <div className={styles.offerName}>Siêu giảm giá</div>
                <div className={styles.offerTag}>Mới</div>
              </div>
              <div className={styles.offerDescription}>
                Giảm 30% cho đơn hàng trên 200.000đ vào thứ Ba và thứ Năm.
              </div>
              <div className={styles.offerCode}>SUPER30</div>
              <div className={styles.offerExpiry}>Hết hạn: 31/12/2025</div>
            </div>
            <div className={`${styles.offerCard} ${styles.blue}`}>
              <div className={styles.offerHeader}>
                <div className={styles.offerName}>Combo tiết kiệm</div>
                <div className={styles.offerTag}>Hot</div>
              </div>
              <div className={styles.offerDescription}>
                Mua 2 món chính, tặng 1 món tráng miệng bất kỳ.
              </div>
              <div className={styles.offerCode}>COMBO2GET1</div>
              <div className={styles.offerExpiry}>Hết hạn: 15/11/2025</div>
            </div>
            <div className={`${styles.offerCard} ${styles.green}`}>
              <div className={styles.offerHeader}>
                <div className={styles.offerName}>Miễn phí giao hàng</div>
                <div className={styles.offerTag}>Giới hạn</div>
              </div>
              <div className={styles.offerDescription}>
                Miễn phí giao hàng cho đơn từ 150.000đ trong bán kính 5km.
              </div>
              <div className={styles.offerCode}>FREESHIP</div>
              <div className={styles.offerExpiry}>Hết hạn: 30/11/2025</div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className={styles.menuFilter}>
          <div className={styles.filterRow}>
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
              <label className={styles.filterLabel}>Sắp xếp theo</label>
              <select
                className={styles.filterSelect}
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
          </div>
          <div className={styles.filterRow}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Đánh giá</label>
              <select
                className={styles.filterSelect}
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
              >
                <option value="">Tất cả đánh giá</option>
                <option value="5">5 sao</option>
                <option value="4">4 sao trở lên</option>
                <option value="3">3 sao trở lên</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Đặc tính</label>
              <select
                className={styles.filterSelect}
                name="features"
                value={filters.features}
                onChange={handleFilterChange}
              >
                <option value="">Tất cả</option>
                <option value="vegetarian">Chay</option>
                <option value="gluten-free">Không gluten</option>
                <option value="spicy">Cay</option>
                <option value="bestseller">Bán chạy</option>
                <option value="new">Món mới</option>
              </select>
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

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className={styles.filterTags}>
            {activeFilters.map((filter) => (
              <div key={filter.id} className={styles.filterTag}>
                {filter.label}
                <button
                  className={styles.removeTag}
                  onClick={() => removeFilter(filter.type)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Category Tabs */}
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

        {/* Loading and Error States */}
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Đang tải sản phẩm...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>!</div>
            <p>{error}</p>
            <button className={styles.retryButton} onClick={loadProducts}>
              Thử lại
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && currentProducts.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🍽️</div>
            <h3>Không tìm thấy sản phẩm nào</h3>
            <p>Không có sản phẩm nào phù hợp với bộ lọc bạn đã chọn.</p>
            <button className={styles.resetFilterButton} onClick={resetFilters}>
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && currentProducts.length > 0 && (
          <div className={styles.menuGrid}>
            {currentProducts.map((item) => (
              <div key={item._id} className={styles.menuItem}>
                <div className={styles.imageContainer}>
                  <img
                    src={item.thumbnail || "https://via.placeholder.com/300"}
                    alt={item.name}
                    className={styles.itemImage}
                    loading="lazy"
                  />
                  {item.discount > 0 && (
                    <div
                      className={`${styles.itemBadge} ${styles.discountBadge}`}
                    >
                      -{item.discount}%
                    </div>
                  )}
                  {!item.discount && item.isBestSeller && (
                    <div className={styles.itemBadge}>Bán chạy</div>
                  )}
                  {!item.discount && !item.isBestSeller && item.isNew && (
                    <div className={`${styles.itemBadge} ${styles.newBadge}`}>
                      Mới
                    </div>
                  )}
                </div>

                <div className={styles.itemInfo}>
                  <div className={styles.itemHeader}>
                    <h3 className={styles.itemTitle}>{item.name}</h3>
                    <div className={styles.itemCategory}>
                      {getCategoryName(item.category) || "Không có danh mục"}
                    </div>
                  </div>

                  <p className={styles.itemDescription}>
                    {item.description || "Chưa có mô tả"}
                  </p>

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

                  <div className={styles.itemMeta}>
                    <div className={styles.itemRating}>
                      <span className={styles.stars}>
                        {renderStars(item.rating)}
                      </span>
                      <span className={styles.ratingCount}>
                        ({item.ratingCount || 0})
                      </span>
                    </div>
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
                  </div>

                  <div className={styles.itemActions}>
                    <button className={styles.addToCart}>
                      <svg
                        className={styles.cartIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="currentColor"
                      >
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                      Thêm vào giỏ
                    </button>
                    <button
                      className={styles.favoriteBtn}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className={styles.pagination}>
            <div
              className={`${styles.pageItem} ${
                currentPage === 1 ? styles.disabled : ""
              }`}
            >
              <button
                className={styles.pageLink}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous"
              >
                «
              </button>
            </div>

            {[...Array(totalPages).keys()].map((number) => (
              <div
                key={number + 1}
                className={`${styles.pageItem} ${
                  currentPage === number + 1 ? styles.active : ""
                }`}
              >
                <button
                  className={styles.pageLink}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </button>
              </div>
            ))}

            <div
              className={`${styles.pageItem} ${
                currentPage === totalPages ? styles.disabled : ""
              }`}
            >
              <button
                className={styles.pageLink}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next"
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
