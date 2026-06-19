import { useState, useEffect } from "react";
import API from "../services/api";
import { motion } from "framer-motion"; // For premium interactions

function AnswerForm({ questionId, reloadAnswers }) {
  const [content, setContent] = useState("");
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await API.get(`/questions/${questionId}`);
        setQuestion(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (questionId) {
      fetchQuestion();
    }
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    const answerData = {
      content: content,
      questionId: questionId,
      userId: 1, // Connect to auth state later
    };

    try {
      await API.post("/answers", answerData);
      setContent("");
      reloadAnswers();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card border-0"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(15px)",
        borderRadius: "25px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        overflow: "hidden"
      }}
    >
      <div className="card-body p-4">
        {/* 📘 Question Context Area */}
        {question && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 rounded-4"
            style={{ background: "rgba(99, 102, 241, 0.05)", borderLeft: "4px solid #6366f1" }}
          >
            <h5 className="text-white fw-bold mb-2">{question.title}</h5>
            <p className="text-light opacity-50 small mb-0">{question.description}</p>
          </motion.div>
        )}

        {/* ✍️ Writing Area */}
        <h6 className="text-info fw-bold small mb-3 tracking-widest text-uppercase">
          Your Contribution
        </h6>

        <form onSubmit={handleSubmit}>
          <div className="position-relative">
            <motion.textarea
              whileFocus={{ border: "1px solid rgba(99, 102, 241, 0.5)" }}
              className="form-control bg-transparent text-white mb-4 p-3"
              rows="5"
              placeholder="Explain your solution in detail..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                borderRadius: "18px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                resize: "none",
                fontSize: "0.95rem"
              }}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Be helpful and professional.
            </small>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(28, 200, 138, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="btn btn-success rounded-pill px-5 py-2 fw-bold border-0 shadow-sm"
              style={{
                background: "linear-gradient(90deg, #1cc88a, #13855c)",
              }}
            >
              {loading ? "Posting..." : "Post Answer 🚀"}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default AnswerForm;