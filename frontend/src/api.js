import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Get token from localStorage safely
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// Authentication
export const registerUser = (email, password) => {
  return axios.post(`${BASE_URL}/auth/register`, { email, password });
};

export const loginUser = (email, password) => {
  return axios.post(`${BASE_URL}/auth/login`, { email, password });
};

// Board Management
export const getBoards = () => {
  return axios.get(`${BASE_URL}/boards`, getAuthHeaders());
};

export const createBoard = (title) => {
  return axios.post(`${BASE_URL}/boards`, { title }, getAuthHeaders());
};

// List Management
export const getLists = (boardId) => {
  return axios.get(`${BASE_URL}/lists/${boardId}`, getAuthHeaders());
};

export const createList = (title, boardId) => {
  return axios.post(`${BASE_URL}/lists`, { title, boardId }, getAuthHeaders());
};

// Task Management
export const getTasks = (listId) => {
  return axios.get(`${BASE_URL}/tasks/${listId}`, getAuthHeaders());
};

export const createTask = (task) => {
  return axios.post(`${BASE_URL}/tasks`, task, getAuthHeaders());
};
