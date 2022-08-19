import cloudinary from "./cloudinary";
import fs from "fs";
import { cloudinaryError } from "../utils/errors";

const fileHandler = async (fileString: string) => {
    try {
        if (!fs.existsSync(fileString)) {
            throw new Error("File not found!");
        }
        const uploadResponse = await cloudinary.uploader.upload(fileString, {
            upload_preset: "contact-manager",
        });

        fs.unlinkSync(fileString);

        return uploadResponse.secure_url;
    } catch {
        fs.unlinkSync(fileString);
        throw cloudinaryError;
    }
};

export default fileHandler;
