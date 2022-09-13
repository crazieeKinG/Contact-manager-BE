import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";

/* Creating a new instance of the CustomError class for invalid data error. */
export const invalidDataError = new CustomError(
    "Invalid data in request",
    StatusCodes.BAD_REQUEST
);

/* Creating a new instance of the CustomError class for missing data error. */
export const invalidNumberOfParametersError = new CustomError(
    "Missing or invalid data in request",
    StatusCodes.BAD_REQUEST
);

/* Creating a new instance of the CustomError class for database error. */
export const databaseError = new CustomError(
    "Database Error",
    StatusCodes.BAD_REQUEST
);

/* Creating a new instance of the CustomError class for multer error. */
export const multerError = new CustomError(
    "Multer Error",
    StatusCodes.INTERNAL_SERVER_ERROR
);

/* Creating a new instance of the CustomError class for cloudinary error. */
export const cloudinaryError = new CustomError(
    "Cloudinary Error",
    StatusCodes.INTERNAL_SERVER_ERROR
);
