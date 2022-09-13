import { CLOUDINARY_ASSET_FOLDER } from "../constants/contactConstants";
import logger from "../misc/logger";
import { cloudinaryError } from "../utils/errors";
import { getImageCloudinaryId } from "../utils/getImageCloudinaryId";
import cloudinary from "./cloudinary";

/**
 * It takes image name, checks if it's a default image, if not, it deletes the image from cloudinary
 * @param {string} fileString
 * @returns {
 *   "result": "ok",
 *   "error": {
 *     "message": "Not Found",
 *     "http_code": 404
 *   }
 */
const deleteImage = async (fileString: string) => {
    logger.info("Deleting image");
    try {
        const assetId = getImageCloudinaryId(fileString);
        if (assetId !== "default_f2y0f2") {
            const publicId =
                CLOUDINARY_ASSET_FOLDER + getImageCloudinaryId(fileString);
            const deleteResponse = await cloudinary.uploader.destroy(publicId);
            return deleteResponse.result;
        }
        return "ok";
    } catch {
        logger.error("Failed to delete");
        throw cloudinaryError;
    }
};

export default deleteImage;
