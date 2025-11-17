import React, { useEffect, useState } from "react";
import styles from "./MenuPage.module.css";
import * as productsService from "../../../service/products_service";

export default function MenuPage() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const data = await productsService.getListProduct();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

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
            {products.map((item) => (
              <div key={item._id} className={styles.menuItem}>
                <div className={styles.imageContainer}>
                  <img
                    src={item.thumbnail || "https://via.placeholder.com/300"}
                    alt={item.name}
                    className={styles.itemImage}
                  />

                  {item.isBestSeller && (
                    <div className={styles.itemBadge}>Bán chạy</div>
                  )}
                  {item.isNew && (
                    <div className={`${styles.itemBadge} ${styles.newBadge}`}>
                      Mới
                    </div>
                  )}
                </div>

                <div className={styles.itemInfo}>
                  <div className={styles.itemHeader}>
                    <h3 className={styles.itemTitle}>{item.name}</h3>
                    <div className={styles.itemCategory}>
                      {item.category || "Không có danh mục"}
                    </div>
                  </div>

                  <p className={styles.itemDescription}>
                    {item.description || "Chưa có mô tả"}
                  </p>

                  <div className={styles.itemMeta}>
                    <div className={styles.itemRating}>
                      <span className={styles.stars}>★★★★★</span>
                      <span className={styles.ratingCount}>(100+)</span>
                    </div>
                    <div className={styles.itemPrice}>
                      {item.price?.toLocaleString("vi-VN")} ₫
                    </div>
                  </div>

                  <div className={styles.itemActions}>
                    <button className={styles.addToCart}>
                      <i className={styles.cartIcon}>🛒</i> Thêm vào giỏ
                    </button>
                    <button className={styles.favoriteBtn}>❤️</button>
                  </div>
                </div>
              </div>
            ))}
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
