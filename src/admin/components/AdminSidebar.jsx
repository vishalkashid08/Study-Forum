import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function AdminSidebar() {
  const adminLinks = [
    { path: "/admin/dashboard", name: "Overview", icon: "📊" },
    { path: "/admin/users", name: "Manage Users", icon: "🛡️" },
    { path: "/admin/questions", name: "Manage Content", icon: "📑" },
  ];

  return (
    <div 
      className="d-flex flex-column p-3 vh-100 shadow-lg" 
      style={{
        width: "260px",
        background: "rgba(15, 23, 42, 0.8)", // Darker glass for focus
        backdropFilter: "blur(25px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        position: "sticky",
        top: 0
      }}
    >
      {/* 🚀 LOGO SECTION */}
      <div className="text-center my-4 py-2 border-bottom border-secondary border-opacity-25">
        <h5 className="fw-bold text-white mb-0" style={{ letterSpacing: "2px" }}>
          Study<span className="text-danger">.Forum</span>
        </h5>
        <small className="text-muted" style={{ fontSize: "0.65rem" }}>ADMINISTRATOR PANEL</small>
      </div>

      {/* 🛠 NAVIGATION LINKS */}
      <div className="nav flex-column gap-2 flex-grow-1">
        {adminLinks.map((link, index) => (
          <NavLink 
            key={index}
            to={link.path} 
            className="text-decoration-none"
          >
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-4 d-flex align-items-center transition-all"
                style={{
                  background: isActive ? "linear-gradient(90deg, rgba(220, 53, 69, 0.15), transparent)" : "transparent",
                  borderLeft: isActive ? "4px solid #dc3545" : "4px solid transparent",
                  color: isActive ? "#fff" : "#94a3b8",
                  fontWeight: isActive ? "600" : "400"
                }}
              >
                <span className="me-3 fs-5">{link.icon}</span>
                <span>{link.name}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>

      {/* 🚪 SYSTEM EXIT */}
      <div className="mt-auto pt-4 border-top border-secondary border-opacity-25">
        <NavLink to="/" className="text-decoration-none">
          <motion.div 
            whileHover={{ x: 5, color: "#ff4d4d" }}
            className="p-3 text-danger d-flex align-items-center opacity-75 fw-bold small"
          >
            <span className="me-2">⚠️</span> DE-AUTHORIZE
          </motion.div>
        </NavLink>
      </div>
    </div>
  );
}

export default AdminSidebar;