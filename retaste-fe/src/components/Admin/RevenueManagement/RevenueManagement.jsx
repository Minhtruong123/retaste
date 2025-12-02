import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import styles from "./RevenueManagement.module.css";

export default function RevenueManagement() {
  const [activePeriod, setActivePeriod] = useState("week");
  const [activeCategoryPeriod, setActiveCategoryPeriod] = useState("month");

  const revenueTimeData = [
    { name: "T2", value: 28.5, previous: 25.3 },
    { name: "T3", value: 32.1, previous: 28.7 },
    { name: "T4", value: 35.8, previous: 31.2 },
    { name: "T5", value: 38.2, previous: 34.5 },
    { name: "T6", value: 42.3, previous: 38.9 },
    { name: "T7", value: 39.1, previous: 35.4 },
    { name: "CN", value: 35.2, previous: 32.8 },
  ];

  const categoryData = [
    { name: "Món chính", value: 36, color: "#ff6b35" },
    { name: "Đồ uống", value: 25, color: "#2a9d8f" },
    { name: "Món khai vị", value: 16, color: "#f4a261" },
    { name: "Tráng miệng", value: 12, color: "#e76f51" },
    { name: "Combo", value: 11, color: "#264653" },
  ];

  const branchData = [
    { name: "Quận 1", value: 14.46 },
    { name: "Quận 3", value: 11.25 },
    { name: "Quận 7", value: 5.95 },
    { name: "Thủ Đức", value: 3.59 },
  ];

  const COLORS = ["#ff6b35", "#2a9d8f", "#f4a261", "#e76f51", "#264653"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name || "Doanh thu"}: {entry.value.toLocaleString()} triệu
              ₫
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p>
            {payload[0].name}: {payload[0].value}% (
            {payload[0].payload.value.toFixed(1)} triệu ₫)
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>Quản lý doanh thu</div>
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

        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbItem}>
            <a href="#">Trang chủ</a>
          </div>
          <div className={styles.breadcrumbDivider}>/</div>
          <div className={styles.breadcrumbCurrent}>Quản lý doanh thu</div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Báo cáo doanh thu</h1>
            <div className={styles.dateRange}>
              <span className={styles.dateRangeIcon}>📅</span>
              <span>01/10/2025 - 24/10/2025</span>
            </div>
          </div>

          {/* Filter Section */}
          <div className={styles.filterRow}>
            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>Từ ngày:</label>
              <input
                type="date"
                className={styles.filterInput}
                value="2025-10-01"
              />
            </div>
            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>Đến ngày:</label>
              <input
                type="date"
                className={styles.filterInput}
                value="2025-10-24"
              />
            </div>
            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>Chi nhánh:</label>
              <select className={styles.filterInput}>
                <option value="">Tất cả chi nhánh</option>
                <option value="1">Chi nhánh Quận 1</option>
                <option value="2">Chi nhánh Quận 3</option>
                <option value="3">Chi nhánh Quận 7</option>
                <option value="4">Chi nhánh Thủ Đức</option>
              </select>
            </div>
            <button className={styles.filterBtn}>
              <i>🔍</i> Lọc kết quả
            </button>
            <button className={`${styles.filterBtn} ${styles.resetBtn}`}>
              <i>↻</i> Đặt lại
            </button>
            {/* <button className={`${styles.filterBtn} ${styles.exportBtn}`}>
              <i>📥</i> Xuất báo cáo
            </button> */}
          </div>

          <div className={styles.summaryCards}>
            <div className={`${styles.summaryCard} ${styles.primary}`}>
              <h3>Tổng doanh thu</h3>
              <div className={styles.summaryValue}>35.2 triệu ₫</div>
              <div className={styles.summaryCompare}>
                <span className={styles.percentageUp}>Up 12.5%</span> so với
                tháng trước
              </div>
            </div>
            <div className={`${styles.summaryCard} ${styles.success}`}>
              <h3>Lợi nhuận ròng</h3>
              <div className={styles.summaryValue}>12.8 triệu ₫</div>
              <div className={styles.summaryCompare}>
                <span className={styles.percentageUp}>Up 8.2%</span> so với
                tháng trước
              </div>
            </div>
            <div className={`${styles.summaryCard} ${styles.info}`}>
              <h3>Số đơn hàng</h3>
              <div className={styles.summaryValue}>1,258</div>
              <div className={styles.summaryCompare}>
                <span className={styles.percentageUp}>Up 15.7%</span> so với
                tháng trước
              </div>
            </div>
            <div className={`${styles.summaryCard} ${styles.warning}`}>
              <h3>Giá trị trung bình</h3>
              <div className={styles.summaryValue}>279.800 ₫</div>
              <div className={styles.summaryCompare}>
                <span className={styles.percentageDown}>Down 2.1%</span> so với
                tháng trước
              </div>
            </div>
          </div>

          {/* 1. Biểu đồ chính - Doanh thu theo thời gian */}
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Biểu đồ doanh thu</h3>
              <div className={styles.chartOptions}>
                <button className={styles.chartOption}>Ngày</button>
                <button className={`${styles.chartOption} ${styles.active}`}>
                  Tuần
                </button>
                <button className={styles.chartOption}>Tháng</button>
                <button className={styles.chartOption}>Quý</button>
              </div>
            </div>
            <div style={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTimeData}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 13 }} />
                  <YAxis tickFormatter={(v) => `${v}M`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    name="Tuần trước"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#ff6b35"
                    strokeWidth={3}
                    name="Tuần này"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Hai biểu đồ ngang */}
          <div className={styles.chartsRow}>
            {/* Biểu đồ tròn - Danh mục */}
            <div className={styles.chartContainer}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Doanh thu theo danh mục</h3>
                <div className={styles.chartOptions}>
                  <button className={styles.chartOption}>Tuần</button>
                  <button className={`${styles.chartOption} ${styles.active}`}>
                    Tháng
                  </button>
                </div>
              </div>
              <div style={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieCustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 15,
                  }}
                >
                  {categoryData.map((item) => (
                    <div
                      key={item.name}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          backgroundColor: item.color,
                          borderRadius: "50%",
                        }}
                      ></div>
                      <span style={{ fontSize: 14 }}>
                        {item.name} ({item.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Biểu đồ cột - Chi nhánh */}
            <div className={styles.chartContainer}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Doanh thu theo chi nhánh</h3>
                <div className={styles.chartOptions}>
                  <button className={styles.chartOption}>Tuần</button>
                  <button className={`${styles.chartOption} ${styles.active}`}>
                    Tháng
                  </button>
                </div>
              </div>
              <div style={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branchData}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 13 }} />
                    <YAxis tickFormatter={(v) => `${v}M`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#2a9d8f" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Revenue by Day Table */}
          <div className={styles.revenueTableContainer}>
            <div className={styles.tableHeader}>
              <h3 className={styles.tableTitle}>Doanh thu theo ngày</h3>
              <div className={styles.tableActions}>
                <button
                  className={`${styles.tableActionBtn} ${styles.secondary}`}
                >
                  <i>🔍</i> Lọc
                </button>
                <button
                  className={`${styles.tableActionBtn} ${styles.primary}`}
                >
                  <i>📥</i> Xuất Excel
                </button>
              </div>
            </div>
            <div className={styles.tableScroll}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Ngày</th>
                    <th>Số đơn</th>
                    <th>Tổng doanh thu</th>
                    <th>Phí giao hàng</th>
                    <th>Khuyến mãi</th>
                    <th>Thuế</th>
                    <th>Doanh thu ròng</th>
                    <th>So với hôm trước</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>24/10/2025</td>
                    <td>57</td>
                    <td>1.520.000 ₫</td>
                    <td>285.000 ₫</td>
                    <td>-175.000 ₫</td>
                    <td>152.000 ₫</td>
                    <td>1.478.000 ₫</td>
                    <td className={styles.statusPositive}>+4.2%</td>
                  </tr>
                  <tr>
                    <td>23/10/2025</td>
                    <td>62</td>
                    <td>1.625.000 ₫</td>
                    <td>310.000 ₫</td>
                    <td>-195.000 ₫</td>
                    <td>162.500 ₫</td>
                    <td>1.418.500 ₫</td>
                    <td className={styles.statusNegative}>-2.8%</td>
                  </tr>
                  <tr>
                    <td>22/10/2025</td>
                    <td>59</td>
                    <td>1.580.000 ₫</td>
                    <td>295.000 ₫</td>
                    <td>-185.000 ₫</td>
                    <td>158.000 ₫</td>
                    <td>1.459.000 ₫</td>
                    <td className={styles.statusPositive}>+5.1%</td>
                  </tr>
                  <tr>
                    <td>21/10/2025</td>
                    <td>51</td>
                    <td>1.420.000 ₫</td>
                    <td>255.000 ₫</td>
                    <td>-165.000 ₫</td>
                    <td>142.000 ₫</td>
                    <td>1.388.000 ₫</td>
                    <td className={styles.statusNegative}>-3.5%</td>
                  </tr>
                  <tr>
                    <td>20/10/2025</td>
                    <td>65</td>
                    <td>1.750.000 ₫</td>
                    <td>325.000 ₫</td>
                    <td>-210.000 ₫</td>
                    <td>175.000 ₫</td>
                    <td>1.438.000 ₫</td>
                    <td className={styles.statusPositive}>+8.3%</td>
                  </tr>
                  <tr>
                    <td>19/10/2025</td>
                    <td>48</td>
                    <td>1.350.000 ₫</td>
                    <td>240.000 ₫</td>
                    <td>-150.000 ₫</td>
                    <td>135.000 ₫</td>
                    <td>1.328.000 ₫</td>
                    <td className={styles.statusNegative}>-1.9%</td>
                  </tr>
                  <tr>
                    <td>18/10/2025</td>
                    <td>53</td>
                    <td>1.480.000 ₫</td>
                    <td>265.000 ₫</td>
                    <td>-170.000 ₫</td>
                    <td>148.000 ₫</td>
                    <td>1.353.000 ₫</td>
                    <td className={styles.statusPositive}>+2.7%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className={styles.pagination}>
              <div className={`${styles.pageItem} ${styles.disabled}`}>
                <a href="#" className={styles.pageLink}>
                  ⟨
                </a>
              </div>
              <div className={`${styles.pageItem} ${styles.active}`}>
                <a href="#" className={styles.pageLink}>
                  1
                </a>
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
                  ⟩
                </a>
              </div>
            </div>
          </div>

          {/* Revenue by Product Category Table */}
          <div className={styles.revenueTableContainer}>
            <div className={styles.tableHeader}>
              <h3 className={styles.tableTitle}>
                Doanh thu theo danh mục sản phẩm
              </h3>
              <div className={styles.tableActions}>
                <button
                  className={`${styles.tableActionBtn} ${styles.secondary}`}
                >
                  <i>🔍</i> Lọc
                </button>
                <button
                  className={`${styles.tableActionBtn} ${styles.primary}`}
                >
                  <i>📥</i> Xuất Excel
                </button>
              </div>
            </div>
            <div className={styles.tableScroll}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Danh mục</th>
                    <th>Số lượng bán</th>
                    <th>Doanh thu</th>
                    <th>Chi phí</th>
                    <th>Lợi nhuận</th>
                    <th>Tỷ suất lợi nhuận</th>
                    <th>So với tháng trước</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Món chính</td>
                    <td>852</td>
                    <td>12.780.000 ₫</td>
                    <td>7.668.000 ₫</td>
                    <td>5.112.000 ₫</td>
                    <td>40%</td>
                    <td className={styles.statusPositive}>+12.5%</td>
                  </tr>
                  <tr>
                    <td>Món khai vị</td>
                    <td>625</td>
                    <td>5.625.000 ₫</td>
                    <td>3.375.000 ₫</td>
                    <td>2.250.000 ₫</td>
                    <td>40%</td>
                    <td className={styles.statusPositive}>+8.2%</td>
                  </tr>
                  <tr>
                    <td>Tráng miệng</td>
                    <td>438</td>
                    <td>3.285.000 ₫</td>
                    <td>1.971.000 ₫</td>
                    <td>1.314.000 ₫</td>
                    <td>40%</td>
                    <td className={styles.statusPositive}>+5.3%</td>
                  </tr>
                  <tr>
                    <td>Đồ uống</td>
                    <td>1024</td>
                    <td>7.168.000 ₫</td>
                    <td>2.867.200 ₫</td>
                    <td>4.300.800 ₫</td>
                    <td>60%</td>
                    <td className={styles.statusPositive}>+18.9%</td>
                  </tr>
                  <tr>
                    <td>Combo gia đình</td>
                    <td>156</td>
                    <td>4.680.000 ₫</td>
                    <td>3.276.000 ₫</td>
                    <td>1.404.000 ₫</td>
                    <td>30%</td>
                    <td className={styles.statusNegative}>-2.1%</td>
                  </tr>
                  <tr>
                    <td>Món đặc biệt</td>
                    <td>98</td>
                    <td>3.920.000 ₫</td>
                    <td>2.744.000 ₫</td>
                    <td>1.176.000 ₫</td>
                    <td>30%</td>
                    <td className={styles.statusNegative}>-1.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.revenueTableContainer}>
            <div className={styles.tableHeader}>
              <h3 className={styles.tableTitle}>Doanh thu theo chi nhánh</h3>
              <div className={styles.tableActions}>
                <button
                  className={`${styles.tableActionBtn} ${styles.secondary}`}
                >
                  <i>🔍</i> Lọc
                </button>
                <button
                  className={`${styles.tableActionBtn} ${styles.primary}`}
                >
                  <i>📥</i> Xuất Excel
                </button>
              </div>
            </div>
            <div className={styles.tableScroll}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Chi nhánh</th>
                    <th>Đơn hàng</th>
                    <th>Doanh thu</th>
                    <th>Chi phí</th>
                    <th>Lợi nhuận</th>
                    <th>Tỷ suất lợi nhuận</th>
                    <th>So với tháng trước</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Chi nhánh Quận 1</td>
                    <td>482</td>
                    <td>14.460.000 ₫</td>
                    <td>9.399.000 ₫</td>
                    <td>5.061.000 ₫</td>
                    <td>35%</td>
                    <td className={styles.statusPositive}>+15.7%</td>
                  </tr>
                  <tr>
                    <td>Chi nhánh Quận 3</td>
                    <td>375</td>
                    <td>11.250.000 ₫</td>
                    <td>7.312.500 ₫</td>
                    <td>3.937.500 ₫</td>
                    <td>35%</td>
                    <td className={styles.statusPositive}>+8.2%</td>
                  </tr>
                  <tr>
                    <td>Chi nhánh Quận 7</td>
                    <td>238</td>
                    <td>5.950.000 ₫</td>
                    <td>3.867.500 ₫</td>
                    <td>2.082.500 ₫</td>
                    <td>35%</td>
                    <td className={styles.statusPositive}>+12.3%</td>
                  </tr>
                  <tr>
                    <td>Chi nhánh Thủ Đức</td>
                    <td>163</td>
                    <td>3.586.000 ₫</td>
                    <td>2.330.900 ₫</td>
                    <td>1.255.100 ₫</td>
                    <td>35%</td>
                    <td className={styles.statusPositive}>+18.9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
