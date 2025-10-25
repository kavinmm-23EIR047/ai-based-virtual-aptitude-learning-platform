import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/quiz" });

export const generateQuiz = (data) => API.post("/generate", data);
export const retryQuiz = (data) => API.post("/retry", data);
export const submitQuiz = (data) => API.post("/submit", data);
