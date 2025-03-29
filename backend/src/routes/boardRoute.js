import express from "express";
import { createBoard, getBoards } from "../controllers/board.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBoard);
router.get("/", authMiddleware, getBoards);

export default router;
