import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import * as contactController from "../controllers/contactController";
import upload from "../fileHandlers/multer";

const router = Router();

router.use(authenticate);

router.get("/", contactController.getAllContacts);
router.post("/", upload.single("photoUrl"), contactController.createContact);
router.get("/:contactId", contactController.getContactById);
router.put(
    "/:contactId",
    upload.single("photoUrl"),
    contactController.updateContact
);
router.delete("/:contactId", contactController.deleteContact);

export default router;
