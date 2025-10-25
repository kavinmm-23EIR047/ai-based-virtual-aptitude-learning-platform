// controllers/progressController.js

const QuizResult = require("../models/QuizResult");
const Topic = require("../models/Topic");

// Get user progress and average score
exports.getProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all quiz results for the user
    const results = await QuizResult.find({ userId }).populate("topicId", "title");

    if (!results.length) {
      return res.json({ average: 0, results: [] });
    }

    // Calculate total and average score
    const total = results.reduce((sum, r) => sum + r.score, 0);
    const average = (total / results.length).toFixed(2);

    // Prepare detailed results
    const detailedResults = results.map((r) => ({
      topicId: r.topicId._id,
      topicTitle: r.topicId.title,
      score: r.score,
      date: r.createdAt,
    }));

    res.json({ average, results: detailedResults });
  } catch (err) {
    console.error("Progress error:", err);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};
