import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-5 mt-5" style={{ background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-light opacity-50 small mb-2"
        >
          © 2026 StudyForum Ecosystem
        </motion.div>
        
        <h5 className="text-white fw-light">
          Built with 
          <motion.span
            animate={{ scale: [1, 1.4, 1], color: ["#fff", "#ff4d4d", "#fff"] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="d-inline-block mx-2"
          >
            ❤️
          </motion.span> 
          for the future of learning
        </h5>
        
        <div className="mt-3 d-flex justify-content-center gap-3">
          {['Twitter', 'GitHub', 'Discord'].map((platform) => (
            <motion.a 
              key={platform}
              whileHover={{ y: -5, color: "#6366f1" }}
              href="#" 
              className="text-muted text-decoration-none small"
            >
              {platform}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer