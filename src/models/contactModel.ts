import db from "../db/db";
import { Contact, ContactToInsert } from "../domain/Contact";
import { databaseError } from "../utils/errors";

export default class ContactManagement {
    public static table = "contact_management";

    public static async getAllContacts(currentUser: number) {
        try {
            const contacts = await db(this.table)
                .select()
                .where({ userId: currentUser });

            return contacts;
        } catch {
            throw databaseError;
        }
    }

    public static async getContactById(contactId: number, currentUser: number) {
        try {
            const contact = await db(this.table)
                .select()
                .where({ id: contactId, userId: currentUser })
                .first();

            return contact;
        } catch {
            throw databaseError;
        }
    }

    public static async createContact(
        contact: ContactToInsert,
        currentUser: number
    ) {
        try {
            const insertedContact = await db(this.table)
                .insert({ ...contact, userId: currentUser })
                .returning("*");

            return insertedContact;
        } catch {
            throw databaseError;
        }
    }
    public static async updateContact(
        contactId: number,
        contact: ContactToInsert,
        currentUser: number
    ) {
        try {
            const updatedContact: Contact[] = await db(this.table)
                .update(contact)
                .where({ id: contactId, userId: currentUser })
                .returning("*");

            return updatedContact;
        } catch {
            throw databaseError;
        }
    }
    public static async deleteContact(contactId: number, currentUser: number) {
        try {
            const deletedContact = await db(this.table)
                .delete()
                .where({ id: contactId, userId: currentUser })
                .returning(["name"]);

            return deletedContact;
        } catch {
            throw databaseError;
        }
    }
}
