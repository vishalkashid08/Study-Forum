import React, { useEffect, useState } from "react";
import API from "../services/api";
import { motion, AnimatePresence } from "framer-motion"; // For smooth answer toggles

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});
  const [newAnswer, setNewAnswer] = useState({});
  
  // Get logged-in user info
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const fetchAnswers = async (questionId) => {
    // If already showing and we have data, just toggle visibility
    if (showAnswers[questionId]) {
      setShowAnswers(prev => ({ ...prev, [questionId]: false }));
      return;
    }

    try {
      const res = await API.get(`/answers/question/${questionId}`);
      setAnswers(prev => ({ ...prev, [questionId]: res.data }));
      setShowAnswers(prev => ({ ...prev, [questionId]: true }));
    } catch (err) {
      console.error(err);
    }
  };

  const submitAnswer = async (questionId) => {
    if (!newAnswer[questionId]?.trim()) return;

    const answerData = {
      content: newAnswer[questionId],
      questionId: questionId,
      userId: user?.id || 1 // Use real ID or fallback
    };

    try {
      await API.post("/answers", answerData);
      setNewAnswer(prev => ({ ...prev, [questionId]: "" }));
      
      // Refresh answers list
      const res = await API.get(`/answers/question/${questionId}`);
      setAnswers(prev => ({ ...prev, [questionId]: res.data }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid py-4">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-5 fw-bold text-white display-6"
      >
        Knowledge Base <span className="text-info">/ All Questions</span>
      </motion.h2>

      <div className="row">
        {questions.map((q, index) => (
          <motion.div 
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="col-12 mb-4"
          >
            <div className="card shadow-lg border-0" 
                 style={{ 
                   background: "rgba(255, 255, 255, 0.03)", 
                   backdropFilter: "blur(10px)",
                   border: "1px solid rgba(255, 255, 255, 0.1)",
                   borderRadius: "20px" 
                 }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h4 className="text-white fw-bold mb-2">{q.title}</h4>
                    <p className="text-light opacity-75">{q.description}</p>
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', fontSize: '12px' }}>
                        {q.authorName?.charAt(0) || "U"}
                      </div>
                      <span className="text-info small fw-semibold">@{q.authorName || "Anonymous"}</span>
                    </div>
                  </div>
                  <button
                    className={`btn rounded-pill px-4 transition-all ${showAnswers[q.id] ? 'btn-info text-white' : 'btn-outline-info'}`}
                    onClick={() => fetchAnswers(q.id)}
                  >
                    {showAnswers[q.id] ? "Close Discussion" : "View Answers"}
                  </button>
                </div>

                <AnimatePresence>
                  {showAnswers[q.id] && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-top border-secondary border-opacity-25"
                    >
                      <h6 className="text-white mb-3 fw-bold">Community Discussion</h6>
                      
                      {answers[q.id]?.length === 0 ? (
                        <div className="p-3 rounded-4 bg-dark bg-opacity-25 text-muted small">
                          No solutions proposed yet. Be the first to help!
                        </div>
                      ) : (
                        answers[q.id]?.map((a) => (
                          <motion.div 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            key={a.id} 
                            className="p-3 mb-2 rounded-4"
                            style={{ background: "rgba(255,255,255,0.05)", borderLeft: "3px solid #6366f1" }}
                          >
                            <p className="text-light mb-0">{a.content}</p>
                          </motion.div>
                        ))
                      )}

                      {/* Professional TextArea Input */}
                      <div className="mt-4">
                        <textarea
                          className="form-control bg-transparent text-white border-secondary mb-2"
                          placeholder="Contribute your knowledge..."
                          rows="2"
                          value={newAnswer[q.id] || ""}
                          onChange={(e) => setNewAnswer(prev => ({ ...prev, [q.id]: e.target.value }))}
                          style={{ borderRadius: "15px", border: "1px solid rgba(255,255,255,0.2)" }}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn btn-primary btn-sm px-4 rounded-pill"
                          onClick={() => submitAnswer(q.id)}
                        >
                          Submit Answer
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Questions;