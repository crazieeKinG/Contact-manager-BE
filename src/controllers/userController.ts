import { NextFunction, Request, Response } from "express";
import {
    SIGNIN_PARAMETERS,
    SIGNUP_PARAMETERS,
} from "../constants/parameterConstants";
import { userService } from "../services";
import checkMissingParameters from "../utils/checkMissingParameters";

/**
 * It handles user signin.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const signin = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    try {
        checkMissingParameters(data, SIGNIN_PARAMETERS);

        userService
            .signin(data.email, data.password)
            .then((data) => res.json(data))
            .catch((err) => next(err));
    } catch (error) {
        next(error);
    }
};

/**
 * It handles user registration.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

export const signup = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    try {
        checkMissingParameters(data, SIGNUP_PARAMETERS);

        userService
            .signup(data)
            .then((data) => res.json(data))
            .catch((err) => next(err));
    } catch (error) {
        next(error);
    }
};
