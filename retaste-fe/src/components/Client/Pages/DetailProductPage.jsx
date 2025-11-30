import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetailProductPage.module.css";
import { useCart } from "./CartContext";
import { useProductService } from "../../../hooks/useProductService";
import { useAuth } from "../../../context/AuthContext";

export default function DetailProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart: addToCartContext } = useCart();
  const { getDetailProduct } = useProductService();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedCustomizations, setSelectedCustomizations] = useState({});
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getDetailProduct(productId);
        console.log(data);

        setProduct(data);

        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        const initialCustomizations = {};
        if (data.customization_groups) {
          data.customization_groups.forEach((group) => {
            if (
              group.groupType === "single_select" &&
              group.options &&
              group.options.length > 0
            ) {
              initialCustomizations[group._id] = group.options[0]._id;
            } else if (group.groupType === "multi_select") {
              initialCustomizations[group._id] = [];
            } else if (group.groupType === "quantity_based") {
              initialCustomizations[group._id] = 0;
            }
          });
        }
        setSelectedCustomizations(initialCustomizations);
      } catch (err) {
        console.error(err);
        setError("Không tải được sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <div className={styles.loadingContainer}>Đang tải chi tiết món ăn...</div>
    );
  if (error) return <div className={styles.errorContainer}>{error}</div>;
  if (!product)
    return <div className={styles.errorContainer}>Không tìm thấy sản phẩm</div>;

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

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleCustomizationChange = (groupId, optionId, groupType) => {
    if (groupType === "single_select") {
      setSelectedCustomizations({
        ...selectedCustomizations,
        [groupId]: optionId,
      });
    } else if (groupType === "multi_select") {
      const currentSelections = selectedCustomizations[groupId] || [];
      if (currentSelections.includes(optionId)) {
        setSelectedCustomizations({
          ...selectedCustomizations,
          [groupId]: currentSelections.filter((id) => id !== optionId),
        });
      } else {
        setSelectedCustomizations({
          ...selectedCustomizations,
          [groupId]: [...currentSelections, optionId],
        });
      }
    }
  };

  const handleQuantityCustomizationChange = (groupId, value) => {
    setSelectedCustomizations({
      ...selectedCustomizations,
      [groupId]: Math.max(0, value),
    });
  };

  const addToCart = async () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích cỡ");
      return;
    }

    const user = localStorage.getItem("user");
    if (!user) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
      navigate("/auth");
      return;
    }

    setAddingToCart(true);

    try {
      const customs = [];

      if (product.customization_groups) {
        product.customization_groups.forEach((group) => {
          if (
            group.groupType === "single_select" &&
            selectedCustomizations[group._id]
          ) {
            customs.push({
              customId: group._id,
              optionId: selectedCustomizations[group._id],
            });
          } else if (group.groupType === "multi_select") {
            const selections = selectedCustomizations[group._id] || [];
            selections.forEach((optionId) => {
              customs.push({
                customId: group._id,
                optionId: optionId,
              });
            });
          } else if (group.groupType === "quantity_based") {
            const qty = selectedCustomizations[group._id] || 0;
            if (qty > 0) {
              customs.push({
                customId: group._id,
                optionId: group.options[0]._id,
                quantity: qty,
              });
            }
          }
        });
      }

      const cartData = {
        productId: product._id,
        sizeId: selectedSize._id,
        customs: customs,
        quantity: quantity,
      };

      await addToCartContext(cartData);
      window.dispatchEvent(new Event("cartBounce"));

      setIsInCart(true);
      setTimeout(() => {
        setIsInCart(false);
      }, 2000);
    } catch (error) {
      console.error("Add to cart error:", error);
      alert(error || "Thêm vào giỏ hàng thất bại");
    } finally {
      setAddingToCart(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const getCurrentPrice = () => {
    let price = product.basePrice;

    if (selectedSize && selectedSize.priceModifier) {
      price += selectedSize.priceModifier;
    }

    if (product.customization_groups) {
      product.customization_groups.forEach((group) => {
        if (
          group.groupType === "single_select" &&
          selectedCustomizations[group._id]
        ) {
          const selectedOption = group.options.find(
            (option) => option._id === selectedCustomizations[group._id]
          );
          if (selectedOption && selectedOption.price) {
            price += selectedOption.price;
          }
        } else if (group.groupType === "multi_select") {
          const selections = selectedCustomizations[group._id] || [];
          selections.forEach((optionId) => {
            const option = group.options.find((opt) => opt._id === optionId);
            if (option && option.price) {
              price += option.price;
            }
          });
        } else if (group.groupType === "quantity_based") {
          const count = selectedCustomizations[group._id] || 0;
          if (count > 0 && group.pricePerUnit) {
            price += count * group.pricePerUnit;
          }
        }
      });
    }

    return price;
  };

  const renderStars = (rating = 0) => {
    return (
      <div style={{ display: "inline-flex", color: "#ffc107" }}>
        {"★★★★★".slice(0, 5)}
      </div>
    );
  };

  const getTotalPrice = () => {
    return (getCurrentPrice() * quantity).toLocaleString("vi-VN");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <a href="/">Trang chủ</a> <span>/</span>
          <a href="/menu">Thực đơn</a> <span>/</span>
          <a href={`/menu?category=${product.categoryId}`}>
            {product.category?.categoryName || "Danh mục"}
          </a>{" "}
          <span>/</span>
          <span>{product.productName}</span>
        </div>
      </div>

      <section className={styles.productDetail}>
        <div className={styles.container}>
          <div className={styles.productContainer}>
            <div className={styles.productGallery}>
              {product.bestSeller && (
                <span className={styles.productBadge}>Bán chạy</span>
              )}
              {product.isFeatured && (
                <span className={`${styles.productBadge} ${styles.featured}`}>
                  Nổi bật
                </span>
              )}
              <img
                src={product.imageUrl}
                alt={product.productName}
                className={styles.mainImage}
              />
            </div>

            <div className={styles.productInfo}>
              <h1>{product.productName}</h1>
              <div className={styles.productMeta}>
                <div className={styles.productRating}>
                  {renderStars()}
                  <span>({product.ratingCount || 0} đánh giá)</span>
                </div>
                <div className={styles.productCategory}>
                  {product.category?.categoryName}
                </div>
                {product.preparationTime && (
                  <div className={styles.preparationTime}>
                    <span>⏱️</span> {product.preparationTime} phút
                  </div>
                )}
              </div>
              <div className={styles.productPrice}>
                {getCurrentPrice().toLocaleString("vi-VN")}₫
              </div>
              <div className={styles.productDescription}>
                {product.description || "Chưa có mô tả"}
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <div className={styles.optionsGroup}>
                  <h4>Kích cỡ</h4>
                  <div className={styles.options}>
                    {product.sizes.map((size) => (
                      <div
                        className={styles.optionItem}
                        key={size._id || size.sizeName}
                      >
                        <input
                          type="radio"
                          name="size"
                          id={`size-${size.sizeName}`}
                          className={styles.optionInput}
                          checked={
                            selectedSize && selectedSize._id === size._id
                          }
                          onChange={() => handleSizeChange(size)}
                        />
                        <label
                          htmlFor={`size-${size.sizeName}`}
                          className={styles.optionLabel}
                        >
                          {size.sizeName} (+
                          {size.priceModifier ? size.priceModifier : 0}
                          đ)
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.customization_groups &&
                product.customization_groups.length > 0 && (
                  <div className={styles.customization}>
                    <h3>Tùy chỉnh theo ý thích</h3>

                    {product.customization_groups.map((group) => (
                      <div className={styles.optionsGroup} key={group._id}>
                        <h4>
                          {group.groupName}
                          {group.isRequired && (
                            <span className={styles.requiredBadge}>
                              *Bắt buộc
                            </span>
                          )}
                        </h4>

                        {group.groupType === "single_select" && (
                          <div className={styles.options}>
                            {group.options &&
                              group.options.map((option) => (
                                <div
                                  className={styles.optionItem}
                                  key={option._id}
                                >
                                  <input
                                    type="radio"
                                    name={`group-${group._id}`}
                                    id={`option-${option._id}`}
                                    className={styles.optionInput}
                                    checked={
                                      selectedCustomizations[group._id] ===
                                      option._id
                                    }
                                    onChange={() =>
                                      handleCustomizationChange(
                                        group._id,
                                        option._id,
                                        group.groupType
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`option-${option._id}`}
                                    className={styles.optionLabel}
                                  >
                                    {option.optionName}{" "}
                                    {option.price > 0
                                      ? `(+${option.price.toLocaleString(
                                          "vi-VN"
                                        )}₫)`
                                      : ""}
                                  </label>
                                </div>
                              ))}
                          </div>
                        )}

                        {group.groupType === "multi_select" && (
                          <div className={styles.addonOptions}>
                            {group.options &&
                              group.options.map((option) => (
                                <div
                                  className={styles.addonItem}
                                  key={option._id}
                                >
                                  <div className={styles.addonLeft}>
                                    <input
                                      type="checkbox"
                                      id={`option-${option._id}`}
                                      checked={(
                                        selectedCustomizations[group._id] || []
                                      ).includes(option._id)}
                                      onChange={() =>
                                        handleCustomizationChange(
                                          group._id,
                                          option._id,
                                          group.groupType
                                        )
                                      }
                                    />
                                    <label htmlFor={`option-${option._id}`}>
                                      {option.optionName}
                                    </label>
                                  </div>
                                  {option.price > 0 && (
                                    <div className={styles.addonPrice}>
                                      +{option.price.toLocaleString("vi-VN")}₫
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

              {product.special && product.special.length > 0 && (
                <div className={styles.specialInstructions}>
                  <h4>Thông tin đặc biệt</h4>
                  <ul className={styles.specialList}>
                    {product.special.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              )}

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

              <div className={styles.totalPrice}>
                <span>Tổng tiền:</span>
                <span className={styles.totalPriceValue}>
                  {getTotalPrice()}₫
                </span>
              </div>

              <div className={styles.productActions}>
                <button
                  className={`${styles.addToCart} ${
                    isInCart ? styles.added : ""
                  }`}
                  onClick={addToCart}
                  disabled={!product.isAvailable || addingToCart}
                >
                  {addingToCart ? (
                    <>
                      <span>⏳</span> Đang thêm...
                    </>
                  ) : isInCart ? (
                    <>
                      <span>✓</span> Đã thêm vào giỏ
                    </>
                  ) : product.isAvailable ? (
                    <>
                      <span>🛒</span> Thêm vào giỏ hàng
                    </>
                  ) : (
                    "Hết hàng"
                  )}
                </button>
                <button
                  className={`${styles.favoriteBtn} ${
                    isFavorite ? styles.active : ""
                  }`}
                  onClick={toggleFavorite}
                >
                  ❤️
                </button>
              </div>

              {!product.isAvailable && (
                <div className={styles.unavailableMessage}>
                  Món ăn này hiện tạm hết. Vui lòng quay lại sau hoặc chọn món
                  khác.
                </div>
              )}
            </div>
          </div>

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
                  activeTab === "reviews" ? styles.active : ""
                }`}
                onClick={() => changeTab("reviews")}
              >
                Đánh giá ({product.ratingCount || 0})
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
              <h3>Giới thiệu về {product.productName}</h3>
              <p>{product.description}</p>
              <br />
              <p>Thời gian chuẩn bị: {product.preparationTime || "N/A"} phút</p>
              <br />
              {product.category && (
                <p>
                  Danh mục: {product.category.categoryName}
                  {product.category.description && (
                    <> - {product.category.description}</>
                  )}
                </p>
              )}
            </div>

            <div
              id="reviews"
              className={`${styles.tabContent} ${
                activeTab === "reviews" ? styles.active : ""
              }`}
            >
              {product.ratingCount > 0 ? (
                <div className={styles.reviewStats}>
                  <div className={styles.overallRating}>
                    <div className={styles.ratingNumber}>4.8</div>
                    <div className={styles.ratingStars}>★★★★★</div>
                    <div className={styles.ratingCount}>
                      {product.ratingCount} đánh giá
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.noReviews}>
                  <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                  <button className={styles.writeReviewBtn}>
                    Viết đánh giá đầu tiên
                  </button>
                </div>
              )}
            </div>

            <div
              id="shipping"
              className={`${styles.tabContent} ${
                activeTab === "shipping" ? styles.active : ""
              }`}
            >
              <h3>Thông tin giao hàng</h3>
              <p>
                Chúng tôi cam kết mang đến trải nghiệm giao hàng tốt nhất cho
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
                  Theo dõi đơn hàng theo thời gian thực thông qua ứng dụng của
                  chúng tôi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
