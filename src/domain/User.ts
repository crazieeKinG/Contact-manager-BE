import { Request } from "express";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

export type UserToInsert = Omit<User, "id">;
export type UserInsertedResponse = Omit<User, "password">;

export interface AuthorizedRequest extends Request {
    authUser?: number;
}

export interface TokenPayload {
    userId: number;
}
