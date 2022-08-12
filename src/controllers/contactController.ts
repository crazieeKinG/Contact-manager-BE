import { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../domain/User";
import * as contactService from "../services/contactService";

export const getAllContacts = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const currentUser = req.authUser as number;
    contactService
        .getAllContacts(currentUser)
        .then((data) => res.json(data))
        .catch((error) => next(error));
};

export const getContactById = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const currentUser = req.authUser as number;
    const { contactId } = req.params;

    contactService
        .getContactById(+contactId, currentUser)
        .then((data) => res.json(data))
        .catch((error) => next(error));
};

export const createContact = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const currentUser = req.authUser as number;
    const contact = req.body;

    contactService
        .createContact(contact, currentUser)
        .then((data) => res.json(data))
        .catch((error) => next(error));
};
export const updateContact = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const currentUser = req.authUser as number;
    const { contactId } = req.params;
    const contact = req.body;

    contactService
        .updateContact(+contactId, contact, currentUser)
        .then((data) => res.json(data))
        .catch((error) => next(error));
};

export const deleteContact = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const currentUser = req.authUser as number;
    const { contactId } = req.params;

    contactService
        .deleteContact(+contactId, currentUser)
        .then((data) => res.json(data))
        .catch((error) => next(error));
};
