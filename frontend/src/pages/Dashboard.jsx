import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken, removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await axios.get("/api/boards", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setBoards(res.data);
    } catch (err) {
      console.error("Failed to fetch boards");
    }
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/boards",
        { title },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setTitle("");
      fetchBoards();
    } catch (err) {
      console.error("Failed to create board");
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Logout
      </button>
      <form onSubmit={handleCreateBoard} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Board Title"
          className="border p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Board
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => (
          <div key={board.id} className="p-4 bg-gray-200 rounded">
            {board.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
