import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/Client/Pages/HomePage";
import MenuPage from "./components/Client/Pages/MenuPage";
import ComboPage from "./components/Client/Pages/ComboPage";
import SuggestedDishesPage from "./components/Client/Pages/SuggestedDishesPage";
import AboutUsPage from "./components/Client/Pages/AboutUsPage";
import ContactPage from "./components/Client/Pages/ContactPage";
import AuthForm from "./components/Auth/AuthForm";
import OrderConfirmation from "./components/Client/Pages/OrderConfirmation";
import PaymentPage from "./components/Client/Pages/PaymentPage";
import DetailProductPage from "./components/Client/Pages/DetailProductPage";
import Layout from "./components/Client/Pages/Layout";
import VerifyAccount from "./components/Auth/VerifyAccount";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import AdminLayout from "./components/Admin/AdminLayout";
import DeliveryManagement from "./components/Admin/DeliveryManagement/DeliveryManagement";
import OrderManagement from "./components/Admin/OrderManagement/OrderManagement";
import RevenueManagement from "./components/Admin/RevenueManagement/RevenueManagement";
import EmployeeManagement from "./components/Admin/EmployeeManagement/EmployeeManagement";
import ScheduleManagement from "./components/Admin/ScheduleManagement/ScheduleManagement";
import SalaryManagement from "./components/Admin/SalaryManagement/SalaryManagement";
import ProductManagement from "./components/Admin/ProductManagement/ProductManagement";
import CategoryManagement from "./components/Admin/CategoryManagement/CategoryManagement";
import ScrollToTop from "./components/Client/Pages/ScrollToTop";

const getRole = () => localStorage.getItem("role");

function RootRedirect() {
  const role = getRole();

  if (!role) return <Navigate to="/auth" replace />;
  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "staff") return <Navigate to="/staff" replace />;
  return <Navigate to="/home" replace />;
}

function AuthRedirect() {
  const role = getRole();
  if (!role) return <AuthForm />;

  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "staff") return <Navigate to="/staff" replace />;
  return <Navigate to="/home" replace />;
}

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<RootRedirect />} />

          <Route path="/auth" element={<AuthRedirect />} />
          <Route path="/verify" element={<VerifyAccount />} />

          <Route
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/combo" element={<ComboPage />} />
            <Route path="/suggest" element={<SuggestedDishesPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/order_confirmation" element={<OrderConfirmation />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route
              path="/detail_product/:productId"
              element={<DetailProductPage />}
            />
          </Route>

          {/* 4. ADMIN ROUTES */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="delivery_management"
              element={<DeliveryManagement />}
            />
            <Route path="order_management" element={<OrderManagement />} />
            <Route path="revenue_management" element={<RevenueManagement />} />
            <Route
              path="employee_management"
              element={<EmployeeManagement />}
            />
            <Route
              path="schedule_management"
              element={<ScheduleManagement />}
            />
            <Route path="salary_management" element={<SalaryManagement />} />
            <Route path="product_management" element={<ProductManagement />} />
            <Route
              path="category_management"
              element={<CategoryManagement />}
            />
          </Route>

          {/* 5. STAFF ROUTES */}
          {/* <Route
            path="/staff/*"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <StaffLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StaffDashboard />} />
          </Route> */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
