import Board from "../models/board.js";

export const createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const board = await Board.create({ title, owner: req.user._id });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ error: "Error creating board" });
  }
};

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user._id });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "Error fetching boards" });
  }
};
