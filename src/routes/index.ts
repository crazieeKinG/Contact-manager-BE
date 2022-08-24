import { Router } from "express";
import userRoutes from "./userRoutes";
import contactRoutes from "./contactRoutes";

const router = Router();

router.use("/", userRoutes);

router.use("/contacts", contactRoutes);

export default router;
