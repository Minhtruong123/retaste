import React, { useState, useEffect } from "react";
import styles from "./DeliveryManagement.module.css";

export default function DeliveryManagement() {
  const [activeTab, setActiveTab] = useState("all");

  // Hàm mở modal phân công shipper
  const openAssignModal = () => {
    const modal = document.getElementById("assignModal");
    modal.classList.add(styles.active);
  };

  // Hàm đóng modal
  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.classList.remove(styles.active);
  };

  // Hàm xử lý khi click theo dõi đơn hàng
  const handleTrackOrder = () => {
    alert("Mở trang theo dõi đơn hàng");
  };
  return (
    <>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>Quản lý giao hàng</div>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Tìm kiếm..."
              />
            </div>
            <button className={styles.actionBtn}>
              🔔
              <span className={styles.notificationBadge}>3</span>
            </button>
            <button className={styles.actionBtn}>✉️</button>
            <button className={styles.actionBtn}>🔄</button>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbItem}>
            <a href="#">Trang chủ</a>
          </div>
          <div className={styles.breadcrumbDivider}>/</div>
          <div className={styles.breadcrumbCurrent}>Quản lý giao hàng</div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Quản lý giao hàng</h1>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              <span>➕</span>
              Thêm shipper mới
            </button>
          </div>

          {/* Filter Section */}
          <div className={styles.filterSection}>
            <div className={styles.filterRow}>
              <div className={styles.filterItem}>
                <label className={styles.filterLabel}>Tìm kiếm:</label>
                <input
                  type="text"
                  className={styles.filterInput}
                  placeholder="Mã đơn hàng, tên khách hàng..."
                />
              </div>
              <div className={styles.filterItem}>
                <label className={styles.filterLabel}>Shipper:</label>
                <select className={styles.filterSelect}>
                  <option value="">Tất cả shipper</option>
                  <option value="1">Trần Văn Đức</option>
                  <option value="2">Nguyễn Thị Hoa</option>
                  <option value="3">Lê Minh Tuấn</option>
                  <option value="4">Phạm Thị Lan</option>
                </select>
              </div>
              <div className={styles.filterItem}>
                <label className={styles.filterLabel}>Khu vực:</label>
                <select className={styles.filterSelect}>
                  <option value="">Tất cả khu vực</option>
                  <option value="q1">Quận 1</option>
                  <option value="q3">Quận 3</option>
                  <option value="q5">Quận 5</option>
                  <option value="q7">Quận 7</option>
                  <option value="q10">Quận 10</option>
                </select>
              </div>
              <div className={styles.filterItem}>
                <label className={styles.filterLabel}>Ngày:</label>
                <input type="date" className={styles.filterInput} />
              </div>
              <button className={`${styles.btn} ${styles.btnSecondary}`}>
                🔍 Lọc
              </button>
              <button className={`${styles.btn} ${styles.btnOutline}`}>
                ↻ Đặt lại
              </button>
            </div>
          </div>

          {/* Delivery Statistics */}
          <div className={styles.deliveryStats}>
            <div className={`${styles.statCard} ${styles.total}`}>
              <div className={styles.statIcon}>📦</div>
              <div className={styles.statNumber}>87</div>
              <div className={styles.statLabel}>Tổng đơn hàng hôm nay</div>
            </div>
            <div className={`${styles.statCard} ${styles.active}`}>
              <div className={styles.statIcon}>🚚</div>
              <div className={styles.statNumber}>24</div>
              <div className={styles.statLabel}>Đang giao hàng</div>
            </div>
            <div className={`${styles.statCard} ${styles.completed}`}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statNumber}>58</div>
              <div className={styles.statLabel}>Đã giao thành công</div>
            </div>
            <div className={`${styles.statCard} ${styles.cancelled}`}>
              <div className={styles.statIcon}>❌</div>
              <div className={styles.statNumber}>5</div>
              <div className={styles.statLabel}>Đã hủy/Trả về</div>
            </div>
          </div>

          {/* Status Tabs */}
          <div className={styles.statusTabs}>
            <div
              className={`${styles.statusTab} ${
                activeTab === "all" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("all")}
            >
              <span>Tất cả</span>
              <span className={styles.tabCount}>87</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeTab === "preparing" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("preparing")}
            >
              <span>Chờ chuẩn bị</span>
              <span className={styles.tabCount}>12</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeTab === "ready" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("ready")}
            >
              <span>Sẵn sàng giao</span>
              <span className={styles.tabCount}>8</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeTab === "delivering" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("delivering")}
            >
              <span>Đang giao hàng</span>
              <span className={styles.tabCount}>24</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeTab === "delivered" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("delivered")}
            >
              <span>Đã giao</span>
              <span className={styles.tabCount}>58</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeTab === "cancelled" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("cancelled")}
            >
              <span>Đã hủy</span>
              <span className={styles.tabCount}>5</span>
            </div>
          </div>

          {/* Main Delivery Grid */}
          <div className={styles.deliveryGrid}>
            {/* Shipper Management */}
            <div className={styles.shipperSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Danh sách Shipper</h3>
                <button
                  className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                >
                  ⚙️ Quản lý
                </button>
              </div>
              <div className={styles.shipperList}>
                <div className={styles.shipperItem}>
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Shipper"
                    className={styles.shipperAvatar}
                  />
                  <div className={styles.shipperInfo}>
                    <div className={styles.shipperName}>Trần Văn Đức</div>
                    <div className={styles.shipperPhone}>📞 0901234567</div>
                    <div className={styles.shipperStats}>
                      <div className={styles.statItem}>
                        <span>📦</span>
                        <span>28 đơn hôm nay</span>
                      </div>
                      <div className={styles.statItem}>
                        <span>⭐</span>
                        <span>4.8/5</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.shipperStatus}>
                    <div
                      className={`${styles.statusDot} ${styles.statusOnline}`}
                    ></div>
                    <div>
                      <div className={styles.statusText}>Đang hoạt động</div>
                      <div className={styles.currentOrders}>3 đơn</div>
                    </div>
                  </div>
                </div>

                <div className={styles.shipperItem}>
                  <img
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Shipper"
                    className={styles.shipperAvatar}
                  />
                  <div className={styles.shipperInfo}>
                    <div className={styles.shipperName}>Nguyễn Thị Hoa</div>
                    <div className={styles.shipperPhone}>📞 0907654321</div>
                    <div className={styles.shipperStats}>
                      <div className={styles.statItem}>
                        <span>📦</span>
                        <span>22 đơn hôm nay</span>
                      </div>
                      <div className={styles.statItem}>
                        <span>⭐</span>
                        <span>4.9/5</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.shipperStatus}>
                    <div
                      className={`${styles.statusDot} ${styles.statusBusy}`}
                    ></div>
                    <div>
                      <div className={styles.statusText}>Đang bận</div>
                      <div className={styles.currentOrders}>5 đơn</div>
                    </div>
                  </div>
                </div>

                <div className={styles.shipperItem}>
                  <img
                    src="https://randomuser.me/api/portraits/men/58.jpg"
                    alt="Shipper"
                    className={styles.shipperAvatar}
                  />
                  <div className={styles.shipperInfo}>
                    <div className={styles.shipperName}>Lê Minh Tuấn</div>
                    <div className={styles.shipperPhone}>📞 0912345678</div>
                    <div className={styles.shipperStats}>
                      <div className={styles.statItem}>
                        <span>📦</span>
                        <span>15 đơn hôm nay</span>
                      </div>
                      <div className={styles.statItem}>
                        <span>⭐</span>
                        <span>4.7/5</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.shipperStatus}>
                    <div
                      className={`${styles.statusDot} ${styles.statusOnline}`}
                    ></div>
                    <div>
                      <div className={styles.statusText}>Sẵn sàng</div>
                      <div className={styles.currentOrders}>0 đơn</div>
                    </div>
                  </div>
                </div>

                <div className={styles.shipperItem}>
                  <img
                    src="https://randomuser.me/api/portraits/women/62.jpg"
                    alt="Shipper"
                    className={styles.shipperAvatar}
                  />
                  <div className={styles.shipperInfo}>
                    <div className={styles.shipperName}>Phạm Thị Lan</div>
                    <div className={styles.shipperPhone}>📞 0918765432</div>
                    <div className={styles.shipperStats}>
                      <div className={styles.statItem}>
                        <span>📦</span>
                        <span>20 đơn hôm nay</span>
                      </div>
                      <div className={styles.statItem}>
                        <span>⭐</span>
                        <span>4.6/5</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.shipperStatus}>
                    <div
                      className={`${styles.statusDot} ${styles.statusBusy}`}
                    ></div>
                    <div>
                      <div className={styles.statusText}>Đang bận</div>
                      <div className={styles.currentOrders}>4 đơn</div>
                    </div>
                  </div>
                </div>

                <div className={styles.shipperItem}>
                  <img
                    src="https://randomuser.me/api/portraits/men/73.jpg"
                    alt="Shipper"
                    className={styles.shipperAvatar}
                  />
                  <div className={styles.shipperInfo}>
                    <div className={styles.shipperName}>Hoàng Quang Minh</div>
                    <div className={styles.shipperPhone}>📞 0923456789</div>
                    <div className={styles.shipperStats}>
                      <div className={styles.statItem}>
                        <span>📦</span>
                        <span>0 đơn hôm nay</span>
                      </div>
                      <div className={styles.statItem}>
                        <span>⭐</span>
                        <span>4.5/5</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.shipperStatus}>
                    <div
                      className={`${styles.statusDot} ${styles.statusOffline}`}
                    ></div>
                    <div>
                      <div className={styles.statusText}>Nghỉ phép</div>
                      <div className={styles.currentOrders}>0 đơn</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Tracking */}
            <div className={styles.orderTracking}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Theo dõi đơn hàng</h3>
                <button
                  className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                >
                  📍 Bản đồ
                </button>
              </div>
              <div className={styles.trackingContent}>
                <div className={styles.orderList}>
                  <div className={styles.orderItem}>
                    <div className={styles.orderHeader}>
                      <div>
                        <div className={styles.orderId}>#ORD-7829</div>
                        <div className={styles.orderTime}>24/10/2025 14:35</div>
                      </div>
                    </div>
                    <div className={styles.customerInfo}>
                      <div className={styles.customerName}>👤 Trần Văn Nam</div>
                      <div className={styles.customerAddress}>
                        📍 123 Nguyễn Huệ, Q1, TP.HCM
                      </div>
                      <div className={styles.customerPhone}>📞 0901234567</div>
                    </div>
                    <div className={styles.orderDetails}>
                      <div className={styles.orderTotal}>235.000 ₫</div>
                    </div>
                    <div className={styles.deliveryInfo}>
                      <div className={styles.shipperAssigned}>
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="Shipper"
                          className={styles.shipperMiniAvatar}
                        />
                        <div className={styles.shipperMiniInfo}>
                          <div>Trần Văn Đức</div>
                          <div className={styles.shipperMiniPhone}>
                            📞 0901234567
                          </div>
                        </div>
                      </div>
                      <div className={styles.deliveryTime}>Dự kiến: 15:15</div>
                    </div>
                    <div className={styles.orderStatus}>
                      <span
                        className={`${styles.statusBadge} ${styles.statusDelivering}`}
                      >
                        Đang giao hàng
                      </span>
                      <div className={styles.orderActions}>
                        <button
                          className={`${styles.actionBtnSmall} ${styles.trackBtn}`}
                          onClick={handleTrackOrder}
                        >
                          📍 Theo dõi
                        </button>
                        <button className={styles.actionBtnSmall}>
                          📞 Gọi
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.orderItem}>
                    <div className={styles.orderHeader}>
                      <div>
                        <div className={styles.orderId}>#ORD-7830</div>
                        <div className={styles.orderTime}>24/10/2025 14:42</div>
                      </div>
                    </div>
                    <div className={styles.customerInfo}>
                      <div className={styles.customerName}>
                        👤 Nguyễn Thị Hương
                      </div>
                      <div className={styles.customerAddress}>
                        📍 456 Lê Lợi, Q3, TP.HCM
                      </div>
                      <div className={styles.customerPhone}>📞 0907654321</div>
                    </div>
                    <div className={styles.orderDetails}>
                      <div className={styles.orderTotal}>178.000 ₫</div>
                    </div>
                    <div className={styles.deliveryInfo}>
                      <div className={styles.shipperAssigned}>
                        <span className={styles.shipperNotAssigned}>
                          Chưa phân công
                        </span>
                      </div>
                    </div>
                    <div className={styles.orderStatus}>
                      <span
                        className={`${styles.statusBadge} ${styles.statusReady}`}
                      >
                        Sẵn sàng giao
                      </span>
                      <div className={styles.orderActions}>
                        <button
                          className={`${styles.actionBtnSmall} ${styles.assignBtn}`}
                          onClick={openAssignModal}
                        >
                          👥 Phân công
                        </button>
                        <button className={styles.actionBtnSmall}>
                          👁️ Xem
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.orderItem}>
                    <div className={styles.orderHeader}>
                      <div>
                        <div className={styles.orderId}>#ORD-7831</div>
                        <div className={styles.orderTime}>24/10/2025 13:28</div>
                      </div>
                    </div>
                    <div className={styles.customerInfo}>
                      <div className={styles.customerName}>👤 Lê Thị Mai</div>
                      <div className={styles.customerAddress}>
                        📍 789 Hai Bà Trưng, Q1, TP.HCM
                      </div>
                      <div className={styles.customerPhone}>📞 0912345678</div>
                    </div>
                    <div className={styles.orderDetails}>
                      <div className={styles.orderTotal}>325.000 ₫</div>
                    </div>
                    <div className={styles.deliveryInfo}>
                      <div className={styles.shipperAssigned}>
                        <img
                          src="https://randomuser.me/api/portraits/women/45.jpg"
                          alt="Shipper"
                          className={styles.shipperMiniAvatar}
                        />
                        <div className={styles.shipperMiniInfo}>
                          <div>Nguyễn Thị Hoa</div>
                          <div className={styles.shipperMiniPhone}>
                            📞 0907654321
                          </div>
                        </div>
                      </div>
                      <div className={styles.deliveryTime}>
                        Đã giao lúc: 14:15
                      </div>
                    </div>
                    <div className={styles.orderStatus}>
                      <span
                        className={`${styles.statusBadge} ${styles.statusDelivered}`}
                      >
                        Đã giao
                      </span>
                      <div className={styles.orderActions}>
                        <button className={styles.actionBtnSmall}>
                          👁️ Xem
                        </button>
                        <button className={styles.actionBtnSmall}>
                          📝 Đánh giá
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.orderItem}>
                    <div className={styles.orderHeader}>
                      <div>
                        <div className={styles.orderId}>#ORD-7832</div>
                        <div className={styles.orderTime}>24/10/2025 12:15</div>
                      </div>
                    </div>
                    <div className={styles.customerInfo}>
                      <div className={styles.customerName}>
                        👤 Phạm Minh Tuấn
                      </div>
                      <div className={styles.customerAddress}>
                        📍 321 Nguyễn Trãi, Q5, TP.HCM
                      </div>
                      <div className={styles.customerPhone}>📞 0918765432</div>
                    </div>
                    <div className={styles.orderDetails}>
                      <div className={styles.orderTotal}>145.000 ₫</div>
                    </div>
                    <div className={styles.deliveryInfo}>
                      <div className={styles.shipperAssigned}>
                        <span className={styles.shipperNotAssigned}>
                          Đang chuẩn bị
                        </span>
                      </div>
                    </div>
                    <div className={styles.orderStatus}>
                      <span
                        className={`${styles.statusBadge} ${styles.statusPreparing}`}
                      >
                        Chờ chuẩn bị
                      </span>
                      <div className={styles.orderActions}>
                        <button className={styles.actionBtnSmall}>
                          👁️ Xem
                        </button>
                        <button className={styles.actionBtnSmall}>
                          ✏️ Sửa
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.orderItem}>
                    <div className={styles.orderHeader}>
                      <div>
                        <div className={styles.orderId}>#ORD-7833</div>
                        <div className={styles.orderTime}>24/10/2025 11:45</div>
                      </div>
                    </div>
                    <div className={styles.customerInfo}>
                      <div className={styles.customerName}>
                        👤 Đặng Quốc Bảo
                      </div>
                      <div className={styles.customerAddress}>
                        📍 654 Võ Văn Tần, Q3, TP.HCM
                      </div>
                      <div className={styles.customerPhone}>📞 0923456789</div>
                    </div>
                    <div className={styles.orderDetails}>
                      <div className={styles.orderTotal}>285.000 ₫</div>
                    </div>
                    <div className={styles.deliveryInfo}>
                      <div className={styles.shipperAssigned}>
                        <img
                          src="https://randomuser.me/api/portraits/men/58.jpg"
                          alt="Shipper"
                          className={styles.shipperMiniAvatar}
                        />
                        <div className={styles.shipperMiniInfo}>
                          <div>Lê Minh Tuấn</div>
                          <div className={styles.shipperMiniPhone}>
                            📞 0912345678
                          </div>
                        </div>
                      </div>
                      <div className={styles.deliveryTime}>Dự kiến: 16:30</div>
                    </div>
                    <div className={styles.orderStatus}>
                      <span
                        className={`${styles.statusBadge} ${styles.statusDelivering}`}
                      >
                        Đang giao hàng
                      </span>
                      <div className={styles.orderActions}>
                        <button
                          className={`${styles.actionBtnSmall} ${styles.trackBtn}`}
                          onClick={handleTrackOrder}
                        >
                          📍 Theo dõi
                        </button>
                        <button className={styles.actionBtnSmall}>
                          📞 Gọi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Assign Shipper */}
        <div className={styles.modalOverlay} id="assignModal">
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Phân công shipper</h3>
              <button
                className={styles.modalClose}
                onClick={() => closeModal("assignModal")}
              >
                ✖
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Đơn hàng:</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value="#ORD-7830 - Nguyễn Thị Hương"
                  readOnly
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Chọn shipper:</label>
                <select className={styles.formSelect}>
                  <option value="">-- Chọn shipper --</option>
                  <option value="1">Trần Văn Đức (3 đơn đang giao)</option>
                  <option value="3">
                    Lê Minh Tuấn (0 đơn đang giao) - Khuyến nghị
                  </option>
                  <option value="2">Nguyễn Thị Hoa (5 đơn đang giao)</option>
                  <option value="4">Phạm Thị Lan (4 đơn đang giao)</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Ghi chú:</label>
                <textarea
                  className={styles.formInput}
                  rows="3"
                  placeholder="Ghi chú cho shipper..."
                ></textarea>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={`${styles.btn} ${styles.btnOutline}`}
                onClick={() => closeModal("assignModal")}
              >
                Hủy
              </button>
              <button className={`${styles.btn} ${styles.btnSecondary}`}>
                Phân công
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
