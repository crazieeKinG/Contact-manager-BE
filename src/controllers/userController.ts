import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";

/**
 * It handles user signin.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const signin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    userService
        .signin(email, password)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};
/**
 * It handles user registration.
 * @param {Request} req 
 * @param {Response} res
 * @param {NextFunction} next
 */

export const signup = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    userService
        .signup(data)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};
