import React from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>Bảng điều khiển</div>
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
          <div className={styles.breadcrumbItem}>
            <a href="#">Trang chủ</a>
          </div>
          <div className={styles.breadcrumbDivider}>/</div>
          <div className={styles.breadcrumbCurrent}>Bảng điều khiển</div>
        </div>

        <div className={styles.content}>
          <div className={styles.dashboardHeader}>
            <h1 className={styles.dashboardTitle}>Bảng điều khiển</h1>
            <div className={styles.dateRange}>
              <span className={styles.dateRangeIcon}>📅</span>
              <span>01/10/2025 - 24/10/2025</span>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.iconRevenue}`}>
                💰
              </div>
              <div className={styles.statInfo}>
                <h3>35,2 triệu</h3>
                <p>Doanh thu</p>
                <div className={styles.statPercentage}>
                  <span className={styles.percentageUp}>↗ 12.5%</span>
                  <span>so với tháng trước</span>
                </div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.iconOrders}`}>
                📦
              </div>
              <div className={styles.statInfo}>
                <h3>1,258</h3>
                <p>Đơn hàng</p>
                <div className={styles.statPercentage}>
                  <span className={styles.percentageUp}>↗ 8.2%</span>
                  <span>so với tháng trước</span>
                </div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.iconCustomers}`}>
                👥
              </div>
              <div className={styles.statInfo}>
                <h3>523</h3>
                <p>Khách hàng mới</p>
                <div className={styles.statPercentage}>
                  <span className={styles.percentageUp}>↗ 15.7%</span>
                  <span>so với tháng trước</span>
                </div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.iconDelivery}`}>
                🚚
              </div>
              <div className={styles.statInfo}>
                <h3>95.8%</h3>
                <p>Tỷ lệ giao hàng đúng hẹn</p>
                <div className={styles.statPercentage}>
                  <span className={styles.percentageDown}>↘ 2.1%</span>
                  <span>so với tháng trước</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className={styles.chartsRow}>
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Doanh thu theo thời gian</h3>
                <div className={styles.chartOptions}>
                  <button className={styles.chartOption}>Ngày</button>
                  <button className={`${styles.chartOption} ${styles.active}`}>
                    Tuần
                  </button>
                  <button className={styles.chartOption}>Tháng</button>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <div className={styles.chartPlaceholder}>
                  [Biểu đồ đường thể hiện doanh thu theo thời gian]
                </div>
              </div>
            </div>
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Danh mục bán chạy</h3>
                <div className={styles.chartOptions}>
                  <button className={styles.chartOption}>Tuần</button>
                  <button className={`${styles.chartOption} ${styles.active}`}>
                    Tháng
                  </button>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <div className={styles.chartPlaceholder}>
                  [Biểu đồ tròn thể hiện các danh mục bán chạy]
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className={styles.ordersCard}>
            <div className={styles.ordersHeader}>
              <h3 className={styles.ordersTitle}>Đơn hàng gần đây</h3>
              <div className={styles.ordersFilter}>
                <select className={styles.filterSelect}>
                  <option>Tất cả đơn hàng</option>
                  <option>Đã hoàn thành</option>
                  <option>Đang xử lý</option>
                  <option>Đang giao hàng</option>
                  <option>Đã hủy</option>
                </select>
                <a href="#" className={styles.viewAllBtn}>
                  Xem tất cả
                </a>
              </div>
            </div>
            <div className={styles.ordersTableContainer}>
              <table className={styles.ordersTable}>
                <thead>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Khách hàng</th>
                    <th>Ngày đặt</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.orderId}>#ORD-7829</td>
                    <td>
                      <div className={styles.customerCell}>
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="Customer"
                          className={styles.customerAvatar}
                        />
                        <span>Trần Văn Nam</span>
                      </div>
                    </td>
                    <td>24/10/2025 14:35</td>
                    <td>235.000 ₫</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusPending}`}
                      >
                        Đang xử lý
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button>👁️</button>
                      <button>✏️</button>
                      <button>📋</button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.orderId}>#ORD-7828</td>
                    <td>
                      <div className={styles.customerCell}>
                        <img
                          src="https://randomuser.me/api/portraits/women/42.jpg"
                          alt="Customer"
                          className={styles.customerAvatar}
                        />
                        <span>Nguyễn Thị Hương</span>
                      </div>
                    </td>
                    <td>24/10/2025 13:42</td>
                    <td>178.000 ₫</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusProcessing}`}
                      >
                        Đang giao hàng
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button>👁️</button>
                      <button>✏️</button>
                      <button>📋</button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.orderId}>#ORD-7827</td>
                    <td>
                      <div className={styles.customerCell}>
                        <img
                          src="https://randomuser.me/api/portraits/women/68.jpg"
                          alt="Customer"
                          className={styles.customerAvatar}
                        />
                        <span>Lê Thị Mai</span>
                      </div>
                    </td>
                    <td>24/10/2025 12:18</td>
                    <td>325.000 ₫</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusCompleted}`}
                      >
                        Đã hoàn thành
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button>👁️</button>
                      <button>✏️</button>
                      <button>📋</button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.orderId}>#ORD-7826</td>
                    <td>
                      <div className={styles.customerCell}>
                        <img
                          src="https://randomuser.me/api/portraits/men/71.jpg"
                          alt="Customer"
                          className={styles.customerAvatar}
                        />
                        <span>Phạm Minh Tuấn</span>
                      </div>
                    </td>
                    <td>24/10/2025 11:05</td>
                    <td>145.000 ₫</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusCancelled}`}
                      >
                        Đã hủy
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button>👁️</button>
                      <button>✏️</button>
                      <button>📋</button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.orderId}>#ORD-7825</td>
                    <td>
                      <div className={styles.customerCell}>
                        <img
                          src="https://randomuser.me/api/portraits/men/55.jpg"
                          alt="Customer"
                          className={styles.customerAvatar}
                        />
                        <span>Đặng Quốc Bảo</span>
                      </div>
                    </td>
                    <td>24/10/2025 10:22</td>
                    <td>285.000 ₫</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles.statusCompleted}`}
                      >
                        Đã hoàn thành
                      </span>
                    </td>
                    <td className={styles.actionCell}>
                      <button>👁️</button>
                      <button>✏️</button>
                      <button>📋</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.twoColumnGrid}>
            <div className={styles.employeesCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Nhân viên đang làm việc</h3>
                <a href="#" className={styles.viewAllBtn}>
                  Xem tất cả
                </a>
              </div>
              <ul className={styles.employeesList}>
                <li className={styles.employeeItem}>
                  <div
                    className={`${styles.employeeStatus} ${styles.statusActive}`}
                  ></div>
                  <img
                    src="https://randomuser.me/api/portraits/women/22.jpg"
                    alt="Employee"
                    className={styles.employeeAvatar}
                  />
                  <div className={styles.employeeInfo}>
                    <div className={styles.employeeName}>Lê Thị Hoa</div>
                    <div className={styles.employeePosition}>
                      Nhân viên bán hàng
                    </div>
                  </div>
                </li>
                <li className={styles.employeeItem}>
                  <div
                    className={`${styles.employeeStatus} ${styles.statusActive}`}
                  ></div>
                  <img
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt="Employee"
                    className={styles.employeeAvatar}
                  />
                  <div className={styles.employeeInfo}>
                    <div className={styles.employeeName}>Nguyễn Văn Thành</div>
                    <div className={styles.employeePosition}>Đầu bếp</div>
                  </div>
                </li>
                <li className={styles.employeeItem}>
                  <div
                    className={`${styles.employeeStatus} ${styles.statusBreak}`}
                  ></div>
                  <img
                    src="https://randomuser.me/api/portraits/women/42.jpg"
                    alt="Employee"
                    className={styles.employeeAvatar}
                  />
                  <div className={styles.employeeInfo}>
                    <div className={styles.employeeName}>Trần Thị Minh</div>
                    <div className={styles.employeePosition}>Giao hàng</div>
                  </div>
                </li>
                <li className={styles.employeeItem}>
                  <div
                    className={`${styles.employeeStatus} ${styles.statusActive}`}
                  ></div>
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Employee"
                    className={styles.employeeAvatar}
                  />
                  <div className={styles.employeeInfo}>
                    <div className={styles.employeeName}>Hoàng Đức Anh</div>
                    <div className={styles.employeePosition}>
                      Quản lý nhà bếp
                    </div>
                  </div>
                </li>
                <li className={styles.employeeItem}>
                  <div
                    className={`${styles.employeeStatus} ${styles.statusOffline}`}
                  ></div>
                  <img
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt="Employee"
                    className={styles.employeeAvatar}
                  />
                  <div className={styles.employeeInfo}>
                    <div className={styles.employeeName}>Vũ Thị Lan</div>
                    <div className={styles.employeePosition}>Kế toán</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.activityCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Hoạt động gần đây</h3>
              </div>
              <ul className={styles.activityList}>
                <li className={styles.activityItem}>
                  <div className={`${styles.activityIcon} ${styles.iconOrder}`}>
                    📦
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityMessage}>
                      <strong>Đơn hàng mới</strong> #ORD-7829 từ
                      <strong>Trần Văn Nam</strong>
                    </div>
                    <div className={styles.activityTime}>5 phút trước</div>
                  </div>
                </li>
                <li className={styles.activityItem}>
                  <div
                    className={`${styles.activityIcon} ${styles.iconDelivery}`}
                  >
                    🚚
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityMessage}>
                      <strong>Đơn hàng #ORD-7825</strong> đã được giao thành
                      công
                    </div>
                    <div className={styles.activityTime}>32 phút trước</div>
                  </div>
                </li>
                <li className={styles.activityItem}>
                  <div className={`${styles.activityIcon} ${styles.iconUser}`}>
                    👥
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityMessage}>
                      <strong>Hoàng Đức Anh</strong> đã bắt đầu ca làm việc
                    </div>
                    <div className={styles.activityTime}>1 giờ trước</div>
                  </div>
                </li>
                <li className={styles.activityItem}>
                  <div
                    className={`${styles.activityIcon} ${styles.iconSystem}`}
                  >
                    ⚙️
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityMessage}>
                      <strong>Hệ thống</strong> đã cập nhật danh sách khuyến mãi
                    </div>
                    <div className={styles.activityTime}>2 giờ trước</div>
                  </div>
                </li>
                <li className={styles.activityItem}>
                  <div className={`${styles.activityIcon} ${styles.iconOrder}`}>
                    📦
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityMessage}>
                      <strong>Đơn hàng #ORD-7820</strong> đã bị hủy bởi khách
                      hàng
                    </div>
                    <div className={styles.activityTime}>3 giờ trước</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
