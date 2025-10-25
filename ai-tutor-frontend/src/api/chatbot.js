import axios from "axios";

// Base URL points to /api
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Start a chatbot session
export const startChatbot = (data) => API.post("/chatbot/start", data);

// Finish chatbot session
export const finishChatbot = (data) => API.post("/chatbot/finish", data);

// Save chatbot result
export const saveChatbotResult = (data) => API.post("/chatbot/save", data);
