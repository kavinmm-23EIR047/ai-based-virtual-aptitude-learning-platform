// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { getTopicById } from "../api/topics";
// import axios from "axios";

// const ChatbotPage = () => {
//   const { user } = useContext(AuthContext);
//   const { topicId } = useParams();
//   const navigate = useNavigate();

//   const [topic, setTopic] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [quiz, setQuiz] = useState(null);

//   // Fetch topic on mount
//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const res = await getTopicById(topicId);
//         setTopic(res.data);
//         // Add initial message with title + description
//         setMessages([
//           { from: "bot", text: `Topic: ${res.data.title}\nDescription: ${res.data.description}` },
//         ]);
//         startChatbot(res.data._id);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchTopic();
//   }, [topicId]);

//   // Start chatbot guide
//   const startChatbot = async (tId) => {
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/chatbot/start", {
//         userId: user._id,
//         topicId: tId,
//       });
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: res.data.guide },
//       ]);
//     } catch (err) {
//       console.error("Failed to start chatbot:", err);
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Error fetching guide from server." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Finish chatbot → fetch quiz
//   const finishChatbot = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/chatbot/finish", {
//         userId: user._id,
//         topicId: topic._id,
//       });
//       setQuiz(res.data.questions);
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Chat complete! Quiz is ready." },
//       ]);
//     } catch (err) {
//       console.error("Failed to finish chatbot:", err);
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Error generating quiz." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Render messages
//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Chatbot: {topic?.title}</h1>

//       <div className="border rounded p-4 mb-4 h-96 overflow-y-auto bg-gray-50">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`my-2 p-2 rounded ${
//               msg.from === "bot" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       {!quiz && (
//         <button
//           onClick={finishChatbot}
//           disabled={loading}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           {loading ? "Processing..." : "Finish Chatbot & Start Quiz"}
//         </button>
//       )}

//       {quiz && (
//         <button
//           onClick={() => navigate(`/quiz/${topic._id}`)}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
//         >
//           Go to Quiz
//         </button>
//       )}
//     </div>
//   );
// };

// export default ChatbotPage;

// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { getTopicById } from "../api/topics";
// import axios from "axios";

// const ChatbotPage = () => {
//   const { user } = useContext(AuthContext);
//   const { topicId } = useParams();
//   const navigate = useNavigate();

//   const [topic, setTopic] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [quiz, setQuiz] = useState(null);

//   // Fetch topic on mount
//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const res = await getTopicById(topicId);
//         setTopic(res.data);
//         // Add initial message with title + description
//         setMessages([
//           { 
//             from: "bot", 
//             text: `Topic: ${res.data.title}\nDescription: ${res.data.description}`,
//             type: "intro"
//           },
//         ]);
//         startChatbot(res.data._id);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchTopic();
//   }, [topicId]);

//   // Start chatbot guide
//   const startChatbot = async (tId) => {
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/chatbot/start", {
//         userId: user._id,
//         topicId: tId,
//       });
//       setMessages((prev) => [
//         ...prev,
//         { 
//           from: "bot", 
//           text: res.data.guide,
//           type: "guide"
//         },
//       ]);
//     } catch (err) {
//       console.error("Failed to start chatbot:", err);
//       setMessages((prev) => [
//         ...prev,
//         { 
//           from: "bot", 
//           text: "Error fetching guide from server.",
//           type: "error"
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Finish chatbot → fetch quiz
//   const finishChatbot = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/chatbot/finish", {
//         userId: user._id,
//         topicId: topic._id,
//       });
//       setQuiz(res.data.questions);
//       setMessages((prev) => [
//         ...prev,
//         { 
//           from: "bot", 
//           text: "Chat complete! Quiz is ready.",
//           type: "success"
//         },
//       ]);
//     } catch (err) {
//       console.error("Failed to finish chatbot:", err);
//       setMessages((prev) => [
//         ...prev,
//         { 
//           from: "bot", 
//           text: "Error generating quiz.",
//           type: "error"
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Format message text into steps
//   const formatMessageText = (text, type) => {
//     if (type === "intro") {
//       const lines = text.split('\n');
//       return (
//         <div className="space-y-3">
//           <div className="flex items-center space-x-2">
//             <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//             <h3 className="font-semibold text-lg text-gray-800">{lines[0]?.replace('Topic: ', '')}</h3>
//           </div>
//           <p className="text-gray-600 ml-5 leading-relaxed">{lines[1]?.replace('Description: ', '')}</p>
//         </div>
//       );
//     }

