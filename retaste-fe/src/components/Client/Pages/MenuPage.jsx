import React, { useEffect, useState, useCallback } from "react";
import styles from "./MenuPage.module.css";
import * as productsService from "../../../service/products_service";

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState("popular");

  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    rating: "",
    features: "",
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 8;

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productsService.getListProduct({
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
    if (activeCategory !== "all" && p.category !== activeCategory) return false;

    if (filters.priceMin && p.price < Number(filters.priceMin)) return false;
    if (filters.priceMax && p.price > Number(filters.priceMax)) return false;
    if (filters.rating && p.rating < Number(filters.rating)) return false;

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
      <>
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
      </>
    );
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
          {totalProducts} sản phẩm
        </div>

        <div
          className={`${styles.menuFilter} ${isFilterOpen ? styles.open : ""}`}
        >
          <div className={styles.filterHeader}>
            <h2>Bộ lọc</h2>
            <button
              className={styles.closeFilter}
              onClick={() => setIsFilterOpen(false)}
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
                    <span className={styles.featureIcon}>{f.icon}</span>
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
            <p>{error}</p>
            <button className={styles.retryButton} onClick={loadProducts}>
              Thử lại
            </button>
          </div>
        )}

        {!loading && !error && currentProducts.length === 0 && (
          <div className={styles.emptyState}>
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
                <div key={item._id} className={styles.menuItem}>
                  <div className={styles.imageContainer}>
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/300"}
                      alt={item.productName}
                      className={styles.itemImage}
                      loading="lazy"
                    />
                    <div className={styles.itemBadges}>
                      {/* Backend chưa có discount → tạm ẩn */}
                      {/* {item.discount > 0 && (
                <span className={`${styles.itemBadge} ${styles.discountBadge}`}>
                  -{item.discount}%
                </span>
              )} */}

                      {/* Backend chưa có isNew → ẩn luôn */}
                      {/* {item.isNew && (
                <span className={`${styles.itemBadge} ${styles.newBadge}`}>
                  Mới
                </span>
              )} */}

                      {/* bestSeller → backend có rồi, đổi thành bestSeller (camelCase) */}
                      {item.bestSeller && (
                        <span
                          className={`${styles.itemBadge} ${styles.bestsellerBadge}`}
                        >
                          Hot
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.itemInfo}>
                    <span className={styles.itemCategory}>
                      {item.category?.[0]?.categoryName || "Không có"}
                    </span>

                    <h3 className={styles.itemTitle}>{item.productName}</h3>

                    <div className={styles.itemRating}>
                      {renderStars(0)}
                      <span className={styles.ratingCount}>
                        ({item.ratingCount || 0})
                      </span>
                    </div>

                    <div className={styles.itemTags}>
                      {/* {item.isVegetarian && <span className={`${styles.itemTag} ${styles.vegTag}`}>Chay</span>} */}
                      {/* {item.isSpicy && <span className={`${styles.itemTag} ${styles.spicyTag}`}>Cay</span>} */}
                      {/* {item.isGlutenFree && <span className={`${styles.itemTag} ${styles.glutenFreeTag}`}>Không gluten</span>} */}
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
                >
                  ←
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
                  if (page === 2 || page === totalPages - 1) {
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
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
