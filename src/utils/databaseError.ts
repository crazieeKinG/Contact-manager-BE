import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";

export const databaseError = new CustomError(
    "Database Error",
    StatusCodes.BAD_REQUEST
);
