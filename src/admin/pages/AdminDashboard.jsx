import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../AdminLayout";

function AdminDashboard() {
  const navigate = useNavigate();
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  
  // State for dashboard counts
  const [counts, setCounts] = useState({
    users: 0,
    questions: 0,
    answers: 0
  });

  useEffect(() => {
    // Only fetch data if the user is authenticated and has the ADMIN role
    if (user && user.role === "ADMIN") {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          
          /**
           * CRITICAL UPDATES:
           * 1. URL changed to http://localhost:9090 (The API Gateway).
           * 2. Path changed to /users/stats to match your UserController @GetMapping("/stats").
           */
          const response = await fetch("http://http://3.110.167.15:9090/users/stats", { 
            method: "GET",
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            } 
          });

          // PREVENT "Unexpected end of JSON input":
          // If the status is 403 or 401, the server returns HTML/Empty body. 
          // We must check response.ok before calling .json()
          if (!response.ok) {
            console.error(`Server error: ${response.status} ${response.statusText}`);
            return; 
          }

          const data = await response.json();
          
          // Map backend Map keys to frontend state keys
          setCounts({
            users: data.userCount || 0,
            questions: data.questionCount || 0,
            answers: data.answerCount || 0
          });
        } catch (error) {
          console.error("Error fetching dashboard stats:", error);
        }
      };

      fetchData();
    }
  }, []);

  // 🛡️ Access Denied View (Unchanged logic, improved robustness)
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-dark text-white p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-5 rounded-5 shadow-lg"
          style={{ 
            background: "rgba(255, 255, 255, 0.05)", 
            backdropFilter: "blur(20px)", 
            border: "1px solid rgba(255, 0, 0, 0.3)" 
          }}
        >
          <h1 className="display-1">🚫</h1>
          <h2 className="fw-bold text-danger">Access Denied</h2>
          <p className="text-muted">Terminal restricted to Level 4 Administrators only.</p>
          <button 
            onClick={() => navigate("/login")} 
            className="btn btn-outline-light rounded-pill px-4 mt-3"
          >
            Re-Authenticate
          </button>
        </motion.div>
      </div>
    );
  }

  // Stats configuration for the cards
  const stats = [
    { title: "Total Users", value: counts.users, icon: "👥", color: "#6366f1", path: "/admin/users" },
    { title: "Total Questions", value: counts.questions, icon: "💬", color: "#10b981", path: "/admin/questions" },
    { title: "Total Answers", value: counts.answers, icon: "📝", color: "#f59e0b", path: "/admin/answers" },
  ];

  return (
    <AdminLayout>
      <div className="container-fluid py-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-5">
          <h3 className="fw-bold text-white mb-1">Dashboard Overview</h3>
          <p className="text-muted small">Real-time system diagnostics and user metrics.</p>
        </motion.div>

        <div className="row g-4">
          {stats.map((stat, index) => (
            <div className="col-md-4" key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, cursor: "pointer", boxShadow: `0 15px 35px -10px ${stat.color}66` }}
                onClick={() => navigate(stat.path)}
                className="card border-0 h-100 shadow-lg"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(15px)",
                  borderRadius: "24px",
                  border: `1px solid rgba(255, 255, 255, 0.08)`
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div 
                      className="rounded-4 d-flex align-items-center justify-content-center"
                      style={{ 
                        width: "50px", height: "50px", 
                        background: `${stat.color}22`, 
                        color: stat.color, fontSize: "1.5rem" 
                      }}
                    >
                      {stat.icon}
                    </div>
                    <span className="text-muted small fw-bold">View Details →</span>
                  </div>
                  
                  <h6 className="text-muted text-uppercase tracking-wider fw-bold" style={{ fontSize: "0.75rem" }}>
                    {stat.title}
                  </h6>
                  
                  <div className="d-flex align-items-baseline gap-2">
                    <h2 className="display-6 fw-bold text-white mb-0">
                      {stat.value}
                    </h2>
                    <small className="text-muted opacity-50">records</small>
                  </div>
                </div>
                <div style={{ 
                  height: "4px", background: stat.color, 
                  width: "40%", borderRadius: "2px", 
                  margin: "0 0 20px 25px", opacity: 0.8 
                }}></div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="p-4 rounded-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)" }}>
              <p className="text-muted text-center mb-0 small italic">
                Live system activity logs will be streamed here...
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
