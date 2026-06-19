import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // For smooth micro-interactions

function QuestionCard({ id, title, description }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <div 
        className="card border-0 shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(12px)",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          overflow: "hidden"
        }}
      >
        <div className="card-body p-4">
          {/* Header Area */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="fw-bold text-white m-0" style={{ letterSpacing: "-0.5px" }}>
              {title}
            </h5>
            <span 
              className="badge rounded-pill px-3 py-2"
              style={{ 
                background: "rgba(99, 102, 241, 0.2)", 
                color: "#818cf8",
                border: "1px solid rgba(99, 102, 241, 0.3)" 
              }}
            >
              New Thread
            </span>
          </div>

          {/* Description */}
          <p className="text-light opacity-50 mb-4" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
            {description}
          </p>

          <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />

          {/* Footer Actions */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            
            {/* Animated Like Button */}
            <motion.button 
              whileTap={{ scale: 1.3 }}
              className={`btn btn-sm rounded-pill px-3 d-flex align-items-center gap-2 transition-all ${
                isLiked ? 'btn-danger' : 'btn-outline-secondary text-light'
              }`}
              onClick={handleLike}
              style={{ border: isLiked ? "none" : "1px solid rgba(255,255,255,0.2)" }}
            >
              <motion.span
                animate={isLiked ? { color: "#fff" } : { color: "#ff4d4d" }}
              >
                {isLiked ? "❤️" : "🤍"}
              </motion.span>
              <span className="fw-bold">{likes}</span>
            </motion.button>

            {/* Premium View Button */}
            <Link to={`/user/dashboard/questions/${id}`} className="text-decoration-none">
              <motion.button
                whileHover={{ x: 5 }}
                className="btn btn-link text-info fw-bold p-0 d-flex align-items-center gap-2 shadow-none"
              >
                View Details 
                <span style={{ fontSize: "1.2rem" }}>→</span>
              </motion.button>
            </Link>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default QuestionCard;