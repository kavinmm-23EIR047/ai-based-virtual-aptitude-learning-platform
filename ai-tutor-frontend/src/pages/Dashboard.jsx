import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TopicCard from "../components/TopicCard";
import { AuthContext } from "../context/AuthContext";
import { getTopics } from "../api/topics";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [avgScore, setAvgScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await getTopics();
        setTopics(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load topics.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAvgScore = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/quiz/average/${user._id}`
        );
        setAvgScore(res.data.avgScore);
      } catch (err) {
        console.error("Failed to fetch average score:", err);
      }
    };

    fetchTopics();
    fetchAvgScore();
  }, [user]);

  const handleTopicClick = (topic) => {
    navigate(`/chatbot/${topic._id}`, { state: { topic, userId: user._id } });
  };

  // Filter topics based on search term and category
  const filteredTopics = topics.filter((topic) => {
    const matchesSearch =
      topic.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || topic.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(topics.map((t) => t.category).filter(Boolean))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
          <div className="p-4 sm:p-6">
            <Header user={user} />
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center sm:text-left"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                Welcome back, {user?.name || "Learner"}! 👋
              </h1>
              <p className="text-gray-600 text-lg sm:text-xl max-w-2xl">
                Ready to explore new topics and expand your knowledge? Choose from our curated learning topics below.
              </p>
            </motion.div>
          </div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div className="sm:w-48">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm capitalize"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category} className="capitalize">
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {!loading && (
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <span>{filteredTopics.length} topic{filteredTopics.length !== 1 ? "s" : ""} found</span>
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Topics Grid */}
          <div className="min-h-[400px]">
            {loading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col justify-center items-center py-20">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
                </div>
                <p className="mt-6 text-gray-600 text-lg font-medium">Loading amazing topics for you...</p>
              </motion.div>
            ) : error ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
                  <p className="text-red-600">{error}</p>
                  <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Try Again
                  </button>
                </div>
              </motion.div>
            ) : filteredTopics.length === 0 ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.943-6.015 2.469A9.965 9.965 0 016 12c0-5.523 4.477-10 10-10s10 4.477 10 10a9.965 9.965 0 01-2.015 4.469z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {searchTerm ? "No topics found" : "No topics available"}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm ? `No topics match your search "${searchTerm}". Try different keywords.` : "Check back later for new learning topics!"}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="wait">
                  {filteredTopics.map((topic, index) => (
                    <motion.div
                      key={topic._id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={index}
                      layout
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.98 }}
                      className="cursor-pointer group"
                      onClick={() => handleTopicClick(topic)}
                    >
                      <div className="h-full transform transition-all duration-300 hover:shadow-xl">
                        <TopicCard topic={topic} />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Stats Section */}
          {!loading && topics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-2xl p-8 text-white"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold mb-2">{topics.length}</div>
                  <div className="text-blue-100">Available Topics</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold mb-2">{categories.length - 1}</div>
                  <div className="text-blue-100">Categories</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold mb-2">
                    {avgScore !== null ? `${avgScore}%` : "Loading..."}
                  </div>
                  <div className="text-blue-100">Average Quiz Score</div>
                  {avgScore !== null && (
                    <div className="w-full h-3 bg-blue-200 rounded-full mt-2">
                      <div
                        className="h-3 bg-green-400 rounded-full transition-all duration-500"
                        style={{ width: `${avgScore}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold mb-2">∞</div>
                  <div className="text-blue-100">Learning Opportunities</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
