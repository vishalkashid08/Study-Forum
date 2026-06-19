import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For amazing animations
import QuestionCard from "../components/QuestionCard";
import API from "../services/api";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    API.get("/questions")
      .then((res) => {
        const latest = res.data.slice(-5).reverse();
        setQuestions(latest);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-fluid py-4 px-md-5">
      {/* 🚀 HERO SECTION: Glassmorphism Floating Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-5 mb-5 rounded-5 text-white shadow-lg border-0"
        style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8))",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <div className="row align-items-center">
          <div className="col-lg-8">
            <h1 className="fw-bold display-4 tracking-tight">Ask. Learn. Grow.</h1>
            <p className="fs-5 mt-3 opacity-75">
              The premium academic community. Connect with experts and sharpen your skills.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-light btn-lg mt-4 rounded-pill px-5 fw-bold text-primary shadow"
              onClick={() => navigate("/user/dashboard/ask")}
            >
              Start Asking 🚀
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* 📑 LATEST QUESTIONS SECTION */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-white">Latest Discussions</h3>
        <span className="badge rounded-pill bg-primary px-3 py-2">Real-time updates</span>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-info" role="status"></div>
        </div>
      ) : (
        <div className="row">
          {questions.length === 0 ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted ps-3">
              No questions found in the archive.
            </motion.p>
          ) : (
            questions.map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }} // Staggered entrance
                className="col-12 mb-3"
              >
                <QuestionCard
                  id={q.id}
                  title={q.title}
                  description={q.description}
                />
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;