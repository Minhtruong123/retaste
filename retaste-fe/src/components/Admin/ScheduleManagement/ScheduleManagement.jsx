import React, { useState, useEffect } from "react";
import styles from "./ScheduleManagement.module.css";

export default function ScheduleManagement() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [view, setView] = useState("day"); // day, week, month
  const [schedules, setSchedules] = useState([]);
  const [employeeRequests, setEmployeeRequests] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterShift, setFilterShift] = useState("all");
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Mock data
  const employees = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      department: "Bán hàng",
      position: "Nhân viên bán hàng",
      avatar: "👨‍💼",
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      department: "Kế toán",
      position: "Kế toán viên",
      avatar: "👩‍💼",
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      department: "Kỹ thuật",
      position: "Kỹ sư",
      avatar: "👨‍💻",
    },
    {
      id: 4,
      name: "Phạm Thị Dung",
      department: "Nhân sự",
      position: "Chuyên viên nhân sự",
      avatar: "👩‍💼",
    },
    {
      id: 5,
      name: "Hoàng Văn Em",
      department: "Marketing",
      position: "Marketing Executive",
      avatar: "👨‍💼",
    },
  ];

  const shifts = [
    { id: 1, name: "Ca sáng", color: "#28a745" },
    { id: 2, name: "Ca chiều", color: "#6610f2" },
    { id: 3, name: "Ca tối", color: "#17a2b8" },
    { id: 4, name: "Ca đêm", color: "#6c757d" },
  ];

  // Mock schedule data
  const initialSchedules = [
    {
      id: 1,
      employeeId: 1,
      employeeName: "Nguyễn Văn An",
      date: "2025-11-25",
      shiftId: 1,
      shiftName: "Ca sáng",
      startTime: "08:00",
      endTime: "12:00",
      notes: "",
      color: "#28a745",
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: "Trần Thị Bình",
      date: "2025-11-25",
      shiftId: 2,
      shiftName: "Ca chiều",
      startTime: "13:00",
      endTime: "17:00",
      notes: "",
      color: "#6610f2",
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: "Lê Văn Cường",
      date: "2025-11-25",
      shiftId: 3,
      shiftName: "Ca tối",
      startTime: "18:00",
      endTime: "22:00",
      notes: "",
      color: "#17a2b8",
    },
    {
      id: 4,
      employeeId: 4,
      employeeName: "Phạm Thị Dung",
      date: "2025-11-25",
      shiftId: 4,
      shiftName: "Ca đêm",
      startTime: "22:00",
      endTime: "06:00",
      notes: "Ca kéo dài qua ngày hôm sau",
      color: "#6c757d",
    },
    {
      id: 5,
      employeeId: 5,
      employeeName: "Hoàng Văn Em",
      date: "2025-11-25",
      shiftId: 1,
      shiftName: "Ca sáng",
      startTime: "08:00",
      endTime: "12:00",
      notes: "",
      color: "#28a745",
    },
  ];

  // Mock employee schedule requests
  const initialEmployeeRequests = [
    {
      id: 1,
      employeeId: 1,
      employeeName: "Nguyễn Văn An",
      weekStartDate: "2025-12-02",
      status: "pending",
      preferredShifts: [
        { dayOfWeek: "Thứ hai", shiftId: 1 },
        { dayOfWeek: "Thứ ba", shiftId: 1 },
        { dayOfWeek: "Thứ tư", shiftId: 2 },
        { dayOfWeek: "Thứ năm", shiftId: 2 },
        { dayOfWeek: "Thứ sáu", shiftId: 1 },
      ],
      notes: "Tôi muốn nghỉ cuối tuần để thăm gia đình",
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: "Trần Thị Bình",
      weekStartDate: "2025-12-02",
      status: "pending",
      preferredShifts: [
        { dayOfWeek: "Thứ hai", shiftId: 2 },
        { dayOfWeek: "Thứ ba", shiftId: 2 },
        { dayOfWeek: "Thứ tư", shiftId: 2 },
        { dayOfWeek: "Thứ năm", shiftId: 3 },
        { dayOfWeek: "Thứ sáu", shiftId: 3 },
      ],
      notes: "Tôi cần nghỉ thứ bảy để đi học",
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: "Lê Văn Cường",
      weekStartDate: "2025-12-02",
      status: "pending",
      preferredShifts: [
        { dayOfWeek: "Thứ hai", shiftId: 3 },
        { dayOfWeek: "Thứ ba", shiftId: 3 },
        { dayOfWeek: "Thứ tư", shiftId: 3 },
        { dayOfWeek: "Thứ năm", shiftId: 3 },
        { dayOfWeek: "Thứ sáu", shiftId: 3 },
        { dayOfWeek: "Thứ bảy", shiftId: 3 },
      ],
      notes: "Tôi chỉ muốn làm ca tối",
    },
  ];

  useEffect(() => {
    setSchedules(initialSchedules);
    setEmployeeRequests(initialEmployeeRequests);
  }, []);

  const getWeekDates = () => {
    const dates = [];
    const curr = new Date(selectedDate);
    const first =
      curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1);

    for (let i = 0; i < 7; i++) {
      const date = new Date(curr);
      date.setDate(first + i);
      dates.push(date);
    }

    return dates;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEmployee || !selectedShift || !startTime || !endTime) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const selectedShiftObj = shifts.find(
      (s) => s.id === parseInt(selectedShift)
    );
    const emp = employees.find((e) => e.id === parseInt(selectedEmployee));

    const newSchedule = {
      id: Date.now(),
      employeeId: parseInt(selectedEmployee),
      employeeName: emp.name,
      date: selectedDate,
      shiftId: parseInt(selectedShift),
      shiftName: selectedShiftObj.name,
      startTime: startTime,
      endTime: endTime,
      notes: notes,
      color: selectedShiftObj.color,
    };

    setSchedules([...schedules, newSchedule]);

    // Reset form
    setSelectedEmployee("");
    setSelectedShift("");
    setStartTime("");
    setEndTime("");
    setNotes("");

    alert("Đã thêm lịch làm việc thành công!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa lịch làm này?")) {
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
    }
  };

  const handleApproveRequest = (id) => {
    setEmployeeRequests(
      employeeRequests.map((request) =>
        request.id === id ? { ...request, status: "approved" } : request
      )
    );
  };

  const handleRejectRequest = (id) => {
    setEmployeeRequests(
      employeeRequests.map((request) =>
        request.id === id ? { ...request, status: "rejected" } : request
      )
    );
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("vi-VN", { weekday: "long" }).format(date);
  };

  const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch = schedule.employeeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesShift =
      filterShift === "all" || schedule.shiftId === parseInt(filterShift);
    const matchesDate = schedule.date === filterDate;
    return matchesSearch && matchesShift && matchesDate;
  });
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
          <div className={styles.breadcrumbCurrent}>Quản lý lịch làm việc</div>
        </div>

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Quản lý lịch làm việc</h1>
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewBtn} ${
                  view === "day" ? styles.active : ""
                }`}
                onClick={() => setView("day")}
              >
                Ngày
              </button>
              <button
                className={`${styles.viewBtn} ${
                  view === "week" ? styles.active : ""
                }`}
                onClick={() => setView("week")}
              >
                Tuần
              </button>
              <button
                className={`${styles.viewBtn} ${
                  view === "month" ? styles.active : ""
                }`}
                onClick={() => setView("month")}
              >
                Tháng
              </button>
            </div>
          </div>

          <div className={styles.dateNavigation}>
            <button
              className={styles.navBtn}
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(
                  newDate.getDate() -
                    (view === "day" ? 1 : view === "week" ? 7 : 30)
                );
                setSelectedDate(newDate.toISOString().split("T")[0]);
                setFilterDate(newDate.toISOString().split("T")[0]);
              }}
            >
              ←{" "}
              {view === "day"
                ? "Hôm qua"
                : view === "week"
                ? "Tuần trước"
                : "Tháng trước"}
            </button>

            <div className={styles.currentDate}>
              {view === "day" ? (
                <h2>
                  {getDayName(selectedDate)}, {getFormattedDate(selectedDate)}
                </h2>
              ) : view === "week" ? (
                <h2>
                  Tuần từ {getFormattedDate(getWeekDates()[0])} đến{" "}
                  {getFormattedDate(getWeekDates()[6])}
                </h2>
              ) : (
                <h2>
                  Tháng {new Date(selectedDate).getMonth() + 1}/
                  {new Date(selectedDate).getFullYear()}
                </h2>
              )}
              <button
                className={styles.todayBtn}
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0];
                  setSelectedDate(today);
                  setFilterDate(today);
                }}
              >
                Hôm nay
              </button>
            </div>

            <button
              className={styles.navBtn}
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(
                  newDate.getDate() +
                    (view === "day" ? 1 : view === "week" ? 7 : 30)
                );
                setSelectedDate(newDate.toISOString().split("T")[0]);
                setFilterDate(newDate.toISOString().split("T")[0]);
              }}
            >
              {view === "day"
                ? "Ngày mai"
                : view === "week"
                ? "Tuần tới"
                : "Tháng tới"}{" "}
              →
            </button>
          </div>

          {/* Shift Assignment Form */}
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Phân ca làm việc</h3>
            </div>
            <form onSubmit={handleSubmit} className={styles.scheduleForm}>
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
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setFilterDate(e.target.value);
                    }}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Ca làm việc <span className={styles.required}>*</span>
                  </label>
                  <select
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value)}
                    className={styles.select}
                    required
                  >
                    <option value="">Chọn ca làm việc...</option>
                    {shifts.map((shift) => (
                      <option key={shift.id} value={shift.id}>
                        {shift.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Giờ bắt đầu <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Giờ kết thúc <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Ghi chú</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={styles.input}
                    placeholder="Thêm ghi chú nếu cần..."
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>
                  💾 Lưu lịch làm việc
                </button>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={() => {
                    setSelectedEmployee("");
                    setSelectedShift("");
                    setStartTime("");
                    setEndTime("");
                    setNotes("");
                  }}
                >
                  🔄 Đặt lại
                </button>
              </div>
            </form>
          </div>

          {/* Day View */}
          {view === "day" && (
            <div className={styles.tableCard}>
              <div className={styles.tableHeader}>
                <h3 className={styles.tableTitle}>
                  Lịch làm việc ngày {getFormattedDate(selectedDate)}
                </h3>
                <div className={styles.tableFilters}>
                  <select
                    value={filterShift}
                    onChange={(e) => setFilterShift(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">Tất cả ca làm việc</option>
                    {shifts.map((shift) => (
                      <option key={shift.id} value={shift.id}>
                        {shift.name}
                      </option>
                    ))}
                  </select>
                  <button className={styles.exportBtn}>📊 Xuất Excel</button>
                </div>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.scheduleTable}>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Nhân viên</th>
                      <th>Ca làm việc</th>
                      <th>Giờ bắt đầu</th>
                      <th>Giờ kết thúc</th>
                      <th>Tổng giờ</th>
                      <th>Ghi chú</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedules.map((schedule, index) => (
                      <tr key={schedule.id}>
                        <td>{index + 1}</td>
                        <td className={styles.employeeCell}>
                          <div className={styles.employeeAvatar}>
                            {employees.find((e) => e.id === schedule.employeeId)
                              ?.avatar || "👤"}
                          </div>
                          <div className={styles.employeeInfo}>
                            <div className={styles.employeeName}>
                              {schedule.employeeName}
                            </div>
                            <div className={styles.employeePosition}>
                              {employees.find(
                                (e) => e.id === schedule.employeeId
                              )?.position || ""}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className={styles.shiftBadge}
                            style={{ backgroundColor: schedule.color }}
                          >
                            {schedule.shiftName}
                          </span>
                        </td>
                        <td>{schedule.startTime}</td>
                        <td>{schedule.endTime}</td>
                        <td>
                          {(() => {
                            const start = new Date(
                              `2000-01-01T${schedule.startTime}`
                            );
                            const end = new Date(
                              `2000-01-01T${schedule.endTime}`
                            );
                            let diff = (end - start) / 3600000;
                            if (diff < 0) diff += 24; // Handle overnight shifts
                            return `${diff} giờ`;
                          })()}
                        </td>
                        <td className={styles.notes}>
                          {schedule.notes || "-"}
                        </td>
                        <td className={styles.actionCell}>
                          <button className={styles.editBtn} title="Chỉnh sửa">
                            ✏️
                          </button>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDelete(schedule.id)}
                            title="Xóa"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredSchedules.length === 0 && (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📅</div>
                  <div className={styles.emptyText}>
                    Không có lịch làm việc nào trong ngày này
                  </div>
                  <div className={styles.emptySubtext}>
                    Thêm lịch làm việc cho nhân viên bằng biểu mẫu phía trên
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Week View */}
          {view === "week" && (
            <div className={styles.tableCard}>
              <div className={styles.tableHeader}>
                <h3 className={styles.tableTitle}>Lịch làm việc trong tuần</h3>
                <div className={styles.tableFilters}>
                  <button className={styles.exportBtn}>📊 Xuất Excel</button>
                </div>
              </div>

              <div className={styles.weekViewContainer}>
                <div className={styles.weekGrid}>
                  <div className={styles.weekHeader}>
                    <div className={styles.weekTimeCol}>Giờ</div>
                    {getWeekDates().map((date, index) => (
                      <div key={index} className={styles.weekDayCol}>
                        <div className={styles.weekDayName}>
                          {new Intl.DateTimeFormat("vi-VN", {
                            weekday: "short",
                          }).format(date)}
                        </div>
                        <div className={styles.weekDayDate}>
                          {date.getDate()}/{date.getMonth() + 1}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.weekBody}>
                    {Array.from({ length: 24 }, (_, hour) => (
                      <div key={hour} className={styles.weekRow}>
                        <div className={styles.weekTimeCol}>{hour}:00</div>
                        {getWeekDates().map((date, dayIndex) => {
                          const dateStr = date.toISOString().split("T")[0];
                          const hourSchedules = schedules.filter(
                            (s) =>
                              s.date === dateStr &&
                              parseInt(s.startTime.split(":")[0]) <= hour &&
                              parseInt(s.endTime.split(":")[0]) > hour
                          );

                          return (
                            <div key={dayIndex} className={styles.weekDayCol}>
                              {hourSchedules.map((schedule) => (
                                <div
                                  key={schedule.id}
                                  className={styles.weekEvent}
                                  style={{
                                    backgroundColor: schedule.color,
                                    opacity:
                                      schedule.startTime.split(":")[0] == hour
                                        ? 1
                                        : 0.8,
                                  }}
                                >
                                  {schedule.startTime.split(":")[0] == hour && (
                                    <>
                                      <div className={styles.weekEventName}>
                                        {schedule.employeeName}
                                      </div>
                                      <div className={styles.weekEventTime}>
                                        {schedule.startTime} -{" "}
                                        {schedule.endTime}
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Yêu cầu lịch làm việc của nhân viên */}
          <div className={styles.tableCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                Yêu cầu lịch làm việc tuần tới từ nhân viên
              </h3>
            </div>

            {employeeRequests.length > 0 ? (
              <div className={styles.requestsContainer}>
                {employeeRequests.map((request) => (
                  <div key={request.id} className={styles.requestCard}>
                    <div className={styles.requestHeader}>
                      <div className={styles.employeeCell}>
                        <div className={styles.employeeAvatar}>
                          {employees.find((e) => e.id === request.employeeId)
                            ?.avatar || "👤"}
                        </div>
                        <div className={styles.employeeInfo}>
                          <div className={styles.employeeName}>
                            {request.employeeName}
                          </div>
                          <div className={styles.employeePosition}>
                            {employees.find((e) => e.id === request.employeeId)
                              ?.position || ""}
                          </div>
                        </div>
                      </div>
                      <div className={styles.requestStatus}>
                        <span
                          className={`${styles.statusBadge} ${
                            styles[
                              `status${
                                request.status.charAt(0).toUpperCase() +
                                request.status.slice(1)
                              }`
                            ]
                          }`}
                        >
                          {request.status === "pending"
                            ? "Đang chờ duyệt"
                            : request.status === "approved"
                            ? "Đã duyệt"
                            : "Từ chối"}
                        </span>
                      </div>
                    </div>

                    <div className={styles.requestDetails}>
                      <div className={styles.requestWeek}>
                        Tuần từ{" "}
                        {new Date(request.weekStartDate).toLocaleDateString(
                          "vi-VN"
                        )}
                      </div>

                      <div className={styles.preferredShifts}>
                        <table className={styles.preferredShiftsTable}>
                          <thead>
                            <tr>
                              <th>Ngày</th>
                              <th>Ca làm việc yêu cầu</th>
                            </tr>
                          </thead>
                          <tbody>
                            {request.preferredShifts.map((shift, index) => (
                              <tr key={index}>
                                <td>{shift.dayOfWeek}</td>
                                <td>
                                  <span
                                    className={styles.shiftBadge}
                                    style={{
                                      backgroundColor:
                                        shifts.find(
                                          (s) => s.id === shift.shiftId
                                        )?.color || "#ccc",
                                    }}
                                  >
                                    {shifts.find((s) => s.id === shift.shiftId)
                                      ?.name || "N/A"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {request.notes && (
                        <div className={styles.requestNotes}>
                          <strong>Ghi chú:</strong> {request.notes}
                        </div>
                      )}
                    </div>

                    {request.status === "pending" && (
                      <div className={styles.requestActions}>
                        <button
                          className={styles.approveBtn}
                          onClick={() => handleApproveRequest(request.id)}
                        >
                          ✓ Chấp nhận
                        </button>
                        <button
                          className={styles.rejectBtn}
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          ✗ Từ chối
                        </button>
                        <button className={styles.editRequestBtn}>
                          ✏️ Điều chỉnh
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📝</div>
                <div className={styles.emptyText}>
                  Không có yêu cầu lịch làm việc nào cho tuần tới
                </div>
              </div>
            )}
          </div>

          {/* Tổng quan ca làm việc trong ngày */}
          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                Tổng quan lịch làm việc ngày {getFormattedDate(selectedDate)}
              </h3>
            </div>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>👥</div>
                <div className={styles.summaryInfo}>
                  <div className={styles.summaryNumber}>
                    {filteredSchedules.length}
                  </div>
                  <div className={styles.summaryLabel}>
                    Tổng nhân viên làm việc
                  </div>
                </div>
              </div>
              {shifts.map((shift) => {
                const count = filteredSchedules.filter(
                  (s) => s.shiftId === shift.id
                ).length;
                return (
                  <div
                    key={shift.id}
                    className={styles.summaryItem}
                    style={{ borderLeftColor: shift.color }}
                  >
                    <div className={styles.summaryIcon}>🕒</div>
                    <div className={styles.summaryInfo}>
                      <div
                        className={styles.summaryNumber}
                        style={{ color: shift.color }}
                      >
                        {count}
                      </div>
                      <div className={styles.summaryLabel}>{shift.name}</div>
                    </div>
                  </div>
                );
              })}
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>⏱️</div>
                <div className={styles.summaryInfo}>
                  <div className={styles.summaryNumber}>
                    {(() => {
                      let totalHours = 0;
                      filteredSchedules.forEach((schedule) => {
                        const start = new Date(
                          `2000-01-01T${schedule.startTime}`
                        );
                        const end = new Date(`2000-01-01T${schedule.endTime}`);
                        let diff = (end - start) / 3600000;
                        if (diff < 0) diff += 24;
                        totalHours += diff;
                      });
                      return `${totalHours.toFixed(1)}h`;
                    })()}
                  </div>
                  <div className={styles.summaryLabel}>Tổng giờ làm việc</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
