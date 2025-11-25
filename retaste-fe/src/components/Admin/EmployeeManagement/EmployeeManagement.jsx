import React, { useState } from "react";
import styles from "./EmployeeManagement.module.css";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Lê Thị Hoa",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      position: "Nhân viên bán hàng",
      department: "Kinh doanh",
      joinDate: "15/03/2023",
      status: "Đang làm việc",
      phone: "0912345678",
      email: "lehoa@example.com",
      address: "123 Nguyễn Trãi, Quận 1, TP HCM",
    },
    {
      id: 2,
      name: "Nguyễn Văn Thành",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      position: "Đầu bếp",
      department: "Nhà bếp",
      joinDate: "05/06/2023",
      status: "Đang làm việc",
      phone: "0923456789",
      email: "vanthanh@example.com",
      address: "45 Lê Lợi, Quận 3, TP HCM",
    },
    {
      id: 3,
      name: "Trần Thị Minh",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      position: "Giao hàng",
      department: "Logistic",
      joinDate: "22/08/2023",
      status: "Đang nghỉ phép",
      phone: "0934567890",
      email: "tranminh@example.com",
      address: "67 Võ Văn Tần, Quận 3, TP HCM",
    },
    {
      id: 4,
      name: "Hoàng Đức Anh",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      position: "Quản lý nhà bếp",
      department: "Nhà bếp",
      joinDate: "10/01/2022",
      status: "Đang làm việc",
      phone: "0945678901",
      email: "ducanh@example.com",
      address: "89 Cách Mạng Tháng 8, Quận 10, TP HCM",
    },
    {
      id: 5,
      name: "Vũ Thị Lan",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      position: "Kế toán",
      department: "Tài chính",
      joinDate: "05/02/2024",
      status: "Đã nghỉ việc",
      phone: "0956789012",
      email: "vulan@example.com",
      address: "12 Điện Biên Phủ, Quận Bình Thạnh, TP HCM",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    status: "Đang làm việc",
    phone: "",
    email: "",
    address: "",
  });
  const [currentView, setCurrentView] = useState("list"); // list, detail, form

  // Danh sách phòng ban
  const departments = [
    "Kinh doanh",
    "Nhà bếp",
    "Logistic",
    "Tài chính",
    "Nhân sự",
    "IT",
    "Marketing",
  ];

  // Danh sách trạng thái
  const statuses = [
    "Đang làm việc",
    "Đang nghỉ phép",
    "Tạm nghỉ",
    "Đã nghỉ việc",
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setCurrentView("detail");
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setSelectedEmployee(null);
    setFormData({
      name: "",
      position: "",
      department: "",
      status: "Đang làm việc",
      phone: "",
      email: "",
      address: "",
    });
    setCurrentView("form");
  };

  const handleEdit = (employee) => {
    setIsAddingNew(false);
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      position: employee.position,
      department: employee.department,
      status: employee.status,
      phone: employee.phone,
      email: employee.email,
      address: employee.address,
    });
    setCurrentView("form");
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
      if (selectedEmployee && selectedEmployee.id === id) {
        setSelectedEmployee(null);
        setCurrentView("list");
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAddingNew) {
      const newEmployee = {
        id:
          employees.length > 0
            ? Math.max(...employees.map((e) => e.id)) + 1
            : 1,
        avatar: `https://randomuser.me/api/portraits/${
          Math.random() > 0.5 ? "men" : "women"
        }/${Math.floor(Math.random() * 100)}.jpg`,
        joinDate: new Date().toLocaleDateString("vi-VN"),
        ...formData,
      };
      setEmployees([...employees, newEmployee]);
    } else {
      setEmployees(
        employees.map((emp) =>
          emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp
        )
      );
    }

    setCurrentView("list");
  };

  const handleCancel = () => {
    setCurrentView("list");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Đang làm việc":
        return styles.statusActive;
      case "Đang nghỉ phép":
        return styles.statusLeave;
      case "Tạm nghỉ":
        return styles.statusPause;
      case "Đã nghỉ việc":
        return styles.statusInactive;
      default:
        return "";
    }
  };
  return (
    <>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <button className={styles.toggleSidebar}>☰</button>
          <div className={styles.headerTitle}>Quản lý nhân viên</div>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Tìm kiếm nhân viên..."
                value={searchTerm}
                onChange={handleSearch}
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
          <div className={styles.breadcrumbItem}>
            <a href="#">Nhân sự</a>
          </div>
          <div className={styles.breadcrumbDivider}>/</div>
          <div className={styles.breadcrumbCurrent}>Quản lý nhân viên</div>
        </div>

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Quản lý nhân viên</h1>
            <div className={styles.pageActions}>
              <button className={styles.filterBtn}>
                <span>Bộ lọc</span>
                <span>🔍</span>
              </button>
              <button className={styles.addBtn} onClick={handleAddNew}>
                <span>+</span>
                <span>Thêm nhân viên</span>
              </button>
            </div>
          </div>

          {currentView === "list" && (
            <div className={styles.employeeListCard}>
              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  <h3 className={styles.cardTitle}>Danh sách nhân viên</h3>
                  <div className={styles.employeeCount}>
                    {employees.length} nhân viên
                  </div>
                </div>
                <div className={styles.headerRight}>
                  <select className={styles.filterSelect}>
                    <option value="">Tất cả phòng ban</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <select className={styles.filterSelect}>
                    <option value="">Tất cả trạng thái</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.employeeTable}>
                  <thead>
                    <tr>
                      <th>Nhân viên</th>
                      <th>Vị trí</th>
                      <th>Phòng ban</th>
                      <th>Ngày vào làm</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                          <td className={styles.employeeCell}>
                            <img
                              src={employee.avatar}
                              alt={employee.name}
                              className={styles.employeeAvatar}
                            />
                            <span className={styles.employeeName}>
                              {employee.name}
                            </span>
                          </td>
                          <td>{employee.position}</td>
                          <td>{employee.department}</td>
                          <td>{employee.joinDate}</td>
                          <td>
                            <span
                              className={`${
                                styles.statusBadge
                              } ${getStatusClass(employee.status)}`}
                            >
                              {employee.status}
                            </span>
                          </td>
                          <td className={styles.actionCell}>
                            <button
                              className={styles.actionButton}
                              onClick={() => handleViewDetails(employee)}
                              title="Xem chi tiết"
                            >
                              👁️
                            </button>
                            <button
                              className={styles.actionButton}
                              onClick={() => handleEdit(employee)}
                              title="Chỉnh sửa"
                            >
                              ✏️
                            </button>
                            <button
                              className={styles.actionButton}
                              onClick={() => handleDelete(employee.id)}
                              title="Xóa"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className={styles.noResults}>
                          Không tìm thấy nhân viên nào phù hợp với tìm kiếm của
                          bạn
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className={styles.tablePagination}>
                <div className={styles.paginationInfo}>
                  Hiển thị 1-{filteredEmployees.length} trong số{" "}
                  {filteredEmployees.length} nhân viên
                </div>
                <div className={styles.paginationControls}>
                  <button className={styles.paginationButton} disabled>
                    Trước
                  </button>
                  <button
                    className={`${styles.paginationButton} ${styles.activePage}`}
                  >
                    1
                  </button>
                  <button className={styles.paginationButton} disabled>
                    Tiếp
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentView === "detail" && selectedEmployee && (
            <div className={styles.employeeDetailCard}>
              <div className={styles.detailHeader}>
                <h3 className={styles.detailTitle}>Thông tin nhân viên</h3>
                <div className={styles.detailActions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(selectedEmployee)}
                  >
                    <span>✏️</span>
                    <span>Chỉnh sửa</span>
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(selectedEmployee.id)}
                  >
                    <span>🗑️</span>
                    <span>Xóa</span>
                  </button>
                  <button
                    className={styles.backBtn}
                    onClick={() => setCurrentView("list")}
                  >
                    <span>↩️</span>
                    <span>Quay lại</span>
                  </button>
                </div>
              </div>

              <div className={styles.employeeProfile}>
                <div className={styles.profileHeader}>
                  <div className={styles.profileAvatar}>
                    <img
                      src={selectedEmployee.avatar}
                      alt={selectedEmployee.name}
                    />
                  </div>
                  <div className={styles.profileInfo}>
                    <h2 className={styles.profileName}>
                      {selectedEmployee.name}
                    </h2>
                    <p className={styles.profilePosition}>
                      {selectedEmployee.position}
                    </p>
                    <span
                      className={`${styles.statusBadge} ${getStatusClass(
                        selectedEmployee.status
                      )}`}
                    >
                      {selectedEmployee.status}
                    </span>
                  </div>
                </div>

                <div className={styles.profileDetails}>
                  <div className={styles.detailSection}>
                    <h4 className={styles.sectionTitle}>Thông tin cơ bản</h4>
                    <div className={styles.detailGrid}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Phòng ban:</span>
                        <span className={styles.detailValue}>
                          {selectedEmployee.department}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>
                          Ngày vào làm:
                        </span>
                        <span className={styles.detailValue}>
                          {selectedEmployee.joinDate}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>
                          Số điện thoại:
                        </span>
                        <span className={styles.detailValue}>
                          {selectedEmployee.phone}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Email:</span>
                        <span className={styles.detailValue}>
                          {selectedEmployee.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.detailSection}>
                    <h4 className={styles.sectionTitle}>Địa chỉ liên hệ</h4>
                    <p className={styles.addressValue}>
                      {selectedEmployee.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === "form" && (
            <div className={styles.employeeFormCard}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>
                  {isAddingNew
                    ? "Thêm nhân viên mới"
                    : "Chỉnh sửa thông tin nhân viên"}
                </h3>
                <button className={styles.closeFormBtn} onClick={handleCancel}>
                  ✖
                </button>
              </div>

              <form className={styles.employeeForm} onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      Họ và tên <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={styles.formInput}
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="position" className={styles.formLabel}>
                      Vị trí <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      className={styles.formInput}
                      value={formData.position}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="department" className={styles.formLabel}>
                      Phòng ban <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="department"
                      name="department"
                      className={styles.formSelect}
                      value={formData.department}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Chọn phòng ban</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status" className={styles.formLabel}>
                      Trạng thái
                    </label>
                    <select
                      id="status"
                      name="status"
                      className={styles.formSelect}
                      value={formData.status}
                      onChange={handleFormChange}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.formLabel}>
                      Số điện thoại <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={styles.formInput}
                      placeholder="VD: 0912345678"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      Email <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={styles.formInput}
                      placeholder="example@example.com"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label htmlFor="address" className={styles.formLabel}>
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className={styles.formInput}
                      placeholder="Địa chỉ đầy đủ"
                      value={formData.address}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={handleCancel}
                  >
                    Hủy
                  </button>
                  <button type="submit" className={styles.submitBtn}>
                    {isAddingNew ? "Thêm nhân viên" : "Cập nhật"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
