import express from "express";
import { createBoard, getBoards } from "../controllers/boardController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBoard);
router.get("/", authMiddleware, getBoards);

export default router;
