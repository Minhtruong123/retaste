import React, { useEffect, useState, useCallback } from "react";
import { useProductService } from "../../../hooks/useProductService";
import { useCategoryService } from "../../../hooks/useCategoryService";
import { useCartService } from "../../../hooks/useCartService";
import styles from "./SuggestedDishesPage.module.css";
import { useNavigate } from "react-router-dom";

export default function SuggestedDishesPage() {
  const { getRetasteProducts } = useProductService();
  const { getListCategory } = useCategoryService();
  const { addToCart } = useCartService();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("relevance");

  const itemsPerPage = 8;
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [isFavoriteMap, setIsFavoriteMap] = useState({});
  const [visiblePageRange, setVisiblePageRange] = useState([]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoryData = await getListCategory();
        const categoryList = Array.isArray(categoryData) ? categoryData : [];
        setCategories(categoryList);

        const productData = await getRetasteProducts();
        const productList = Array.isArray(productData) ? productData : [];

        const preparedProducts = productList.map((product) => ({
          _id: product._id,
          productName: product.productName,
          description: product.description,
          basePrice: product.basePrice,
          imageUrl: product.imageUrl,
          categoryId: product.categoryId,
          categoryName:
            categoryList.find((cat) => cat._id === product.categoryId)
              ?.categoryName || "Không phân loại",
          bestSeller: product.bestSeller,
          isAvailable: product.isAvailable,
          ratingCount: product.ratingCount || 0,
          rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3-5 for demo
        }));

        setProducts(preparedProducts);
        setFilteredProducts(preparedProducts);
        setTotalPages(Math.ceil(preparedProducts.length / itemsPerPage));

        // Initialize favorite map
        const favMap = {};
        preparedProducts.forEach((product) => {
          favMap[product._id] = false;
        });
        setIsFavoriteMap(favMap);
      } catch (err) {
        setError("Không thể tải gợi ý món ăn. Vui lòng thử lại sau.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (activeFilter !== "Tất cả") {
      result = result.filter(
        (product) => product.categoryName === activeFilter
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.productName.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    switch (sortOption) {
      case "priceAsc":
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "priceDesc":
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "popularity":
        result.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    const newTotalPages = Math.ceil(result.length / itemsPerPage);
    setTotalPages(newTotalPages);
    setActivePage(1);

    // Update visible page range
    updateVisiblePageRange(1, newTotalPages);
  }, [activeFilter, searchQuery, sortOption, products]);

  const updateVisiblePageRange = useCallback((current, total) => {
    let range = [];
    const maxVisiblePages = 5;

    if (total <= maxVisiblePages) {
      // Show all pages if total is small
      range = Array.from({ length: total }, (_, i) => i + 1);
    } else {
      // Always include first and last page
      range = [1];

      // Calculate middle range
      let start = Math.max(2, current - Math.floor(maxVisiblePages / 2));
      let end = Math.min(total - 1, start + maxVisiblePages - 3);

      // Adjust start if end is at its maximum
      if (end === total - 1) {
        start = Math.max(2, end - (maxVisiblePages - 3));
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        range.push("...");
      }

      // Add middle range
      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < total - 1) {
        range.push("...");
      }

      // Add last page
      range.push(total);
    }

    setVisiblePageRange(range);
  }, []);

  const getPaginatedData = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleAddToCart = async (product, event) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.innerHTML =
      '<span class="loading-dots"><span></span><span></span><span></span></span>';

    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
      });

      button.innerHTML = '<span class="success-icon">✓</span> Đã thêm';
      button.classList.add(styles.addSuccess);

      window.dispatchEvent(new Event("cartBounce"));

      setTimeout(() => {
        button.innerHTML = "Thêm vào giỏ";
        button.classList.remove(styles.addSuccess);
        button.disabled = false;
      }, 2000);
    } catch (err) {
      alert("Không thể thêm vào giỏ hàng");
      button.innerHTML = "Thêm vào giỏ";
      button.disabled = false;
    }
  };

  const toggleView = (mode) => {
    setViewMode(mode);
  };

  const handleFavorite = (productId) => {
    setIsFavoriteMap((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const filterOptions = [
    "Tất cả",
    ...categories.map((cat) => cat.categoryName),
  ];

  const renderStars = (rating) => {
    const normalizedRating = Math.min(5, Math.max(0, Math.round(rating)));
    return (
      <div className={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${styles.star} ${
              star <= normalizedRating ? styles.filled : styles.empty
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    updateVisiblePageRange(page, totalPages);

    window.scrollTo({
      top:
        document.querySelector(`.${styles.recommendedSection}`).offsetTop - 100,
      behavior: "smooth",
    });
  };

  const nextPage = () => {
    if (activePage < totalPages) {
      handlePageChange(activePage + 1);
    }
  };

  const prevPage = () => {
    if (activePage > 1) {
      handlePageChange(activePage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingAnimation}>
            <div className={styles.spinner}></div>
            <div className={styles.plate}>
              <div className={styles.fork}></div>
              <div className={styles.knife}></div>
            </div>
          </div>
          <p className={styles.loadingText}>
            Đang tải gợi ý dành riêng cho bạn...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <p className={styles.errorText}>{error}</p>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <section className={styles.pageTitleSection}>
        <div className={styles.container}>
          <h1>Món được gợi ý cho bạn</h1>
          <p>
            Dựa trên sở thích và lịch sử đặt món của bạn, chúng tôi gợi ý những
            món ăn sau đây
          </p>
        </div>
        <div className={styles.wavyBackground}></div>
      </section>

      <div className={styles.container}>
        <div className={styles.preferenceProfile}>
          <div className={styles.preferenceHeader}>
            <div className={styles.preferenceHeaderLeft}>
              <h3 className={styles.preferenceTitle}>Hồ sơ khẩu vị của bạn</h3>
              <span className={styles.profileComplete}>75% hoàn thành</span>
            </div>
            <a href="#" className={styles.editPreferences}>
              <span className={styles.editIcon}>✏️</span> Chỉnh sửa sở thích
            </a>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: "75%" }}></div>
          </div>
          <div className={styles.preferenceTags}>
            <div className={`${styles.preferenceTag} ${styles.like}`}>
              <span>Món Á</span> <span className={styles.tagIcon}>✓</span>
            </div>
            <div className={`${styles.preferenceTag} ${styles.like}`}>
              <span>Cay vừa</span> <span className={styles.tagIcon}>✓</span>
            </div>
            <div className={`${styles.preferenceTag} ${styles.like}`}>
              <span>Hải sản</span> <span className={styles.tagIcon}>✓</span>
            </div>
            <div className={`${styles.preferenceTag} ${styles.like}`}>
              <span>Gà</span> <span className={styles.tagIcon}>✓</span>
            </div>
            <div className={`${styles.preferenceTag} ${styles.dislike}`}>
              <span>Rau mùi</span> <span className={styles.tagIcon}>✕</span>
            </div>
            <div className={`${styles.preferenceTag} ${styles.dislike}`}>
              <span>Nấm</span> <span className={styles.tagIcon}>✕</span>
            </div>
            <div className={styles.addNewPreference}>+</div>
          </div>
          <p className={styles.preferenceNote}>
            Các gợi ý sẽ được điều chỉnh dựa trên sở thích của bạn. Hãy thường
            xuyên đánh giá và cập nhật sở thích để nhận gợi ý chính xác hơn.
          </p>
        </div>
      </div>

      <section className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>
              <span className={styles.searchIcon}>🔍</span>
            </button>
          </div>

          <div className={styles.filtersContainer}>
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>Danh mục:</div>
              <div className={styles.filterOptions}>
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    className={`${styles.filterOption} ${
                      activeFilter === option ? styles.active : ""
                    }`}
                    onClick={() => setActiveFilter(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.sortOptions}>
              <div className={styles.filterLabel}>Sắp xếp theo:</div>
              <select
                className={styles.sortSelect}
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="relevance">Độ phù hợp</option>
                <option value="popularity">Phổ biến</option>
                <option value="priceAsc">Giá: Thấp đến cao</option>
                <option value="priceDesc">Giá: Cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.recommendedSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Gợi ý cá nhân hóa
              {filteredProducts.length > 0 && (
                <span className={styles.resultCount}>
                  {" "}
                  ({filteredProducts.length} món)
                </span>
              )}
            </h2>
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewButton} ${
                  viewMode === "grid" ? styles.active : ""
                }`}
                onClick={() => toggleView("grid")}
                aria-label="Xem dạng lưới"
              >
                <span className={styles.gridIcon}></span>
              </button>
              <button
                className={`${styles.viewButton} ${
                  viewMode === "list" ? styles.active : ""
                }`}
                onClick={() => toggleView("list")}
                aria-label="Xem dạng danh sách"
              >
                <span className={styles.listIcon}></span>
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🍽️</div>
              <p>Không tìm thấy món ăn phù hợp với tìm kiếm "{searchQuery}".</p>
              <p>Vui lòng thử lại với từ khóa khác hoặc bỏ bộ lọc.</p>
              <button
                className={styles.resetButton}
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("Tất cả");
                  setSortOption("relevance");
                }}
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          ) : (
            <>
              <div className={styles.paginationInfo}>
                Hiển thị {(activePage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(activePage * itemsPerPage, filteredProducts.length)}{" "}
                trên {filteredProducts.length} kết quả
              </div>

              {viewMode === "grid" && (
                <div className={styles.productsGrid}>
                  {getPaginatedData().map((product, index) => (
                    <div
                      className={`${styles.productCard} ${
                        !product.isAvailable ? styles.unavailable : ""
                      } ${isFavoriteMap[product._id] ? styles.favorited : ""}`}
                      key={product._id}
                    >
                      <div className={styles.cardInner}>
                        <span className={styles.productPosition}>
                          {(activePage - 1) * itemsPerPage + index + 1}
                        </span>
                        {product.bestSeller && (
                          <span
                            className={`${styles.badge} ${styles.badgeTrending}`}
                          >
                            Bán chạy
                          </span>
                        )}
                        <div className={styles.productImgContainer}>
                          <img
                            src={product.imageUrl}
                            alt={product.productName}
                            className={styles.productImg}
                            onClick={() => navigate(`/product/${product._id}`)}
                            loading="lazy"
                          />
                          {!product.isAvailable && (
                            <div className={styles.soldOutOverlay}>
                              <span>Hết hàng</span>
                            </div>
                          )}
                          <button
                            className={`${styles.favoriteBtn} ${
                              isFavoriteMap[product._id] ? styles.active : ""
                            }`}
                            onClick={() => handleFavorite(product._id)}
                            aria-label={
                              isFavoriteMap[product._id]
                                ? "Bỏ yêu thích"
                                : "Yêu thích"
                            }
                          >
                            <span className={styles.heartIcon}></span>
                          </button>
                        </div>
                        <div className={styles.productInfo}>
                          <div className={styles.productMeta}>
                            <div className={styles.productCategory}>
                              {product.categoryName}
                            </div>
                            <div className={styles.productRating}>
                              {renderStars(product.rating)}
                              <span className={styles.ratingCount}>
                                ({product.ratingCount || 0})
                              </span>
                            </div>
                          </div>
                          <h3
                            className={styles.productTitle}
                            onClick={() => navigate(`/product/${product._id}`)}
                            title={product.productName}
                          >
                            {product.productName}
                          </h3>
                          <p className={styles.productDescription}>
                            {product.description.substring(0, 60)}
                            {product.description.length > 60 ? "..." : ""}
                          </p>
                          <div className={styles.productDetails}>
                            <div className={styles.productPrice}>
                              {formatPrice(product.basePrice)}
                            </div>
                            <button
                              className={styles.addToCart}
                              onClick={(e) => handleAddToCart(product, e)}
                              disabled={!product.isAvailable}
                            >
                              {product.isAvailable
                                ? "Thêm vào giỏ"
                                : "Hết hàng"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === "list" && (
                <div className={styles.productsList}>
                  {getPaginatedData().map((product, index) => (
                    <div
                      className={`${styles.productListItem} ${
                        !product.isAvailable ? styles.unavailable : ""
                      } ${isFavoriteMap[product._id] ? styles.favorited : ""}`}
                      key={product._id}
                    >
                      <div className={styles.productListImgContainer}>
                        <div className={styles.productPosition}>
                          {(activePage - 1) * itemsPerPage + index + 1}
                        </div>
                        <img
                          src={product.imageUrl}
                          alt={product.productName}
                          className={styles.productListImg}
                          onClick={() => navigate(`/product/${product._id}`)}
                          loading="lazy"
                        />
                        {!product.isAvailable && (
                          <div className={styles.soldOutOverlay}>
                            <span>Hết hàng</span>
                          </div>
                        )}
                        {product.bestSeller && (
                          <span
                            className={`${styles.badge} ${styles.badgeTrending}`}
                          >
                            Bán chạy
                          </span>
                        )}
                      </div>
                      <div className={styles.productListInfo}>
                        <div className={styles.productListTop}>
                          <div>
                            <div className={styles.titleContainer}>
                              <h3
                                className={styles.productListTitle}
                                onClick={() =>
                                  navigate(`/product/${product._id}`)
                                }
                              >
                                {product.productName}
                              </h3>
                              <button
                                className={`${styles.favoriteBtn} ${
                                  isFavoriteMap[product._id]
                                    ? styles.active
                                    : ""
                                }`}
                                onClick={() => handleFavorite(product._id)}
                                aria-label={
                                  isFavoriteMap[product._id]
                                    ? "Bỏ yêu thích"
                                    : "Yêu thích"
                                }
                              >
                                <span className={styles.heartIcon}></span>
                              </button>
                            </div>
                            <div className={styles.metadataRow}>
                              <div className={styles.productListCategory}>
                                {product.categoryName}
                              </div>
                              <div className={styles.productRating}>
                                {renderStars(product.rating)}
                                <span className={styles.ratingCount}>
                                  ({product.ratingCount || 0})
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className={styles.productListDescription}>
                          {product.description}
                        </p>
                        <div className={styles.productListBottom}>
                          <div className={styles.productPrice}>
                            {formatPrice(product.basePrice)}
                          </div>
                          <div className={styles.productListActions}>
                            <button
                              className={styles.addToCart}
                              onClick={(e) => handleAddToCart(product, e)}
                              disabled={!product.isAvailable}
                            >
                              {product.isAvailable
                                ? "Thêm vào giỏ"
                                : "Hết hàng"}
                            </button>
                            <button
                              className={styles.viewDetails}
                              onClick={() =>
                                navigate(`/product/${product._id}`)
                              }
                            >
                              Xem chi tiết
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className={styles.paginationContainer}>
                  <div className={styles.pagination}>
                    <button
                      className={`${styles.paginationButton} ${styles.navButton}`}
                      onClick={prevPage}
                      disabled={activePage === 1}
                      aria-label="Trang trước"
                    >
                      <span className={styles.arrowLeft}></span>
                    </button>

                    {visiblePageRange.map((page, index) => (
                      <React.Fragment key={index}>
                        {page === "..." ? (
                          <span className={styles.paginationEllipsis}>...</span>
                        ) : (
                          <button
                            className={`${styles.paginationButton} ${
                              activePage === page ? styles.active : ""
                            }`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}

                    <button
                      className={`${styles.paginationButton} ${styles.navButton}`}
                      onClick={nextPage}
                      disabled={activePage === totalPages}
                      aria-label="Trang sau"
                    >
                      <span className={styles.arrowRight}></span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <div className={styles.recommendationSummary}>
        <div className={styles.container}>
          <h3>Đánh giá gợi ý món ăn</h3>
          <p>Các món ăn được gợi ý có phù hợp với sở thích của bạn không?</p>
          <div className={styles.feedbackButtons}>
            <button className={`${styles.feedbackButton} ${styles.likeButton}`}>
              <span className={styles.thumbsIcon}>👍</span> Phù hợp
            </button>
            <button
              className={`${styles.feedbackButton} ${styles.dislikeButton}`}
            >
              <span className={styles.thumbsIcon}>👎</span> Chưa phù hợp
            </button>
          </div>
          <p className={styles.feedbackNote}>
            Phản hồi của bạn sẽ giúp chúng tôi cải thiện thuật toán gợi ý
          </p>
        </div>
      </div>
    </div>
  );
}
