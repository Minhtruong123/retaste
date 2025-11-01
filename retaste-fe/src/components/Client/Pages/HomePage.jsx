import React, { useState } from "react";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [cartCount, setCartCount] = useState(3);

  const handleAddToCart = (event) => {
    const button = event.target;
    setCartCount((prevCount) => prevCount + 1);

    button.textContent = "Đã thêm";
    button.style.backgroundColor = "#2a9d8f";

    setTimeout(() => {
      button.textContent = "Thêm vào giỏ";
      button.style.backgroundColor = "#ff6b35";
    }, 2000);
  };

  const handleFavoriteClick = (event) => {
    const button = event.target;

    if (
      button.style.backgroundColor === "rgb(255, 107, 53)" ||
      button.style.backgroundColor === "#ff6b35"
    ) {
      button.style.backgroundColor = "#ffffff";
      button.style.color = "#ff6b35";
    } else {
      button.style.backgroundColor = "#ff6b35";
      button.style.color = "#ffffff";
    }
  };
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1>Khám phá hương vị mới mỗi ngày</h1>
            <p>
              RETASTE gợi ý những món ăn phù hợp với sở thích của bạn. Đặt hàng
              nhanh chóng, giao hàng tận nơi.
            </p>
            <button className={styles.ctaButton}>Đặt hàng ngay</button>
          </div>
        </section>

        {/* Features */}
        <section className={styles.features}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Tại sao chọn RETASTE?</h2>
            <div className={styles.featuresContainer}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🍽️</div>
                <h3>Gợi ý thông minh</h3>
                <p>
                  Hệ thống gợi ý thông minh dựa trên sở thích và lịch sử đặt
                  hàng của bạn.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⏱️</div>
                <h3>Giao hàng nhanh chóng</h3>
                <p>
                  Cam kết giao hàng trong vòng 30 phút với thực phẩm vẫn giữ
                  nguyên hương vị.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>👨‍🍳</div>
                <h3>Đầu bếp chuyên nghiệp</h3>
                <p>
                  Món ăn được chế biến bởi đội ngũ đầu bếp giàu kinh nghiệm và
                  đam mê.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className={styles.categories}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Danh mục phổ biến</h2>
            <div className={styles.categoriesContainer}>
              <div className={styles.categoryCard}>
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
                  alt="Pizza"
                  className={styles.categoryImg}
                />
                <div className={styles.categoryInfo}>
                  <h3>Pizza</h3>
                </div>
              </div>
              <div className={styles.categoryCard}>
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
                  alt="Burger"
                  className={styles.categoryImg}
                />
                <div className={styles.categoryInfo}>
                  <h3>Burger</h3>
                </div>
              </div>
              <div className={styles.categoryCard}>
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8"
                  alt="Đồ uống"
                  className={styles.categoryImg}
                />
                <div className={styles.categoryInfo}>
                  <h3>Đồ uống</h3>
                </div>
              </div>
              <div className={styles.categoryCard}>
                <img
                  src="https://images.unsplash.com/photo-1559847844-5315695dadae"
                  alt="Món Á"
                  className={styles.categoryImg}
                />
                <div className={styles.categoryInfo}>
                  <h3>Món Á</h3>
                </div>
              </div>
              <div className={styles.categoryCard}>
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
                  alt="Salad"
                  className={styles.categoryImg}
                />
                <div className={styles.categoryInfo}>
                  <h3>Salad</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended for You */}
        <section className={styles.recommended}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Gợi ý cho bạn</h2>
              <a href="#" className={styles.viewAll}>
                Xem tất cả
              </a>
            </div>
            <div className={styles.productsContainer}>
              <div className={styles.productCard}>
                <img
                  src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47"
                  alt="Classic Burger"
                  className={styles.productImg}
                />
                <div className={styles.productInfo}>
                  <h3 className={styles.productTitle}>Classic Burger</h3>
                  <div className={styles.productCategory}>Burger</div>
                  <div className={styles.productDetails}>
                    <div className={styles.productPrice}>69.000 ₫</div>
                    <div className={styles.productRating}>★★★★★</div>
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
                      onClick={handleFavoriteClick}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.productCard}>
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
                  alt="Pizza Margherita"
                  className={styles.productImg}
                />
                <div className={styles.productInfo}>
                  <h3 className={styles.productTitle}>Pizza Margherita</h3>
                  <div className={styles.productCategory}>Pizza</div>
                  <div className={styles.productDetails}>
                    <div className={styles.productPrice}>109.000 ₫</div>
                    <div className={styles.productRating}>★★★★☆</div>
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
                      onClick={handleFavoriteClick}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.productCard}>
                <img
                  src="https://images.unsplash.com/photo-1534353436294-0dbd4bdac845"
                  alt="Trà Sữa Trân Châu"
                  className={styles.productImg}
                />
                <div className={styles.productInfo}>
                  <h3 className={styles.productTitle}>Trà Sữa Trân Châu</h3>
                  <div className={styles.productCategory}>Đồ uống</div>
                  <div className={styles.productDetails}>
                    <div className={styles.productPrice}>39.000 ₫</div>
                    <div className={styles.productRating}>★★★★★</div>
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
                      onClick={handleFavoriteClick}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.productCard}>
                <img
                  src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8"
                  alt="Salad Gà"
                  className={styles.productImg}
                />
                <div className={styles.productInfo}>
                  <h3 className={styles.productTitle}>Salad Gà</h3>
                  <div className={styles.productCategory}>Salad</div>
                  <div className={styles.productDetails}>
                    <div className={styles.productPrice}>59.000 ₫</div>
                    <div className={styles.productRating}>★★★★☆</div>
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
                      onClick={handleFavoriteClick}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.howItWorks}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Cách thức hoạt động</h2>
            <div className={styles.stepsContainer}>
              <div className={styles.stepsLine}></div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepIcon}>🍔</div>
                <h3>Chọn món ăn</h3>
                <p>Lựa chọn từ thực đơn đa dạng hoặc nhận gợi ý cá nhân hóa.</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepIcon}>💳</div>
                <h3>Thanh toán</h3>
                <p>Thanh toán dễ dàng với nhiều phương thức khác nhau.</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepIcon}>🚚</div>
                <h3>Giao hàng</h3>
                <p>Giao hàng nhanh chóng đến địa chỉ của bạn.</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepIcon}>😋</div>
                <h3>Thưởng thức</h3>
                <p>Thưởng thức món ăn và đánh giá trải nghiệm của bạn.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={styles.testimonials}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              Khách hàng nói gì về chúng tôi
            </h2>
            <div className={styles.testimonialsContainer}>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <img
                    src="https://randomuser.me/api/portraits/women/42.jpg"
                    alt="User"
                    className={styles.testimonialAvatar}
                  />
                  <div className={styles.testimonialAuthor}>
                    <h4>Nguyễn Thị Hương</h4>
                    <div className={styles.testimonialDate}>12/08/2025</div>
                  </div>
                </div>
                <div className={styles.testimonialRating}>★★★★★</div>
                <p className={styles.testimonialContent}>
                  Tôi rất thích cách RETASTE gợi ý món ăn phù hợp với khẩu vị
                  của tôi. Đồ ăn luôn nóng hổi và ngon miệng!
                </p>
              </div>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User"
                    className={styles.testimonialAvatar}
                  />
                  <div className={styles.testimonialAuthor}>
                    <h4>Trần Văn Nam</h4>
                    <div className={styles.testimonialDate}>05/09/2025</div>
                  </div>
                </div>
                <div className={styles.testimonialRating}>★★★★☆</div>
                <p className={styles.testimonialContent}>
                  Dịch vụ giao hàng nhanh chóng và nhân viên rất thân thiện. Các
                  món ăn đều rất ngon và đúng như mô tả.
                </p>
              </div>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="User"
                    className={styles.testimonialAvatar}
                  />
                  <div className={styles.testimonialAuthor}>
                    <h4>Lê Thị Mai</h4>
                    <div className={styles.testimonialDate}>18/09/2025</div>
                  </div>
                </div>
                <div className={styles.testimonialRating}>★★★★★</div>
                <p className={styles.testimonialContent}>
                  Tôi đặt đồ ăn hàng tuần từ RETASTE và chưa bao giờ thất vọng.
                  Rất tiện lợi khi app có thể nhớ món yêu thích của tôi!
                </p>
              </div>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <img
                    src="https://randomuser.me/api/portraits/men/71.jpg"
                    alt="User"
                    className={styles.testimonialAvatar}
                  />
                  <div className={styles.testimonialAuthor}>
                    <h4>Phạm Minh Tuấn</h4>
                    <div className={styles.testimonialDate}>22/09/2025</div>
                  </div>
                </div>
                <div className={styles.testimonialRating}>★★★★★</div>
                <p className={styles.testimonialContent}>
                  Tôi rất ấn tượng với tính năng gợi ý món ăn của RETASTE. Nó
                  giúp tôi khám phá nhiều món mới mà tôi thích!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.appDownload}>
          <div className={styles.container}>
            <div className={styles.appContent}>
              <h2 className={styles.appTitle}>Tải ứng dụng RETASTE</h2>
              <p className={styles.appDescription}>
                Đặt hàng nhanh hơn, theo dõi đơn hàng và nhận các ưu đãi đặc
                biệt chỉ có trên ứng dụng!
              </p>
              <div className={styles.appButtons}>
                <button className={styles.appButton}>
                  <i>📱</i>
                  <div>
                    <div>Tải về trên</div>
                    <div>App Store</div>
                  </div>
                </button>
                <button className={styles.appButton}>
                  <i>📱</i>
                  <div>
                    <div>Tải về trên</div>
                    <div>Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
