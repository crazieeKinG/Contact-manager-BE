import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import * as contactController from "../controllers/contactController";

const router = Router();

router.use(authenticate);

router.get("/", contactController.getAllContacts);
router.post("/", contactController.createContact);
router.get("/:contactId", contactController.getContactById);
router.put("/:contactId", contactController.updateContact);
router.delete("/:contactId", contactController.deleteContact);

export default router;
