import React, { useState } from "react";
import styles from "./PromotionPage.module.css";

export default function PromotionPage() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [activePage, setActivePage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filters = [
    "Tất cả",
    "Miễn phí giao hàng",
    "Giảm giá món",
    "Combo tiết kiệm",
    "Ưu đãi đặc biệt",
  ];

  const promotions = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1626203050124-483ea5c30968",
      badge: "Miễn phí",
      title: "Miễn phí giao hàng",
      description:
        "Miễn phí giao hàng cho tất cả đơn hàng từ 150.000đ trong khu vực nội thành.",
      expiry: "31/12/2025",
      usageCount: "1.2k+",
      code: "FREESHIP150K",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1606471191009-63994c53433b",
      badge: "-30%",
      title: "Ưu đãi cuối tuần",
      description:
        "Giảm 30% cho tất cả các món ăn vào thứ 7 và Chủ nhật. Áp dụng cho đơn hàng từ 200.000đ.",
      expiry: "30/11/2025",
      usageCount: "3.5k+",
      code: "WEEKEND30",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6",
      badge: "-25%",
      title: "Combo gia đình",
      description:
        "Tiết kiệm 25% khi đặt combo gia đình gồm 4 món chính, 2 món tráng miệng và 4 đồ uống.",
      expiry: "15/12/2025",
      usageCount: "2.8k+",
      code: "FAMILY25",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1593504049359-74330189a345",
      badge: "-20%",
      title: "Ưu đãi bữa trưa",
      description:
        "Giảm 20% cho tất cả đơn hàng từ 11:00 - 14:00 từ thứ 2 đến thứ 6. Áp dụng cho đơn hàng từ 100.000đ.",
      expiry: "31/01/2026",
      usageCount: "5k+",
      code: "LUNCH20",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947",
      badge: "-40%",
      title: "Ưu đãi sinh nhật",
      description:
        "Mừng sinh nhật của bạn với ưu đãi giảm 40% cho đơn hàng trong ngày sinh nhật. Yêu cầu xác minh ngày sinh.",
      expiry: "Quanh năm",
      usageCount: "9.2k+",
      code: "BIRTHDAY40",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43",
      badge: "-35%",
      title: "Ưu đãi người dùng app mới",
      description:
        "Tải ứng dụng RETASTE và nhận ưu đãi 35% cho 3 đơn hàng đầu tiên đặt qua ứng dụng.",
      expiry: "31/12/2025",
      usageCount: "7.8k+",
      code: "NEWAPP35",
    },
  ];

  const pages = [1, 2, 3, 4];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  const handleCopyCode = (code, event) => {
    navigator.clipboard.writeText(code);

    const button = event.target;
    button.textContent = "Đã sao chép!";

    setTimeout(() => {
      button.textContent = "Sao chép";
    }, 2000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <div className={styles.appContainer}>
        <section className={styles.pageBanner}>
          <div className={styles.container}>
            <h1>Ưu Đãi & Khuyến Mãi</h1>
            <p>
              Khám phá các ưu đãi hấp dẫn từ RETASTE. Tiết kiệm hơn khi thưởng
              thức những món ăn yêu thích.
            </p>
          </div>
        </section>

        <div className={styles.promotionFilters}>
          <div className={styles.container}>
            <div className={styles.filterContainer}>
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`${styles.filterButton} ${
                    activeFilter === filter ? styles.active : ""
                  }`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Promotion */}
        <section className={styles.featuredPromotion}>
          <div className={styles.container}>
            <div className={styles.featuredCard}>
              <div className={styles.featuredImg}></div>
              <div className={styles.featuredContent}>
                <span className={styles.featuredLabel}>Ưu đãi đặc biệt</span>
                <h2 className={styles.featuredTitle}>
                  Giảm 50% cho đơn hàng đầu tiên
                </h2>
                <p className={styles.featuredDesc}>
                  Đặt món lần đầu tiên tại RETASTE và nhận ưu đãi giảm 50% (tối
                  đa 100.000đ) cho đơn hàng đầu tiên của bạn. Áp dụng cho tất cả
                  các món ăn và thức uống.
                </p>
                <a href="#" className={styles.featuredCta}>
                  Đặt món ngay
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Promotions List */}
        <section className={styles.promotionsSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Tất cả khuyến mãi</h2>

            <div className={styles.promotionsContainer}>
              {promotions.map((promo) => (
                <div key={promo.id} className={styles.promotionCard}>
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className={styles.promotionImg}
                  />
                  <span className={styles.discountBadge}>{promo.badge}</span>
                  <div className={styles.promotionInfo}>
                    <h3 className={styles.promotionTitle}>{promo.title}</h3>
                    <p className={styles.promotionDesc}>{promo.description}</p>
                    <div className={styles.promotionMeta}>
                      <div className={styles.validity}>
                        <span>📅</span> Hết hạn: {promo.expiry}
                      </div>
                      <div className={styles.usageCount}>
                        Đã sử dụng: {promo.usageCount}
                      </div>
                    </div>
                    <div className={styles.promoCode}>
                      <span className={styles.code}>{promo.code}</span>
                      <button
                        className={styles.copyBtn}
                        onClick={(e) => handleCopyCode(promo.code, e)}
                      >
                        Sao chép
                      </button>
                    </div>
                    <button className={styles.usePromo}>Sử dụng ngay</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
              {pages.map((page) => (
                <button
                  key={page}
                  className={`${styles.pageBtn} ${
                    activePage === page ? styles.active : ""
                  }`}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              ))}
              <button className={styles.pageBtn}>{">"}</button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className={styles.newsletter}>
          <div className={styles.container}>
            <div className={styles.newsletterContent}>
              <h2>Đừng bỏ lỡ ưu đãi mới!</h2>
              <p>
                Đăng ký để nhận thông báo về các khuyến mãi mới và ưu đãi đặc
                biệt.
              </p>
              <form className={styles.newsletterForm}>
                <input type="email" placeholder="Email của bạn" required />
                <button type="submit">Đăng ký</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
