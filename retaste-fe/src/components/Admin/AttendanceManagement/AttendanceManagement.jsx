import React, { useState, useEffect } from "react";
import styles from "./AttendanceManagement.module.css";

export default function AttendanceManagement() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [status, setStatus] = useState("present");
  const [notes, setNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMonth, setFilterMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  // Mock data
  const employees = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      department: "Bán hàng",
      position: "Nhân viên bán hàng",
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      department: "Kế toán",
      position: "Kế toán viên",
    },
    { id: 3, name: "Lê Văn Cường", department: "Kỹ thuật", position: "Kỹ sư" },
    {
      id: 4,
      name: "Phạm Thị Dung",
      department: "Nhân sự",
      position: "Chuyên viên nhân sự",
    },
    {
      id: 5,
      name: "Hoàng Văn Em",
      department: "Marketing",
      position: "Marketing Executive",
    },
  ];

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      employeeId: 1,
      employeeName: "Nguyễn Văn An",
      date: "2025-11-24",
      checkIn: "08:00",
      checkOut: "17:30",
      workingHours: "8.5",
      status: "present",
      notes: "",
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: "Trần Thị Bình",
      date: "2025-11-24",
      checkIn: "08:15",
      checkOut: "17:45",
      workingHours: "8.5",
      status: "late",
      notes: "Đến muộn 15 phút",
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: "Lê Văn Cường",
      date: "2025-11-24",
      checkIn: "",
      checkOut: "",
      workingHours: "0",
      status: "absent",
      notes: "Xin nghỉ phép",
    },
    {
      id: 4,
      employeeId: 4,
      employeeName: "Phạm Thị Dung",
      date: "2025-11-24",
      checkIn: "08:00",
      checkOut: "12:00",
      workingHours: "4",
      status: "half_day",
      notes: "Nghỉ nửa ngày",
    },
  ]);

  // Calculate working hours when check in/out times change
  useEffect(() => {
    if (checkInTime && checkOutTime) {
      const checkIn = new Date(`2000-01-01 ${checkInTime}`);
      const checkOut = new Date(`2000-01-01 ${checkOutTime}`);
      const diffHours = (checkOut - checkIn) / (1000 * 60 * 60);
      setWorkingHours(diffHours > 0 ? diffHours.toFixed(1) : "0");
    }
  }, [checkInTime, checkOutTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEmployee || !selectedDate) {
      alert("Vui lòng chọn nhân viên và ngày!");
      return;
    }

    const newRecord = {
      id: Date.now(),
      employeeId: parseInt(selectedEmployee),
      employeeName:
        employees.find((emp) => emp.id === parseInt(selectedEmployee))?.name ||
        "",
      date: selectedDate,
      checkIn: checkInTime,
      checkOut: checkOutTime,
      workingHours: workingHours,
      status: status,
      notes: notes,
    };

    setAttendanceRecords((prev) => [...prev, newRecord]);

    // Reset form
    setSelectedEmployee("");
    setCheckInTime("");
    setCheckOutTime("");
    setWorkingHours("");
    setStatus("present");
    setNotes("");

    alert("Đã thêm bản ghi chấm công thành công!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bản ghi này?")) {
      setAttendanceRecords((prev) => prev.filter((record) => record.id !== id));
    }
  };

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch = record.employeeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || record.status === filterStatus;
    const matchesMonth = record.date.slice(0, 7) === filterMonth;
    return matchesSearch && matchesStatus && matchesMonth;
  });

  const getStatusText = (status) => {
    const statusMap = {
      present: "Có mặt",
      absent: "Vắng mặt",
      late: "Đi muộn",
      early_leave: "Về sớm",
      half_day: "Nửa ngày",
      overtime: "Tăng ca",
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    return (
      {
        present: styles.statusPresent,
        absent: styles.statusAbsent,
        late: styles.statusLate,
        early_leave: styles.statusEarlyLeave,
        half_day: styles.statusHalfDay,
        overtime: styles.statusOvertime,
      }[status] || ""
    );
  };
  return (
    <>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <button className={styles.toggleSidebar}>☰</button>
          <div className={styles.headerTitle}>Quản lý chấm công</div>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
          <div className={styles.breadcrumbCurrent}>Quản lý chấm công</div>
        </div>

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Quản lý chấm công</h1>
            <div className={styles.headerStats}>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>👥</span>
                <div className={styles.statInfo}>
                  <div className={styles.statNumber}>45</div>
                  <div className={styles.statLabel}>Tổng nhân viên</div>
                </div>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>✅</span>
                <div className={styles.statInfo}>
                  <div className={styles.statNumber}>42</div>
                  <div className={styles.statLabel}>Có mặt hôm nay</div>
                </div>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>❌</span>
                <div className={styles.statInfo}>
                  <div className={styles.statNumber}>3</div>
                  <div className={styles.statLabel}>Vắng mặt</div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Form */}
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Thêm bản ghi chấm công</h3>
            </div>
            <form onSubmit={handleSubmit} className={styles.attendanceForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Nhân viên <span className={styles.required}>*</span>
                  </label>
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className={styles.select}
                    required
                  >
                    <option value="">Chọn nhân viên...</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} - {emp.position}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Ngày <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Trạng thái</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={styles.select}
                  >
                    <option value="present">Có mặt</option>
                    <option value="absent">Vắng mặt</option>
                    <option value="late">Đi muộn</option>
                    <option value="early_leave">Về sớm</option>
                    <option value="half_day">Nửa ngày</option>
                    <option value="overtime">Tăng ca</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Giờ vào</label>
                  <input
                    type="time"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Giờ ra</label>
                  <input
                    type="time"
                    value={checkOutTime}
                    onChange={(e) => setCheckOutTime(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Số giờ làm</label>
                  <input
                    type="number"
                    step="0.1"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    className={styles.input}
                    readOnly
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Ghi chú</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={styles.textarea}
                    rows="3"
                    placeholder="Nhập ghi chú (tùy chọn)..."
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>
                  💾 Lưu bản ghi
                </button>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={() => {
                    setSelectedEmployee("");
                    setCheckInTime("");
                    setCheckOutTime("");
                    setWorkingHours("");
                    setStatus("present");
                    setNotes("");
                  }}
                >
                  🔄 Đặt lại
                </button>
              </div>
            </form>
          </div>

          {/* Attendance Records */}
          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <h3 className={styles.tableTitle}>Bản ghi chấm công</h3>
              <div className={styles.tableFilters}>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="present">Có mặt</option>
                  <option value="absent">Vắng mặt</option>
                  <option value="late">Đi muộn</option>
                  <option value="early_leave">Về sớm</option>
                  <option value="half_day">Nửa ngày</option>
                  <option value="overtime">Tăng ca</option>
                </select>
                <input
                  type="month"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className={styles.filterMonth}
                />
                <button className={styles.exportBtn}>📊 Xuất Excel</button>
              </div>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.attendanceTable}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Nhân viên</th>
                    <th>Ngày</th>
                    <th>Giờ vào</th>
                    <th>Giờ ra</th>
                    <th>Số giờ làm</th>
                    <th>Trạng thái</th>
                    <th>Ghi chú</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr key={record.id}>
                      <td>{index + 1}</td>
                      <td className={styles.employeeName}>
                        {record.employeeName}
                      </td>
                      <td>
                        {new Date(record.date).toLocaleDateString("vi-VN")}
                      </td>
                      <td>{record.checkIn || "-"}</td>
                      <td>{record.checkOut || "-"}</td>
                      <td>{record.workingHours}h</td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${getStatusClass(
                            record.status
                          )}`}
                        >
                          {getStatusText(record.status)}
                        </span>
                      </td>
                      <td className={styles.notes}>{record.notes || "-"}</td>
                      <td className={styles.actionCell}>
                        <button className={styles.editBtn}>✏️</button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(record.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRecords.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📋</div>
                <div className={styles.emptyText}>
                  Không có bản ghi chấm công nào
                </div>
                <div className={styles.emptySubtext}>
                  Thêm bản ghi chấm công đầu tiên của bạn
                </div>
              </div>
            )}
          </div>

          {/* Monthly Summary */}
          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                Tổng kết tháng{" "}
                {new Date(filterMonth).toLocaleDateString("vi-VN", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
            </div>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>👥</div>
                <div className={styles.summaryInfo}>
                  <div className={styles.summaryNumber}>
                    {filteredRecords.length}
                  </div>
                  <div className={styles.summaryLabel}>Tổng bản ghi</div>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>✅</div>
                <div className={styles.summaryInfo}>
                  <div className={styles.summaryNumber}>
                    {
                      filteredRecords.filter((r) => r.status === "present")
                        .length
                    }
                  </div>
                  <div className={styles.summaryLabel}>Có mặt</div>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>⏰</div>
                <div className={styles.summaryInfo}>
                  <div className={styles.summaryNumber}>
                    {filteredRecords.filter((r) => r.status === "late").length}
                  </div>
                  <div className={styles.summaryLabel}>Đi muộn</div>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>❌</div>
                <div className={styles.summaryInfo}>
                  <div className={styles.summaryNumber}>
                    {
                      filteredRecords.filter((r) => r.status === "absent")
                        .length
                    }
                  </div>
                  <div className={styles.summaryLabel}>Vắng mặt</div>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>🕒</div>
                <div className={styles.summaryInfo}>
                  <div className={styles.summaryNumber}>
                    {filteredRecords
                      .reduce(
                        (total, record) =>
                          total + parseFloat(record.workingHours || 0),
                        0
                      )
                      .toFixed(1)}
                    h
                  </div>
                  <div className={styles.summaryLabel}>Tổng giờ làm</div>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>⏲️</div>
                <div className={styles.summaryInfo}>
                  <div className={styles.summaryNumber}>
                    {
                      filteredRecords.filter((r) => r.status === "overtime")
                        .length
                    }
                  </div>
                  <div className={styles.summaryLabel}>Tăng ca</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
