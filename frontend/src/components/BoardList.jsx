import React, { useState, useEffect } from "react";
import { sampleBoards } from "../data"; // Replace with API later

const BoardList = ({ onSelectBoard }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Replace with API call later
    setBoards(sampleBoards);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Boards</h2>
      <ul>
        {boards.map((board) => (
          <li
            key={board.id}
            className="cursor-pointer bg-blue-200 p-2 my-2 rounded"
            onClick={() => onSelectBoard(board.id)}
          >
            {board.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
