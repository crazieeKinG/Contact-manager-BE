import { CLOUDINARY_ASSET_FOLDER } from "../constants/contactConstants";
import { cloudinaryError } from "../utils/errors";
import { getImageCloudinaryId } from "../utils/getImageCloudinaryId";
import cloudinary from "./cloudinary";

const deleteImage = async (fileString: string) => {
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
        throw cloudinaryError;
    }
};

export default deleteImage;
