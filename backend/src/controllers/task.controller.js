import Task from "../models/task.js";

// Create Task
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

// Get All Tasks for a List
export const getTasks = async (req, res) => {
  try {
    const { listId } = req.params;
    const tasks = await Task.find({ list: listId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, priority },
      { new: true } // Return updated task
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
