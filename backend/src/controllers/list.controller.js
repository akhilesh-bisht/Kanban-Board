import List from "../models/list.js";

export const createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;
    const list = await List.create({ title, board: boardId });
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ error: "Error creating list" });
  }
};

export const getLists = async (req, res) => {
  try {
    const { boardId } = req.params;
    const lists = await List.find({ board: boardId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: "Error fetching lists" });
  }
};
