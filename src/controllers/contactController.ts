import { NextFunction, Response } from "express";
import { DEFAULT_PROFILE_PICTURE } from "../constants/contactConstants";
import uploadImage from "../fileHandlers/uploadImage";
import logger from "../misc/logger";
import contactModel from "../models/contactModel";
import deleteImage from "../fileHandlers/deleteImage";
import { cloudinaryError } from "../utils/errors";
import fs from "fs";
import { AuthorizedRequest } from "../domain/AuthorizedRequest";
import { contactService } from "../services";
import checkMissingParameters from "../utils/checkMissingParameters";
import { CONTACT_CHECK_PARAMETERS } from "../constants/parameterConstants";

/**
 * It gets all contacts information.
 * @param {AuthorizedRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
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

/**
 * It gets a single contact information.
 * @param {AuthorizedRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
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

/**
 * It uploads an image to cloudinary, and then creates a contact in the database.
 * @param {AuthorizedRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createContact = async (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    let cloudinaryUrl: string = DEFAULT_PROFILE_PICTURE;
    const requestData = req.body;
    delete requestData.photo;

    try {
        const contact = { ...req.body, photoUrl: cloudinaryUrl };
        checkMissingParameters(contact, CONTACT_CHECK_PARAMETERS);

        if (!!req.file) {
            logger.info("Uploading contact image");
            const fileString = (<Express.Multer.File>req.file).path;
            cloudinaryUrl = await uploadImage(fileString);
        }

        const currentUser = req.authUser as number;
        contact.photoUrl = cloudinaryUrl;

        contactService
            .createContact(contact, currentUser)
            .then((data) => res.json(data))
            .catch((error) => next(error));
    } catch (error) {
        fs.unlinkSync((<Express.Multer.File>req.file).path);
        next(error);
    }
};

/**
 * It updates a contact
 * @param {AuthorizedRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const updateContact = async (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const { contactId } = req.params;

    let cloudinaryUrl: string = DEFAULT_PROFILE_PICTURE;
    let previousPhotoUrl: string = "";
    let contact = req.body;
    const currentUser = req.authUser as number;

    if (!!req.file) {
        const previousContact = await contactModel.getContactById(
            +contactId,
            currentUser
        );

        const fileString = (<Express.Multer.File>req.file).path;

        cloudinaryUrl = await uploadImage(fileString);
        contact = {
            ...contact,
            photoUrl: cloudinaryUrl,
        };
        previousPhotoUrl = previousContact.photoUrl;
    }

    contactService
        .updateContact(+contactId, contact, currentUser)
        .then(async (data) => {
            if (previousPhotoUrl) await deleteImage(previousPhotoUrl);
            res.json(data);
        })
        .catch((error) => next(error));
};
/**
 * If deletes the contact.
 * @param {AuthorizedRequest} req - AuthorizedRequest,
 * @param {Response} res - Response,
 * @param {NextFunction} next - NextFunction
 */
export const deleteContact = async (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const currentUser = req.authUser as number;
    const { contactId } = req.params;

    logger.info("Deleting previous contact image");
    const previousContact = await contactModel.getContactById(
        +contactId,
        currentUser
    );
    const response = await deleteImage(previousContact.photoUrl);

    if (response.toString() === "ok") {
        contactService
            .deleteContact(+contactId, currentUser)
            .then((data) => res.json(data))
            .catch((error) => next(error));
    } else {
        throw cloudinaryError;
    }
};
