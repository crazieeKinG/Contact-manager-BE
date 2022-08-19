import db from "../db/db";
import { User, UserInsertedResponse, UserToInsert } from "../domain/User";
import { databaseError } from "../utils/errors";

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
            throw databaseError;
        }
    }

    public static async createUser(
        user: UserToInsert
    ): Promise<UserInsertedResponse> {
        try {
            const insertedUser: UserInsertedResponse = await db(
                this.table
            ).insert(user, ["id", "username", "email"]);

            return insertedUser;
        } catch {
            throw databaseError;
        }
    }
}
