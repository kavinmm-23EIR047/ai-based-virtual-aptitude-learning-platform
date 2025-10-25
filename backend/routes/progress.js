const express = require("express");
const router = express.Router();
const { getProgress } = require("../controllers/progressController");

// Get user progress
router.get("/:userId", getProgress);

module.exports = router;
