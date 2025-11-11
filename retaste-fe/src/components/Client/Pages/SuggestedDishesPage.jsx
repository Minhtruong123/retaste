import React, { useEffect, useState } from "react";
import styles from "./SuggestedDishesPage.module.css";

export default function SuggestedDishesPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [cartCount, setCartCount] = useState(3);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [activePage, setActivePage] = useState(1);

  // Xử lý toggle view giữa dạng lưới và danh sách
  const toggleView = (mode) => {
    setViewMode(mode);
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = (event) => {
    setCartCount(cartCount + 1);

    const button = event.target;
    button.textContent = "Đã thêm";
    button.style.backgroundColor = "#2a9d8f";

    setTimeout(() => {
      button.textContent = "Thêm vào giỏ";
      button.style.backgroundColor = "#ff6b35";
    }, 2000);
  };

  // Xử lý sự kiện yêu thích
  const handleFavorite = (event) => {
    const button = event.target;

    if (button.textContent === "❤️") {
      button.style.backgroundColor = "#ff6b35";
      button.style.color = "#ffffff";
    } else {
      button.style.backgroundColor = "#ffffff";
      button.style.color = "#ff6b35";
    }
  };

  // Danh sách các sản phẩm được gợi ý
  const recommendedProducts = [
    {
      id: 1,
      title: "Pizza Hải Sản Đặc Biệt",
      category: "Pizza",
      price: "119.000 ₫",
      rating: 5,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      trending: true,
      description:
        "Bánh pizza với đế giòn, phủ hải sản tươi ngon như tôm, mực, sò điệp cùng với sốt cà chua đặc biệt và phô mai Mozzarella.",
    },
    {
      id: 2,
      title: "Bún Bò Huế",
      category: "Món Á",
      price: "79.000 ₫",
      rating: 4,
      image: "https://images.unsplash.com/photo-1617196034183-421b4f3e0ed3",
      description:
        "Bún bò Huế với nước dùng đậm đà, thơm ngon từ xương hầm và các gia vị đặc trưng, kèm theo thịt bò, chả, huyết và các loại rau thơm.",
    },
    {
      id: 3,
      title: "Cánh Gà Sốt Cay Hàn Quốc",
      category: "Gà",
      price: "89.000 ₫",
      rating: 5,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710",
      isNew: true,
      description:
        "Cánh gà chiên giòn, phủ sốt cay ngọt kiểu Hàn Quốc, rắc thêm vừng trắng và hành lá.",
    },
    {
      id: 4,
      title: "Trà Sữa Trân Châu Đường Đen",
      category: "Đồ uống",
      price: "45.000 ₫",
      rating: 4,
      image: "https://images.unsplash.com/photo-1576577445504-6af96477db52",
      description:
        "Trà sữa thơm ngon với trân châu đường đen dẻo dai, vị ngọt vừa phải từ đường đen tự nhiên.",
    },
    {
      id: 5,
      title: "Sushi Lươn Nướng",
      category: "Món Á",
      price: "129.000 ₫",
      rating: 5,
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754",
      description:
        "Sushi với lươn nướng thơm béo, phủ sốt đặc biệt và một chút wasabi cay nồng.",
    },
    {
      id: 6,
      title: "Mỳ Xào Hải Sản",
      category: "Món Á",
      price: "89.000 ₫",
      rating: 4,
      image: "https://images.unsplash.com/photo-1584949602334-4e99f98286a9",
      description:
        "Mỳ xào giòn với hải sản tươi ngon, rau củ giòn và nước sốt đậm đà.",
    },
    {
      id: 7,
      title: "Cơm Gà Teriyaki",
      category: "Gà",
      price: "75.000 ₫",
      rating: 4,
      image: "https://images.unsplash.com/photo-1600555379765-f82335a7b1b0",
      description: "Cơm trắng với gà sốt Teriyaki đậm đà, kèm theo rau củ hấp.",
    },
    {
      id: 8,
      title: "Chè Thái",
      category: "Tráng miệng",
      price: "35.000 ₫",
      rating: 4,
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
      trending: true,
      description:
        "Chè Thái với nhiều loại trái cây, thạch và sữa đặc tạo nên hương vị ngọt ngào, béo ngậy.",
    },
  ];

  const filterOptions = [
    "Tất cả",
    "Món chính",
    "Món phụ",
    "Đồ uống",
    "Tráng miệng",
  ];

  // Render rating stars
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };
  return (
    <>
      <div className={styles.pageContainer}>
        {/* Page Title Section */}
        <section className={styles.pageTitleSection}>
          <div className={styles.container}>
            <h1>Món được gợi ý cho bạn</h1>
            <p>
              Dựa trên sở thích và lịch sử đặt món của bạn, chúng tôi gợi ý
              những món ăn sau đây
            </p>
          </div>
        </section>

        {/* Preference Profile */}
        <div className={styles.container}>
          <div className={styles.preferenceProfile}>
            <div className={styles.preferenceHeader}>
              <h3 className={styles.preferenceTitle}>Hồ sơ khẩu vị của bạn</h3>
              <a href="#" className={styles.editPreferences}>
                {" "}
                ✏️ Chỉnh sửa sở thích{" "}
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

        {/* Filters Section */}
        <section className={styles.filtersSection}>
          <div className={styles.container}>
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
                <select className={styles.sortSelect}>
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

        {/* Recommended Items */}
        <section className={styles.recommendedSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Gợi ý cá nhân hóa</h2>
              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewButton} ${
                    viewMode === "grid" ? styles.active : ""
                  }`}
                  onClick={() => toggleView("grid")}
                >
                  📱
                </button>
                <button
                  className={`${styles.viewButton} ${
                    viewMode === "list" ? styles.active : ""
                  }`}
                  onClick={() => toggleView("list")}
                >
                  📄
                </button>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === "grid" && (
              <div className={styles.productsGrid}>
                {recommendedProducts.map((product) => (
                  <div className={styles.productCard} key={product.id}>
                    <span className={styles.productPosition}>{product.id}</span>
                    {product.trending && (
                      <span
                        className={`${styles.badge} ${styles.badgeTrending}`}
                      >
                        Xu hướng
                      </span>
                    )}
                    {product.isNew && (
                      <span className={`${styles.badge} ${styles.badgeNew}`}>
                        Mới
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.productImg}
                    />
                    <div className={styles.productInfo}>
                      <h3 className={styles.productTitle}>{product.title}</h3>
                      <div className={styles.productCategory}>
                        {product.category}
                      </div>
                      <div className={styles.productDetails}>
                        <div className={styles.productPrice}>
                          {product.price}
                        </div>
                        <div className={styles.productRating}>
                          {renderStars(product.rating)}
                        </div>
                      </div>
                      <div className={styles.productActions}>
                        <button
                          className={styles.addToCart}
                          onClick={handleAddToCart}
                        >
                          Thêm vào giỏ
                        </button>
                        <button
                          className={styles.favoriteBtn}
                          onClick={handleFavorite}
                        >
                          ❤️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className={styles.productsList}>
                {recommendedProducts.map((product) => (
                  <div className={styles.productListItem} key={product.id}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.productListImg}
                    />
                    <div className={styles.productListInfo}>
                      <div className={styles.productListTop}>
                        <div>
                          <h3 className={styles.productListTitle}>
                            {product.title}
                          </h3>
                          <div className={styles.productListCategory}>
                            {product.category}
                          </div>
                        </div>
                        <div className={styles.productRating}>
                          {renderStars(product.rating)}
                        </div>
                      </div>
                      <p className={styles.productListDescription}>
                        {product.description}
                      </p>
                      <div className={styles.productListBottom}>
                        <div className={styles.productPrice}>
                          {product.price}
                        </div>
                        <div className={styles.productListActions}>
                          <button
                            className={styles.addToCart}
                            onClick={handleAddToCart}
                          >
                            Thêm vào giỏ
                          </button>
                          <button
                            className={styles.favoriteBtn}
                            onClick={handleFavorite}
                          >
                            ❤️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.pagination}>
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`${styles.paginationButton} ${
                    activePage === page ? styles.active : ""
                  }`}
                  onClick={() => setActivePage(page)}
                >
                  {page}
                </button>
              ))}
              <button className={styles.paginationButton}>»</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
