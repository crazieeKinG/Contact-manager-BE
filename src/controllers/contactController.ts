import { NextFunction, Response } from "express";
import { DEFAULT_PROFILE_PICTURE } from "../constants/contactConstants";
import { AuthorizedRequest } from "../domain/User";
import fileHandler from "../fileHandlers/fileHandler";
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

export const createContact = async (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    let cloudinaryUrl: string = DEFAULT_PROFILE_PICTURE;
    if (!!req.file) {
        const fileString = (<Express.Multer.File>req.file).path;
        cloudinaryUrl = await fileHandler(fileString);
    }

    const currentUser = req.authUser as number;
    const contact = { ...req.body, photoUrl: cloudinaryUrl };

    contactService
        .createContact(contact, currentUser)
        .then((data) => res.json(data))
        .catch((error) => next(error));
};
export const updateContact = async (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const { contactId } = req.params;

    let cloudinaryUrl: string = DEFAULT_PROFILE_PICTURE;
    if (!!req.file) {
        const fileString = (<Express.Multer.File>req.file).path;
        cloudinaryUrl = await fileHandler(fileString);
    }

    const currentUser = req.authUser as number;
    const contact = { ...req.body, photoUrl: cloudinaryUrl };

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
