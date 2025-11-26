import React, { useState } from "react";
import styles from "./OrderManagement.module.css";

export default function OrderManagement() {
  const [activeStatusTab, setActiveStatusTab] = useState("all");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const toggleOrderModal = () => {
    setShowOrderModal(!showOrderModal);
  };

  const handleStatusTabClick = (status) => {
    setActiveStatusTab(status);
  };

  const handleSelectAllChange = (e) => {
    setSelectAllChecked(e.target.checked);
  };
  return (
    <>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>Quản lý giao hàng</div>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Tìm kiếm..."
              />
            </div>
            <button className={styles.actionBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
              </svg>
              <span className={styles.notificationBadge}>3</span>
            </button>
            <button className={styles.actionBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg>
            </button>
            <button className={styles.actionBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                <path
                  fillRule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                />
              </svg>
            </button>
          </div>
        </header>

        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbInner}>
            <div className={styles.breadcrumbItem}>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                </svg>
                <span>Trang chủ</span>
              </a>
            </div>
            <div className={styles.breadcrumbDivider}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
            <div className={styles.breadcrumbCurrent}>Quản lý đơn hàng</div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Quản lý đơn hàng</h1>
            <button className={styles.btnPrimary}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              <span>Tạo đơn hàng mới</span>
            </button>
          </div>

          <div className={styles.statusFilter}>
            <div
              className={`${styles.statusTab} ${
                activeStatusTab === "all" ? styles.active : ""
              }`}
              onClick={() => handleStatusTabClick("all")}
            >
              <span>Tất cả đơn hàng</span>{" "}
              <span className={styles.count}>156</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeStatusTab === "pending" ? styles.active : ""
              }`}
              onClick={() => handleStatusTabClick("pending")}
            >
              <span>Chờ xác nhận</span> <span className={styles.count}>28</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeStatusTab === "processing" ? styles.active : ""
              }`}
              onClick={() => handleStatusTabClick("processing")}
            >
              <span>Đang chuẩn bị</span>{" "}
              <span className={styles.count}>35</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeStatusTab === "shipping" ? styles.active : ""
              }`}
              onClick={() => handleStatusTabClick("shipping")}
            >
              <span>Đang giao hàng</span>{" "}
              <span className={styles.count}>42</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeStatusTab === "completed" ? styles.active : ""
              }`}
              onClick={() => handleStatusTabClick("completed")}
            >
              <span>Đã hoàn thành</span>{" "}
              <span className={styles.count}>43</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeStatusTab === "cancelled" ? styles.active : ""
              }`}
              onClick={() => handleStatusTabClick("cancelled")}
            >
              <span>Đã hủy</span> <span className={styles.count}>8</span>
            </div>
          </div>

          <div className={styles.filterCard}>
            <div className={styles.filterHeader}>
              <h3 className={styles.filterTitle}>Bộ lọc đơn hàng</h3>
              <div className={styles.filterActions}>
                <button className={styles.filterBtn}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                  <span>Tìm kiếm</span>
                </button>
                <button className={`${styles.filterBtn} ${styles.resetBtn}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                    <path
                      fillRule="evenodd"
                      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                    />
                  </svg>
                  <span>Đặt lại</span>
                </button>
                <button className={`${styles.filterBtn} ${styles.exportBtn}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                  </svg>
                  <span>Xuất Excel</span>
                </button>
              </div>
            </div>
            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 7v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                  </svg>
                  Từ ngày
                </label>
                <input
                  type="date"
                  className={styles.filterInput}
                  defaultValue="2025-10-01"
                />
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 7v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                  </svg>
                  Đến ngày
                </label>
                <input
                  type="date"
                  className={styles.filterInput}
                  defaultValue="2025-10-24"
                />
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                  </svg>
                  Mã đơn hàng
                </label>
                <input
                  type="text"
                  className={styles.filterInput}
                  placeholder="Nhập mã đơn hàng..."
                />
              </div>
            </div>
            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  Khách hàng
                </label>
                <input
                  type="text"
                  className={styles.filterInput}
                  placeholder="Tên hoặc số điện thoại..."
                />
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2h2v2H2z" />
                    <path d="M6 0v6H0V0h6ZM5 1H1v4h4z" />
                    <path d="M2 8h2v2H2z" />
                    <path d="M6 6v6H0V6h6ZM5 7H1v4h4z" />
                    <path d="M8 2h2v2H8z" />
                    <path d="M12 0v6H6V0h6ZM11 1H7v4h4z" />
                    <path d="M8 8h2v2H8z" />
                    <path d="M12 6v6H6V6h6ZM11 7H7v4h4z" />
                  </svg>
                  Trạng thái
                </label>
                <div className={styles.selectWrapper}>
                  <select className={styles.filterSelect}>
                    <option value="">Tất cả trạng thái</option>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="processing">Đang chuẩn bị</option>
                    <option value="shipping">Đang giao hàng</option>
                    <option value="completed">Đã hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                  <span className={styles.selectArrow}></span>
                </div>
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
                  </svg>
                  Phương thức thanh toán
                </label>
                <div className={styles.selectWrapper}>
                  <select className={styles.filterSelect}>
                    <option value="">Tất cả phương thức</option>
                    <option value="cash">Tiền mặt</option>
                    <option value="card">Thẻ tín dụng</option>
                    <option value="momo">Ví MoMo</option>
                    <option value="banking">Chuyển khoản</option>
                  </select>
                  <span className={styles.selectArrow}></span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ordersCard}>
            <div className={styles.ordersHeader}>
              <div className={styles.ordersTitle}>
                Danh sách đơn hàng{" "}
                <span className={styles.ordersCount}>156</span>
              </div>
              <div className={styles.ordersActions}>
                <button className={styles.tableActionBtn}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                    <path
                      fillRule="evenodd"
                      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                    />
                  </svg>
                  <span>Làm mới</span>
                </button>
                <button className={styles.tableActionBtn}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                  </svg>
                  <span>Cài đặt hiển thị</span>
                </button>
              </div>
            </div>
            <div className={styles.ordersTableContainer}>
              <table className={styles.ordersTable}>
                <thead>
                  <tr>
                    <th className={styles.checkboxCell}>
                      <label className={styles.checkbox}>
                        <input
                          type="checkbox"
                          id="select-all"
                          checked={selectAllChecked}
                          onChange={handleSelectAllChange}
                        />
                        <span className={styles.checkmark}></span>
                      </label>
                    </th>
                    <th>Mã đơn hàng</th>
                    <th>Khách hàng</th>
                    <th>Thời gian đặt</th>
                    <th>Tổng tiền</th>
                    <th>Thanh toán</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.checkboxCell}>
                      <label className={styles.checkbox}>
                        <input type="checkbox" />
                        <span className={styles.checkmark}></span>
                      </label>
                    </td>
                    <td className={styles.orderId}>#ORD-7829</td>
                    <td>
                      <div className={styles.customerCell}>
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="Customer"
                          className={styles.customerAvatar}
                        />
                        <span>
                          Trần Văn Nam
                          <br />
                          <small>0912345678</small>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.orderDate}>24/10/2025</span>
                      <span className={styles.orderTime}>14:35</span>
                    </td>
                    <td className={styles.orderPrice}>235.000 ₫</td>
                    <td>Tiền mặt</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusPending}`}
                      >
                        <span className={styles.statusDot}></span>
                        Chờ xác nhận
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.checkboxCell}>
                      <label className={styles.checkbox}>
                        <input type="checkbox" />
                        <span className={styles.checkmark}></span>
                      </label>
                    </td>
                    <td className={styles.orderId}>#ORD-7828</td>
                    <td>
                      <div className={styles.customerCell}>
                        <img
                          src="https://randomuser.me/api/portraits/women/42.jpg"
                          alt="Customer"
                          className={styles.customerAvatar}
                        />
                        <span>
                          Nguyễn Thị Hương
                          <br />
                          <small>0987654321</small>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.orderDate}>24/10/2025</span>
                      <span className={styles.orderTime}>13:42</span>
                    </td>
                    <td className={styles.orderPrice}>178.000 ₫</td>
                    <td>Ví MoMo</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusShipping}`}
                      >
                        <span className={styles.statusDot}></span>
                        Đang giao hàng
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.checkboxCell}>
                      <label className={styles.checkbox}>
                        <input type="checkbox" />
                        <span className={styles.checkmark}></span>
                      </label>
                    </td>
                    <td className={styles.orderId}>#ORD-7827</td>
                    <td>
                      <div className={styles.customerCell}>
                        <img
                          src="https://randomuser.me/api/portraits/women/68.jpg"
                          alt="Customer"
                          className={styles.customerAvatar}
                        />
                        <span>
                          Lê Thị Mai
                          <br />
                          <small>0936789012</small>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.orderDate}>24/10/2025</span>
                      <span className={styles.orderTime}>12:18</span>
                    </td>
                    <td className={styles.orderPrice}>325.000 ₫</td>
                    <td>Chuyển khoản</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusCompleted}`}
                      >
                        <span className={styles.statusDot}></span>
                        Đã hoàn thành
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.checkboxCell}>
                      <label className={styles.checkbox}>
                        <input type="checkbox" />
                        <span className={styles.checkmark}></span>
                      </label>
                    </td>
                    <td className={styles.orderId}>#ORD-7826</td>
                    <td>
                      <div className={styles.customerCell}>
                        <img
                          src="https://randomuser.me/api/portraits/men/71.jpg"
                          alt="Customer"
                          className={styles.customerAvatar}
                        />
                        <span>
                          Phạm Minh Tuấn
                          <br />
                          <small>0967890123</small>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.orderDate}>24/10/2025</span>
                      <span className={styles.orderTime}>11:05</span>
                    </td>
                    <td className={styles.orderPrice}>145.000 ₫</td>
                    <td>Thẻ tín dụng</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusCancelled}`}
                      >
                        <span className={styles.statusDot}></span>
                        Đã hủy
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.checkboxCell}>
                      <label className={styles.checkbox}>
                        <input type="checkbox" />
                        <span className={styles.checkmark}></span>
                      </label>
                    </td>
                    <td className={styles.orderId}>#ORD-7825</td>
                    <td>
                      <div className={styles.customerCell}>
                        <img
                          src="https://randomuser.me/api/portraits/men/55.jpg"
                          alt="Customer"
                          className={styles.customerAvatar}
                        />
                        <span>
                          Đặng Quốc Bảo
                          <br />
                          <small>0905678901</small>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.orderDate}>24/10/2025</span>
                      <span className={styles.orderTime}>10:22</span>
                    </td>
                    <td className={styles.orderPrice}>285.000 ₫</td>
                    <td>Tiền mặt</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusCompleted}`}
                      >
                        <span className={styles.statusDot}></span>
                        Đã hoàn thành
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.checkboxCell}>
                      <label className={styles.checkbox}>
                        <input type="checkbox" />
                        <span className={styles.checkmark}></span>
                      </label>
                    </td>
                    <td className={styles.orderId}>#ORD-7824</td>
                    <td>
                      <div className={styles.customerCell}>
                        <img
                          src="https://randomuser.me/api/portraits/women/33.jpg"
                          alt="Customer"
                          className={styles.customerAvatar}
                        />
                        <span>
                          Ngô Thị Ánh
                          <br />
                          <small>0918765432</small>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.orderDate}>23/10/2025</span>
                      <span className={styles.orderTime}>18:55</span>
                    </td>
                    <td className={styles.orderPrice}>195.000 ₫</td>
                    <td>Ví MoMo</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusProcessing}`}
                      >
                        <span className={styles.statusDot}></span>
                        Đang chuẩn bị
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.checkboxCell}>
                      <label className={styles.checkbox}>
                        <input type="checkbox" />
                        <span className={styles.checkmark}></span>
                      </label>
                    </td>
                    <td className={styles.orderId}>#ORD-7823</td>
                    <td>
                      <div className={styles.customerCell}>
                        <img
                          src="https://randomuser.me/api/portraits/men/22.jpg"
                          alt="Customer"
                          className={styles.customerAvatar}
                        />
                        <span>
                          Hoàng Minh Quân
                          <br />
                          <small>0956789012</small>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.orderDate}>23/10/2025</span>
                      <span className={styles.orderTime}>16:30</span>
                    </td>
                    <td className={styles.orderPrice}>340.000 ₫</td>
                    <td>Chuyển khoản</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusProcessing}`}
                      >
                        <span className={styles.statusDot}></span>
                        Đang chuẩn bị
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                        Sửa
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              Hiển thị 1-10 trên tổng số 156 đơn hàng
            </div>
            <div className={styles.paginationPages}>
              <div className={`${styles.pageItem} ${styles.disabled}`}>
                <span className={styles.pageLink}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                    />
                  </svg>
                </span>
              </div>
              <div className={`${styles.pageItem} ${styles.active}`}>
                <span className={styles.pageLink}>1</span>
              </div>
              <div className={styles.pageItem}>
                <a href="#" className={styles.pageLink}>
                  2
                </a>
              </div>
              <div className={styles.pageItem}>
                <a href="#" className={styles.pageLink}>
                  3
                </a>
              </div>
              <div className={styles.pageItem}>
                <a href="#" className={styles.pageLink}>
                  4
                </a>
              </div>
              <div className={styles.pageItem}>
                <a href="#" className={styles.pageLink}>
                  5
                </a>
              </div>
              <div className={styles.pageItem}>
                <a href="#" className={styles.pageLink}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.modalOverlay} ${
            showOrderModal ? styles.active : ""
          }`}
          id="orderDetailModal"
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Chi tiết đơn hàng #ORD-7829</h2>
              <button className={styles.modalClose} onClick={toggleOrderModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Thông tin đơn hàng</h3>
                <div className={styles.orderDetails}>
                  <div className={styles.detailCard}>
                    <h4 className={styles.detailTitle}>Thông tin cơ bản</h4>
                    <ul className={styles.detailList}>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>Mã đơn hàng:</span>
                        <span className={styles.detailValue}>#ORD-7829</span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>Ngày đặt:</span>
                        <span className={styles.detailValue}>
                          24/10/2025 14:35
                        </span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>Trạng thái:</span>
                        <span className={styles.detailValue}>
                          <span
                            className={`${styles.statusBadge} ${styles.statusPending}`}
                          >
                            <span className={styles.statusDot}></span>
                            Chờ xác nhận
                          </span>
                        </span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>Thanh toán:</span>
                        <span className={styles.detailValue}>Tiền mặt</span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>
                          Trạng thái thanh toán:
                        </span>
                        <span className={styles.detailValue}>
                          Chưa thanh toán
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.detailCard}>
                    <h4 className={styles.detailTitle}>Thông tin khách hàng</h4>
                    <ul className={styles.detailList}>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>
                          Tên khách hàng:
                        </span>
                        <span className={styles.detailValue}>Trần Văn Nam</span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>
                          Số điện thoại:
                        </span>
                        <span className={styles.detailValue}>0912345678</span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>Email:</span>
                        <span className={styles.detailValue}>
                          nam.tran@gmail.com
                        </span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>
                          Địa chỉ giao hàng:
                        </span>
                        <span className={styles.detailValue}>
                          123 Nguyễn Văn Linh, P. Tân Phong, Q.7, TP. HCM
                        </span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>Ghi chú:</span>
                        <span className={styles.detailValue}>
                          Giao hàng giờ hành chính
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Order Products */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Sản phẩm trong đơn hàng</h3>
                <table className={styles.productTable}>
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Đơn giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className={styles.productInfo}>
                          <img
                            src="https://via.placeholder.com/50"
                            alt="Burger Bò Đặc Biệt"
                            className={styles.productImg}
                          />
                          <div>
                            <div className={styles.productName}>
                              Burger Bò Đặc Biệt
                            </div>
                            <div className={styles.productCategory}>Burger</div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.orderPrice}>85.000 ₫</td>
                      <td>2</td>
                      <td className={styles.orderPrice}>170.000 ₫</td>
                    </tr>
                    <tr>
                      <td>
                        <div className={styles.productInfo}>
                          <img
                            src="https://via.placeholder.com/50"
                            alt="Khoai tây chiên size L"
                            className={styles.productImg}
                          />
                          <div>
                            <div className={styles.productName}>
                              Khoai tây chiên size L
                            </div>
                            <div className={styles.productCategory}>
                              Món phụ
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.orderPrice}>35.000 ₫</td>
                      <td>1</td>
                      <td className={styles.orderPrice}>35.000 ₫</td>
                    </tr>
                    <tr>
                      <td>
                        <div className={styles.productInfo}>
                          <img
                            src="https://via.placeholder.com/50"
                            alt="Coca-Cola 330ml"
                            className={styles.productImg}
                          />
                          <div>
                            <div className={styles.productName}>
                              Coca-Cola 330ml
                            </div>
                            <div className={styles.productCategory}>
                              Đồ uống
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.orderPrice}>15.000 ₫</td>
                      <td>2</td>
                      <td className={styles.orderPrice}>30.000 ₫</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan="3"
                        style={{ textAlign: "right", fontWeight: 500 }}
                      >
                        Tạm tính:
                      </td>
                      <td className={styles.orderPrice}>235.000 ₫</td>
                    </tr>
                    <tr>
                      <td
                        colSpan="3"
                        style={{ textAlign: "right", fontWeight: 500 }}
                      >
                        Phí vận chuyển:
                      </td>
                      <td className={styles.orderPrice}>15.000 ₫</td>
                    </tr>
                    <tr>
                      <td
                        colSpan="3"
                        style={{ textAlign: "right", fontWeight: 500 }}
                      >
                        Giảm giá:
                      </td>
                      <td className={styles.discountPrice}>-15.000 ₫</td>
                    </tr>
                    <tr className={styles.totalRow}>
                      <td
                        colSpan="3"
                        style={{ textAlign: "right", fontWeight: 600 }}
                      >
                        Tổng cộng:
                      </td>
                      <td className={styles.totalPrice}>235.000 ₫</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Order Timeline */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Lịch sử đơn hàng</h3>
                <div className={styles.timeline}>
                  <div className={styles.timelineItem}>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineTitle}>Đơn hàng mới</div>
                      <div className={styles.timelineText}>
                        Khách hàng đã đặt đơn hàng mới.
                      </div>
                      <div className={styles.timelineTime}>
                        24/10/2025 14:35
                      </div>
                    </div>
                  </div>
                  <div className={styles.timelineItem}>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineTitle}>
                        Xác nhận đơn hàng
                      </div>
                      <div className={styles.timelineText}>
                        Hệ thống đã tự động xác nhận đơn hàng.
                      </div>
                      <div className={styles.timelineTime}>
                        24/10/2025 14:36
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status Update */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>
                  Cập nhật trạng thái đơn hàng
                </h3>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 2h2v2H2z" />
                        <path d="M6 0v6H0V0h6ZM5 1H1v4h4z" />
                        <path d="M2 8h2v2H2z" />
                        <path d="M6 6v6H0V6h6ZM5 7H1v4h4z" />
                        <path d="M8 2h2v2H8z" />
                        <path d="M12 0v6H6V0h6ZM11 1H7v4h4z" />
                        <path d="M8 8h2v2H8z" />
                        <path d="M12 6v6H6V6h6ZM11 7H7v4h4z" />
                      </svg>
                      Trạng thái đơn hàng
                    </label>
                    <div className={styles.selectWrapper}>
                      <select
                        className={styles.formSelect}
                        defaultValue="pending"
                      >
                        <option value="pending">Chờ xác nhận</option>
                        <option value="processing">Đang chuẩn bị</option>
                        <option value="shipping">Đang giao hàng</option>
                        <option value="completed">Đã hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                      <span className={styles.selectArrow}></span>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                        <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
                      </svg>
                      Trạng thái thanh toán
                    </label>
                    <div className={styles.selectWrapper}>
                      <select
                        className={styles.formSelect}
                        defaultValue="unpaid"
                      >
                        <option value="unpaid">Chưa thanh toán</option>
                        <option value="paid">Đã thanh toán</option>
                        <option value="refunded">Đã hoàn tiền</option>
                      </select>
                      <span className={styles.selectArrow}></span>
                    </div>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                      <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                    </svg>
                    Ghi chú cập nhật
                  </label>
                  <textarea
                    className={styles.formTextarea}
                    placeholder="Nhập ghi chú về việc cập nhật trạng thái..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={`${styles.modalBtn} ${styles.btnCancel}`}
                onClick={toggleOrderModal}
              >
                Hủy
              </button>
              <button className={`${styles.modalBtn} ${styles.btnSave}`}>
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
