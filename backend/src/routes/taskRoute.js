import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/:listId", authMiddleware, getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
export default router;
