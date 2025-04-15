import express from "express"
import checkAuth from "../middlewares/authMiddleware.js"
import {
    sendFriendReqController,
    acceptFriendReqController,
    rejectFriendReqController,
    getPendingReqsController,
    getFriendList
} from "../controllers/friendController.js"


const router = express.Router();

router.post("/request/:receiverId", checkAuth, sendFriendReqController);
router.post("/accept/:requestId", checkAuth, acceptFriendReqController);
router.post("/reject/:requestId", checkAuth, rejectFriendReqController);
router.get("/requests", checkAuth, getPendingReqsController);
router.get("/friendList", checkAuth, getFriendList);

export default router;