import { Router } from "express";
import { userController } from "../controllers";

const router = Router();

router.post("/signin", userController.signin);
router.post("/signup", userController.signup);

export default router;
