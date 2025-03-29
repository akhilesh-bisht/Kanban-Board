import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Change this to your deployed backend URL

// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Authentication
export const registerUser = async (email, password) => {
  return axios.post(`${BASE_URL}/auth/register`, { email, password });
};

export const loginUser = async (email, password) => {
  return axios.post(`${BASE_URL}/auth/login`, { email, password });
};

// Board Management
export const getBoards = async () => {
  return axios.get(`${BASE_URL}/boards`, getAuthHeaders());
};

export const createBoard = async (title) => {
  return axios.post(`${BASE_URL}/boards`, { title }, getAuthHeaders());
};

// List Management
export const getLists = async (boardId) => {
  return axios.get(`${BASE_URL}/lists/${boardId}`, getAuthHeaders());
};

export const createList = async (title, boardId) => {
  return axios.post(`${BASE_URL}/lists`, { title, boardId }, getAuthHeaders());
};

// Task Management
export const getTasks = async (listId) => {
  return axios.get(`${BASE_URL}/tasks/${listId}`, getAuthHeaders());
};

export const createTask = async (task) => {
  return axios.post(`${BASE_URL}/tasks`, task, getAuthHeaders());
};
