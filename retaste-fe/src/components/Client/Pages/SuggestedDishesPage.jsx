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
    setTotalPages(Math.ceil(result.length / itemsPerPage));
    setActivePage(1);
  }, [activeFilter, searchQuery, sortOption, products]);

  const getPaginatedData = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleAddToCart = async (product, event) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = "Đang thêm...";

    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
      });

      button.textContent = "Đã thêm!";
      button.style.backgroundColor = "#2a9d8f";

      window.dispatchEvent(new Event("cartBounce"));

      setTimeout(() => {
        button.textContent = "Thêm vào giỏ";
        button.style.backgroundColor = "#ff6b35";
        button.disabled = false;
      }, 2000);
    } catch (err) {
      alert("Không thể thêm vào giỏ hàng");
      button.textContent = "Thêm vào giỏ";
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
    return "★".repeat(normalizedRating) + "☆".repeat(5 - normalizedRating);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    window.scrollTo(
      0,
      document.querySelector(`.${styles.recommendedSection}`).offsetTop - 100
    );
  };

  const nextPage = () => {
    if (activePage < totalPages) {
      handlePageChange(activePage + 1);
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
          <div className={styles.spinner}></div>
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
      </section>

      <div className={styles.container}>
        <div className={styles.preferenceProfile}>
          <div className={styles.preferenceHeader}>
            <h3 className={styles.preferenceTitle}>Hồ sơ khẩu vị của bạn</h3>
            <a href="#" className={styles.editPreferences}>
              ✏️ Chỉnh sửa sở thích
            </a>
          </div>
          <div className={styles.preferenceTags}>
            <div className={`${styles.preferenceTag} ${styles.like}`}>
              <span>Món Á</span> ✓
            </div>
            <div className={`${styles.preferenceTag} ${styles.like}`}>
              <span>Cay vừa</span> ✓
            </div>
            <div className={`${styles.preferenceTag} ${styles.like}`}>
              <span>Hải sản</span> ✓
            </div>
            <div className={`${styles.preferenceTag} ${styles.like}`}>
              <span>Gà</span> ✓
            </div>
            <div className={`${styles.preferenceTag} ${styles.dislike}`}>
              <span>Rau mùi</span> ✕
            </div>
            <div className={`${styles.preferenceTag} ${styles.dislike}`}>
              <span>Nấm</span> ✕
            </div>
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
            <button className={styles.searchButton}>🔍</button>
          </div>

          <div className={styles.filtersContainer}>
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>Bộ lọc:</div>
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
                <option value="rating">Đánh giá</option>
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
                title="Xem dạng lưới"
              >
                📱
              </button>
              <button
                className={`${styles.viewButton} ${
                  viewMode === "list" ? styles.active : ""
                }`}
                onClick={() => toggleView("list")}
                title="Xem dạng danh sách"
              >
                📄
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
              {viewMode === "grid" && (
                <div className={styles.productsGrid}>
                  {getPaginatedData().map((product, index) => (
                    <div
                      className={`${styles.productCard} ${
                        !product.isAvailable ? styles.unavailable : ""
                      }`}
                      key={product._id}
                    >
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
                        />
                        {!product.isAvailable && (
                          <div className={styles.soldOutOverlay}>Hết hàng</div>
                        )}
                      </div>
                      <div className={styles.productInfo}>
                        <h3
                          className={styles.productTitle}
                          onClick={() => navigate(`/product/${product._id}`)}
                        >
                          {product.productName}
                        </h3>
                        <div className={styles.productCategory}>
                          {product.categoryName}
                        </div>
                        <div className={styles.productDetails}>
                          <div className={styles.productPrice}>
                            {formatPrice(product.basePrice)}
                          </div>
                          <div className={styles.productRating}>
                            {renderStars(product.rating)}
                            <span className={styles.ratingCount}>
                              {product.ratingCount || 0}
                            </span>
                          </div>
                        </div>
                        <div className={styles.productActions}>
                          <button
                            className={styles.addToCart}
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={!product.isAvailable}
                          >
                            {product.isAvailable ? "Thêm vào giỏ" : "Hết hàng"}
                          </button>
                          <button
                            className={`${styles.favoriteBtn} ${
                              isFavoriteMap[product._id] ? styles.active : ""
                            }`}
                            onClick={() => handleFavorite(product._id)}
                          >
                            {isFavoriteMap[product._id] ? "❤️" : "🤍"}
                          </button>
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
                      }`}
                      key={product._id}
                    >
                      <div className={styles.productListImgContainer}>
                        <img
                          src={product.imageUrl}
                          alt={product.productName}
                          className={styles.productListImg}
                          onClick={() => navigate(`/product/${product._id}`)}
                        />
                        {!product.isAvailable && (
                          <div className={styles.soldOutOverlay}>Hết hàng</div>
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
                            <h3
                              className={styles.productListTitle}
                              onClick={() =>
                                navigate(`/product/${product._id}`)
                              }
                            >
                              {product.productName}
                            </h3>
                            <div className={styles.productListCategory}>
                              {product.categoryName}
                            </div>
                          </div>
                          <div className={styles.productRating}>
                            {renderStars(product.rating)}
                            <span className={styles.ratingCount}>
                              {product.ratingCount || 0}
                            </span>
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
                              className={`${styles.favoriteBtn} ${
                                isFavoriteMap[product._id] ? styles.active : ""
                              }`}
                              onClick={() => handleFavorite(product._id)}
                            >
                              {isFavoriteMap[product._id] ? "❤️" : "🤍"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  {activePage > 1 && (
                    <button
                      className={styles.paginationButton}
                      onClick={() => handlePageChange(activePage - 1)}
                    >
                      «
                    </button>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        (page >= activePage - 1 && page <= activePage + 1)
                    )
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className={styles.paginationEllipsis}>...</span>
                        )}
                        <button
                          className={`${styles.paginationButton} ${
                            activePage === page ? styles.active : ""
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))}

                  {activePage < totalPages && (
                    <button
                      className={styles.paginationButton}
                      onClick={nextPage}
                    >
                      »
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <div className={styles.recommendationSummary}>
        <div className={styles.container}>
          <h3>Đánh giá các gợi ý</h3>
          <p>Các món ăn được gợi ý có phù hợp với sở thích của bạn không?</p>
          <div className={styles.feedbackButtons}>
            <button className={`${styles.feedbackButton} ${styles.likeButton}`}>
              👍 Phù hợp
            </button>
            <button
              className={`${styles.feedbackButton} ${styles.dislikeButton}`}
            >
              👎 Chưa phù hợp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
