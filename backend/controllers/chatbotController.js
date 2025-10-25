

// const { callGemini } = require("../utils/gemini");
// const QuizResult = require("../models/QuizResult");
// const Topic = require("../models/Topic");
// const mongoose = require("mongoose");

// /**
//  * Start chatbot → generate step-by-step aptitude guide
//  */
// exports.startChatbot = async (req, res) => {
//   try {
//     const { userId, topicId } = req.body;

//     const topic = await Topic.findById(topicId);
//     if (!topic) return res.status(404).json({ error: "Topic not found" });

//     const prompt = `Create a step-by-step aptitude solving guide for the topic titled "${topic.title}" with description "${topic.description}"`;

//     const guide = await callGemini(prompt);

//     res.json({ userId, topicId, guide });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       userId: req.body.userId,
//       topicId: req.body.topicId,
//       guide: "Error fetching from Gemini API"
//     });
//   }
// };

// /**
//  * Finish chatbot → generate 10-question random quiz
//  */
// exports.finishChatbot = async (req, res) => {
//   try {
//     const { userId, topicId } = req.body;

//     const topic = await Topic.findById(topicId);
//     if (!topic) return res.status(404).json({ error: "Topic not found" });

//     // AI prompt to generate 10 aptitude questions in JSON format
//     const prompt = `
//       Generate 10 random aptitude questions for the topic "${topic.title}" with description "${topic.description}".
//       Each question should have 4 options and one correct answer.
//       Return the result strictly as a JSON array:
//       [{ q: "Question text", options: ["A","B","C","D"], answer: "Correct option" }]
//     `;

//     const quizText = await callGemini(prompt);

//     let questions;
//     try {
//       questions = JSON.parse(quizText);
//     } catch {
//       // fallback if Gemini fails
//       questions = [
//         { q: "Example 1 + 1?", options: ["1", "2", "3", "4"], answer: "2" },
//         { q: "Example 2 + 2?", options: ["1", "2", "3", "4"], answer: "4" },
//       ];
//     }

//     res.json({ userId, topicId, questions });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ userId: req.body.userId, topicId: req.body.topicId, questions: [] });
//   }
// };

// /**
//  * Save quiz results and calculate average, include pass/fail logic
//  */
// exports.saveResult = async (req, res) => {
//   try {
//     let { userId, topicId, score, totalQuestions } = req.body;

//     // Convert to ObjectId to avoid BSONError
//     userId = mongoose.Types.ObjectId(userId);
//     topicId = mongoose.Types.ObjectId(topicId);

//     // Validate score
//     score = Number(score) || 0;
//     totalQuestions = Number(totalQuestions) || 10;
//     const percentage = (score / totalQuestions) * 100;
//     const passed = percentage >= 60;

//     // Save result
//     const result = new QuizResult({ userId, topicId, score });
//     await result.save();

//     // Calculate average for this user-topic
//     const allResults = await QuizResult.find({ userId, topicId });
//     const avg = allResults.reduce((acc, r) => acc + r.score, 0) / allResults.length;

//     res.json({
//       message: "Result saved",
//       score,
//       totalQuestions,
//       percentage,
//       passed,
//       average: avg
//     });
//   } catch (err) {
//     console.error("Failed to save quiz result:", err);
//     res.status(500).json({ error: "Failed to save quiz result" });
//   }
// };

const { callCohere } = require("../utils/gemini"); // ← changed from callGemini
const QuizResult = require("../models/QuizResult");
const Topic = require("../models/Topic");
const mongoose = require("mongoose");

/**
 * Start chatbot → generate step-by-step aptitude guide
 */
exports.startChatbot = async (req, res) => {
  try {
    const { userId, topicId } = req.body;

    const topic = await Topic.findById(topicId);
    if (!topic) return res.status(404).json({ error: "Topic not found" });

    const prompt = `
    Create a step-by-step aptitude solving guide for the topic titled "${topic.title}" 
    with description "${topic.description}". 
    Be detailed, clear, and structured with numbered steps.
    `;

    const guide = await callCohere(prompt);

    res.json({ userId, topicId, guide });
  } catch (err) {
    console.error("Error in startChatbot:", err);
    res.status(500).json({
      userId: req.body.userId,
      topicId: req.body.topicId,
      guide: "Error fetching from Cohere API",
    });
  }
};

/**
 * Finish chatbot → generate 10-question random quiz
 */
exports.finishChatbot = async (req, res) => {
  try {
    const { userId, topicId } = req.body;

    const topic = await Topic.findById(topicId);
    if (!topic) return res.status(404).json({ error: "Topic not found" });

    const prompt = `
    Generate 10 random aptitude questions for the topic "${topic.title}" 
    with description "${topic.description}". 
    Each question should have exactly 4 options (A, B, C, D) and one correct answer.
    Return the result strictly as a valid JSON array, no extra text:
    [
      { "q": "Question text", "options": ["A", "B", "C", "D"], "answer": "Correct option" }
    ]
    `;

    const quizText = await callCohere(prompt);

    let questions;
    try {
      questions = JSON.parse(quizText);
    } catch (err) {
      console.warn("Cohere returned invalid JSON, using fallback:", err);
      questions = [
        { q: "Example 1 + 1?", options: ["1", "2", "3", "4"], answer: "2" },
        { q: "Example 2 + 2?", options: ["1", "2", "3", "4"], answer: "4" },
      ];
    }

    res.json({ userId, topicId, questions });
  } catch (err) {
    console.error("Error in finishChatbot:", err);
    res.status(500).json({
      userId: req.body.userId,
      topicId: req.body.topicId,
      questions: [],
    });
  }
};

/**
 * Save quiz results and calculate average, include pass/fail logic
 */
exports.saveResult = async (req, res) => {
  try {
    let { userId, topicId, score, totalQuestions } = req.body;

    // Convert to ObjectId
    userId = mongoose.Types.ObjectId(userId);
    topicId = mongoose.Types.ObjectId(topicId);

    // Validation
    score = Number(score) || 0;
    totalQuestions = Number(totalQuestions) || 10;
    const percentage = (score / totalQuestions) * 100;
    const passed = percentage >= 60;

    // Save result
    const result = new QuizResult({ userId, topicId, score });
    await result.save();

    // Calculate average score
    const allResults = await QuizResult.find({ userId, topicId });
    const avg =
      allResults.reduce((acc, r) => acc + r.score, 0) / allResults.length;

    res.json({
      message: "Result saved successfully",
      score,
      totalQuestions,
      percentage,
      passed,
      average: avg,
    });
  } catch (err) {
    console.error("Failed to save quiz result:", err);
    res.status(500).json({ error: "Failed to save quiz result" });
  }
};
