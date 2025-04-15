import express from "express"
import checkAuth from "../middlewares/authMiddleware.js"
import searchUsersController from "../controllers/searchUsersController.js";

const router = express.Router();


router.get("/search", checkAuth, searchUsersController);

export default router;