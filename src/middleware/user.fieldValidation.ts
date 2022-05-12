import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserModel from "../models/user.model";

const emailRegex = /\S+@\S+\.\S+/;
const validateEmailWithRegex = (email: string) => emailRegex.test(email);

const nameValidation = (n: string) => {
    if (!n) {
        return {
            error: { code: StatusCodes.BAD_REQUEST, message: `field "name" can't be null or empty.` },
        };
    }

    if (n.length < 3) {
        return {
            error: { code: StatusCodes.BAD_REQUEST, message: '"name" must be at least 3 characters long.' },
        };
    }

    return {};
};

const emailValidation = (e: string) => {
    if (!e) {
        return {
            error: { code: StatusCodes.BAD_REQUEST, message: `field "email" can't be null or empty.` },
        };
    }

    if (!validateEmailWithRegex(e)) {
        return {
            error: { code: StatusCodes.BAD_REQUEST, message: '"email" must be a valid email.' },
          };
    }

    return {};
}

const passValidation = (p: string) => {
    if (!p) {
        return {
            error: { code: StatusCodes.BAD_REQUEST, message: `field "password" can't be null or empty.` },
        };
    }

    if (p.length < 6 || p.length > 12) {
        return {
            error: { code: StatusCodes.BAD_REQUEST, message: '"password" must have at least 6 characters and maximun of 12.' }
        }
    }

    return {};
}

const model = new UserModel();

export const registerUserValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password } = req.body;

    const nameV = nameValidation(name);
    const emailV = emailValidation(email);
    const passV = passValidation(password);

    if (nameV.error) return next(nameV.error);
    if (emailV.error) return next(emailV.error);
    if (passV.error) return next(passV.error);

    const exist = await model.getUserByEmail(email);
    if (exist) {
        return next({ code: StatusCodes.CONFLICT, message: 'email already registered' });
    }

    return next();
}

export const editUserValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const n = parseInt(id);
    if (n === NaN) {
        return next({ code: StatusCodes.BAD_REQUEST, message: 'id must be an integer number.' })
    }

    const { name, email, password } = req.body;

    const nameV = nameValidation(name);
    const emailV = emailValidation(email);
    const passV = passValidation(password);

    if (nameV.error) return next(nameV.error);
    if (emailV.error) return next(emailV.error);
    if (passV.error) return next(passV.error);

    const exist = await model.getUserById(n);
    if (!exist) {
        return next({ code: StatusCodes.BAD_REQUEST, message: 'user not found.' })
    }

    return next();
}