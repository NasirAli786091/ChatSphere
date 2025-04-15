import express from "express"
import checkAuth from "../middlewares/authMiddleware.js"
import profileController from "../controllers/profileController.js";

const router = express.Router();

router.get("/profile", checkAuth, profileController);

export default router;