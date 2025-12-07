import React, { useEffect, useState, useCallback } from "react";
import styles from "./MenuPage.module.css";
import { useNavigate } from "react-router-dom";
import { useProductService } from "../../../hooks/useProductService";

export default function MenuPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 9;

  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    rating: "",
    features: "",
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { getListProduct } = useProductService();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getListProduct({
        page: currentPage,
        limit,
        sortKey: getSortKey(sortOption),
        sortValue: getSortValue(sortOption),
      });

      const list = Array.isArray(data) ? data : data.products || [];
      const total = data.total || list.length;

      setProducts(list);
      setTotalProducts(total);
      setTotalPages(Math.ceil(total / limit));
    } catch (err) {
      console.error(err);
      setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortOption]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const getSortKey = (opt) => {
    const map = {
      "price-asc": "price",
      "price-desc": "price",
      rating: "rating",
      new: "createdAt",
      popular: "salesCount",
    };
    return map[opt] || "salesCount";
  };

  const getSortValue = (opt) => (opt === "price-asc" ? "1" : "-1");

  const filteredProducts = products.filter((p) => {
    if (
      activeCategory !== "all" &&
      p.category?._id !== activeCategory &&
      p.category !== activeCategory
    )
      return false;
    if (filters.priceMin && p.basePrice < Number(filters.priceMin))
      return false;
    if (filters.priceMax && p.basePrice > Number(filters.priceMax))
      return false;
    if (filters.rating && (p.rating || 0) < Number(filters.rating))
      return false;
    if (filters.features) {
      const map = {
        vegetarian: p.isVegetarian,
        "gluten-free": p.isGlutenFree,
        spicy: p.isSpicy,
        bestseller: p.isBestSeller,
        new: p.isNew,
      };
      if (!map[filters.features]) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
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
        return (b.salesCount || 0) - (a.salesCount || 0);
    }
  });

  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const addFilterTag = (label, type, value) => {
    if (activeFilters.some((f) => f.type === type)) return;
    setActiveFilters((prev) => [
      ...prev,
      { id: Date.now(), label, type, value },
    ]);
  };

  const removeFilterTag = (type) => {
    setActiveFilters((prev) => prev.filter((f) => f.type !== type));

    if (type === "category") setActiveCategory("all");
    if (type === "price")
      setFilters((prev) => ({ ...prev, priceMin: "", priceMax: "" }));
    if (type === "rating") setFilters((prev) => ({ ...prev, rating: "" }));
    if (type === "features") setFilters((prev) => ({ ...prev, features: "" }));
  };

  const applyFilters = () => {
    setActiveFilters([]);

    if (activeCategory !== "all") {
      addFilterTag(
        `Danh mục: ${getCategoryName(activeCategory)}`,
        "category",
        activeCategory
      );
    }
    if (filters.priceMin || filters.priceMax) {
      addFilterTag(
        `Giá: ${filters.priceMin || 0}₫ - ${filters.priceMax || "∞"}₫`,
        "price",
        {}
      );
    }
    if (filters.rating) {
      addFilterTag(
        `Đánh giá: ${filters.rating} sao+`,
        "rating",
        filters.rating
      );
    }
    if (filters.features) {
      const names = {
        vegetarian: "Chay",
        "gluten-free": "Không gluten",
        spicy: "Cay",
        bestseller: "Bán chạy",
        new: "Mới",
      };
      addFilterTag(
        `Đặc tính: ${names[filters.features]}`,
        "features",
        filters.features
      );
    }

    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const resetAll = () => {
    setActiveCategory("all");
    setFilters({ priceMin: "", priceMax: "", rating: "", features: "" });
    setActiveFilters([]);
    setCurrentPage(1);
  };

  const getCategoryName = (cat) => {
    const map = {
      pizza: "Pizza",
      burger: "Burger",
      asian: "Món Á",
      drink: "Đồ uống",
      salad: "Salad",
      dessert: "Tráng miệng",
    };
    return map[cat] || cat;
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating || 0);
    const half = rating % 1 >= 0.5;
    return (
      <div className={styles.starsContainer}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`${styles.star} ${
              i < full ? styles.filled : i === full && half ? styles.half : ""
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderFeatureIcon = (feature) => {
    const icons = {
      Leaf: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="16"
          height="16"
        >
          <path d="M6.05 8.05a7.001 7.001 0 0 0 13.9 0C20 12.41 16.41 16 12 16c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.48 0 2.86.41 4.05 1.12A7.059 7.059 0 0 0 12 0a8 8 0 1 0 0 16c4.41 0 8-3.59 8-8 0-2.52-1.17-4.77-3-6.24a7.001 7.001 0 0 0-10.95 6.29z" />
        </svg>
      ),
      Wheat: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="16"
          height="16"
        >
          <path d="M12 2L9 5h6l-3-3zm6 6h-3v10c0 1.1-.9 2-2 2s-2-.9-2-2V8H8l3-3 3 3zM9 14v2h2v-2H9zm2-4v2h2v-2h-2z" />
        </svg>
      ),
      Fire: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="16"
          height="16"
        >
          <path d="M12 23a7.5 7.5 0 0 1-7.5-7.5c0-2.39 1.22-4.5 3.05-5.8V8a4.5 4.5 0 1 1 9 0v1.7c1.83 1.3 3.05 3.41 3.05 5.8A7.5 7.5 0 0 1 12 23zm2.45-14.97v-.08A2.5 2.5 0 0 0 9.95 8v4.17L9 12.83A5.5 5.5 0 0 0 6.5 15.5a5.5 5.5 0 0 0 11 0 5.5 5.5 0 0 0-2.5-4.63V8a2.5 2.5 0 0 0-.55.03z" />
        </svg>
      ),
      Sparkles: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="16"
          height="16"
        >
          <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
        </svg>
      ),
    };
    return icons[feature] || null;
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

        <div className={styles.categoryTabs}>
          {["all", "pizza", "burger", "asian", "drink", "salad", "dessert"].map(
            (cat) => (
              <button
                key={cat}
                className={`${styles.tabButton} ${
                  activeCategory === cat ? styles.active : ""
                }`}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat === "all" ? "Tất cả" : getCategoryName(cat)}
              </button>
            )
          )}
        </div>

        <div className={styles.menuControls}>
          <div className={styles.sortFilterControls}>
            <div className={styles.sortControl}>
              <select
                className={styles.sortSelect}
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="popular">Phổ biến nhất</option>
                <option value="new">Mới nhất</option>
                <option value="rating">Đánh giá cao</option>
                <option value="price-asc">Giá: Thấp → Cao</option>
                <option value="price-desc">Giá: Cao → Thấp</option>
              </select>
            </div>

            <button
              className={styles.filterToggleBtn}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
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

        {activeFilters.length > 0 && (
          <div className={styles.filterTags}>
            {activeFilters.map((f) => (
              <div key={f.id} className={styles.filterTag}>
                {f.label}
                <button
                  className={styles.removeTag}
                  onClick={() => removeFilterTag(f.type)}
                  aria-label="Xóa bộ lọc"
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
            <button className={styles.clearAllFilters} onClick={resetAll}>
              Xóa tất cả
            </button>
          </div>
        )}

        <div className={styles.resultsInfo}>
          Hiển thị <strong>{sortedProducts.length}</strong> trong tổng số{" "}
          <strong>{totalProducts}</strong> sản phẩm
        </div>

        <div
          className={`${styles.menuFilter} ${isFilterOpen ? styles.open : ""}`}
        >
          <div className={styles.filterHeader}>
            <h2>Bộ lọc</h2>
            <button
              className={styles.closeFilter}
              onClick={() => setIsFilterOpen(false)}
              aria-label="Đóng bộ lọc"
            >
              ×
            </button>
          </div>

          <div className={styles.filterContent}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Khoảng giá</label>
              <div className={styles.priceRange}>
                <input
                  type="number"
                  placeholder="Từ"
                  className={styles.priceInput}
                  value={filters.priceMin}
                  onChange={(e) =>
                    setFilters({ ...filters, priceMin: e.target.value })
                  }
                />
                <div className={styles.priceDivider} />
                <input
                  type="number"
                  placeholder="Đến"
                  className={styles.priceInput}
                  value={filters.priceMax}
                  onChange={(e) =>
                    setFilters({ ...filters, priceMax: e.target.value })
                  }
                />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Đánh giá</label>
              <div className={styles.ratingOptions}>
                {[5, 4, 3].map((val) => (
                  <label key={val} className={styles.ratingOption}>
                    <input
                      type="radio"
                      name="rating"
                      value={val}
                      checked={filters.rating === String(val)}
                      onChange={(e) =>
                        setFilters({ ...filters, rating: e.target.value })
                      }
                    />
                    <div className={styles.ratingDisplay}>
                      {renderStars(val)}
                      <span>& {val} sao trở lên</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Đặc tính</label>
              <div className={styles.featureOptions}>
                {[
                  { value: "vegetarian", label: "Chay", icon: "Leaf" },
                  {
                    value: "gluten-free",
                    label: "Không gluten",
                    icon: "Wheat",
                  },
                  { value: "spicy", label: "Cay", icon: "Fire" },
                  { value: "bestseller", label: "Bán chạy", icon: "Fire" },
                  { value: "new", label: "Mới", icon: "Sparkles" },
                ].map((f) => (
                  <label key={f.value} className={styles.featureOption}>
                    <input
                      type="radio"
                      name="features"
                      value={f.value}
                      checked={filters.features === f.value}
                      onChange={(e) =>
                        setFilters({ ...filters, features: e.target.value })
                      }
                    />
                    <span className={styles.featureIcon}>
                      {renderFeatureIcon(f.icon)}
                    </span>
                    <span>{f.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.filterActions}>
            <button className={styles.resetFilter} onClick={resetAll}>
              Đặt lại
            </button>
            <button className={styles.applyFilter} onClick={applyFilters}>
              Áp dụng
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div
            className={styles.filterOverlay}
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}>
              <svg className={styles.spinnerSvg} viewBox="0 0 50 50">
                <circle
                  className={styles.spinnerCircle}
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="5"
                />
              </svg>
            </div>
            <p>Đang tải món ngon...</p>
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
            <h3>Không thể tải dữ liệu</h3>
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
                width="48"
                height="48"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 11h-9c-.55 0-1-.45-1-1s.45-1 1-1h9c.55 0 1 .45 1 1s-.45 1-1 1z" />
              </svg>
            </div>
            <h3>Không tìm thấy món nào</h3>
            <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm nhé!</p>
            <button className={styles.resetFilterButton} onClick={resetAll}>
              Xóa bộ lọc
            </button>
          </div>
        )}

        {!loading && currentProducts.length > 0 && (
          <>
            <div className={styles.menuGrid}>
              {currentProducts.map((item) => (
                <div
                  key={item._id}
                  className={styles.menuItem}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/detail_product/${item._id}`)}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/300"}
                      alt={item.productName}
                      className={styles.itemImage}
                      loading="lazy"
                    />
                    <div className={styles.itemBadges}>
                      {item.bestSeller && (
                        <span
                          className={`${styles.itemBadge} ${styles.bestsellerBadge}`}
                        >
                          Hot
                        </span>
                      )}
                    </div>

                    <div className={styles.quickActions}>
                      <button
                        className={styles.quickActionBtn}
                        aria-label="Thêm vào yêu thích"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="currentColor"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                      <button
                        className={styles.quickActionBtn}
                        aria-label="Xem chi tiết"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="currentColor"
                        >
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className={styles.itemInfo}>
                    <span className={styles.itemCategory}>
                      {item.category?.categoryName ||
                        item.category?.[0]?.categoryName ||
                        "Không có"}
                    </span>

                    <h3 className={styles.itemTitle}>{item.productName}</h3>

                    <div className={styles.itemRating}>
                      {renderStars(item.rating || 0)}
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
                        <span
                          className={`${styles.itemTag} ${styles.spicyTag}`}
                        >
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
                      <span className={styles.currentPrice}>
                        {item.basePrice.toLocaleString("vi-VN")}₫
                      </span>
                    </div>

                    <button className={styles.addToCart}>
                      <svg
                        className={styles.cartIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
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

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={`${styles.pageButton} ${
                    currentPage === 1 ? styles.disabled : ""
                  }`}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Trang trước"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        className={`${styles.pageNumber} ${
                          currentPage === page ? styles.active : ""
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    );
                  }
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className={styles.pageDots}>
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  className={`${styles.pageButton} ${
                    currentPage === totalPages ? styles.disabled : ""
                  }`}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Trang sau"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
