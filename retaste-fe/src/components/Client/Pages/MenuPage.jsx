import React from "react";
import styles from "./MenuPage.module.css";

export default function MenuPage() {
  return (
    <>
      <section className={styles.menuPage}>
        <div className={styles.container}>
          <div className={styles.pageTitle}>
            <h1>Thực đơn RETASTE</h1>
            <p>
              Khám phá thực đơn đa dạng với các món ăn đậm đà hương vị, được
              chuẩn bị từ những nguyên liệu tươi ngon nhất.
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
                <select className={styles.filterSelect}>
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
                <select className={styles.filterSelect}>
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
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    className={styles.priceInput}
                    min="0"
                  />
                </div>
              </div>
            </div>
            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Đánh giá</label>
                <select className={styles.filterSelect}>
                  <option value="">Tất cả đánh giá</option>
                  <option value="5">5 sao</option>
                  <option value="4">4 sao trở lên</option>
                  <option value="3">3 sao trở lên</option>
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Đặc tính</label>
                <select className={styles.filterSelect}>
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
              <button className={styles.resetFilter}>Đặt lại</button>
              <button className={styles.applyFilter}>Áp dụng</button>
            </div>
          </div>

          {/* Active Filters */}
          <div className={styles.filterTags}>
            <div className={styles.filterTag}>
              Burger <button className={styles.removeTag}>✕</button>
            </div>
            <div className={styles.filterTag}>
              Bán chạy <button className={styles.removeTag}>✕</button>
            </div>
            <div className={styles.filterTag}>
              Giá: 50.000₫ - 150.000₫{" "}
              <button className={styles.removeTag}>✕</button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            <button className={`${styles.tabButton} ${styles.active}`}>
              Tất cả
            </button>
            <button className={styles.tabButton}>Pizza</button>
            <button className={styles.tabButton}>Burger</button>
            <button className={styles.tabButton}>Món Á</button>
            <button className={styles.tabButton}>Đồ uống</button>
            <button className={styles.tabButton}>Salad</button>
            <button className={styles.tabButton}>Tráng miệng</button>
          </div>

          <div className={styles.menuGrid}>
            <div className={styles.menuItem}>
              <div className={styles.imageContainer}>
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
                  alt="Pizza Hải Sản"
                  className={styles.itemImage}
                />
                <div className={styles.itemBadge}>Bán chạy</div>
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>Pizza Hải Sản</h3>
                  <div className={styles.itemCategory}>Pizza</div>
                </div>
                <p className={styles.itemDescription}>
                  Pizza với hải sản tươi ngon, sốt cà chua đặc biệt và phô mai
                  Mozzarella.
                </p>
                <div className={styles.itemMeta}>
                  <div className={styles.itemRating}>
                    <span className={styles.stars}>★★★★★</span>{" "}
                    <span className={styles.ratingCount}>(124)</span>
                  </div>
                  <div className={styles.itemPrice}>149.000 ₫</div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.addToCart}>
                    <i className={styles.cartIcon}>🛒</i> Thêm vào giỏ
                  </button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className={styles.menuItem}>
              <div className={styles.imageContainer}>
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
                  alt="Burger Bò Phô Mai"
                  className={styles.itemImage}
                />
                <div className={`${styles.itemBadge} ${styles.hotBadge}`}>
                  Hot
                </div>
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>Burger Bò Phô Mai</h3>
                  <div className={styles.itemCategory}>Burger</div>
                </div>
                <p className={styles.itemDescription}>
                  Burger bò 100% tươi ngon với lớp phô mai tan chảy, rau xà lách
                  và sốt đặc biệt.
                </p>
                <div className={styles.itemMeta}>
                  <div className={styles.itemRating}>
                    <span className={styles.stars}>★★★★☆</span>{" "}
                    <span className={styles.ratingCount}>(89)</span>
                  </div>
                  <div className={styles.itemPrice}>79.000 ₫</div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.addToCart}>
                    <i className={styles.cartIcon}>🛒</i> Thêm vào giỏ
                  </button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className={styles.menuItem}>
              <div className={styles.imageContainer}>
                <img
                  src="https://images.unsplash.com/photo-1534353436294-0dbd4bdac845"
                  alt="Trà Sữa Trân Châu"
                  className={styles.itemImage}
                />
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>Trà Sữa Trân Châu</h3>
                  <div className={styles.itemCategory}>Đồ uống</div>
                </div>
                <p className={styles.itemDescription}>
                  Trà sữa thơm ngon với trân châu đường đen mềm dẻo và topping
                  tùy chọn.
                </p>
                <div className={styles.itemMeta}>
                  <div className={styles.itemRating}>
                    <span className={styles.stars}>★★★★★</span>{" "}
                    <span className={styles.ratingCount}>(156)</span>
                  </div>
                  <div className={styles.itemPrice}>39.000 ₫</div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.addToCart}>
                    <i className={styles.cartIcon}>🛒</i> Thêm vào giỏ
                  </button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className={styles.menuItem}>
              <div className={styles.imageContainer}>
                <img
                  src="https://images.unsplash.com/photo-1559847844-5315695dadae"
                  alt="Cơm Chiên Hải Sản"
                  className={styles.itemImage}
                />
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>Cơm Chiên Hải Sản</h3>
                  <div className={styles.itemCategory}>Món Á</div>
                </div>
                <p className={styles.itemDescription}>
                  Cơm chiên với hải sản tươi, trứng, rau củ và gia vị đặc biệt.
                </p>
                <div className={styles.itemMeta}>
                  <div className={styles.itemRating}>
                    <span className={styles.stars}>★★★★☆</span>{" "}
                    <span className={styles.ratingCount}>(72)</span>
                  </div>
                  <div className={styles.itemPrice}>89.000 ₫</div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.addToCart}>
                    <i className={styles.cartIcon}>🛒</i> Thêm vào giỏ
                  </button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>

            {/* Item 5 */}
            <div className={styles.menuItem}>
              <div className={styles.imageContainer}>
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8"
                  alt="Smoothie Trái Cây"
                  className={styles.itemImage}
                />
                <div className={`${styles.itemBadge} ${styles.newBadge}`}>
                  Mới
                </div>
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>Smoothie Trái Cây</h3>
                  <div className={styles.itemCategory}>Đồ uống</div>
                </div>
                <p className={styles.itemDescription}>
                  Smoothie mát lạnh với hỗn hợp trái cây tươi, sữa chua và mật
                  ong.
                </p>
                <div className={styles.itemMeta}>
                  <div className={styles.itemRating}>
                    <span className={styles.stars}>★★★★★</span>{" "}
                    <span className={styles.ratingCount}>(48)</span>
                  </div>
                  <div className={styles.itemPrice}>45.000 ₫</div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.addToCart}>
                    <i className={styles.cartIcon}>🛒</i> Thêm vào giỏ
                  </button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>

            {/* Item 6 */}
            <div className={styles.menuItem}>
              <div className={styles.imageContainer}>
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
                  alt="Salad Gà Nướng"
                  className={styles.itemImage}
                />
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>Salad Gà Nướng</h3>
                  <div className={styles.itemCategory}>Salad</div>
                </div>
                <p className={styles.itemDescription}>
                  Salad tươi với gà nướng, rau xanh, sốt Caesar và bánh mì nướng
                  giòn.
                </p>
                <div className={styles.itemMeta}>
                  <div className={styles.itemRating}>
                    <span className={styles.stars}>★★★★☆</span>{" "}
                    <span className={styles.ratingCount}>(63)</span>
                  </div>
                  <div className={styles.itemPrice}>69.000 ₫</div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.addToCart}>
                    <i className={styles.cartIcon}>🛒</i> Thêm vào giỏ
                  </button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>

            {/* Item 7 */}
            <div className={styles.menuItem}>
              <div className={styles.imageContainer}>
                <img
                  src="https://images.unsplash.com/photo-1551024709-8f23befc6f87"
                  alt="Mì Xào Hải Sản"
                  className={styles.itemImage}
                />
                <div className={`${styles.itemBadge} ${styles.specialBadge}`}>
                  Đặc biệt
                </div>
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>Mì Xào Hải Sản</h3>
                  <div className={styles.itemCategory}>Món Á</div>
                </div>
                <p className={styles.itemDescription}>
                  Mì xào với hải sản, rau củ tươi và nước sốt đậm đà.
                </p>
                <div className={styles.itemMeta}>
                  <div className={styles.itemRating}>
                    <span className={styles.stars}>★★★★★</span>{" "}
                    <span className={styles.ratingCount}>(91)</span>
                  </div>
                  <div className={styles.itemPrice}>95.000 ₫</div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.addToCart}>
                    <i className={styles.cartIcon}>🛒</i> Thêm vào giỏ
                  </button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>

            {/* Item 8 */}
            <div className={styles.menuItem}>
              <div className={styles.imageContainer}>
                <img
                  src="https://images.unsplash.com/photo-1551782450-17144efb9c50"
                  alt="Bánh Tiramisu"
                  className={styles.itemImage}
                />
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>Bánh Tiramisu</h3>
                  <div className={styles.itemCategory}>Tráng miệng</div>
                </div>
                <p className={styles.itemDescription}>
                  Bánh tiramisu mềm mịn với lớp kem phô mai mascarpone và cà
                  phê.
                </p>
                <div className={styles.itemMeta}>
                  <div className={styles.itemRating}>
                    <span className={styles.stars}>★★★★★</span>{" "}
                    <span className={styles.ratingCount}>(82)</span>
                  </div>
                  <div className={styles.itemPrice}>55.000 ₫</div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.addToCart}>
                    <i className={styles.cartIcon}>🛒</i> Thêm vào giỏ
                  </button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <div className={`${styles.pageItem} ${styles.disabled}`}>
              <a className={styles.pageLink} href="#" aria-label="Previous">
                «
              </a>
            </div>
            <div className={`${styles.pageItem} ${styles.active}`}>
              <a className={styles.pageLink} href="#">
                1
              </a>
            </div>
            <div className={styles.pageItem}>
              <a className={styles.pageLink} href="#">
                2
              </a>
            </div>
            <div className={styles.pageItem}>
              <a className={styles.pageLink} href="#">
                3
              </a>
            </div>
            <div className={styles.pageItem}>
              <a className={styles.pageLink} href="#">
                4
              </a>
            </div>
            <div className={styles.pageItem}>
              <a className={styles.pageLink} href="#">
                5
              </a>
            </div>
            <div className={styles.pageItem}>
              <a className={styles.pageLink} href="#" aria-label="Next">
                »
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
