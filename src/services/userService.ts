import { StatusCodes } from "http-status-codes";
import Success from "../domain/Success";
import CustomError from "../misc/CustomError";

import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/createAccessToken";
import { Token } from "../domain/Token";
import logger from "../misc/logger";
import { UserInsertedResponse, UserToInsert } from "../domain/User";
import userModel from "../models/userModel";

/**
 * It takes an email and password, checks if the user exists, if the user exists, it checks if the
 * password matches, if the password matches, it creates an access token and returns it
 * @param {string} email
 * @param {string} password 
 * @returns access token and username
 */
export const signin = async (
    email: string,
    password: string
): Promise<Success<Token>> => {
    logger.info("Sign in - checking credentials");

    if (!email || !password) {
        throw new CustomError("Missing credentials", StatusCodes.BAD_REQUEST);
    }

    logger.info("Checking user availability");
    const user = await userModel.getUserByEmail(email);

    if (!user || !user.id) {
        throw new CustomError("Invalid credentials", StatusCodes.UNAUTHORIZED);
    }

    logger.info("Checking user authentication");
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new CustomError("Invalid credentials", StatusCodes.UNAUTHORIZED);
    }

    logger.info(`Creating accessToken for user | ${user.id}`);
    const accessToken = createAccessToken({ userId: user.id });

    return {
        data: { accessToken: accessToken, username: user.username },
        message: "Log in successful",
    };
};

/**
 * It takes a user object, encrypts the password, and inserts the user into the database.
 * @param {UserToInsert} data
 * @returns inserted user
 */
export const signup = async (
    data: UserToInsert
): Promise<Success<UserInsertedResponse>> => {
    logger.info("Sign up");

    const password = data.password;

    logger.info("Encryptng user password");
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    logger.info("Inserting data in database");
    const insertedUser = await userModel.createUser({
        ...data,
        password: passwordHash,
    });

    return {
        data: insertedUser,
        message: "Signup successful",
    };
};
