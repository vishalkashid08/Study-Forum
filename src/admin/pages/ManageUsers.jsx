import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../AdminLayout";
import API from "../../services/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("⚠️ Terminate user access permanently?")) {
      try {
        await API.delete(`/users/${id}`);
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        alert("System Error: Could not delete user.");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid py-2">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="d-flex justify-content-between align-items-center mb-4"
        >
          <div>
            <h3 className="fw-bold text-white mb-1">Identity Management</h3>
            <p className="text-muted small">Verify, audit, or revoke platform access.</p>
          </div>
          <div className="text-end">
            <span className="d-block text-white fw-bold">{users.length}</span>
            <small className="text-info tracking-widest text-uppercase" style={{ fontSize: '0.6rem' }}>Total Identities</small>
          </div>
        </motion.div>

        {/* 💎 GLASS TABLE CONTAINER */}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card border-0 shadow-lg overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(20px)",
            borderRadius: "25px",
            border: "1px solid rgba(255, 255, 255, 0.05)"
          }}
        >
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0">
              <thead style={{ background: "rgba(255,255,255,0.05)" }}>
                <tr className="text-muted small text-uppercase tracking-wider">
                  <th className="p-4">Profile</th>
                  <th className="p-4">Identity Details</th>
                  <th className="p-4">Clearance</th>
                  <th className="p-4 text-center">Operation</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, backgroundColor: "rgba(220, 53, 69, 0.1)" }}
                      transition={{ delay: index * 0.05 }}
                      className="align-middle border-bottom border-secondary border-opacity-10"
                    >
                      <td className="p-4">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                          style={{ 
                            width: "45px", 
                            height: "45px", 
                            background: "linear-gradient(135deg, #6366f1, #a855f7)",
                            border: "2px solid rgba(255,255,255,0.1)"
                          }}
                        >
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-white fw-bold">{user.name}</div>
                        <div className="text-muted small">{user.email}</div>
                      </td>
                      <td className="p-4">
                        <span className={`badge rounded-pill px-3 py-2 ${user.role === 'ADMIN' ? 'bg-danger bg-opacity-10 text-danger border border-danger' : 'bg-info bg-opacity-10 text-info border border-info'} border-opacity-25`}>
                          {user.role || 'USER'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteUser(user.id)}
                          className="btn btn-link text-danger p-0 border-0 shadow-none"
                        >
                          <span className="small fw-bold">REVOKE ACCESS</span>
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-grow text-info" role="status"></div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}

export default ManageUsers;