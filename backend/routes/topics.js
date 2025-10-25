
const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");

// Existing routes
router.get("/", async (req, res) => {
  const topics = await Topic.find();
  res.json(topics);
});

router.post("/", async (req, res) => {
  const topic = new Topic(req.body);
  await topic.save();
  res.json(topic);
});

router.post("/init", async (req, res) => {
  // initialization logic
  res.json({ message: "Topics initialized" });
});

// ✅ NEW: get topic by ID
router.get("/:id", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ error: "Topic not found" });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
