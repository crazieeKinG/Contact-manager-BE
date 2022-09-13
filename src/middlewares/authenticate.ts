import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import jwt from "jsonwebtoken";
import { AuthorizedRequest, TokenPayload } from "../domain/AuthorizedRequest";
import CustomError from "../misc/CustomError";

/**
 * It tries to verify the access token in the request header, and if it's valid, it adds the userId to the request object.
 * @param {AuthorizedRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const authenticate = async (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const accessToken =
        req.headers.authorization?.split(" ")[1] || req.headers.auth;

    try {
        const result = (await jwt.verify(
            accessToken as string,
            process.env.JWT_SECRET as string
        )) as TokenPayload;

        req.authUser = result.userId;

        next();
    } catch (err) {
        next(new CustomError("Invalid access token", StatusCodes.UNAUTHORIZED));
    }
};

export default authenticate;
