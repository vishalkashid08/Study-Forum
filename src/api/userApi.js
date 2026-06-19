import api from "./axiosConfig";

export const getUsers = () => api.get("/users");

export const registerUser = (data) => api.post("/users", data);

export const loginUser = (data) => api.post("/users/login", data);