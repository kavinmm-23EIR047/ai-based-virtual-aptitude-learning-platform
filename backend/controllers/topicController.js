const Topic = require("../models/Topic");

// Get all topics
exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Initialize default topics (only once)
exports.initTopics = async (req, res) => {
  try {
    const topics = [
      { title: "Simplification", description: "Step by step BODMAS problems" },
      { title: "Percentages", description: "Basic percentage problems" },
    ];
    await Topic.deleteMany({});
    await Topic.insertMany(topics);
    res.json({ msg: "Topics initialized" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Add a new topic
exports.addTopic = async (req, res) => {
  try {
    const { title, description, level } = req.body;
    const topic = new Topic({ title, description, level });
    await topic.save();
    res.json({ message: "Topic added successfully", topic });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to add topic", details: err });
  }
};
