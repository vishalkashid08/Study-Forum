import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../AdminLayout";
import API from "../../services/api";

function ManageQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      // Ensure your API base URL points to the Gateway (Port 9090)
      const res = await API.get("/questions");
      
      // Safety check: ensure the data is an array before setting state
      if (Array.isArray(res.data)) {
        setQuestions(res.data);
      } else {
        console.error("Data received is not an array:", res.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      // Optional: Add a toast notification here if the fetch fails (e.g., 403 Forbidden)
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this thread?")) {
      try {
        const res = await API.delete(`/questions/${id}`);
        
        // If the backend returns ResponseEntity.ok(Map.of("message", "..."))
        // the request was successful.
        setQuestions((prev) => prev.filter((q) => q.id !== id));
      } catch (err) {
        console.error("Delete Error:", err);
        alert("Action failed: Unauthorized or System Error. Check if you have ADMIN roles.");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid py-2">
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="d-flex justify-content-between align-items-center mb-4"
        >
          <div>
            <h3 className="fw-bold text-white mb-1">Content Moderation</h3>
            <p className="text-muted small">Manage and audit community discussions.</p>
          </div>
          <span className="badge rounded-pill bg-dark text-info border border-info border-opacity-25 px-3 py-2">
            Total Threads: {questions.length}
          </span>
        </motion.div>

        {/* DATA TABLE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card border-0 shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(20px)",
            borderRadius: "25px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            overflow: "hidden"
          }}
        >
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0">
              <thead style={{ background: "rgba(255,255,255,0.05)" }}>
                <tr className="text-muted small text-uppercase tracking-wider">
                  <th className="p-4">ID</th>
                  <th className="p-4">Topic Header</th>
                  <th className="p-4">Author</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Operation</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode='wait'>
                  {loading ? (
                    <motion.tr
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan="5" className="text-center py-5">
                        <div className="spinner-border text-info" role="status"></div>
                        <p className="text-muted mt-2">Loading threads...</p>
                      </td>
                    </motion.tr>
                  ) : questions.length === 0 ? (
                    <motion.tr
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td colSpan="5" className="text-center py-5 text-muted">
                        No active threads found.
                      </td>
                    </motion.tr>
                  ) : (
                    questions.map((q, index) => (
                      <motion.tr
                        key={q.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ delay: index * 0.03 }}
                        className="align-middle border-bottom border-secondary border-opacity-10"
                      >
                        <td className="p-4 text-info fw-bold">#{q.id}</td>
                        <td className="p-4">
                          <div className="text-white fw-semibold">{q.title}</div>
                          <div className="text-muted small text-truncate" style={{ maxWidth: "250px" }}>
                            {q.description}
                          </div>
                        </td>
                        
                        {/* AUTHOR COLUMN */}
                        <td className="p-4">
                          <div className="d-flex align-items-center gap-2">
                             <div className="bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center" style={{width:'30px', height:'30px', fontSize:'12px', border: '1px solid rgba(13, 202, 240, 0.2)'}}>
                                {(q.authorName || "U").charAt(0).toUpperCase()}
                             </div>
                             <div>
                                <div className="text-white small fw-bold">
                                   {/* Logic: use authorName from backend, fallback to User #ID */}
                                   {q.authorName || `User #${q.userId}`}
                                </div>
                                <div className="text-muted" style={{fontSize: '10px'}}>
                                   UID: {q.userId}
                                </div>
                             </div>
                          </div>
                        </td>

                        <td className="p-4 text-center">
                          <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3">
                            Active
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <button className="btn btn-outline-info btn-sm rounded-pill px-3">View</button>
                            <motion.button 
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(q.id)}
                              className="btn btn-outline-danger btn-sm rounded-pill px-3"
                            >
                              Remove
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}

export default ManageQuestions;