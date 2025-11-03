import React, { useEffect } from "react";
import styles from "./ComboPage.module.css";

export default function ComboPage() {
  useEffect(() => {
    const filterOptions = document.querySelectorAll(`.${styles.filterOption}`);
    filterOptions.forEach((option) => {
      option.addEventListener("click", function () {
        filterOptions.forEach((opt) => opt.classList.remove(styles.active));
        option.classList.add(styles.active);
      });
    });

    const favoriteButtons = document.querySelectorAll(`.${styles.favoriteBtn}`);
    favoriteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        if (button.style.backgroundColor === "rgb(255, 107, 53)") {
          button.style.backgroundColor = "#ffffff";
          button.style.color = "#ff6b35";
        } else {
          button.style.backgroundColor = "#ff6b35";
          button.style.color = "#ffffff";
        }
      });
    });

    const orderButtons = document.querySelectorAll(`.${styles.orderButton}`);
    const cartCount = document.querySelector(".cart-count");
    let count = 3;

    orderButtons.forEach((button) => {
      button.addEventListener("click", function () {
        count++;
        cartCount.textContent = count;

        button.textContent = "Đã thêm";
        button.style.backgroundColor = "#2a9d8f";

        setTimeout(() => {
          button.textContent = "Đặt ngay";
          button.style.backgroundColor = "#ff6b35";
        }, 2000);
      });
    });

    const paginationButtons = document.querySelectorAll(
      `.${styles.paginationButton}`
    );
    paginationButtons.forEach((button) => {
      button.addEventListener("click", function () {
        if (button.textContent !== "«" && button.textContent !== "»") {
          paginationButtons.forEach((btn) =>
            btn.classList.remove(styles.active)
          );
          button.classList.add(styles.active);
        }
      });
    });
  }, []);
  return (
    <>
      <section className={styles.pageBanner}>
        <div className="container">
          <h1>Combo Tiết Kiệm</h1>
          <p>
            Khám phá các combo đặc biệt với giá cực hấp dẫn, tiết kiệm đến 40%
            so với mua lẻ
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterContainer}>
            <div className={styles.filterLabel}>Loại combo:</div>
            <div className={styles.filterOptions}>
              <div className={`${styles.filterOption} ${styles.active}`}>
                Tất cả
              </div>
              <div className={styles.filterOption}>Cặp đôi</div>
              <div className={styles.filterOption}>Gia đình</div>
              <div className={styles.filterOption}>Bạn bè</div>
              <div className={styles.filterOption}>Tiệc nhỏ</div>
            </div>

            <div className={styles.sortOptions}>
              <span>Sắp xếp:</span>
              <select className={styles.sortSelect}>
                <option>Phổ biến nhất</option>
                <option>Giá tăng dần</option>
                <option>Giá giảm dần</option>
                <option>Đánh giá cao</option>
                <option>Mới nhất</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Combo Section */}
      <section className={styles.comboSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Combo Đặc Biệt</h2>
          <div className={styles.combosContainer}>
            {/* Combo 1 */}
            <div className={styles.comboCard}>
              <div className={styles.comboImgContainer}>
                <img
                  src="https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0"
                  alt="Combo Cặp Đôi"
                  className={styles.comboImg}
                />
                <div className={styles.comboDiscount}>-25%</div>
              </div>
              <div className={styles.comboInfo}>
                <h3 className={styles.comboTitle}>Combo Cặp Đôi Hạnh Phúc</h3>
                <p className={styles.comboDescription}>
                  Combo hoàn hảo cho buổi hẹn hò lãng mạn với những món ăn ngon
                  nhất của chúng tôi.
                </p>
                <div className={styles.comboItems}>
                  <p className={styles.comboItemsTitle}>Bao gồm:</p>
                  <div className={styles.comboItem}>2 x Burger Bò Phô Mai</div>
                  <div className={styles.comboItem}>
                    1 x Khoai tây chiên (size lớn)
                  </div>
                  <div className={styles.comboItem}>2 x Nước ngọt tự chọn</div>
                  <div className={styles.comboItem}>
                    1 x Bánh kem Socola nhỏ
                  </div>
                </div>
                <div className={styles.comboPriceContainer}>
                  <div className={styles.comboPrice}>179.000 ₫</div>
                  <div className={styles.comboOriginalPrice}>239.000 ₫</div>
                </div>
                <div className={styles.comboActions}>
                  <button className={styles.orderButton}>Đặt ngay</button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>

            {/* Combo 2 */}
            <div className={styles.comboCard}>
              <div className={styles.comboImgContainer}>
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
                  alt="Combo Gia Đình"
                  className={styles.comboImg}
                />
                <div className={styles.comboDiscount}>-30%</div>
              </div>
              <div className={styles.comboInfo}>
                <h3 className={styles.comboTitle}>Combo Gia Đình Vui Vẻ</h3>
                <p className={styles.comboDescription}>
                  Combo đầy đủ cho cả gia đình thưởng thức, với nhiều món ăn
                  phong phú và đa dạng.
                </p>
                <div className={styles.comboItems}>
                  <p className={styles.comboItemsTitle}>Bao gồm:</p>
                  <div className={styles.comboItem}>
                    1 x Pizza Hải Sản (cỡ lớn)
                  </div>
                  <div className={styles.comboItem}>
                    4 x Gà rán giòn (đùi/cánh)
                  </div>
                  <div className={styles.comboItem}>
                    2 x Khoai tây chiên (size vừa)
                  </div>
                  <div className={styles.comboItem}>4 x Nước ngọt tự chọn</div>
                  <div className={styles.comboItem}>1 x Salad trộn</div>
                </div>
                <div className={styles.comboPriceContainer}>
                  <div className={styles.comboPrice}>349.000 ₫</div>
                  <div className={styles.comboOriginalPrice}>499.000 ₫</div>
                </div>
                <div className={styles.comboActions}>
                  <button className={styles.orderButton}>Đặt ngay</button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>

            {/* Combo 3 */}
            <div className={styles.comboCard}>
              <div className={styles.comboImgContainer}>
                <img
                  src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7"
                  alt="Combo Bạn Bè"
                  className={styles.comboImg}
                />
                <div className={styles.comboDiscount}>-20%</div>
              </div>
              <div className={styles.comboInfo}>
                <h3 className={styles.comboTitle}>Combo Hội Bạn Thân</h3>
                <p className={styles.comboDescription}>
                  Combo dành cho nhóm bạn 3-4 người, đầy đủ các món ăn nhẹ và
                  nước uống.
                </p>
                <div className={styles.comboItems}>
                  <p className={styles.comboItemsTitle}>Bao gồm:</p>
                  <div className={styles.comboItem}>
                    2 x Pizza (cỡ vừa, 2 loại)
                  </div>
                  <div className={styles.comboItem}>
                    1 x Gà nugget (10 miếng)
                  </div>
                  <div className={styles.comboItem}>1 x Mực chiên giòn</div>
                  <div className={styles.comboItem}>4 x Nước tự chọn</div>
                  <div className={styles.comboItem}>
                    1 x Bánh cookie (6 miếng)
                  </div>
                </div>
                <div className={styles.comboPriceContainer}>
                  <div className={styles.comboPrice}>269.000 ₫</div>
                  <div className={styles.comboOriginalPrice}>339.000 ₫</div>
                </div>
                <div className={styles.comboActions}>
                  <button className={styles.orderButton}>Đặt ngay</button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>

            {/* Combo 4 */}
            <div className={styles.comboCard}>
              <div className={styles.comboImgContainer}>
                <img
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349"
                  alt="Combo Tiệc Nhỏ"
                  className={styles.comboImg}
                />
                <div className={styles.comboDiscount}>-35%</div>
              </div>
              <div className={styles.comboInfo}>
                <h3 className={styles.comboTitle}>Combo Tiệc Nhỏ</h3>
                <p className={styles.comboDescription}>
                  Combo phong phú dành cho các buổi tụ tập nhỏ từ 5-6 người, đa
                  dạng món ăn.
                </p>
                <div className={styles.comboItems}>
                  <p className={styles.comboItemsTitle}>Bao gồm:</p>
                  <div className={styles.comboItem}>
                    2 x Pizza (cỡ lớn, 2 loại)
                  </div>
                  <div className={styles.comboItem}>2 x Gà rán (12 miếng)</div>
                  <div className={styles.comboItem}>
                    3 x Khoai tây chiên (size lớn)
                  </div>
                  <div className={styles.comboItem}>6 x Nước ngọt tự chọn</div>
                  <div className={styles.comboItem}>
                    1 x Bánh kem (size vừa)
                  </div>
                </div>
                <div className={styles.comboPriceContainer}>
                  <div className={styles.comboPrice}>489.000 ₫</div>
                  <div className={styles.comboOriginalPrice}>749.000 ₫</div>
                </div>
                <div className={styles.comboActions}>
                  <button className={styles.orderButton}>Đặt ngay</button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>

            {/* Combo 5 */}
            <div className={styles.comboCard}>
              <div className={styles.comboImgContainer}>
                <img
                  src="https://images.unsplash.com/photo-1616669943046-fafbd1d2e623"
                  alt="Combo Sáng"
                  className={styles.comboImg}
                />
                <div className={styles.comboDiscount}>-15%</div>
              </div>
              <div className={styles.comboInfo}>
                <h3 className={styles.comboTitle}>Combo Bữa Sáng Dinh Dưỡng</h3>
                <p className={styles.comboDescription}>
                  Combo dinh dưỡng và đầy đủ cho bữa sáng năng động của bạn.
                </p>
                <div className={styles.comboItems}>
                  <p className={styles.comboItemsTitle}>Bao gồm:</p>
                  <div className={styles.comboItem}>
                    1 x Sandwich Gà Teriyaki
                  </div>
                  <div className={styles.comboItem}>1 x Salad Trộn Rau Củ</div>
                  <div className={styles.comboItem}>1 x Nước ép cam tươi</div>
                  <div className={styles.comboItem}>1 x Sữa chua hoa quả</div>
                </div>
                <div className={styles.comboPriceContainer}>
                  <div className={styles.comboPrice}>89.000 ₫</div>
                  <div className={styles.comboOriginalPrice}>105.000 ₫</div>
                </div>
                <div className={styles.comboActions}>
                  <button className={styles.orderButton}>Đặt ngay</button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>

            {/* Combo 6 */}
            <div className={styles.comboCard}>
              <div className={styles.comboImgContainer}>
                <img
                  src="https://images.unsplash.com/photo-1565299507177-b0ac66763828"
                  alt="Combo Healthy"
                  className={styles.comboImg}
                />
                <div className={styles.comboDiscount}>-20%</div>
              </div>
              <div className={styles.comboInfo}>
                <h3 className={styles.comboTitle}>Combo Healthy Choice</h3>
                <p className={styles.comboDescription}>
                  Combo dành cho người ăn kiêng với các món ăn ít calo, đầy đủ
                  dinh dưỡng.
                </p>
                <div className={styles.comboItems}>
                  <p className={styles.comboItemsTitle}>Bao gồm:</p>
                  <div className={styles.comboItem}>1 x Salad Gà Nướng</div>
                  <div className={styles.comboItem}>
                    1 x Sandwich Ngũ Cốc Nguyên Cám
                  </div>
                  <div className={styles.comboItem}>1 x Soup Rau Củ</div>
                  <div className={styles.comboItem}>
                    1 x Nước ép rau củ xanh
                  </div>
                  <div className={styles.comboItem}>1 x Trái cây theo mùa</div>
                </div>
                <div className={styles.comboPriceContainer}>
                  <div className={styles.comboPrice}>129.000 ₫</div>
                  <div className={styles.comboOriginalPrice}>159.000 ₫</div>
                </div>
                <div className={styles.comboActions}>
                  <button className={styles.orderButton}>Đặt ngay</button>
                  <button className={styles.favoriteBtn}>❤️</button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.pagination}>
            <button className={styles.paginationButton}>«</button>
            <button className={`${styles.paginationButton} ${styles.active}`}>
              1
            </button>
            <button className={styles.paginationButton}>2</button>
            <button className={styles.paginationButton}>3</button>
            <button className={styles.paginationButton}>»</button>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className={styles.specialOffers}>
        <div className="container">
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
    </>
  );
}
