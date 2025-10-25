const express = require("express");
const router = express.Router();
const {
  generateQuizController,
  retryQuizController,
  saveResultController,
  getAverageScoreController,
} = require("../controllers/quizController");

// -------------------- Routes --------------------

// Generate quiz for a topic (random 10 questions)
router.post("/generate", generateQuizController);

// Generate retry quiz for low score (random 10 easy questions)
router.post("/retry", retryQuizController);

// Save quiz result
router.post("/save", saveResultController);

// Get average score for a user
router.get("/average/:userId", getAverageScoreController);

module.exports = router;
