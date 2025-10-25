// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { startChatbot } from "../api/chatbot";

// export default function TopicCard({ topic }) {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleClick = async () => {
//     try {
//       // Start chatbot with userId and topicId
//       const res = await startChatbot({ userId: user._id, topicId: topic._id });

//       // Navigate to chatbot page and pass messages
//       navigate(`/chatbot/${topic._id}`, { state: { messages: res.data.messages, topicId: topic._id } });
//     } catch (err) {
//       console.error("Failed to start chatbot:", err);
//       alert("Failed to start chatbot. Try again.");
//     }
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="cursor-pointer bg-white p-4 rounded shadow hover:shadow-lg transition"
//     >
//       <h2 className="text-lg font-bold">{topic.title}</h2>
//       <p className="text-gray-600">{topic.description}</p>
//     </div>
//   );
// }
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { startChatbot } from "../api/chatbot";

export default function TopicCard({ topic }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      // Start chatbot with userId and topicId
      const res = await startChatbot({ userId: user._id, topicId: topic._id });

      // Navigate to chatbot page and pass messages
      navigate(`/chatbot/${topic._id}`, { 
        state: { messages: res.data.messages, topicId: topic._id } 
      });
    } catch (err) {
      console.error("Failed to start chatbot:", err);
      alert("Failed to start chatbot. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate a color scheme based on topic title or category
  const getColorScheme = () => {
    const colors = [
      { bg: 'from-blue-400 to-blue-600', accent: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
      { bg: 'from-purple-400 to-purple-600', accent: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
      { bg: 'from-green-400 to-green-600', accent: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
      { bg: 'from-indigo-400 to-indigo-600', accent: 'bg-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-50' },
      { bg: 'from-pink-400 to-pink-600', accent: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50' },
      { bg: 'from-orange-400 to-orange-600', accent: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
    ];
    
    const hash = topic.title?.split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 0;
    return colors[hash % colors.length];
  };

  const colorScheme = getColorScheme();

  // Generate icon based on topic category or title
  const getTopicIcon = () => {
    const title = topic.title?.toLowerCase() || '';
    const category = topic.category?.toLowerCase() || '';
    
    if (title.includes('science') || category.includes('science')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    } else if (title.includes('math') || category.includes('math')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    } else if (title.includes('history') || category.includes('history')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    } else if (title.includes('language') || category.includes('language')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      );
    } else if (title.includes('art') || category.includes('art')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
        </svg>
      );
    } else if (title.includes('tech') || title.includes('computer') || category.includes('technology')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      );
    }
    
    // Default icon
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  };

  return (
    <div className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
        {/* Header with gradient background */}
        <div className={`bg-gradient-to-r ${colorScheme.bg} p-6 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                {getTopicIcon()}
              </div>
              <div>
                <h2 className="text-xl font-bold leading-tight mb-1 line-clamp-2">
                  {topic.title || "Untitled Topic"}
                </h2>
                {topic.category && (
                  <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-xs font-medium capitalize">
                    {topic.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 flex flex-col">
          <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
            {topic.description || "Explore this fascinating topic and expand your knowledge with our interactive learning experience."}
          </p>

          {/* Stats/Info Row */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>15-20 min</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Interactive</span>
              </div>
            </div>
            <div className={`w-2 h-2 ${colorScheme.accent} rounded-full animate-pulse`}></div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleClick}
            disabled={loading}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : `bg-gradient-to-r ${colorScheme.bg} hover:shadow-lg focus:ring-4`
            } ${colorScheme.text.replace('text-', 'focus:ring-')}`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Starting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Start Learning</span>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            )}
          </button>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
      </div>
    </div>
  );
}