import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // For professional animations
import { useNavigate } from "react-router-dom";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitQuestion = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8082/questions", {
        title: title,
        description: description,
        userId: 1 // Ideally replaced with logged-in user ID
      });
      
      // Professional success feedback
      navigate("/user/dashboard/questions"); 
    } catch (error) {
      console.error("Error posting question:", error);
      alert("Failed to post question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5 d-flex justify-content-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card border-0 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          borderRadius: "30px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "40px"
        }}
      >
        <div className="text-center mb-5">
          <h2 className="fw-bold text-white mb-2">Create a New Thread</h2>
          <p className="text-muted">Share your problem with the community to get expert help.</p>
        </div>

        <div className="mb-4">
          <label className="form-label text-info small fw-bold mb-2">QUESTION TITLE</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            className="form-control bg-transparent text-white py-3 px-4"
            placeholder="What is the issue you're facing?"
            onChange={(e) => setTitle(e.target.value)}
            style={{
              borderRadius: "15px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "none"
            }}
          />
        </div>

        <div className="mb-5">
          <label className="form-label text-info small fw-bold mb-2">DESCRIPTION</label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            className="form-control bg-transparent text-white py-3 px-4"
            placeholder="Explain the background and provide any code snippets..."
            rows="6"
            onChange={(e) => setDescription(e.target.value)}
            style={{
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "none",
              resize: "none"
            }}
          />
        </div>

        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={submitQuestion}
          disabled={loading}
          className="btn btn-primary w-100 py-3 rounded-pill fw-bold text-uppercase tracking-wider"
          style={{
            background: "linear-gradient(90deg, #6366f1, #a855f7)",
            border: "none"
          }}
        >
          {loading ? "Publishing..." : "Post Question Now 🚀"}
        </motion.button>

        <div className="text-center mt-4">
          <button 
            className="btn btn-link text-muted text-decoration-none small"
            onClick={() => navigate(-1)}
          >
            ← Back to Community
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default AskQuestion;