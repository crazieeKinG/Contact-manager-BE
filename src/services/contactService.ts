import { Contact, ContactToInsert } from "../domain/Contact";
import Success from "../domain/Success";
import logger from "../misc/logger";
import contactModel from "../models/ContactModel";

export const getAllContacts = async (
    currentUser: number
): Promise<Success<Contact[]>> => {
    logger.info("Getting all contacts");
    const contacts = await contactModel.getAllContacts(currentUser);

    return {
        data: contacts,
        message: "Contacts fetched successfully",
    };
};

export const getContactById = async (
    contactId: number,
    currentUser: number
): Promise<Success<Contact>> => {
    logger.info(`Getting contacts of id - ${contactId}`);
    const contact = await contactModel.getContactById(contactId, currentUser);

    return {
        data: contact,
        message: "Contacts fetched successfully",
    };
};

export const createContact = async (
    contact: ContactToInsert,
    currentUser: number
): Promise<Success<Contact>> => {
    logger.info("Inserting contact");
    const insertedContact = await contactModel.createContact(
        contact,
        currentUser
    );

    return {
        data: insertedContact,
        message: "Contact inserted successfully",
    };
};

export const updateContact = async (
    contactId: number,
    contact: ContactToInsert,
    currentUser: number
): Promise<Success<Contact>> => {
    logger.info("Updating contact");
    const updatedContact = await contactModel.updateContact(
        contactId,
        contact,
        currentUser
    );

    return {
        data: updatedContact,
        message: "Contact updated successfully",
    };
};

export const deleteContact = async (
    contactId: number,
    currentUser: number
): Promise<Success<Contact>> => {
    logger.info("Deleting contact");
    const deletedContact = await contactModel.deleteContact(
        contactId,
        currentUser
    );

    return {
        data: deletedContact,
        message: "Contact updated successfully",
    };
};
