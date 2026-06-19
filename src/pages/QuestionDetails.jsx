import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getAnswersByQuestion } from "../services/api";
import AnswerForm from "../components/AnswerForm";
import AnswerCard from "../components/AnswerCard";

function QuestionDetails() {
  const { id } = useParams();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Note: Ensure your API also provides the question title/desc here if needed
  const [question, setQuestion] = useState({
    title: "Loading Question...",
    description: "Please wait while we fetch the details."
  });

  const loadAnswers = async () => {
    setLoading(true);
    try {
      const res = await getAnswersByQuestion(id);
      setAnswers(res.data);
    } catch (err) {
      console.error("Error loading answers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnswers();
    // Logic to fetch question details by ID should ideally go here
  }, [id]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="container-fluid py-4 px-md-5"
    >
      {/* 📘 Header Section */}
      <div className="mb-5">
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fw-bold text-white mb-2"
        >
          Discussion <span className="text-info">#00{id}</span>
        </motion.h2>
        <p className="text-muted small">Home / Questions / Details</p>
      </div>

      <div className="row g-4">
        {/* Left Column: Answer Form & Question Context */}
        <div className="col-lg-5">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky-top"
            style={{ top: "100px", zIndex: 1 }}
          >
            <div 
              className="p-4 rounded-5 shadow-lg border-0"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              <h5 className="text-info fw-bold mb-3">Contribute Knowledge</h5>
              <AnswerForm
                questionId={id}
                questionTitle={question.title}
                questionDescription={question.description}
                reloadAnswers={loadAnswers}
              />
            </div>
          </motion.div>
        </div>

        {/* Right Column: Answers List */}
        <div className="col-lg-7">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h4 className="text-white fw-bold mb-0">
              Community Solutions 
              <span className="ms-2 badge rounded-pill bg-dark text-info border border-info border-opacity-25 fs-6">
                {answers.length}
              </span>
            </h4>
          </div>

          <div className="answers-container">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-info" role="status"></div>
              </div>
            ) : (
              <AnimatePresence>
                {answers.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="p-5 text-center rounded-5 border border-dashed border-secondary border-opacity-25"
                  >
                    <p className="text-muted mb-0">No answers yet. Be the first to solve this!</p>
                  </motion.div>
                ) : (
                  answers.map((a, index) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-3"
                    >
                      <AnswerCard answer={a} />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default QuestionDetails;