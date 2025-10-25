// src/pages/Quiz.jsx
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quiz: preloadedQuiz, topic } = location.state || {};
  const { user } = useContext(AuthContext);

  const [questions, setQuestions] = useState(preloadedQuiz || []);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Quiz Available</h2>
          <p className="text-gray-600">Please select a topic to start a quiz.</p>
        </div>
      </div>
    );
  }

  // Select answer
  const handleSelect = (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    questions.forEach(q => {
      const correctValue = q.options[q.answer.charCodeAt(0) - 65]; // map letter to option
      if (answers[q._id] === correctValue) correctCount += 1;
    });

    const calculatedScore = correctCount;
    const percentage = (calculatedScore / questions.length) * 100;
    setScore(calculatedScore);
    setSubmitted(true);

    try {
      await axios.post("http://localhost:5000/api/quiz/save", {
        userId: user._id,
        topicId: topic._id,
        score: calculatedScore,
      });

      alert(`Quiz submitted! Your score: ${calculatedScore} / ${questions.length}`);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz.");
    }
  };

  // Retake quiz manually
  const handleRetakeQuiz = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/quiz/retry", {
        topicId: topic._id,
      });
      setQuestions(res.data.questions);
      setAnswers({});
      setSubmitted(false);
      setScore(null);
      setCurrentQuestion(0);
    } catch (err) {
      console.error(err);
      alert("Failed to generate new quiz.");
    }
  };

  const goToTopics = () => {
    navigate("/topics");
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (percentage) => {
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "👍";
    return "😞";
  };

  const percentage = score ? (score / questions.length) * 100 : 0;
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-6 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Quiz: {topic?.title}</h1>
              <p className="text-blue-100 mt-1">Test your knowledge and improve your skills</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{questions.length}</div>
                <div className="text-sm text-blue-100">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{answeredCount}</div>
                <div className="text-sm text-blue-100">Answered</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-blue-100 mb-2">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-6">
            {/* Question Navigation */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
              <div className="flex flex-wrap gap-2 justify-center">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestion(idx)}
                    className={`w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                      idx === currentQuestion
                        ? "bg-white text-blue-600 shadow-lg scale-110"
                        : answers[questions[idx]._id]
                        ? "bg-green-500/80 text-white"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Question */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 transition-all duration-300 transform hover:scale-[1.01]">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className="p-2 rounded-full bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextQuestion}
                    disabled={currentQuestion === questions.length - 1}
                    className="p-2 rounded-full bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((opt, idx) => (
                  <label
                    key={opt}
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      answers[questions[currentQuestion]._id] === opt
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={questions[currentQuestion]._id}
                      value={opt}
                      checked={answers[questions[currentQuestion]._id] === opt}
                      onChange={() => handleSelect(questions[currentQuestion]._id, opt)}
                      className="w-5 h-5 text-blue-600 mr-4"
                    />
                    <span className="text-gray-800 font-medium flex-1">
                      {String.fromCharCode(65 + idx)}. {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={answeredCount < questions.length}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                  answeredCount < questions.length
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-blue-600 text-white hover:shadow-2xl hover:scale-105 active:scale-95"
                }`}
              >
                {answeredCount < questions.length
                  ? `Answer ${questions.length - answeredCount} more questions`
                  : "Submit Quiz 🚀"}
              </button>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">{getScoreIcon(percentage)}</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Quiz Complete!
              </h2>
              <div className={`text-5xl font-bold mb-4 ${getScoreColor(percentage)}`}>
                {score} / {questions.length}
              </div>
              <div className="text-2xl text-gray-600 mb-4">{Math.round(percentage)}% Score</div>

              {/* Score Message */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                {percentage >= 80 ? (
                  <div>
                    <div className="text-green-600 font-bold text-xl mb-2">Excellent! 🌟</div>
                    <p className="text-gray-600">Outstanding performance! You've mastered this topic.</p>
                  </div>
                ) : percentage >= 60 ? (
                  <div>
                    <div className="text-yellow-600 font-bold text-xl mb-2">Good Job! 👍</div>
                    <p className="text-gray-600">Well done! You have a solid understanding of this topic.</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-red-600 font-bold text-xl mb-2">Keep Practicing! 💪</div>
                    <p className="text-gray-600">Don't give up! Practice makes perfect. Try again to improve your score.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRetakeQuiz}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                🔄 Retake Quiz
              </button>
              <button
                onClick={goToTopics}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                📚 Back to Topics
              </button>
            </div>

            {/* Detailed Results */}
            <div className="mt-8 text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Review Your Answers:</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {questions.map((q, idx) => {
                  const correctValue = q.options[q.answer.charCodeAt(0) - 65];
                  return (
                    <div
                      key={q._id}
                      className={`p-4 rounded-xl border-l-4 ${
                        answers[q._id] === correctValue
                          ? "bg-green-50 border-green-500"
                          : "bg-red-50 border-red-500"
                      }`}
                    >
                      <p className="font-semibold text-gray-800 mb-2">
                        {idx + 1}. {q.question}
                      </p>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Your answer:</span>
                          <span className={answers[q._id] === correctValue ? "text-green-600" : "text-red-600"}>
                            {answers[q._id] || "Not answered"}
                            {answers[q._id] === correctValue ? " ✓" : " ✗"}
                          </span>
                        </div>
                        {answers[q._id] !== correctValue && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Correct answer:</span>
                            <span className="text-green-600">
                              {q.answer}. {correctValue} ✓
                            </span>
                          </div>
                        )}
                        {q.explanation && (
                          <div className="mt-1 text-gray-600 text-sm">
                            Explanation: {q.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
