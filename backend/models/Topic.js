// const mongoose = require("mongoose");

// const topicSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   level: { type: String, default: "beginner" },
// });

// module.exports = mongoose.model("Topic", topicSchema);


// models/Topic.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true }, // ["A","B","C","D"]
  answer: { type: String, required: true },    // "A" | "B" | "C" | "D"
  explanation: { type: String },
  difficulty: { type: String, enum: ["easy","medium","hard"], default: "medium" }
});

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  level: { type: String, default: "Beginner" },
  questions: [questionSchema] // <-- store all questions here
});

module.exports = mongoose.model("Topic", topicSchema);
