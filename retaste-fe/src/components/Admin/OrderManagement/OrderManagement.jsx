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

        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbItem}>
            <a href="#">Trang chủ</a>
          </div>
          <div className={styles.breadcrumbDivider}>/</div>
          <div className={styles.breadcrumbCurrent}>Quản lý đơn hàng</div>
        </div>

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Quản lý đơn hàng</h1>
            <button className={styles.btnPrimary}>
              <span className={styles.btnIcon}>Add</span>
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
              Tất cả đơn hàng <span className={styles.count}>156</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeStatusTab === "pending" ? styles.active : ""
              }`}
              onClick={() => handleStatusTabClick("pending")}
            >
              Chờ xác nhận <span className={styles.count}>28</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeStatusTab === "processing" ? styles.active : ""
              }`}
              onClick={() => handleStatusTabClick("processing")}
            >
              Đang chuẩn bị <span className={styles.count}>35</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeStatusTab === "shipping" ? styles.active : ""
              }`}
              onClick={() => handleStatusTabClick("shipping")}
            >
              Đang giao hàng <span className={styles.count}>42</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeStatusTab === "completed" ? styles.active : ""
              }`}
              onClick={() => handleStatusTabClick("completed")}
            >
              Đã hoàn thành <span className={styles.count}>43</span>
            </div>
            <div
              className={`${styles.statusTab} ${
                activeStatusTab === "cancelled" ? styles.active : ""
              }`}
              onClick={() => handleStatusTabClick("cancelled")}
            >
              Đã hủy <span className={styles.count}>8</span>
            </div>
          </div>

          <div className={styles.filterCard}>
            <div className={styles.filterHeader}>
              <h3 className={styles.filterTitle}>Bộ lọc đơn hàng</h3>
              <div className={styles.filterActions}>
                <button className={styles.filterBtn}>Search Tìm kiếm</button>
                <button className={`${styles.filterBtn} ${styles.resetBtn}`}>
                  Refresh Đặt lại
                </button>
                <button className={`${styles.filterBtn} ${styles.exportBtn}`}>
                  Download Xuất Excel
                </button>
              </div>
            </div>
            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Từ ngày</label>
                <input
                  type="date"
                  className={styles.filterInput}
                  defaultValue="2025-10-01"
                />
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Đến ngày</label>
                <input
                  type="date"
                  className={styles.filterInput}
                  defaultValue="2025-10-24"
                />
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Mã đơn hàng</label>
                <input
                  type="text"
                  className={styles.filterInput}
                  placeholder="Nhập mã đơn hàng..."
                />
              </div>
            </div>
            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Khách hàng</label>
                <input
                  type="text"
                  className={styles.filterInput}
                  placeholder="Tên hoặc số điện thoại..."
                />
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Trạng thái</label>
                <select className={styles.filterSelect}>
                  <option value="">Tất cả trạng thái</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="processing">Đang chuẩn bị</option>
                  <option value="shipping">Đang giao hàng</option>
                  <option value="completed">Đã hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  Phương thức thanh toán
                </label>
                <select className={styles.filterSelect}>
                  <option value="">Tất cả phương thức</option>
                  <option value="cash">Tiền mặt</option>
                  <option value="card">Thẻ tín dụng</option>
                  <option value="momo">Ví MoMo</option>
                  <option value="banking">Chuyển khoản</option>
                </select>
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
                  Refresh Làm mới
                </button>
                <button className={styles.tableActionBtn}>
                  Settings Cài đặt hiển thị
                </button>
              </div>
            </div>
            <div className={styles.ordersTableContainer}>
              <table className={styles.ordersTable}>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        id="select-all"
                        checked={selectAllChecked}
                        onChange={handleSelectAllChange}
                      />
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
                    <td>
                      <input type="checkbox" />
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
                      24/10/2025
                      <span className={styles.orderTime}>14:35</span>
                    </td>
                    <td>235.000 ₫</td>
                    <td>Tiền mặt</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusPending}`}
                      >
                        Chờ xác nhận
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
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
                      24/10/2025
                      <span className={styles.orderTime}>13:42</span>
                    </td>
                    <td>178.000 ₫</td>
                    <td>Ví MoMo</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusShipping}`}
                      >
                        Đang giao hàng
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
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
                      24/10/2025
                      <span className={styles.orderTime}>12:18</span>
                    </td>
                    <td>325.000 ₫</td>
                    <td>Chuyển khoản</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusCompleted}`}
                      >
                        Đã hoàn thành
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
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
                      24/10/2025
                      <span className={styles.orderTime}>11:05</span>
                    </td>
                    <td>145.000 ₫</td>
                    <td>Thẻ tín dụng</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusCancelled}`}
                      >
                        Đã hủy
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
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
                      24/10/2025
                      <span className={styles.orderTime}>10:22</span>
                    </td>
                    <td>285.000 ₫</td>
                    <td>Tiền mặt</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusCompleted}`}
                      >
                        Đã hoàn thành
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
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
                      23/10/2025
                      <span className={styles.orderTime}>18:55</span>
                    </td>
                    <td>195.000 ₫</td>
                    <td>Ví MoMo</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusProcessing}`}
                      >
                        Đang chuẩn bị
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
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
                      23/10/2025
                      <span className={styles.orderTime}>16:30</span>
                    </td>
                    <td>340.000 ₫</td>
                    <td>Chuyển khoản</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusProcessing}`}
                      >
                        Đang chuẩn bị
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        className={`${styles.tableAction} ${styles.viewBtn}`}
                        onClick={toggleOrderModal}
                      >
                        Xem
                      </button>
                      <button
                        className={`${styles.tableAction} ${styles.editBtn}`}
                      >
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
                <span className={styles.pageLink}>Previous</span>
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
                  Next
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
                Close
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
                      <td>85.000 ₫</td>
                      <td>2</td>
                      <td>170.000 ₫</td>
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
                      <td>35.000 ₫</td>
                      <td>1</td>
                      <td>35.000 ₫</td>
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
                      <td>15.000 ₫</td>
                      <td>2</td>
                      <td>30.000 ₫</td>
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
                      <td>235.000 ₫</td>
                    </tr>
                    <tr>
                      <td
                        colSpan="3"
                        style={{ textAlign: "right", fontWeight: 500 }}
                      >
                        Phí vận chuyển:
                      </td>
                      <td>15.000 ₫</td>
                    </tr>
                    <tr>
                      <td
                        colSpan="3"
                        style={{ textAlign: "right", fontWeight: 500 }}
                      >
                        Giảm giá:
                      </td>
                      <td>-15.000 ₫</td>
                    </tr>
                    <tr>
                      <td
                        colSpan="3"
                        style={{ textAlign: "right", fontWeight: 600 }}
                      >
                        Tổng cộng:
                      </td>
                      <td style={{ fontWeight: 600, color: "var(--primary)" }}>
                        235.000 ₫
                      </td>
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
                      Trạng thái đơn hàng
                    </label>
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
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Trạng thái thanh toán
                    </label>
                    <select className={styles.formSelect} defaultValue="unpaid">
                      <option value="unpaid">Chưa thanh toán</option>
                      <option value="paid">Đã thanh toán</option>
                      <option value="refunded">Đã hoàn tiền</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Ghi chú cập nhật</label>
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
