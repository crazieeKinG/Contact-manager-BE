import jwt from "jsonwebtoken";

export const createAccessToken = (data: any): string => {
    const accessToken = jwt.sign(data, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRATION_INTERVAL,
    });

    return accessToken;
};