//     if (type === "guide") {
//       // Split text by periods or newlines to create steps
//       const sentences = text.split(/[.\n]+/).filter(sentence => sentence.trim().length > 0);
      
//       return (
//         <div className="space-y-4">
//           <div className="flex items-center space-x-2 mb-3">
//             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//             <h4 className="font-semibold text-gray-800">Learning Guide</h4>
//           </div>
//           <div className="space-y-3">
//             {sentences.map((sentence, index) => (
//               <div key={index} className="flex space-x-3 items-start">
//                 <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
//                   {index + 1}
//                 </div>
//                 <p className="text-gray-700 leading-relaxed">{sentence.trim()}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }

//     // For success, error, or other types
//     return (
//       <div className="flex items-center space-x-3">
//         <div className={`w-3 h-3 rounded-full ${
//           type === 'success' ? 'bg-green-500' : 
//           type === 'error' ? 'bg-red-500' : 'bg-gray-500'
//         }`}></div>
//         <p className={`${
//           type === 'success' ? 'text-green-700' : 
//           type === 'error' ? 'text-red-700' : 'text-gray-700'
//         } leading-relaxed`}>
//           {text}
//         </p>
//       </div>
//     );
//   };

//   // Render messages
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="max-w-4xl mx-auto p-6">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                 AI Learning Assistant
//               </h1>
//               <p className="text-gray-600">
//                 Topic: <span className="font-semibold text-blue-600">{topic?.title}</span>
//               </p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="text-sm text-gray-500">Active</span>
//             </div>
//           </div>
//         </div>

//         {/* Chat Container */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
//             <h2 className="text-xl font-semibold">Learning Session</h2>
//             <p className="text-blue-100 text-sm">Follow the step-by-step guide below</p>
//           </div>
          
//           <div className="h-96 overflow-y-auto p-6 space-y-6 bg-gray-50">
//             {messages.length === 0 && (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//                   <p className="text-gray-500">Loading your learning session...</p>
//                 </div>
//               </div>
//             )}
            
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`transform transition-all duration-300 hover:scale-[1.01] ${
//                   msg.from === "bot" 
//                     ? "bg-white border border-gray-200 shadow-sm" 
//                     : "bg-blue-50 border border-blue-200"
//                 } rounded-xl p-5`}
//               >
//                 {formatMessageText(msg.text, msg.type)}
//               </div>
//             ))}
            
//             {loading && (
//               <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
//                 <div className="flex items-center space-x-3">
//                   <div className="flex space-x-1">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
//                     <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//                     <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//                   </div>
//                   <span className="text-gray-600">AI is thinking...</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="mt-6 flex justify-center space-x-4">
//           {!quiz && (
//             <button
//               onClick={finishChatbot}
//               disabled={loading}
//               className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
//               }`}
//             >
//               {loading ? (
//                 <span className="flex items-center space-x-2">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   <span>Processing...</span>
//                 </span>
//               ) : (
//                 "Complete Learning & Start Quiz"
//               )}
//             </button>
//           )}

//           {quiz && (
//             <button
//               onClick={() => navigate(`/quiz/${topic._id}`)}
//               className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg"
//             >
//               <span className="flex items-center space-x-2">
//                 <span>Start Quiz</span>
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </span>
//             </button>
//           )}
//         </div>

//         {/* Progress Indicator */}
//         <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
//           <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//             <span>Learning Progress</span>
//             <span>{quiz ? "100%" : "In Progress"}</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className={`h-2 rounded-full transition-all duration-500 ${
//                 quiz ? "bg-green-500 w-full" : "bg-blue-500 w-2/3"
//               }`}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatbotPage;



