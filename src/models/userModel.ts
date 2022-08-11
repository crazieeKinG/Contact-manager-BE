import { StatusCodes } from "http-status-codes";
import db from "../db/db";
import { User, UserInsertedResponse, UserToInsert } from "../domain/User";
import CustomError from "../misc/CustomError";

export default class UserAccount {
    public static table = "user_account";

    public static async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await db(this.table)
                .where({ email: email })
                .select()
                .first();

            return user;
        } catch (error) {
            throw new CustomError(
                "Database Error",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    public static async createUser(
        user: UserToInsert
    ): Promise<UserInsertedResponse> {
        try {
            const insertedUser: UserInsertedResponse = await db(
                this.table
            ).insert(user, ["id", "email"]);

            return insertedUser;
        } catch {
            throw new CustomError(
                "Database Error",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
