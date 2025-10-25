const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/topics", require("./routes/topics"));
app.use("/api/video", require("./routes/chatbot"));
app.use("/api/quiz", require("./routes/quiz"));
app.use("/api/progress", require("./routes/progress"));
const chatbotRoutes = require("./routes/chatbot");
app.use("/api/chatbot", chatbotRoutes);


// DB + Server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