import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getTopicById } from "../api/topics";
import axios from "axios";

const ChatbotPage = () => {
  const { user } = useContext(AuthContext);
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);

  // Fetch topic
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await getTopicById(topicId);
        setTopic(res.data);
        setMessages([
          { from: "bot", text: `Topic: ${res.data.title}\nDescription: ${res.data.description}`, type: "intro" },
        ]);
        startChatbot(res.data._id);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopic();
  }, [topicId]);

  // Start chatbot guide
  const startChatbot = async (tId) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/chatbot/start", {
        userId: user._id,
        topicId: tId,
      });
      setMessages((prev) => [...prev, { from: "bot", text: res.data.guide, type: "guide" }]);
    } catch (err) {
      console.error("Failed to start chatbot:", err);
      setMessages((prev) => [...prev, { from: "bot", text: "Error fetching guide from server.", type: "error" }]);
    } finally {
      setLoading(false);
    }
  };

  // Finish chatbot and generate quiz
  const finishChatbot = async () => {
    setLoading(true);
    try {
      // Finish chatbot guide
      await axios.post("http://localhost:5000/api/chatbot/finish", {
        userId: user._id,
        topicId: topic._id,
      });

      // Generate quiz using topicId
      const quizRes = await axios.post("http://localhost:5000/api/quiz/generate", {
        topicId: topic._id, // ✅ send topicId
      });

      setQuiz(quizRes.data.questions);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Chat complete! Quiz is ready.", type: "success" },
      ]);
    } catch (err) {
      console.error("Failed to finish chatbot or generate quiz:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error generating quiz.", type: "error" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Retry quiz
  const retryQuiz = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/quiz/retry", {
        topicId: topic._id, // ✅ send topicId
      });
      setQuiz(res.data.questions);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Retry quiz generated!", type: "success" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Failed to generate retry quiz.", type: "error" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Format messages for UI
  const formatMessageText = (text, type) => {
    if (type === "intro") {
      const lines = text.split("\n");
      return (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h3 className="font-semibold text-lg text-gray-800">{lines[0]?.replace("Topic: ", "")}</h3>
          </div>
          <p className="text-gray-600 ml-5 leading-relaxed">{lines[1]?.replace("Description: ", "")}</p>
        </div>
      );
    }
    if (type === "guide") {
      const sentences = text.split(/[.\n]+/).filter((s) => s.trim().length > 0);
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h4 className="font-semibold text-gray-800">Learning Guide</h4>
          </div>
          <div className="space-y-3">
            {sentences.map((sentence, idx) => (
              <div key={idx} className="flex space-x-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  {idx + 1}
                </div>
                <p className="text-gray-700 leading-relaxed">{sentence.trim()}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-3">
        <div
          className={`w-3 h-3 rounded-full ${
            type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-gray-500"
          }`}
        ></div>
        <p
          className={`${
            type === "success" ? "text-green-700" : type === "error" ? "text-red-700" : "text-gray-700"
          } leading-relaxed`}
        >
          {text}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Learning Assistant</h1>
              <p className="text-gray-600">
                Topic: <span className="font-semibold text-blue-600">{topic?.title}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Active</span>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
            <h2 className="text-xl font-semibold">Learning Session</h2>
            <p className="text-blue-100 text-sm">Follow the step-by-step guide below</p>
          </div>
          <div className="h-96 overflow-y-auto p-6 space-y-6 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`transform transition-all duration-300 hover:scale-[1.01] ${
                  msg.from === "bot" ? "bg-white border border-gray-200 shadow-sm" : "bg-blue-50 border border-blue-200"
                } rounded-xl p-5`}
              >
                {formatMessageText(msg.text, msg.type)}
              </div>
            ))}
            {loading && (
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  <span className="text-gray-600">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          {!quiz && (
            <button
              onClick={finishChatbot}
              disabled={loading}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </span>
              ) : (
                "Complete Learning & Start Quiz"
              )}
            </button>
          )}

          {quiz && (
            <button
              onClick={() => navigate(`/quiz/${topic._id}`, { state: { quiz, topic, userId: user._id } })}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg"
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
