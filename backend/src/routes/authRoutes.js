import express from "express"
import validate from "../middlewares/validate.js"
import {
    registerController,
    loginController,
    logoutController
} from "../controllers/authController.js"
import {
    loginValidator,
    registerValidator
} from "../utils/authValidator.js" //zod code here
import checkAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerValidator), registerController);
router.post("/login", validate(loginValidator), loginController);
router.get("/me", checkAuth, (req, res) => {
    return res.status(200).json({user: req.user});
});
router.post("/logout", logoutController);

export default router;