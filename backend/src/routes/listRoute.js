import express from "express";
import { createList, getLists } from "../controllers/list.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createList);
router.get("/", authMiddleware, getLists);

export default router;
