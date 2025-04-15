import express from "express"
import checkAuth from "../middlewares/authMiddleware.js";
import {
    getMessageController,
    sendMessageController
} from "../controllers/messageController.js"


const router = express.Router();

router.get("/getMessage/:friendId", checkAuth, getMessageController);
router.post("/sendMessage", checkAuth, sendMessageController);

export default router;