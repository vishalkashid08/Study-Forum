import React, { useState, useEffect } from "react";
import { registerUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);

  // Initialize Particle Engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(formData);
      alert("Registered Successfully!");
      navigate("/");
    } catch (error) {
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  // Particle Config (Same as Login for consistency)
  const particlesOptions = {
    background: { color: { value: "#1a1a2e" } },
    fpsLimit: 120,
    particles: {
      color: { value: "#ffffff" },
      links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
      move: { enable: true, speed: 1.2 },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      
      {/* Animated Particle Background */}
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
        />
      )}

      {/* Glassmorphism Card */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }} // Slides in from the right
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="card p-4 shadow-lg border-0" 
        style={{ 
          width: "100%", 
          maxWidth: "450px", 
          borderRadius: "25px",
          background: "rgba(255, 255, 255, 0.1)", 
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: 1
        }}
      >
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-white mb-1">Create Account</h2>
            <p className="text-light small opacity-75">Join the community today</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-light opacity-75">FULL NAME</label>
              <input
                type="text"
                name="name"
                className="form-control bg-transparent text-white py-2"
                placeholder="Enter your name"
                onChange={handleChange}
                required
                style={{ borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.3)" }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-light opacity-75">EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                className="form-control bg-transparent text-white py-2"
                placeholder="Enter your email"
                onChange={handleChange}
                required
                style={{ borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.3)" }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-light opacity-75">PASSWORD</label>
              <input
                type="password"
                name="password"
                className="form-control bg-transparent text-white py-2"
                placeholder="••••••••"
                onChange={handleChange}
                required
                style={{ borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.3)" }}
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.05, background: "#48bb78" }}
              whileTap={{ scale: 0.95 }}
              type="submit" 
              className="btn btn-success w-100 py-2 shadow-sm mb-3"
              style={{ borderRadius: "12px", border: "none", fontWeight: "700", textTransform: "uppercase" }}
              disabled={loading}
            >
              {loading ? "Creating..." : "Register Now"}
            </motion.button>
          </form>

          <div className="text-center">
            <p className="small text-light opacity-50 mb-0">Already have an account?</p>
            <Link to="/" className="text-decoration-none fw-bold text-info">
              Login here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;