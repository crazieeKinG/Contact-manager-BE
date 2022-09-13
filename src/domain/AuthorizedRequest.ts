import { Request } from "express";

export interface AuthorizedRequest extends Request {
    authUser?: number;
}

export interface TokenPayload {
    userId: number;
}