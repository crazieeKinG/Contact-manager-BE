import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import upload from "../fileHandlers/multer";
import { contactController } from "../controllers";

const router = Router();

router.use(authenticate);

router.get("/", contactController.getAllContacts);
router.post("/", upload.single("photo"), contactController.createContact);
router.get("/:contactId", contactController.getContactById);
router.put(
    "/:contactId",
    upload.single("photo"),
    contactController.updateContact
);
router.delete("/:contactId", contactController.deleteContact);

export default router;
