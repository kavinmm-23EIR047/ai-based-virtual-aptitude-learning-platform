// src/pages/Progress.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";

export default function Progress() {
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchProgress = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/progress/${user._id}`);
        setProgress(res.data.results || []);
        setAverage(res.data.average || 0);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Your Progress</h1>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Average Score */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-2">Average Score</h2>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="h-4 bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${average}%` }}
              ></div>
            </div>
            <p className="mt-2 text-gray-600 font-medium">{average.toFixed(1)}%</p>
          </div>

          {/* Quiz History */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {progress.length === 0 ? (
              <p className="text-gray-600 col-span-full text-center">You haven't completed any quizzes yet.</p>
            ) : (
              progress.map((quiz) => (
                <motion.div
                  key={quiz._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-2xl shadow-md"
                >
                  <h3 className="text-lg font-semibold mb-2">{quiz.topicTitle || "Topic"}</h3>
                  <p className="text-gray-500 mb-2">Score: {quiz.score} / {quiz.totalQuestions || "N/A"}</p>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        quiz.score / quiz.totalQuestions >= 0.8
                          ? "bg-green-500"
                          : quiz.score / quiz.totalQuestions >= 0.6
                          ? "bg-yellow-400"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${(quiz.score / quiz.totalQuestions) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{new Date(quiz.createdAt).toLocaleDateString()}</p>
                </motion.div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
