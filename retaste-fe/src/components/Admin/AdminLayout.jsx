import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

export default function AdminLayout() {
  return (
    <div>
      <Sidebar />
      <div style={{ marginTop: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
