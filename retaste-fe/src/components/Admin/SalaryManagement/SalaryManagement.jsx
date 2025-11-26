import React, { useState, useEffect } from "react";
import styles from "./SalaryManagement.module.css";

export default function SalaryManagement() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Lê Thị Hoa",
      position: "Nhân viên bán hàng",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      baseSalary: 8500000,
      bonus: 1500000,
      deduction: 500000,
      overtime: 10,
      overtimeRate: 100000,
    },
    {
      id: 2,
      name: "Nguyễn Văn Thành",
      position: "Đầu bếp",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      baseSalary: 12000000,
      bonus: 2000000,
      deduction: 0,
      overtime: 5,
      overtimeRate: 150000,
    },
    {
      id: 3,
      name: "Trần Thị Minh",
      position: "Giao hàng",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      baseSalary: 7500000,
      bonus: 1000000,
      deduction: 300000,
      overtime: 8,
      overtimeRate: 90000,
    },
    {
      id: 4,
      name: "Hoàng Đức Anh",
      position: "Quản lý nhà bếp",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      baseSalary: 15000000,
      bonus: 3000000,
      deduction: 0,
      overtime: 12,
      overtimeRate: 200000,
    },
    {
      id: 5,
      name: "Vũ Thị Lan",
      position: "Kế toán",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      baseSalary: 10000000,
      bonus: 1800000,
      deduction: 200000,
      overtime: 3,
      overtimeRate: 120000,
    },
  ]);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    position: "",
    avatar: "",
    baseSalary: 0,
    bonus: 0,
    deduction: 0,
    overtime: 0,
    overtimeRate: 0,
  });

  const [selectedMonth, setSelectedMonth] = useState(10);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Calculate total salary for an employee
  const calculateTotalSalary = (employee) => {
    return (
      employee.baseSalary +
      employee.bonus -
      employee.deduction +
      employee.overtime * employee.overtimeRate
    );
  };

  // Sort employees
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortConfig.key === null) return 0;

    let aValue, bValue;

    if (sortConfig.key === "totalSalary") {
      aValue = calculateTotalSalary(a);
      bValue = calculateTotalSalary(b);
    } else {
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];
    }

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Filter employees based on search term
  const filteredEmployees = sortedEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sort request
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "name" || name === "position" || name === "avatar"
          ? value
          : Number(value),
    });
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee.id);
    setFormData({ ...employee });
    setShowAddForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee ? { ...formData } : emp
        )
      );
      setEditingEmployee(null);
    } else if (showAddForm) {
      const newEmployee = {
        ...formData,
        id: Math.max(...employees.map((e) => e.id), 0) + 1,
      };
      setEmployees([...employees, newEmployee]);
      setShowAddForm(false);
    }

    setFormData({
      id: 0,
      name: "",
      position: "",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      baseSalary: 0,
      bonus: 0,
      deduction: 0,
      overtime: 0,
      overtimeRate: 0,
    });
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
      if (editingEmployee === id) {
        setEditingEmployee(null);
        setFormData({
          id: 0,
          name: "",
          position: "",
          avatar: "",
          baseSalary: 0,
          bonus: 0,
          deduction: 0,
          overtime: 0,
          overtimeRate: 0,
        });
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const totalStats = employees.reduce(
    (stats, emp) => {
      const total = calculateTotalSalary(emp);
      return {
        totalEmployees: stats.totalEmployees + 1,
        totalBaseSalary: stats.totalBaseSalary + emp.baseSalary,
        totalBonus: stats.totalBonus + emp.bonus,
        totalDeduction: stats.totalDeduction + emp.deduction,
        totalOvertimePay:
          stats.totalOvertimePay + emp.overtime * emp.overtimeRate,
        totalSalaryPaid: stats.totalSalaryPaid + total,
      };
    },
    {
      totalEmployees: 0,
      totalBaseSalary: 0,
      totalBonus: 0,
      totalDeduction: 0,
      totalOvertimePay: 0,
      totalSalaryPaid: 0,
    }
  );
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
          <div className={styles.breadcrumbItem}>
            <a href="#">Nhân sự</a>
          </div>
          <div className={styles.breadcrumbDivider}>/</div>
          <div className={styles.breadcrumbCurrent}>Quản lý lương</div>
        </div>

        <div className={styles.content}>
          <div className={styles.dashboardHeader}>
            <h1 className={styles.dashboardTitle}>Quản lý lương nhân viên</h1>
            <div className={styles.dateSelection}>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className={styles.monthSelect}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className={styles.yearSelect}
              >
                {[2024, 2025, 2026].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.iconEmployees}`}>
                👥
              </div>
              <div className={styles.statInfo}>
                <h3>{totalStats.totalEmployees}</h3>
                <p>Nhân viên</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.iconSalary}`}>
                💰
              </div>
              <div className={styles.statInfo}>
                <h3>{formatCurrency(totalStats.totalBaseSalary)}</h3>
                <p>Tổng lương cơ bản</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.iconBonus}`}>🎁</div>
              <div className={styles.statInfo}>
                <h3>{formatCurrency(totalStats.totalBonus)}</h3>
                <p>Tổng thưởng</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.iconTotal}`}>📊</div>
              <div className={styles.statInfo}>
                <h3>{formatCurrency(totalStats.totalSalaryPaid)}</h3>
                <p>Tổng chi trả</p>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button
              className={styles.addEmployeeBtn}
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingEmployee(null);
                if (!showAddForm) {
                  setFormData({
                    id: 0,
                    name: "",
                    position: "",
                    avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
                    baseSalary: 0,
                    bonus: 0,
                    deduction: 0,
                    overtime: 0,
                    overtimeRate: 0,
                  });
                }
              }}
            >
              {showAddForm ? "Hủy thêm" : "Thêm nhân viên"}
            </button>
            <button className={styles.exportBtn}>Xuất báo cáo</button>
          </div>

          {/* Add/Edit Employee Form */}
          {(showAddForm || editingEmployee) && (
            <div className={styles.employeeForm}>
              <h2 className={styles.formTitle}>
                {editingEmployee
                  ? "Chỉnh sửa thông tin lương"
                  : "Thêm nhân viên mới"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Họ và tên</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="position">Chức vụ</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      required
                      value={formData.position}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="baseSalary">Lương cơ bản</label>
                    <input
                      type="number"
                      id="baseSalary"
                      name="baseSalary"
                      required
                      min="0"
                      value={formData.baseSalary}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="bonus">Thưởng</label>
                    <input
                      type="number"
                      id="bonus"
                      name="bonus"
                      min="0"
                      value={formData.bonus}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="deduction">Các khoản khấu trừ</label>
                    <input
                      type="number"
                      id="deduction"
                      name="deduction"
                      min="0"
                      value={formData.deduction}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="overtime">Số giờ làm thêm</label>
                    <input
                      type="number"
                      id="overtime"
                      name="overtime"
                      min="0"
                      value={formData.overtime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="overtimeRate">Đơn giá làm thêm giờ</label>
                    <input
                      type="number"
                      id="overtimeRate"
                      name="overtimeRate"
                      min="0"
                      value={formData.overtimeRate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="avatar">Ảnh đại diện (URL)</label>
                    <input
                      type="text"
                      id="avatar"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.formPreviewBox}>
                  <div className={styles.previewHeader}>
                    <h3>Tổng quan lương</h3>
                  </div>
                  <div className={styles.previewContent}>
                    <div className={styles.previewAvatar}>
                      <img src={formData.avatar} alt="Avatar" />
                    </div>
                    <div className={styles.previewInfo}>
                      <div className={styles.previewName}>
                        {formData.name || "Tên nhân viên"}
                      </div>
                      <div className={styles.previewPosition}>
                        {formData.position || "Chức vụ"}
                      </div>
                      <div className={styles.previewSalary}>
                        <div className={styles.salaryItem}>
                          <span>Lương cơ bản:</span>
                          <span>{formatCurrency(formData.baseSalary)}</span>
                        </div>
                        <div className={styles.salaryItem}>
                          <span>Thưởng:</span>
                          <span>{formatCurrency(formData.bonus)}</span>
                        </div>
                        <div className={styles.salaryItem}>
                          <span>Khấu trừ:</span>
                          <span>-{formatCurrency(formData.deduction)}</span>
                        </div>
                        <div className={styles.salaryItem}>
                          <span>Làm thêm giờ:</span>
                          <span>
                            {formatCurrency(
                              formData.overtime * formData.overtimeRate
                            )}
                          </span>
                        </div>
                        <div className={styles.salaryTotal}>
                          <span>Tổng nhận:</span>
                          <span>
                            {formatCurrency(
                              formData.baseSalary +
                                formData.bonus -
                                formData.deduction +
                                formData.overtime * formData.overtimeRate
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingEmployee(null);
                    }}
                  >
                    Hủy
                  </button>
                  <button type="submit" className={styles.saveBtn}>
                    {editingEmployee ? "Cập nhật" : "Thêm nhân viên"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Employee Salary Table */}
          <div className={styles.salaryCard}>
            <div className={styles.salaryHeader}>
              <h3 className={styles.salaryTitle}>
                Bảng lương nhân viên - Tháng {selectedMonth}/{selectedYear}
              </h3>
              <div className={styles.tableActions}>
                <select className={styles.filterSelect}>
                  <option value="all">Tất cả phòng ban</option>
                  <option value="sales">Phòng bán hàng</option>
                  <option value="kitchen">Bộ phận bếp</option>
                  <option value="delivery">Bộ phận giao hàng</option>
                  <option value="accounting">Phòng kế toán</option>
                </select>
              </div>
            </div>
            <div className={styles.salaryTableContainer}>
              <table className={styles.salaryTable}>
                <thead>
                  <tr>
                    <th onClick={() => requestSort("id")}>
                      ID{" "}
                      {sortConfig.key === "id" &&
                        (sortConfig.direction === "ascending" ? "▲" : "▼")}
                    </th>
                    <th>Nhân viên</th>
                    <th onClick={() => requestSort("baseSalary")}>
                      Lương cơ bản{" "}
                      {sortConfig.key === "baseSalary" &&
                        (sortConfig.direction === "ascending" ? "▲" : "▼")}
                    </th>
                    <th onClick={() => requestSort("bonus")}>
                      Thưởng{" "}
                      {sortConfig.key === "bonus" &&
                        (sortConfig.direction === "ascending" ? "▲" : "▼")}
                    </th>
                    <th onClick={() => requestSort("deduction")}>
                      Khấu trừ{" "}
                      {sortConfig.key === "deduction" &&
                        (sortConfig.direction === "ascending" ? "▲" : "▼")}
                    </th>
                    <th onClick={() => requestSort("overtime")}>
                      Giờ làm thêm{" "}
                      {sortConfig.key === "overtime" &&
                        (sortConfig.direction === "ascending" ? "▲" : "▼")}
                    </th>
                    <th onClick={() => requestSort("totalSalary")}>
                      Tổng lương{" "}
                      {sortConfig.key === "totalSalary" &&
                        (sortConfig.direction === "ascending" ? "▲" : "▼")}
                    </th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => {
                    const totalSalary = calculateTotalSalary(employee);

                    return (
                      <tr key={employee.id}>
                        <td>#{employee.id}</td>
                        <td>
                          <div className={styles.employeeCell}>
                            <img
                              src={employee.avatar}
                              alt={employee.name}
                              className={styles.employeeAvatar}
                            />
                            <div>
                              <div className={styles.employeeName}>
                                {employee.name}
                              </div>
                              <div className={styles.employeePosition}>
                                {employee.position}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{formatCurrency(employee.baseSalary)}</td>
                        <td>{formatCurrency(employee.bonus)}</td>
                        <td>{formatCurrency(employee.deduction)}</td>
                        <td>
                          {employee.overtime} giờ
                          <span className={styles.rateInfo}>
                            ({formatCurrency(employee.overtimeRate)}/giờ)
                          </span>
                        </td>
                        <td className={styles.totalSalary}>
                          {formatCurrency(totalSalary)}
                        </td>
                        <td>
                          <span
                            className={`${styles.statusBadge} ${styles.statusPaid}`}
                          >
                            Đã thanh toán
                          </span>
                        </td>
                        <td className={styles.actionCell}>
                          <button
                            className={styles.viewBtn}
                            title="Xem chi tiết"
                          >
                            👁️
                          </button>
                          <button
                            className={styles.editBtn}
                            title="Sửa thông tin"
                            onClick={() => handleEditEmployee(employee)}
                          >
                            ✏️
                          </button>
                          <button
                            className={styles.deleteBtn}
                            title="Xóa nhân viên"
                            onClick={() => handleDeleteEmployee(employee.id)}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredEmployees.length === 0 && (
                    <tr>
                      <td colSpan="9" className={styles.noRecords}>
                        Không tìm thấy dữ liệu phù hợp
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>
              Tổng kết chi trả lương - Tháng {selectedMonth}/{selectedYear}
            </h3>
            <div className={styles.summaryContent}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Tổng nhân viên:</span>
                <span className={styles.summaryValue}>
                  {totalStats.totalEmployees} người
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Tổng lương cơ bản:</span>
                <span className={styles.summaryValue}>
                  {formatCurrency(totalStats.totalBaseSalary)}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Tổng thưởng:</span>
                <span className={styles.summaryValue}>
                  {formatCurrency(totalStats.totalBonus)}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Tổng khấu trừ:</span>
                <span className={styles.summaryValue}>
                  {formatCurrency(totalStats.totalDeduction)}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>
                  Tổng phí làm thêm giờ:
                </span>
                <span className={styles.summaryValue}>
                  {formatCurrency(totalStats.totalOvertimePay)}
                </span>
              </div>
              <div className={`${styles.summaryItem} ${styles.summaryTotal}`}>
                <span className={styles.summaryLabel}>Tổng chi trả:</span>
                <span className={styles.summaryValue}>
                  {formatCurrency(totalStats.totalSalaryPaid)}
                </span>
              </div>
            </div>
            <div className={styles.approvalSection}>
              <div className={styles.approvalInfo}>
                <span className={styles.approvalLabel}>Phê duyệt bởi:</span>
                <span className={styles.approvalName}>Nguyễn Thị Hương</span>
                <span className={styles.approvalDate}>Ngày 25/10/2025</span>
              </div>
              <button className={styles.approveBtn}>
                Phê duyệt bảng lương
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
