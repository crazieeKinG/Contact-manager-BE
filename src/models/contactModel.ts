import db from "../db/db";
import { Contact, ContactToInsert } from "../domain/Contact";
import { databaseError } from "../utils/errors";

export default class ContactManagement {
    public static table = "contact_management";

    /**
     * It returns a list of contacts for a given user.
     * @param {number} currentUser
     * @returns An array of objects.
     */
    public static async getAllContacts(currentUser: number) {
        try {
            const contacts = await db(this.table)
                .select()
                .where({ userId: currentUser })
                .orderBy("name");
            return contacts;
        } catch {
            throw databaseError;
        }
    }

    /**
     * This function returns a contact from the database based on the contactId and the currentUser.
     * @param {number} contactId 
     * @param {number} currentUser
     * @returns The contact object
     */
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

    /**
     * It takes in a contact object and a user id, inserts the contact into the database, and returns
     * the inserted contact.
     * @param {ContactToInsert} contact
     * @param {number} currentUser 
     * @returns The inserted contact
     */
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

    /**
     * Update a contact in the database, returning the updated contact.
     * @param {number} contactId
     * @param {ContactToInsert} contact 
     * @param {number} currentUser
     * @returns The updated contact
     */
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

    /**
     * It deletes a contact from the database and returns the name of the deleted contact.
     * @param {number} contactId
     * @param {number} currentUser
     * @returns The deleted contact.
     */
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
