import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top" 
         style={{ 
           background: "rgba(10, 10, 20, 0.7)", 
           backdropFilter: "blur(20px)",
           borderBottom: "1px solid rgba(99, 102, 241, 0.3)"
         }}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center" to="/user/dashboard">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="fs-2 me-2"
          >🎓</motion.div>
          <span className="fw-bold fs-3 text-white tracking-tighter">
            STUDY<span style={{ color: "#6366f1" }}>FORUM</span>
          </span>
        </Link>

        <div className="d-flex align-items-center gap-4">
          <motion.div whileHover={{ width: 300 }} className="position-relative d-none d-lg-block">
            <input
              type="text"
              className="form-control bg-dark text-white border-0 rounded-pill px-4"
              placeholder="Search knowledge..."
              style={{ 
                width: "220px", 
                backgroundColor: "rgba(255,255,255,0.05) !important",
                border: "1px solid rgba(255,255,255,0.1) !important"
              }}
            />
          </motion.div>
          <Link className="navbar-brand d-flex align-items-center" to="/">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.8)" }}
            whileTap={{ scale: 0.9 }}
            className="btn rounded-pill px-4 text-white fw-bold"
            style={{ background: "#6366f1", border: "none" }}
          >
            Login
          </motion.button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav