const mongoose = require("mongoose");
const Topic = require("../models/Topic");
const QuizResult = require("../models/QuizResult");

// ----------------- Helper: Random questions -----------------
function getRandomQuestions(questions, num = 10) {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  // Map each question to include actual answer value instead of letter
  return shuffled.slice(0, Math.min(num, shuffled.length)).map(q => ({
    _id: q._id,
    question: q.question,
    options: q.options,
    answer: q.options[
      q.answer.charCodeAt(0) - "A".charCodeAt(0)
    ], // convert "A"/"B"/"C" to actual value
    explanation: q.explanation,
    difficulty: q.difficulty,
  }));
}

// ----------------- Generate Quiz -----------------
exports.generateQuizController = async (req, res) => {
  try {
    const { topicId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ error: "Invalid topicId" });
    }

    const topic = await Topic.findById(topicId).lean();
    if (!topic) return res.status(404).json({ error: "Topic not found" });

    const questions = getRandomQuestions(topic.questions, 10);

    res.json({
      topic: { _id: topic._id, title: topic.title, description: topic.description },
      questions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
};

// ----------------- Retry Quiz -----------------
exports.retryQuizController = async (req, res) => {
  try {
    const { topicId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ error: "Invalid topicId" });
    }

    const topic = await Topic.findById(topicId).lean();
    if (!topic) return res.status(404).json({ error: "Topic not found" });

    const easyQuestions = topic.questions.filter(q => q.difficulty === "easy");
    const questions = getRandomQuestions(easyQuestions, 10);

    res.json({
      topic: { _id: topic._id, title: topic.title },
      questions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate retry quiz" });
  }
};

// ----------------- Save Result -----------------
exports.saveResultController = async (req, res) => {
  try {
    const { userId, topicId, score } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ error: "Invalid userId or topicId" });
    }

    const result = new QuizResult({
      userId: new mongoose.Types.ObjectId(userId),
      topicId: new mongoose.Types.ObjectId(topicId),
      score,
    });

    await result.save();

    const results = await QuizResult.find({ userId }).lean();
    const totalScore = results.reduce((acc, r) => acc + r.score, 0);
    const avgScore = (totalScore / results.length).toFixed(2);

    res.json({ message: "Result saved", result, avgScore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save quiz result" });
  }
};

// ----------------- Get Average Score -----------------
exports.getAverageScoreController = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const results = await QuizResult.find({ userId }).lean();
    const avgScore = results.length === 0
      ? 0
      : (results.reduce((acc, r) => acc + r.score, 0) / results.length).toFixed(2);

    res.json({ avgScore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch average score" });
  }
};
