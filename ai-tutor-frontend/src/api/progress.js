import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/progress" });

export const getProgress = (userId) => API.get(`/${userId}`);
