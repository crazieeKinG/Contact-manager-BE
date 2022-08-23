import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";

export const databaseError = new CustomError(
    "Database Error",
    StatusCodes.BAD_REQUEST
);

export const multerError = new CustomError(
    "Multer Error",
    StatusCodes.INTERNAL_SERVER_ERROR
);

export const cloudinaryError = new CustomError(
    "Cloudinary Error",
    StatusCodes.INTERNAL_SERVER_ERROR
);
