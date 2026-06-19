import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav 
      className="navbar sticky-top px-4 py-3" 
      style={{ 
        background: "rgba(10, 10, 20, 0.8)", 
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        zIndex: 1060
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* 🛡️ Brand/Status Section */}
        <div className="d-flex align-items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="rounded-circle bg-danger shadow-lg"
            style={{ width: "12px", height: "12px", boxShadow: "0 0 10px #ff4d4d" }}
          ></motion.div>
          <span className="navbar-brand fw-bold text-white mb-0" style={{ letterSpacing: "1px" }}>
            SYSTEM <span className="text-danger">ADMIN</span>
          </span>
        </div>

        {/* 👤 Admin Profile & Actions */}
        <div className="d-flex align-items-center gap-4">
          
          <div className="d-none d-md-flex align-items-center gap-2">
            <div 
              className="text-end" 
              style={{ lineHeight: "1" }}
            >
              <small className="text-info d-block fw-bold" style={{ fontSize: "0.7rem" }}>ROOT ACCESS</small>
              <span className="text-white small">Vishal_Admin</span>
            </div>
            <div 
              className="rounded-3 d-flex align-items-center justify-content-center"
              style={{ 
                width: "40px", 
                height: "40px", 
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              👑
            </div>
          </div>

          <div className="vr text-white opacity-25" style={{ height: "30px" }}></div>

          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(220, 53, 69, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="btn btn-sm rounded-pill px-4 fw-bold"
            style={{ 
              color: "#ff4d4d", 
              border: "1px solid #ff4d4d",
              fontSize: "0.8rem"
            }}
          >
            TERMINATE SESSION
          </motion.button>

        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;