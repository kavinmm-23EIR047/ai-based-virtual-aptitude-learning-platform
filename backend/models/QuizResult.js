const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  score: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuizResult", quizResultSchema);
