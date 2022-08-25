import jwt from "jsonwebtoken";

/**
 * This function takes in a data object and returns JWT token.
 * @param {any} data
 * @returns A string
 */
export const createAccessToken = (data: any): string => {
    const accessToken = jwt.sign(data, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRATION_INTERVAL,
    });

    return accessToken;
};
