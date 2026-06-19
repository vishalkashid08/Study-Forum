import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";

function AdminLayout({ children }) {
  return (
    <div className="d-flex" style={{ 
      minHeight: "100vh", 
      background: "#0b0e14", // Deep space background for admin
      overflowX: "hidden" 
    }}>
      
      {/* 1. Left Fixed Sidebar */}
      <AdminSidebar />

      {/* 2. Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column">
        
        {/* Top Sticky Navbar */}
        <AdminNavbar />

        {/* Dynamic Page Content */}
        <main className="p-4 flex-grow-1">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              key={window.location.pathname} // Forces animation on route change
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Subtle System Status Footer (Optional Admin touch) */}
        <footer className="px-4 py-2 border-top border-secondary border-opacity-10">
          <small className="text-muted opacity-50" style={{ fontSize: '0.65rem' }}>
            SYSTEM STATUS: <span className="text-success">ENCRYPTED</span> | PORT: 8082
          </small>
        </footer>
      </div>

    </div>
  );
}

export default AdminLayout;