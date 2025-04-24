import express from "express"
import talkToBot from "../controllers/chatBotController.js";

const router = express.Router();

router.post("/chatBot", talkToBot);

export default router;