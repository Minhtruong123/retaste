import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spin, Alert } from "antd";
import "./VerifyAccount.css";
import { useAuth } from "../../context/AuthContext";

export default function VerifyAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const { verifyAccount } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Token không hợp lệ hoặc bị thiếu.");
      setTimeout(() => navigate("/auth"), 3000);
      return;
    }

    const verify = async () => {
      try {
        await verifyAccount(token);
        setStatus("success");
        setMessage("Xác minh thành công! Đang chuyển hướng...");
        setTimeout(() => navigate("/auth"), 2000);
      } catch (error) {
        setStatus("error");
        setMessage(error || "Xác minh thất bại.");
        setTimeout(() => navigate("/auth"), 3000);
      }
    };

    verify();
  }, [location, navigate]);
  return (
    <>
      <div className="verify-container">
        <div className="verify-card">
          {status === "loading" && (
            <div className="loading">
              <Spin size="large" />
              <p>Đang xác minh tài khoản...</p>
            </div>
          )}

          {status === "success" && (
            <Alert
              message="Thành công!"
              description={message}
              type="success"
              showIcon
            />
          )}

          {status === "error" && (
            <Alert
              message="Lỗi xác minh"
              description={message}
              type="error"
              showIcon
            />
          )}
        </div>
      </div>
    </>
  );
}
