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

const STATUS_CLASS = {
  pending: styles.statusPending,
  processing: styles.statusProcessing,
  shipping: styles.statusShipping,
  completed: styles.statusCompleted,
  cancelled: styles.statusCancelled,
};

export default function OrderManagement() {
  const { getList, getDetail, changeStatus } = useOrderService();

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [activeTab, setActiveTab] = useState("all");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    orderNumber: "",
    customer: "",
    status: "",
    paymentMethod: "",
  });

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        ...(activeTab !== "all" && { status: activeTab }),
        ...filters,
      };

      const result = await getList(params);
      setOrders(result.orders || result);
      setTotal(result.total || result.length);
    } catch (err) {
      toast.error("Không tải được danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  }, [getList, page, activeTab, filters]);

  useEffect(() => {
    loadOrders();
  }, []);

  const openDetail = async (orderId) => {
    try {
      const order = await getDetail(orderId);
      setSelectedOrder(order);
      setShowModal(true);
    } catch (err) {
      toast.error("Không tải được chi tiết đơn hàng");
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedOrder) return;

    try {
      await changeStatus(selectedOrder._id, newStatus);
      toast.success("Cập nhật trạng thái thành công!");
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
      loadOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cập nhật thất bại");
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const formatDate = (date) => new Date(date).toLocaleDateString("vi-VN");

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
                    : orders.filter((o) => o.orderStatus === key).length}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.filterCard}>
            <div className={styles.filterRow}>
              <input
                type="date"
                onChange={(e) =>
                  setFilters({ ...filters, fromDate: e.target.value })
                }
              />
              <input
                type="date"
                onChange={(e) =>
                  setFilters({ ...filters, toDate: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Mã đơn hàng..."
                onChange={(e) =>
                  setFilters({ ...filters, orderNumber: e.target.value })
                }
              />
            </div>
            <div className={styles.filterRow}>
              <input
                type="text"
                placeholder="Tên hoặc SĐT khách..."
                onChange={(e) =>
                  setFilters({ ...filters, customer: e.target.value })
                }
              />
              <select
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">Tất cả trạng thái</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="processing">Đang chuẩn bị</option>
                <option value="shipping">Đang giao</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          </div>

          <div className={styles.ordersCard}>
            <div className={styles.ordersTitle}>
              Danh sách đơn hàng{" "}
              <span className={styles.ordersCount}>({total})</span>
            </div>

            {loading ? (
              <div className={styles.loading}>Đang tải...</div>
            ) : (
              <table className={styles.ordersTable}>
                <thead>
                  <tr>
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
                      <td colSpan={7} style={{ textAlign: "center" }}>
                        Không có đơn hàng
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id}>
                        <td className={styles.orderId}>{order.orderNumber}</td>
                        <td>
                          <div className={styles.customerCell}>
                            {/* <img
                              src={
                                order.userId?.avatar ||
                                "https://via.placeholder.com/40"
                              }
                              alt=""
                              className={styles.customerAvatar}
                            /> */}
                            <div>
                              {order.user?.fullName || "Khách lẻ"}
                              <br />
                              <small>{order.userId?.phoneNumber}</small>
                            </div>
                          </div>
                        </td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td className={styles.orderPrice}>
                          {formatPrice(order.totalAmount)}
                        </td>
                        <td>
                          {order.paymentMethod === "cash"
                            ? "Tiền mặt"
                            : "Chuyển khoản"}
                        </td>
                        <td>
                          <span
                            className={`${styles.statusBadge} ${
                              STATUS_CLASS[order.orderStatus] || ""
                            }`}
                          >
                            {STATUS_LABEL[order.orderStatus] ||
                              order.orderStatus}
                          </span>
                        </td>
                        <td className={styles.actionCell}>
                          <button
                            className={`${styles.tableAction} ${styles.viewBtn}`}
                            onClick={() => openDetail(order._id)}
                          >
                            Xem
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Trước
            </button>
            <span>Trang {page}</span>
            <button
              disabled={orders.length < limit}
              onClick={() => setPage((p) => p + 1)}
            >
              Sau
            </button>
          </div>
        </div>

        {showModal && selectedOrder && (
          <div className={`${styles.modalOverlay} ${styles.active}`}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>Chi tiết đơn hàng {selectedOrder.orderNumber}</h2>
                <button
                  className={styles.modalClose}
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>
              <div className={styles.modalBody}>
                {/* Thông tin cơ bản */}
                <div className={styles.detailCard}>
                  <h4>Thông tin đơn hàng</h4>
                  <p>
                    <strong>Ngày đặt:</strong>{" "}
                    {new Date(selectedOrder.createdAt).toLocaleString("vi-VN")}
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong>{" "}
                    {formatPrice(selectedOrder.totalAmount)}
                  </p>
                  <p>
                    <strong>Phí ship:</strong>{" "}
                    {formatPrice(selectedOrder.deliveryFee || 0)}
                  </p>
                </div>

                {/* Cập nhật trạng thái */}
                <div className={styles.formSection}>
                  <h4>Cập nhật trạng thái đơn hàng</h4>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className={styles.formSelect}
                  >
                    {Object.keys(STATUS_LABEL)
                      .filter((k) => k !== "all")
                      .map((key) => (
                        <option key={key} value={key}>
                          {STATUS_LABEL[key]}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Danh sách sản phẩm (tùy chọn mở rộng sau) */}
              </div>
              <div className={styles.modalFooter}>
                <button onClick={() => setShowModal(false)}>Đóng</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
