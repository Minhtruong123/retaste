import React, { useState } from "react";
import styles from "./DetailProductPage.module.css";

export default function DetailProductPage() {
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
  );
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
    "https://images.unsplash.com/photo-1550547660-d9450f859349",
  ];

  const changeImage = (src) => {
    setActiveImage(src);
  };

  const changeTab = (tabId) => {
    setActiveTab(tabId);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    setIsInCart(true);

    setTimeout(() => {
      setIsInCart(false);
    }, 2000);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <a href="#">Trang chủ</a>
          <span>/</span>
          <a href="#">Thực đơn</a>
          <span>/</span>
          <a href="#">Burger</a>
          <span>/</span>
          <span>Classic Burger</span>
        </div>
      </div>

      <section className={styles.productDetail}>
        <div className={styles.container}>
          <div className={styles.productContainer}>
            <div className={styles.productGallery}>
              <span className={styles.productBadge}>Bán chạy</span>
              <img
                src={activeImage}
                alt="Classic Burger"
                className={styles.mainImage}
              />
              <div className={styles.imageThumbnails}>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Classic Burger view ${index + 1}`}
                    className={`${styles.thumbnail} ${
                      activeImage === image ? styles.active : ""
                    }`}
                    onClick={() => changeImage(image)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.productInfo}>
              <h1>Classic Burger</h1>
              <div className={styles.productMeta}>
                <div className={styles.productRating}>
                  ★★★★★ <span>(156 đánh giá)</span>
                </div>
                <div className={styles.productCategory}>Burger</div>
              </div>
              <div className={styles.productPrice}>69.000 ₫</div>
              <div className={styles.productDescription}>
                Burger bò cổ điển với bánh mì mềm, thịt bò Úc 100% nguyên chất
                nướng tới mức hoàn hảo, phô mai Cheddar tan chảy, rau xà lách
                tươi giòn, cà chua mọng nước, hành tây và sốt đặc biệt của nhà
                RETASTE. Đây là lựa chọn lý tưởng cho bữa trưa nhanh chóng hoặc
                bữa tối nhẹ nhàng.
              </div>

              <div className={styles.productFeatures}>
                <h3>Đặc điểm nổi bật</h3>
                <div className={styles.featuresList}>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>Thịt bò Úc 100% tự nhiên</span>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>Phô mai Cheddar thượng hạng</span>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>Không chất bảo quản</span>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>Sốt đặc biệt tự làm</span>
                  </div>
                </div>
              </div>

              <div className={styles.customization}>
                <h3>Tùy chỉnh theo ý thích</h3>

                <div className={styles.optionsGroup}>
                  <h4>Mức độ chín</h4>
                  <div className={styles.options}>
                    <div className={styles.optionItem}>
                      <input
                        type="radio"
                        name="doneness"
                        id="medium-rare"
                        className={styles.optionInput}
                        defaultChecked
                      />
                      <label
                        htmlFor="medium-rare"
                        className={styles.optionLabel}
                      >
                        Chín tái
                      </label>
                    </div>
                    <div className={styles.optionItem}>
                      <input
                        type="radio"
                        name="doneness"
                        id="medium"
                        className={styles.optionInput}
                      />
                      <label htmlFor="medium" className={styles.optionLabel}>
                        Chín vừa
                      </label>
                    </div>
                    <div className={styles.optionItem}>
                      <input
                        type="radio"
                        name="doneness"
                        id="well-done"
                        className={styles.optionInput}
                      />
                      <label htmlFor="well-done" className={styles.optionLabel}>
                        Chín kỹ
                      </label>
                    </div>
                  </div>
                </div>

                <div className={styles.optionsGroup}>
                  <h4>Thêm topping (tuỳ chọn)</h4>
                  <div className={styles.addonItem}>
                    <div className={styles.addonLeft}>
                      <input type="checkbox" id="extra-cheese" />
                      <label htmlFor="extra-cheese">Phô mai thêm</label>
                    </div>
                    <div className={styles.addonPrice}>+10.000 ₫</div>
                  </div>
                  <div className={styles.addonItem}>
                    <div className={styles.addonLeft}>
                      <input type="checkbox" id="bacon" />
                      <label htmlFor="bacon">Thịt xông khói</label>
                    </div>
                    <div className={styles.addonPrice}>+15.000 ₫</div>
                  </div>
                  <div className={styles.addonItem}>
                    <div className={styles.addonLeft}>
                      <input type="checkbox" id="egg" />
                      <label htmlFor="egg">Trứng ốp la</label>
                    </div>
                    <div className={styles.addonPrice}>+8.000 ₫</div>
                  </div>
                </div>
              </div>

              <div className={styles.quantitySelector}>
                <label>Số lượng:</label>
                <div className={styles.quantityControls}>
                  <button
                    className={styles.quantityBtn}
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    className={styles.quantityInput}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                  <button
                    className={styles.quantityBtn}
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.productActions}>
                <button
                  className={`${styles.addToCart} ${
                    isInCart ? styles.added : ""
                  }`}
                  onClick={addToCart}
                >
                  {isInCart ? (
                    <>
                      <span>✓</span> Đã thêm vào giỏ
                    </>
                  ) : (
                    <>
                      <span>🛒</span> Thêm vào giỏ hàng
                    </>
                  )}
                </button>
                <button className={styles.buyNow}>Mua ngay</button>
                <button
                  className={`${styles.favoriteBtn} ${
                    isFavorite ? styles.active : ""
                  }`}
                  onClick={toggleFavorite}
                >
                  ❤️
                </button>
                <button className={styles.shareBtn}>🔗</button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className={styles.productTabs}>
            <div className={styles.tabsHeader}>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "description" ? styles.active : ""
                }`}
                onClick={() => changeTab("description")}
              >
                Mô tả chi tiết
              </button>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "nutrition" ? styles.active : ""
                }`}
                onClick={() => changeTab("nutrition")}
              >
                Thông tin dinh dưỡng
              </button>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "reviews" ? styles.active : ""
                }`}
                onClick={() => changeTab("reviews")}
              >
                Đánh giá (156)
              </button>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "shipping" ? styles.active : ""
                }`}
                onClick={() => changeTab("shipping")}
              >
                Thông tin giao hàng
              </button>
            </div>

            <div
              id="description"
              className={`${styles.tabContent} ${
                activeTab === "description" ? styles.active : ""
              }`}
            >
              <h3>Giới thiệu về Classic Burger</h3>
              <p>
                Classic Burger là một trong những món ăn nổi tiếng nhất của
                RETASTE, đã được phục vụ từ khi chúng tôi mở cửa hàng đầu tiên.
                Món ăn này đã chinh phục hàng ngàn khách hàng với hương vị đậm
                đà và chất lượng nguyên liệu tuyệt hảo.
              </p>
              <br />
              <p>
                Chúng tôi sử dụng thịt bò Úc 100% tự nhiên, được nhập khẩu trực
                tiếp và bảo quản trong điều kiện lý tưởng. Thịt được xay trong
                ngày để đảm bảo độ tươi ngon, sau đó được nêm nếm với công thức
                gia vị đặc biệt và tạo hình thủ công.
              </p>
              <br />
              <p>
                Bánh mì được làm từ bột mì hữu cơ, nướng trong lò đặc biệt để có
                được độ mềm xốp bên trong và lớp vỏ giòn tan bên ngoài. Phô mai
                Cheddar được chúng tôi lựa chọn kỹ càng để đảm bảo hương vị đậm
                đà và khả năng tan chảy hoàn hảo.
              </p>
              <br />
              <p>
                Sốt đặc biệt của chúng tôi là bí quyết được truyền lại qua nhiều
                thế hệ đầu bếp, với hơn 15 loại gia vị và nguyên liệu khác nhau,
                tạo nên hương vị khó quên cho mỗi chiếc burger.
              </p>
              <br />
              <p>
                Classic Burger đi kèm với khoai tây chiên giòn được chiên trong
                dầu ô liu và rắc một chút muối biển, tạo nên sự kết hợp hoàn hảo
                cho bữa ăn của bạn.
              </p>
            </div>

            <div
              id="nutrition"
              className={`${styles.tabContent} ${
                activeTab === "nutrition" ? styles.active : ""
              }`}
            >
              <h3>Thông tin dinh dưỡng</h3>
              <p>
                Thông tin dinh dưỡng dưới đây được tính cho 1 phần ăn Classic
                Burger (không bao gồm khoai tây chiên):
              </p>

              <table className={styles.nutritionTable}>
                <tbody>
                  <tr>
                    <th>Thành phần</th>
                    <th>Lượng trên phần ăn</th>
                  </tr>
                  <tr>
                    <td>Calories</td>
                    <td>550 kcal</td>
                  </tr>
                  <tr>
                    <td>Protein</td>
                    <td>30g</td>
                  </tr>
                  <tr>
                    <td>Carbohydrates</td>
                    <td>40g</td>
                  </tr>
                  <tr>
                    <td>- Đường</td>
                    <td>8g</td>
                  </tr>
                  <tr>
                    <td>- Chất xơ</td>
                    <td>3g</td>
                  </tr>
                  <tr>
                    <td>Chất béo</td>
                    <td>28g</td>
                  </tr>
                  <tr>
                    <td>- Chất béo bão hòa</td>
                    <td>10g</td>
                  </tr>
                  <tr>
                    <td>Cholesterol</td>
                    <td>90mg</td>
                  </tr>
                  <tr>
                    <td>Natri</td>
                    <td>800mg</td>
                  </tr>
                  <tr>
                    <td>Kali</td>
                    <td>600mg</td>
                  </tr>
                </tbody>
              </table>

              <p className={styles.note}>
                Lưu ý: Thông tin dinh dưỡng có thể thay đổi tùy thuộc vào các
                tùy chọn và topping bổ sung.
              </p>
            </div>

            <div
              id="reviews"
              className={`${styles.tabContent} ${
                activeTab === "reviews" ? styles.active : ""
              }`}
            >
              <div className={styles.reviewStats}>
                <div className={styles.overallRating}>
                  <div className={styles.ratingNumber}>4.8</div>
                  <div className={styles.ratingStars}>★★★★★</div>
                  <div className={styles.ratingCount}>156 đánh giá</div>
                </div>

                <div className={styles.ratingBreakdown}>
                  <div className={styles.ratingBar}>
                    <div className={styles.ratingLabel}>5 ★</div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progress}
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <div className={styles.ratingPercent}>85%</div>
                  </div>
                  <div className={styles.ratingBar}>
                    <div className={styles.ratingLabel}>4 ★</div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progress}
                        style={{ width: "10%" }}
                      ></div>
                    </div>
                    <div className={styles.ratingPercent}>10%</div>
                  </div>
                  <div className={styles.ratingBar}>
                    <div className={styles.ratingLabel}>3 ★</div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progress}
                        style={{ width: "3%" }}
                      ></div>
                    </div>
                    <div className={styles.ratingPercent}>3%</div>
                  </div>
                  <div className={styles.ratingBar}>
                    <div className={styles.ratingLabel}>2 ★</div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progress}
                        style={{ width: "1%" }}
                      ></div>
                    </div>
                    <div className={styles.ratingPercent}>1%</div>
                  </div>
                  <div className={styles.ratingBar}>
                    <div className={styles.ratingLabel}>1 ★</div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progress}
                        style={{ width: "1%" }}
                      ></div>
                    </div>
                    <div className={styles.ratingPercent}>1%</div>
                  </div>
                </div>

                <div className={styles.writeReview}>
                  <button className={styles.writeReviewBtn}>
                    Viết đánh giá
                  </button>
                </div>
              </div>

              <div className={styles.reviewList}>
                <div className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewer}>
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="User"
                        className={styles.reviewerAvatar}
                      />
                      <div className={styles.reviewerInfo}>
                        <h4>Trần Văn Nam</h4>
                        <div className={styles.reviewDate}>15/10/2025</div>
                      </div>
                    </div>
                    <div className={styles.reviewRating}>★★★★★</div>
                  </div>
                  <div className={styles.reviewContent}>
                    Một trong những burger ngon nhất mà tôi từng ăn! Thịt bò
                    tươi ngon, độ chín vừa phải, bánh mì mềm, phô mai tan chảy
                    và sốt đặc biệt thật sự tuyệt vời. Giao hàng nhanh và đồ ăn
                    vẫn còn nóng khi đến nơi. Sẽ đặt lại!
                  </div>
                  <div className={styles.reviewPhotos}>
                    <img
                      src="https://images.unsplash.com/photo-1550547660-d9450f859349"
                      alt="Review Photo"
                      className={styles.reviewPhoto}
                    />
                    <img
                      src="https://images.unsplash.com/photo-1561758033-d89a9ad46330"
                      alt="Review Photo"
                      className={styles.reviewPhoto}
                    />
                  </div>
                  <div className={styles.reviewActions}>
                    <div className={styles.reviewAction}>
                      <span>👍</span> Hữu ích (12)
                    </div>
                    <div className={styles.reviewAction}>
                      <span>💬</span> Bình luận
                    </div>
                  </div>
                </div>

                <div className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewer}>
                      <img
                        src="https://randomuser.me/api/portraits/women/42.jpg"
                        alt="User"
                        className={styles.reviewerAvatar}
                      />
                      <div className={styles.reviewerInfo}>
                        <h4>Nguyễn Thị Hương</h4>
                        <div className={styles.reviewDate}>10/10/2025</div>
                      </div>
                    </div>
                    <div className={styles.reviewRating}>★★★★★</div>
                  </div>
                  <div className={styles.reviewContent}>
                    Classic Burger luôn là lựa chọn an toàn nhưng không kém phần
                    ngon miệng. Tôi thích thêm phô mai và thịt xông khói, tạo
                    nên hương vị tuyệt vời. Khoai tây chiên giòn rụm và đúng vị.
                    Dịch vụ giao hàng rất nhanh và nhân viên rất lịch sự.
                  </div>
                  <div className={styles.reviewActions}>
                    <div className={styles.reviewAction}>
                      <span>👍</span> Hữu ích (8)
                    </div>
                    <div className={styles.reviewAction}>
                      <span>💬</span> Bình luận
                    </div>
                  </div>
                </div>

                <div className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewer}>
                      <img
                        src="https://randomuser.me/api/portraits/men/71.jpg"
                        alt="User"
                        className={styles.reviewerAvatar}
                      />
                      <div className={styles.reviewerInfo}>
                        <h4>Phạm Minh Tuấn</h4>
                        <div className={styles.reviewDate}>05/10/2025</div>
                      </div>
                    </div>
                    <div className={styles.reviewRating}>★★★★☆</div>
                  </div>
                  <div className={styles.reviewContent}>
                    Burger ngon, nhưng lần này bánh mì hơi khô. Thịt vẫn tươi và
                    nhiều, phô mai đủ. Có lẽ do thời gian giao hàng hơi lâu,
                    nhưng tổng thể vẫn rất ngon. Tôi sẽ tiếp tục đặt và hy vọng
                    lần sau sẽ hoàn hảo.
                  </div>
                  <div className={styles.reviewActions}>
                    <div className={styles.reviewAction}>
                      <span>👍</span> Hữu ích (3)
                    </div>
                    <div className={styles.reviewAction}>
                      <span>💬</span> Bình luận
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="shipping"
              className={`${styles.tabContent} ${
                activeTab === "shipping" ? styles.active : ""
              }`}
            >
              <h3>Thông tin giao hàng</h3>
              <p>
                RETASTE cam kết mang đến trải nghiệm giao hàng tốt nhất cho
                khách hàng với các chính sách sau:
              </p>
              <br />
              <ul className={styles.shippingList}>
                <li>
                  Thời gian giao hàng: 20-30 phút trong khu vực nội thành, 30-45
                  phút cho khu vực ngoại thành
                </li>
                <li>
                  Phí giao hàng: Miễn phí cho đơn hàng từ 100.000đ trong bán
                  kính 3km
                </li>
                <li>
                  Đồ ăn được đóng gói cẩn thận trong hộp giữ nhiệt đặc biệt để
                  đảm bảo món ăn vẫn còn nóng và giữ nguyên hương vị khi đến tay
                  bạn
                </li>
                <li>
                  Theo dõi đơn hàng theo thời gian thực thông qua ứng dụng
                  RETASTE
                </li>
                <li>
                  Hỗ trợ giao hàng 24/7 cho các khu vực trung tâm thành phố
                </li>
              </ul>
              <br />
              <p>
                Lưu ý: Thời gian giao hàng có thể thay đổi tùy thuộc vào điều
                kiện thời tiết và tình trạng giao thông. Trong trường hợp có sự
                chậm trễ, nhân viên của chúng tôi sẽ liên hệ với bạn.
              </p>
            </div>
          </div>

          {/* Similar Products */}
          <section className={styles.similarProducts}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Món ăn tương tự</h2>
              <a href="#" className={styles.viewAll}>
                Xem tất cả
              </a>
            </div>
            <div className={styles.productsContainer}>
              <div className={styles.productCard}>
                <img
                  src="https://images.unsplash.com/photo-1553979459-d2229ba7433b"
                  alt="Cheese Burger Deluxe"
                  className={styles.productImg}
                />
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>Cheese Burger Deluxe</h3>
                  <div className={styles.productCategory}>Burger</div>
                  <div className={styles.productDetails}>
                    <div className={styles.productPrice}>79.000 ₫</div>
                    <div className={styles.productRating}>★★★★☆</div>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.addToCartSmall}>
                      Thêm vào giỏ
                    </button>
                    <button className={styles.favoriteBtn}>❤️</button>
                  </div>
                </div>
              </div>
              <div className={styles.productCard}>
                <img
                  src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9"
                  alt="Burger Gà Cay"
                  className={styles.productImg}
                />
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>Burger Gà Cay</h3>
                  <div className={styles.productCategory}>Burger</div>
                  <div className={styles.productDetails}>
                    <div className={styles.productPrice}>65.000 ₫</div>
                    <div className={styles.productRating}>★★★★★</div>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.addToCartSmall}>
                      Thêm vào giỏ
                    </button>
                    <button className={styles.favoriteBtn}>❤️</button>
                  </div>
                </div>
              </div>
              <div className={styles.productCard}>
                <img
                  src="https://images.unsplash.com/photo-1585238342024-78d387f4a707"
                  alt="Double Beef Burger"
                  className={styles.productImg}
                />
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>Double Beef Burger</h3>
                  <div className={styles.productCategory}>Burger</div>
                  <div className={styles.productDetails}>
                    <div className={styles.productPrice}>99.000 ₫</div>
                    <div className={styles.productRating}>★★★★★</div>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.addToCartSmall}>
                      Thêm vào giỏ
                    </button>
                    <button className={styles.favoriteBtn}>❤️</button>
                  </div>
                </div>
              </div>
              <div className={styles.productCard}>
                <img
                  src="https://images.unsplash.com/photo-1603064752734-4c48eff53d05"
                  alt="Burger Chay"
                  className={styles.productImg}
                />
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>Burger Chay</h3>
                  <div className={styles.productCategory}>Burger</div>
                  <div className={styles.productDetails}>
                    <div className={styles.productPrice}>59.000 ₫</div>
                    <div className={styles.productRating}>★★★★☆</div>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.addToCartSmall}>
                      Thêm vào giỏ
                    </button>
                    <button className={styles.favoriteBtn}>❤️</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
