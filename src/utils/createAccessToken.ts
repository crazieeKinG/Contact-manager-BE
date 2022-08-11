import jwt from "jsonwebtoken";

export const createAccessToken = (data: any): string => {
    const accessToken = jwt.sign(data, process.env.JWT_SECRET as string);

    return accessToken;
};
