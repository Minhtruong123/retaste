import React, { useState, useEffect } from "react";
import styles from "./ComboPage.module.css";

export default function ComboPage() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [cartCount, setCartCount] = useState(3);
  const [activePage, setActivePage] = useState(1);
  const [favorites, setFavorites] = useState({});

  // Xử lý click vào nút yêu thích
  const handleFavoriteClick = (comboId) => {
    setFavorites((prev) => ({
      ...prev,
      [comboId]: !prev[comboId],
    }));
  };

  // Xử lý click vào nút đặt hàng
  const handleOrderClick = (comboId) => {
    setCartCount((prevCount) => prevCount + 1);

    // Tạo bản sao của phần tử HTML để tránh thay đổi trực tiếp DOM
    const orderButtonsState = { ...orderButtonsState };
    orderButtonsState[comboId] = true;

    // Set state để hiển thị "Đã thêm"
    setOrderButtonsState(orderButtonsState);

    // Sau 2 giây, trả về trạng thái ban đầu
    setTimeout(() => {
      setOrderButtonsState((prev) => ({
        ...prev,
        [comboId]: false,
      }));
    }, 2000);
  };

  // State cho trạng thái nút đặt hàng
  const [orderButtonsState, setOrderButtonsState] = useState({});

  // Dữ liệu combo
  const combos = [
    {
      id: 1,
      title: "Combo Cặp Đôi Hạnh Phúc",
      description:
        "Combo hoàn hảo cho buổi hẹn hò lãng mạn với những món ăn ngon nhất của chúng tôi.",
      image: "https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0",
      discount: "-25%",
      category: "Cặp đôi",
      items: [
        "2 x Burger Bò Phô Mai",
        "1 x Khoai tây chiên (size lớn)",
        "2 x Nước ngọt tự chọn",
        "1 x Bánh kem Socola nhỏ",
      ],
      price: "179.000 ₫",
      originalPrice: "239.000 ₫",
    },
    {
      id: 2,
      title: "Combo Gia Đình Vui Vẻ",
      description:
        "Combo đầy đủ cho cả gia đình thưởng thức, với nhiều món ăn phong phú và đa dạng.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
      discount: "-30%",
      category: "Gia đình",
      items: [
        "1 x Pizza Hải Sản (cỡ lớn)",
        "4 x Gà rán giòn (đùi/cánh)",
        "2 x Khoai tây chiên (size vừa)",
        "4 x Nước ngọt tự chọn",
        "1 x Salad trộn",
      ],
      price: "349.000 ₫",
      originalPrice: "499.000 ₫",
    },
    {
      id: 3,
      title: "Combo Hội Bạn Thân",
      description:
        "Combo dành cho nhóm bạn 3-4 người, đầy đủ các món ăn nhẹ và nước uống.",
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7",
      discount: "-20%",
      category: "Bạn bè",
      items: [
        "2 x Pizza (cỡ vừa, 2 loại)",
        "1 x Gà nugget (10 miếng)",
        "1 x Mực chiên giòn",
        "4 x Nước tự chọn",
        "1 x Bánh cookie (6 miếng)",
      ],
      price: "269.000 ₫",
      originalPrice: "339.000 ₫",
    },
    {
      id: 4,
      title: "Combo Tiệc Nhỏ",
      description:
        "Combo phong phú dành cho các buổi tụ tập nhỏ từ 5-6 người, đa dạng món ăn.",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      discount: "-35%",
      category: "Tiệc nhỏ",
      items: [
        "2 x Pizza (cỡ lớn, 2 loại)",
        "2 x Gà rán (12 miếng)",
        "3 x Khoai tây chiên (size lớn)",
        "6 x Nước ngọt tự chọn",
        "1 x Bánh kem (size vừa)",
      ],
      price: "489.000 ₫",
      originalPrice: "749.000 ₫",
    },
    {
      id: 5,
      title: "Combo Bữa Sáng Dinh Dưỡng",
      description: "Combo dinh dưỡng và đầy đủ cho bữa sáng năng động của bạn.",
      image: "https://images.unsplash.com/photo-1616669943046-fafbd1d2e623",
      discount: "-15%",
      category: "Cặp đôi",
      items: [
        "1 x Sandwich Gà Teriyaki",
        "1 x Salad Trộn Rau Củ",
        "1 x Nước ép cam tươi",
        "1 x Sữa chua hoa quả",
      ],
      price: "89.000 ₫",
      originalPrice: "105.000 ₫",
    },
    {
      id: 6,
      title: "Combo Healthy Choice",
      description:
        "Combo dành cho người ăn kiêng với các món ăn ít calo, đầy đủ dinh dưỡng.",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828",
      discount: "-20%",
      category: "Bạn bè",
      items: [
        "1 x Salad Gà Nướng",
        "1 x Sandwich Ngũ Cốc Nguyên Cám",
        "1 x Soup Rau Củ",
        "1 x Nước ép rau củ xanh",
        "1 x Trái cây theo mùa",
      ],
      price: "129.000 ₫",
      originalPrice: "159.000 ₫",
    },
  ];

  // Lọc combo theo danh mục được chọn
  const filteredCombos =
    activeFilter === "Tất cả"
      ? combos
      : combos.filter((combo) => combo.category === activeFilter);

  // Các danh mục lọc
  const filterCategories = [
    "Tất cả",
    "Cặp đôi",
    "Gia đình",
    "Bạn bè",
    "Tiệc nhỏ",
  ];

  return (
    <>
      <section className={styles.pageBanner}>
        <div className={styles.container}>
          <h1 className={styles.bannerTitle}>Combo Tiết Kiệm</h1>
          <p className={styles.bannerDescription}>
            Khám phá các combo đặc biệt với giá cực hấp dẫn, tiết kiệm đến 40%
            so với mua lẻ
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filterContainer}>
            <div className={styles.filterLabel}>Loại combo:</div>
            <div className={styles.filterOptions}>
              {filterCategories.map((category) => (
                <div
                  key={category}
                  className={`${styles.filterOption} ${
                    activeFilter === category ? styles.active : ""
                  }`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </div>
              ))}
            </div>

            <div className={styles.sortOptions}>
              <span className={styles.sortLabel}>Sắp xếp:</span>
              <select className={styles.sortSelect}>
                <option value="popular">Phổ biến nhất</option>
                <option value="priceAsc">Giá tăng dần</option>
                <option value="priceDesc">Giá giảm dần</option>
                <option value="rating">Đánh giá cao</option>
                <option value="newest">Mới nhất</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Combo Section */}
      <section className={styles.comboSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Combo Đặc Biệt</h2>
          <div className={styles.combosContainer}>
            {filteredCombos.map((combo) => (
              <div key={combo.id} className={styles.comboCard}>
                <div className={styles.comboImgContainer}>
                  <img
                    src={combo.image}
                    alt={combo.title}
                    className={styles.comboImg}
                  />
                  <div className={styles.comboDiscount}>{combo.discount}</div>
                </div>
                <div className={styles.comboInfo}>
                  <h3 className={styles.comboTitle}>{combo.title}</h3>
                  <p className={styles.comboDescription}>{combo.description}</p>
                  <div className={styles.comboItems}>
                    <p className={styles.comboItemsTitle}>Bao gồm:</p>
                    {combo.items.map((item, index) => (
                      <div key={index} className={styles.comboItem}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className={styles.comboPriceContainer}>
                    <div className={styles.comboPrice}>{combo.price}</div>
                    <div className={styles.comboOriginalPrice}>
                      {combo.originalPrice}
                    </div>
                  </div>
                  <div className={styles.comboActions}>
                    <button
                      className={`${styles.orderButton} ${
                        orderButtonsState[combo.id] ? styles.ordered : ""
                      }`}
                      onClick={() => handleOrderClick(combo.id)}
                    >
                      {orderButtonsState[combo.id] ? "Đã thêm" : "Đặt ngay"}
                    </button>
                    <button
                      className={`${styles.favoriteBtn} ${
                        favorites[combo.id] ? styles.favorited : ""
                      }`}
                      onClick={() => handleFavoriteClick(combo.id)}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            <button className={styles.paginationButton}>«</button>
            {[1, 2, 3].map((page) => (
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

      {/* Special Offers */}
      <section className={styles.specialOffers}>
        <div className={styles.container}>
          <div className={styles.offerBanner}>
            <h2 className={styles.offerTitle}>ƯU ĐÃI ĐẶC BIỆT</h2>
            <p className={styles.offerSubtitle}>
              Nhập mã giảm thêm 10% cho tất cả các combo khi đặt hàng qua ứng
              dụng RETASTE trước 30/11/2025
            </p>
            <div className={styles.offerCode}>COMBO10</div>
            <button className={styles.offerButton}>Tải ứng dụng ngay</button>
          </div>
        </div>
      </section>

      {/* Hiển thị số lượng giỏ hàng */}
      <div className={styles.cartCountContainer}>
        <span className={styles.cartCount}>{cartCount}</span>
      </div>
    </>
  );
}
