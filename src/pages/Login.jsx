import React, { useState, useEffect } from "react";
import { loginUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // lightweight version

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);
  const navigate = useNavigate();

  // 1. Initialize Particle Engine once on mount
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      if (data.role === "ADMIN") navigate("/admin/dashboard");
      else navigate("/user/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  // 2. "Amazing" Particle Configuration
  const particlesOptions = {
    background: {
      color: { value: "#1a1a2e" }, // Deep Professional Blue/Black
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" }, // Add particles on click
        onHover: { enable: true, mode: "repulse" }, // Move particles on hover
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#ffffff" }, // White particles
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true, // Create the "network" look
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5, // Slow, professional movement
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "out" },
      },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      
      {/* 3. The Animated Background Layer */}
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
        />
      )}

      {/* 4. The Glassmorphism Card with entrance animation */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // smooth back-out ease
        className="card p-5 shadow-lg border-0" 
        style={{ 
          width: "100%", 
          maxWidth: "420px", 
          borderRadius: "25px",
          background: "rgba(255, 255, 255, 0.08)", // ultra-thin glass
          backdropFilter: "blur(20px)", // strong blur
          border: "1px solid rgba(255, 255, 255, 0.1)", // glass edge
          zIndex: 1
        }}
      >
        <div className="card-body">
          <div className="text-center mb-5">
            <h1 className="fw-bold text-white tracking-tight" style={{ fontSize: "2.5rem" }}>StudyForum</h1>
            <p className="text-light small opacity-75">Your academic gateway awaits</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold text-light opacity-75">EMAIL</label>
              <input
                type="email"
                name="email"
                className="form-control bg-transparent text-white py-2"
                placeholder="you@example.com"
                onChange={handleChange}
                required
                style={{ borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.2)" }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold text-light opacity-75">PASSWORD</label>
              <input
                type="password"
                name="password"
                className="form-control bg-transparent text-white py-2"
                placeholder="••••••••"
                onChange={handleChange}
                required
                style={{ borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.2)" }}
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.05, background: "#764ba2" }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary w-100 py-3 shadow-sm mb-4"
              style={{ borderRadius: "12px", background: "#667eea", border: "none", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Secure Login"}
            </motion.button>
          </form>

          <div className="text-center">
            <p className="small text-light opacity-50 mb-1">New member?</p>
            <Link to="/register" className="text-decoration-none fw-bold text-info">
              Register an Account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;