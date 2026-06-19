import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090" // API Gateway Port
});

API.interceptors.request.use((req) => {
  // Check both 'token' and 'user.token' depending on your login logic
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const activeToken = token || (user && user.token);

  if (activeToken) {
    req.headers.Authorization = `Bearer ${activeToken}`;
  }

  return req;
});

// User Management
export const getAllUsers = () => API.get("/users");
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Content Management
export const getAnswersByQuestion = (questionId) => API.get(`/answers/question/${questionId}`);
export const addAnswer = (answerData) => API.post("/answers", answerData);

export default API;