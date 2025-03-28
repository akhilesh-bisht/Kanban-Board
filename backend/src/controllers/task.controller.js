import Task from "../models/task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, listId } = req.body;
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      list: listId,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { listId } = req.params;
    const tasks = await Task.find({ list: listId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};
