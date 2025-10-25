import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getTopicById } from "../api/topics";
import axios from "axios";

const ChatbotPage = () => {
  const { user } = useContext(AuthContext);
  const { topicId } = useParams();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const [topic, setTopic] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await getTopicById(topicId);
        setTopic(res.data);
        setMessages([
          {
            from: "bot",
            text: `Topic: ${res.data.title}\nDescription: ${res.data.description}`,
            type: "intro",
          },
        ]);
        startChatbot(res.data._id);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopic();
  }, [topicId]);

  useEffect(() => {
    // Scroll to bottom automatically
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startChatbot = async (tId) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/chatbot/start", {
        userId: user._id,
        topicId: tId,
      });
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.data.guide, type: "guide" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error fetching guide from server.", type: "error" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const finishChatbot = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/chatbot/finish", {
        userId: user._id,
        topicId: topic._id,
      });

      const quizRes = await axios.post("http://localhost:5000/api/quiz/generate", {
        topicId: topic._id,
      });

      setQuiz(quizRes.data.questions);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "✅ Chat complete! Quiz is ready.", type: "success" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "❌ Error generating quiz.", type: "error" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (msg) => {
    const { text, type, from } = msg;

    if (type === "intro") {
      const [titleLine, descLine] = text.split("\n");
      return (
        <div className="space-y-2">
          <h2 className="font-bold text-xl text-gray-800">{titleLine.replace("Topic: ", "")}</h2>
          <p className="text-gray-700 ml-2">{descLine.replace("Description: ", "")}</p>
        </div>
      );
    }

    if (type === "guide") {
      const steps = text.split(/\n|(?<=\.)/).filter((s) => s.trim() !== "");
      return (
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex space-x-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-lg">
                {idx + 1}
              </div>
              <p className="text-gray-800 text-lg">{step.trim()}</p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex items-start space-x-3">
        <div
          className={`w-3 h-3 mt-1 rounded-full ${
            type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-gray-500"
          }`}
        />
        <p
          className={`${
            type === "success"
              ? "text-green-700"
              : type === "error"
              ? "text-red-700"
              : "text-gray-700"
          }`}
        >
          {text}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                AI Learning Assistant
              </h1>
              <p className="text-gray-600 text-lg">
                Topic: <span className="font-semibold text-blue-600">{topic?.title}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Active</span>
            </div>
          </div>
        </div>

        {/* Chat container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[80vh]">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
            <h2 className="text-xl md:text-2xl font-semibold">Learning Session</h2>
            <p className="text-blue-100 text-sm md:text-base">
              Follow the step-by-step guide below
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl shadow-sm ${
                  msg.from === "bot"
                    ? "bg-white border border-gray-200"
                    : "bg-blue-50 border border-blue-200"
                }`}
              >
                {formatMessage(msg)}
              </div>
            ))}
            {loading && (
              <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                </div>
                <span className="text-gray-600 text-lg">AI is thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          {!quiz && (
            <button
              onClick={finishChatbot}
              disabled={loading}
              className={`px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
              }`}
            >
              {loading ? "Processing..." : "Complete Learning & Start Quiz"}
            </button>
          )}

          {quiz && (
            <button
              onClick={() =>
                navigate(`/quiz/${topic._id}`, { state: { quiz, topic, userId: user._id } })
              }
              className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg"
            >
              Start Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
