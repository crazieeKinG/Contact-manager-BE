import multer from "multer";
import { multerError } from "../utils/errors";

/* Creating a storage object that will be used by multer to store the file. */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file) {
            cb(null, `src/assets/uploads`);
        } else {
            throw multerError;
        }
    },
    filename: function (req, file, cb) {
        if (file) {
            cb(null, Date.now() + "_" + file.originalname);
        } else {
            throw multerError;
        }
    },
});

const upload = multer({ storage: storage });

export default upload;
