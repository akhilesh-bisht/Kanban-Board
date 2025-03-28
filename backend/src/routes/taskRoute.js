import express from "express";
import { createTask, getTasks } from "../controllers/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/:listId", authMiddleware, getTasks);

export default router;
