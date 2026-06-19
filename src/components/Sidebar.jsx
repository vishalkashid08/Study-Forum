import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Sidebar = () => {
  const menuItems = [
    { path: "/user/dashboard", name: "Dashboard", icon: "🚀" },
    { path: "/user/dashboard/questions", name: "Questions", icon: "💬" },
    { path: "/user/dashboard/notes", name: "Study Notes", icon: "📚" },
    { path: "/user/dashboard/ask", name: "Ask Anything", icon: "✨" },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="col-md-3 col-lg-2 min-vh-100 p-3"
      style={{
        background: "rgba(15, 23, 42, 0.6)", // Matches your login theme
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="mt-4">
        {menuItems.map((item, index) => (
          <NavLink key={index} to={item.path} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ scale: 1.05, x: 10, background: "rgba(99, 102, 241, 0.1)" }}
                className="p-3 mb-2 rounded-4 d-flex align-items-center"
                style={{
                  border: isActive ? "1px solid rgba(99, 102, 241, 0.5)" : "1px solid transparent",
                  background: isActive ? "linear-gradient(90deg, rgba(99, 102, 241, 0.2), transparent)" : "transparent",
                  color: isActive ? "#fff" : "#94a3b8",
                  transition: "all 0.3s ease"
                }}
              >
                <span className="me-3 fs-5">{item.icon}</span>
                <span className="fw-bold">{item.name}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </motion.div>
  );
};
export default Sidebar