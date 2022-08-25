import db from "../db/db";
import { User, UserInsertedResponse, UserToInsert } from "../domain/User";
import { databaseError } from "../utils/errors";

export default class UserAccount {
    public static table = "user_account";

    /**
     * "This function takes an email address as a parameter, and returns a user object if the email
     * address exists in the database, or null if it doesn't."
     * @param {string} email
     * @returns A user object
     */
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

    /**
     * It takes a user object, inserts it into the database, and returns the inserted user object.
     * @param {UserToInsert} user 
     * @returns The insertedUser object
     */
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
