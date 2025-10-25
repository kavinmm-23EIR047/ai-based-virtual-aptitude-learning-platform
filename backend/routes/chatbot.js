const express = require("express");
const router = express.Router();
const {
  startChatbot,
  finishChatbot,
  saveResult
} = require("../controllers/chatbotController");

// Start chatbot guide
router.post("/start", startChatbot);

// Finish chatbot → generate quiz
router.post("/finish", finishChatbot);

// Save quiz results
router.post("/save", saveResult);

module.exports = router;
