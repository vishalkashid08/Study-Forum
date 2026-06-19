import React from "react";
import { motion } from "framer-motion";

function AnswerCard({ answer }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.06)" }}
      className="mb-3"
    >
      <div 
        className="card border-0 shadow-sm"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(10px)",
          borderRadius: "18px",
          borderLeft: "4px solid #6366f1", // Neon Indigo accent
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        <div className="card-body p-3">
          {/* Content Area */}
          <div className="d-flex align-items-start gap-3">
            {/* User Avatar Circle */}
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
              style={{ 
                width: "40px", 
                height: "40px", 
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                fontSize: "0.9rem",
                fontWeight: "bold",
                color: "#fff"
              }}
            >
              {answer.userName?.charAt(0) || "U"}
            </div>

            <div className="flex-grow-1">
              <p className="text-light mb-2" style={{ lineHeight: "1.6", fontSize: "0.95rem" }}>
                {answer.content}
              </p>
              
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-info opacity-75 fw-semibold">
                  Replied by @{answer.userName || "ExpertUser"}
                </small>
                <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                  {new Date().toLocaleDateString()} {/* Replace with actual date if available */}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AnswerCard;