import React, { useState, useEffect, useCallback } from "react";
import styles from "./OrderManagement.module.css";
import { toast } from "react-toastify";
import { useOrderService } from "../../../hooks/useOrderService";

const STATUS_LABEL = {
  all: "Tất cả đơn hàng",
  pending: "Chờ xác nhận",
  processing: "Đang chuẩn bị",
  shipping: "Đang giao hàng",
  completed: "Đã hoàn thành",
  cancelled: "Đã hủy",
};

const REAL_STATUS = {
  pending: "pending",
  processing: "confirmed",
  shipping: "out_for_delivery",
  completed: "success",
  cancelled: "cancelled",
};

const REVERSE_STATUS = {
  pending: "pending",
  confirmed: "processing",
  out_for_delivery: "shipping",
  success: "completed",
  cancelled: "cancelled",
};

const STATUS_CLASS = {
  pending: styles.statusPending,
  processing: styles.statusProcessing,
  shipping: styles.statusShipping,
  completed: styles.statusCompleted,
  cancelled: styles.statusCancelled,
};

export default function OrderManagement() {
  const { getList, getDetail, changeStatus, cancelOrder } = useOrderService();

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [activeTab, setActiveTab] = useState("all");

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    orderNumber: "",
    customer: "",
    status: "",
  });

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        ...(activeTab !== "all" && {
          status: REAL_STATUS[activeTab] || activeTab,
        }),
        ...filters,
      };

      const result = await getList(params);
      const orderList = result.orders || result.data?.orders || result;
      const totalCount = result.total || result.data?.total || orderList.length;

      setOrders(orderList);
      setTotal(totalCount);
    } catch (err) {
      toast.error("Không tải được danh sách đơn hàng");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getList, page, activeTab, filters]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders, page, activeTab]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadOrders();
  };

  const resetFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      orderNumber: "",
      customer: "",
      status: "",
    });
    loadOrders();
  };

  const openDetail = async (orderId) => {
    try {
      setLoading(true);
      const order = await getDetail(orderId);
      setSelectedOrder(order);
      setShowModal(true);
    } catch (err) {
      toast.error("Không tải được chi tiết đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatusKey) => {
    if (!selectedOrder) return;

    const realStatus = REAL_STATUS[newStatusKey] || newStatusKey;

    try {
      await changeStatus(selectedOrder._id, realStatus);
      toast.success("Cập nhật trạng thái thành công!");

      setSelectedOrder({ ...selectedOrder, orderStatus: realStatus });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === selectedOrder._id ? { ...o, orderStatus: realStatus } : o
        )
      );
      loadOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cập nhật thất bại");
    }
  };

  const openCancelModal = () => {
    if (!selectedOrder || selectedOrder.orderStatus === "cancelled") return;
    setShowCancelModal(true);
  };

  const handleCancelOrder = async () => {
    if (
      !selectedOrder ||
      selectedOrder.orderStatus === "cancelled" ||
      !cancelReason
    )
      return;

    try {
      await cancelOrder(selectedOrder._id);
      toast.success("Đơn hàng đã được hủy!");

      setSelectedOrder({ ...selectedOrder, orderStatus: "cancelled" });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === selectedOrder._id ? { ...o, orderStatus: "cancelled" } : o
        )
      );
      setShowCancelModal(false);
      setShowModal(false);
      loadOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Hủy đơn hàng thất bại");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const formatDate = (date) => new Date(date).toLocaleDateString("vi-VN");

  const getStatusDisplay = (status) => {
    const map = {
      pending: "Chờ xác nhận",
      confirmed: "Đang chuẩn bị",
      out_for_delivery: "Đang giao hàng",
      success: "Đã hoàn thành",
      cancelled: "Đã hủy",
    };
    return map[status] || status;
  };

  const getStatusClass = (status) => {
    const statusKey = REVERSE_STATUS[status] || status;
    return STATUS_CLASS[statusKey] || "";
  };

  const getNextStatuses = (currentStatus) => {
    const statusFlow = {
      pending: ["processing"],
      confirmed: ["shipping"],
      out_for_delivery: ["completed"],
      success: [],
      cancelled: [],
    };
    return statusFlow[currentStatus] || [];
  };

  const formatOrderNumber = (orderNumber) => {
    if (!orderNumber) return "#...";
    const str = orderNumber.toString().trim();

    const first3 = str.slice(0, 3);
    const last4 = str.slice(-4);

    return `#${first3}${last4}`;
  };

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
            {/* <button className={styles.btnPrimary}>
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
            </button> */}
          </div>

          <div className={styles.statusFilter}>
            {Object.keys(STATUS_LABEL).map((key) => (
              <div
                key={key}
                className={`${styles.statusTab} ${
                  activeTab === key ? styles.active : ""
                }`}
                onClick={() => {
                  setActiveTab(key);
                  setPage(1);
                }}
              >
                <span>{STATUS_LABEL[key]}</span>
                <span className={styles.count}>
                  {key === "all"
                    ? total
                    : orders.filter(
                        (o) => o.orderStatus === (REAL_STATUS[key] || key)
                      ).length || 0}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleFilterSubmit} className={styles.filterCard}>
            <div className={styles.filterHeader}>
              <h3 className={styles.filterTitle}>Lọc đơn hàng</h3>
              <div className={styles.filterActions}>
                <button
                  type="button"
                  onClick={resetFilters}
                  className={`${styles.filterBtn} ${styles.resetBtn}`}
                >
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
                  Đặt lại
                </button>
                <button type="submit" className={styles.filterBtn}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                  Tìm kiếm
                </button>
              </div>
            </div>
            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                  </svg>
                  Từ ngày
                </label>
                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleFilterChange}
                  className={styles.filterInput}
                />
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                  </svg>
                  Đến ngày
                </label>
                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleFilterChange}
                  className={styles.filterInput}
                />
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                  </svg>
                  Mã đơn hàng
                </label>
                <input
                  type="text"
                  name="orderNumber"
                  value={filters.orderNumber}
                  onChange={handleFilterChange}
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
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                  Khách hàng
                </label>
                <input
                  type="text"
                  name="customer"
                  value={filters.customer}
                  onChange={handleFilterChange}
                  className={styles.filterInput}
                  placeholder="Nhập tên hoặc SĐT khách hàng..."
                />
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                  </svg>
                  Trạng thái
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className={styles.filterSelect}
                  >
                    <option value="">Tất cả trạng thái</option>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="confirmed">Đang chuẩn bị</option>
                    <option value="out_for_delivery">Đang giao</option>
                    <option value="success">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                  <span className={styles.selectArrow}></span>
                </div>
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M0 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5zm3.5 1.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm2 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm6.5 1a.5.5 0 1 0 1 0v-1a.5.5 0 1 0-1 0v1zm0 3a.5.5 0 1 0 1 0v-1a.5.5 0 1 0-1 0v1zm-5 0a.5.5 0 1 0 1 0v-1a.5.5 0 1 0-1 0v1z"
                    />
                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                  </svg>
                  Thanh toán
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    name="paymentMethod"
                    value={filters.paymentMethod}
                    onChange={handleFilterChange}
                    className={styles.filterSelect}
                  >
                    <option value="">Tất cả phương thức</option>
                    <option value="cash">Tiền mặt</option>
                    <option value="transfer">Chuyển khoản</option>
                  </select>
                  <span className={styles.selectArrow}></span>
                </div>
              </div>
            </div>
          </form>

          <div className={styles.ordersCard}>
            <div className={styles.ordersHeader}>
              <div className={styles.ordersTitle}>
                Danh sách đơn hàng{" "}
                <span className={styles.ordersCount}>{total}</span>
              </div>
              <div className={styles.ordersActions}>
                {/* <button className={styles.tableActionBtn}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                  </svg>
                  Xuất Excel
                </button> */}
                <button className={styles.tableActionBtn}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z" />
                  </svg>
                  Cột hiển thị
                </button>
              </div>
            </div>

            <div className={styles.ordersTableContainer}>
              {loading ? (
                <div className={styles.loading}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z">
                      <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                  <span>Đang tải dữ liệu...</span>
                </div>
              ) : (
                <table className={styles.ordersTable}>
                  <thead>
                    <tr>
                      <th className={styles.checkboxCell}>
                        <label className={styles.checkbox}>
                          <input type="checkbox" />
                          <span className={styles.checkmark}></span>
                        </label>
                      </th>
                      <th>Mã đơn</th>
                      <th>Khách hàng</th>
                      <th>Ngày đặt</th>
                      <th>Tổng tiền</th>
                      <th>Thanh toán</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          style={{ textAlign: "center", padding: "40px 0" }}
                        >
                          <div className={styles.emptyState}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="48"
                              height="48"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2z" />
                              <path d="M13 10.25a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-.5a.25.25 0 0 1 .25-.25h1.5zm-11 0a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5a.25.25 0 0 1 .25-.25h.5zm7 0a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-.5a.25.25 0 0 1 .25-.25h1.5zm-5 0a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-.5a.25.25 0 0 1 .25-.25h1.5zm3 0a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5a.25.25 0 0 1 .25-.25h.5z" />
                              <path d="M11.648 2.646a.5.5 0 0 1 .577-.93l1.5 3.55a.5.5 0 0 1-.9.9l-.544-1.3H4.5a1 1 0 0 0-1 1v.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h2v-.5a2 2 0 0 1 2-2h6.422l-.295-.697zM2 8v1h4V8H2z" />
                            </svg>
                            <p>Không tìm thấy đơn hàng nào</p>
                            <button className={styles.emptyActionBtn}>
                              Xóa bộ lọc
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order._id}>
                          <td className={styles.checkboxCell}>
                            <label className={styles.checkbox}>
                              <input type="checkbox" />
                              <span className={styles.checkmark}></span>
                            </label>
                          </td>
                          <td className={styles.orderId}>
                            <span className={styles.orderNumberWrapper}>
                              <span className={styles.orderNumberShort}>
                                {formatOrderNumber(order.orderNumber)}
                              </span>
                              <span className={styles.orderNumberFull}>
                                #{order.orderNumber}
                              </span>
                            </span>
                          </td>
                          <td>
                            <div className={styles.customerCell}>
                              <div className={styles.customerAvatar}>
                                {order.user?.avatar ? (
                                  <img
                                    src={order.user?.avatar}
                                    alt={order.user?.fullName || "Khách lẻ"}
                                  />
                                ) : (
                                  <div className={styles.avatarPlaceholder}>
                                    {(order.user?.fullName || "K")[0]}
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className={styles.customerName}>
                                  {order.user?.fullName || "Khách lẻ"}
                                </div>
                                <div className={styles.customerPhone}>
                                  {order.user?.phoneNumber ||
                                    order.phoneNumber ||
                                    "Không có SĐT"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={styles.orderDate}>
                              {formatDate(order.createdAt)}
                            </span>
                            <span className={styles.orderTime}>
                              {new Date(order.createdAt).toLocaleTimeString(
                                "vi-VN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </td>
                          <td className={styles.orderPrice}>
                            {formatPrice(order.totalAmount)}
                          </td>
                          <td>
                            <div
                              className={`${styles.paymentBadge} ${
                                order.paymentMethod === "cash"
                                  ? styles.cashPayment
                                  : styles.transferPayment
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                {order.paymentMethod === "cash" ? (
                                  <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V3H3v2.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm1 4.5h3a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5m5 0h3a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5m4.5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" />
                                ) : (
                                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                )}
                              </svg>
                              {order.paymentMethod === "cash"
                                ? "Tiền mặt"
                                : "Chuyển khoản"}
                            </div>
                          </td>
                          <td>
                            <span
                              className={`${
                                styles.statusBadge
                              } ${getStatusClass(order.orderStatus)}`}
                            >
                              <span className={styles.statusDot}></span>
                              {getStatusDisplay(order.orderStatus)}
                            </span>
                          </td>
                          <td className={styles.actionCell}>
                            <button
                              className={`${styles.tableAction} ${styles.viewBtn}`}
                              onClick={() => openDetail(order._id)}
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
                              Chi tiết
                            </button>
                            {order.orderStatus === "pending" && (
                              <button
                                className={`${styles.tableAction} ${styles.editBtn}`}
                                onClick={() => {
                                  openDetail(order._id);
                                  setTimeout(() => {
                                    handleStatusChange("shipping");
                                  }, 500);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                </svg>
                                Xác nhận
                              </button>
                            )}
                            {order.orderStatus !== "cancelled" &&
                              order.orderStatus !== "success" && (
                                <button
                                  className={`${styles.tableAction} ${styles.deleteBtn}`}
                                  onClick={() => {
                                    openDetail(order._id);
                                    setTimeout(() => {
                                      openCancelModal();
                                    }, 500);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                  </svg>
                                  Hủy
                                </button>
                              )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              Hiển thị {orders.length} / {total} đơn hàng
            </div>
            <div className={styles.paginationPages}>
              <div
                className={`${styles.pageItem} ${
                  page === 1 ? styles.disabled : ""
                }`}
              >
                <button
                  className={styles.pageLink}
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`${styles.pageItem} ${
                  page === 1 ? styles.disabled : ""
                }`}
              >
                <button
                  className={styles.pageLink}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </button>
              </div>

              {Array.from(
                { length: Math.min(5, Math.ceil(total / limit)) },
                (_, i) => {
                  const pageNum = page - 2 + i;
                  if (pageNum > 0 && pageNum <= Math.ceil(total / limit)) {
                    return (
                      <div
                        key={pageNum}
                        className={`${styles.pageItem} ${
                          pageNum === page ? styles.active : ""
                        }`}
                      >
                        <button
                          className={styles.pageLink}
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      </div>
                    );
                  }
                  return null;
                }
              )}

              <div
                className={`${styles.pageItem} ${
                  orders.length < limit ? styles.disabled : ""
                }`}
              >
                <button
                  className={styles.pageLink}
                  onClick={() => setPage((p) => p + 1)}
                  disabled={orders.length < limit}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`${styles.pageItem} ${
                  orders.length < limit ? styles.disabled : ""
                }`}
              >
                <button
                  className={styles.pageLink}
                  onClick={() => setPage(Math.ceil(total / limit))}
                  disabled={orders.length < limit}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Detail Modal */}
        {showModal && selectedOrder && (
          <div
            className={`${styles.modalOverlay} ${styles.active}`}
            onClick={closeModal}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  Đơn hàng #{selectedOrder.orderNumber}
                </h2>
                <button className={styles.modalClose} onClick={closeModal}>
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.orderDetailHeader}>
                  <div className={styles.orderDetailStatus}>
                    <span
                      className={`${styles.statusBadge} ${getStatusClass(
                        selectedOrder.orderStatus
                      )}`}
                    >
                      <span className={styles.statusDot}></span>
                      {getStatusDisplay(selectedOrder.orderStatus)}
                    </span>
                  </div>
                  <div className={styles.orderDetailActions}>
                    {selectedOrder.orderStatus !== "cancelled" &&
                      selectedOrder.orderStatus !== "success" && (
                        <>
                          {getNextStatuses(selectedOrder.orderStatus).map(
                            (nextStatus) => (
                              <button
                                key={nextStatus}
                                className={`${styles.statusActionBtn} ${
                                  styles[nextStatus + "Btn"]
                                }`}
                                onClick={() => handleStatusChange(nextStatus)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                </svg>
                                {nextStatus === "processing" && "Xác nhận đơn"}
                                {nextStatus === "shipping" &&
                                  "Bắt đầu giao hàng"}
                                {nextStatus === "completed" && "Hoàn thành đơn"}
                              </button>
                            )
                          )}

                          <button
                            className={`${styles.statusActionBtn} ${styles.cancelBtn}`}
                            onClick={openCancelModal}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                            Hủy đơn hàng
                          </button>
                        </>
                      )}
                    <button
                      className={`${styles.statusActionBtn} ${styles.printBtn}`}
                      onClick={() => window.print()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 14a1 1 0 0 1-1-1v-4h8v4a1 1 0 0 1-1 1zm7-11h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1z" />
                      </svg>
                      In đơn hàng
                    </button>
                  </div>
                </div>

                <div className={styles.orderDetails}>
                  <div className={styles.detailCard}>
                    <h4 className={styles.detailTitle}>Thông tin khách hàng</h4>
                    <div className={styles.customerDetailInfo}>
                      <div className={styles.customerDetailAvatar}>
                        {selectedOrder.user?.avatar ? (
                          <img
                            src={selectedOrder.user?.avatar}
                            alt={selectedOrder.user?.fullName || "Khách lẻ"}
                          />
                        ) : (
                          <div className={styles.avatarPlaceholder}>
                            {(selectedOrder.user?.fullName || "K")[0]}
                          </div>
                        )}
                      </div>
                      <div className={styles.customerDetailContent}>
                        <p className={styles.customerDetailName}>
                          {selectedOrder.user?.fullName || "Khách lẻ"}
                        </p>
                        <p className={styles.customerDetailPhone}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                            />
                          </svg>
                          {selectedOrder.user?.phoneNumber ||
                            selectedOrder.phoneNumber ||
                            "Không có SĐT"}
                        </p>
                        <p className={styles.customerDetailEmail}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                          </svg>
                          {selectedOrder.user?.email || "Không có email"}
                        </p>
                      </div>
                    </div>

                    <h4
                      className={styles.detailTitle}
                      style={{ marginTop: "20px" }}
                    >
                      Thông tin giao hàng
                    </h4>
                    <ul className={styles.detailList}>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>Người nhận:</span>
                        <span className={styles.detailValue}>
                          {selectedOrder.deliveryInfo?.recipientName ||
                            selectedOrder.user?.fullName ||
                            "Khách lẻ"}
                        </span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>
                          Số điện thoại:
                        </span>
                        <span className={styles.detailValue}>
                          {selectedOrder.deliveryInfo?.phone ||
                            selectedOrder.user?.phoneNumber ||
                            "Không có SĐT"}
                        </span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>Địa chỉ:</span>
                        <span className={styles.detailValue}>
                          {(() => {
                            if (selectedOrder.address) {
                              return (
                                selectedOrder.address.streetAddress ||
                                selectedOrder.address.fullAddress ||
                                "Không có địa chỉ"
                              );
                            }
                            if (
                              selectedOrder.deliveryAddress &&
                              typeof selectedOrder.deliveryAddress === "object"
                            ) {
                              return (
                                selectedOrder.deliveryAddress.streetAddress ||
                                selectedOrder.deliveryAddress.fullAddress ||
                                "Không có địa chỉ chi tiết"
                              );
                            }
                            if (
                              selectedOrder.deliveryAddress &&
                              typeof selectedOrder.deliveryAddress === "string"
                            ) {
                              return (
                                "Địa chỉ đã lưu trong hệ thống (ID: " +
                                selectedOrder.deliveryAddress.slice(-6) +
                                ")"
                              );
                            }

                            return "Không có địa chỉ";
                          })()}
                        </span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>Ghi chú:</span>
                        <span className={styles.detailValue}>
                          {selectedOrder.note || "Không có ghi chú"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.detailCard}>
                    <h4 className={styles.detailTitle}>Thông tin thanh toán</h4>
                    <ul className={styles.detailList}>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>Mã đơn hàng:</span>
                        <span className={styles.detailValue}>
                          #{selectedOrder.orderNumber}
                        </span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>Ngày đặt:</span>
                        <span className={styles.detailValue}>
                          {formatDate(selectedOrder.createdAt)}{" "}
                          {new Date(selectedOrder.createdAt).toLocaleTimeString(
                            "vi-VN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>
                          Phương thức thanh toán:
                        </span>
                        <span className={styles.detailValue}>
                          <span
                            className={`${styles.paymentBadge} ${
                              selectedOrder.paymentMethod === "cash"
                                ? styles.cashPayment
                                : styles.transferPayment
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              {selectedOrder.paymentMethod === "cash" ? (
                                <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V3H3v2.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm1 4.5h3a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5m5 0h3a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5m4.5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" />
                              ) : (
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                              )}
                            </svg>
                            {selectedOrder.paymentMethod === "cash"
                              ? "Tiền mặt"
                              : "Chuyển khoản"}
                          </span>
                        </span>
                      </li>
                      <li className={styles.detailItem}>
                        <span className={styles.detailLabel}>
                          Trạng thái thanh toán:
                        </span>
                        <span className={styles.detailValue}>
                          <span
                            className={`${styles.paymentStatusBadge} ${
                              selectedOrder.isPaid
                                ? styles.paidStatus
                                : styles.unpaidStatus
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              {selectedOrder.isPaid ? (
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                              ) : (
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                              )}
                            </svg>
                            {selectedOrder.isPaid
                              ? "Đã thanh toán"
                              : "Chưa thanh toán"}
                          </span>
                        </span>
                      </li>
                    </ul>

                    <div className={styles.priceBreakdown}>
                      <div className={styles.priceItem}>
                        <span>Tạm tính</span>
                        <span>
                          {formatPrice(
                            selectedOrder.subTotal ||
                              selectedOrder.totalAmount -
                                (selectedOrder.deliveryFee || 0)
                          )}
                        </span>
                      </div>
                      <div className={styles.priceItem}>
                        <span>Phí vận chuyển</span>
                        <span>
                          {formatPrice(selectedOrder.deliveryFee || 0)}
                        </span>
                      </div>
                      {selectedOrder.discount > 0 && (
                        <div className={styles.priceItem}>
                          <span>Giảm giá</span>
                          <span>-{formatPrice(selectedOrder.discount)}</span>
                        </div>
                      )}
                      <div className={styles.priceTotal}>
                        <span>Tổng thanh toán</span>
                        <span>{formatPrice(selectedOrder.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.productSection}>
                  <h4 className={styles.sectionTitle}>
                    Sản phẩm trong đơn hàng
                  </h4>
                  <table className={styles.productTable}>
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items &&
                        selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div className={styles.productInfo}>
                                <img
                                  src={
                                    item.productInfo?.images?.[0] ||
                                    item.product?.images?.[0] ||
                                    "https://via.placeholder.com/50"
                                  }
                                  alt={
                                    item.productInfo?.name ||
                                    item.product?.name ||
                                    "Sản phẩm"
                                  }
                                  className={styles.productImg}
                                />
                                <div>
                                  <div className={styles.productName}>
                                    {item.productInfo?.name ||
                                      item.product?.name ||
                                      "Sản phẩm"}
                                  </div>
                                  {item.variant && (
                                    <div className={styles.productVariant}>
                                      Phân loại: {item.variant}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>{formatPrice(item.price)}</td>
                            <td>{item.quantity}</td>
                            <td className={styles.productTotal}>
                              {formatPrice(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {selectedOrder.trackingHistory &&
                  selectedOrder.trackingHistory.length > 0 && (
                    <div className={styles.formSection}>
                      <h4 className={styles.sectionTitle}>Lịch sử đơn hàng</h4>
                      <div className={styles.timeline}>
                        {selectedOrder.trackingHistory.map((event, index) => (
                          <div key={index} className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                              <div className={styles.timelineTitle}>
                                {event.status === "pending" &&
                                  "Đơn hàng đã được tạo"}
                                {event.status === "confirmed" &&
                                  "Đơn hàng được xác nhận"}
                                {event.status === "out_for_delivery" &&
                                  "Đơn hàng đang được giao"}
                                {event.status === "success" &&
                                  "Đơn hàng đã hoàn thành"}
                                {event.status === "cancelled" &&
                                  "Đơn hàng đã bị hủy"}
                              </div>
                              {event.note && (
                                <div className={styles.timelineText}>
                                  {event.note}
                                </div>
                              )}
                              <div className={styles.timelineTime}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                </svg>
                                {formatDate(event.timestamp)}{" "}
                                {new Date(event.timestamp).toLocaleTimeString(
                                  "vi-VN",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              <div className={styles.modalFooter}>
                <button
                  onClick={closeModal}
                  className={`${styles.modalBtn} ${styles.btnCancel}`}
                >
                  Đóng
                </button>
                <button
                  onClick={() => window.print()}
                  className={`${styles.modalBtn} ${styles.btnSave}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 14a1 1 0 0 1-1-1v-4h8v4a1 1 0 0 1-1 1z" />
                  </svg>
                  In đơn hàng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Order Modal */}
        {showCancelModal && selectedOrder && (
          <div
            className={`${styles.modalOverlay} ${styles.active}`}
            onClick={() => setShowCancelModal(false)}
          >
            <div
              className={styles.cancelModal}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  Hủy đơn hàng #{selectedOrder.orderNumber}
                </h2>
                <button
                  className={styles.modalClose}
                  onClick={() => setShowCancelModal(false)}
                >
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.warningMessage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <p>
                    Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không
                    thể hoàn tác.
                  </p>
                </div>

                <div className={styles.formGroup} style={{ marginTop: "20px" }}>
                  <label className={styles.formLabel}>Lý do hủy đơn</label>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className={styles.formSelect}
                    required
                  >
                    <option value="">-- Chọn lý do hủy --</option>
                    <option value="customer_request">
                      Khách hàng yêu cầu hủy
                    </option>
                    <option value="out_of_stock">Hết hàng</option>
                    <option value="wrong_address">
                      Địa chỉ không chính xác
                    </option>
                    <option value="cannot_contact">
                      Không liên hệ được khách hàng
                    </option>
                    <option value="payment_issue">Vấn đề thanh toán</option>
                    <option value="other">Lý do khác</option>
                  </select>

                  {cancelReason === "other" && (
                    <textarea
                      className={styles.formTextarea}
                      placeholder="Nhập lý do hủy đơn hàng..."
                      style={{ marginTop: "10px" }}
                      onChange={(e) => setCancelReason(e.target.value)}
                    ></textarea>
                  )}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className={`${styles.modalBtn} ${styles.btnCancel}`}
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleCancelOrder}
                  className={`${styles.modalBtn} ${styles.btnDelete}`}
                  disabled={!cancelReason}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                  Xác nhận hủy đơn
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
