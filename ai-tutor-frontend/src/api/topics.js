import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/topics" });

export const getTopics = () => API.get("/");
export const addTopic = (data) => API.post("/", data);
export const initTopics = () => API.post("/init");

// Add this function:
export const getTopicById = (id) => API.get(`/${id}`);
