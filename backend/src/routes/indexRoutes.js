import express from "express"
import authRoutes from "./authRoutes.js"
import profileRoutes from "./profileRoute.js"
import friendsRoutes from "./friendRoutes.js"
import userRoutes from "./userRoutes.js"
import messageRoute from "./messageRoute.js"

const router = express.Router();

router.use(authRoutes);
router.use(profileRoutes);
router.use(friendsRoutes);
router.use(userRoutes);
router.use(messageRoute);

export default router;