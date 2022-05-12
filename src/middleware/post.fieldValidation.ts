import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import PostModel from "../models/post.model";

const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const testDate = (date: string) => dateRegex.test(date);

const authorValidation = (n: string) => {
    if (!n) {
        return {
            error: { code: StatusCodes.BAD_REQUEST, message: `field "author" can't be null or empty.` },
        };
    }

    if (n.length < 3) {
        return {
            error: { code: StatusCodes.BAD_REQUEST, message: '"author" must be at least 3 characters long.' },
        };
    }

    return {};
};

const categoryValidation = (c: string) => {
    if (!c) {
        return {
            error: { code: StatusCodes.BAD_REQUEST, message: `field "category" can't be null or empty.` },
        };
    }

    if (c.length < 3) {
        return {
            error: { code: StatusCodes.BAD_REQUEST, message: '"category" must be at least 3 characters long.' },
        };
    }

    return {};
}

export const registerPostValidation = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { title, author, category, publicationDate } = req.body;

    const nameV = authorValidation(author);
    if (nameV.error) return next(nameV.error);
    const categoryV = categoryValidation(category);
    if (categoryV.error) return next(categoryV.error);

    if (!title) {
        return next({ code: StatusCodes.BAD_REQUEST, message: `field "title" can't be null or empty.` });
    }

    if (!publicationDate) {
        return next({ code: StatusCodes.BAD_REQUEST, message: `field "publicationDate" can't be null or empty.` });
    }

    if (!testDate(publicationDate)) {
        return next({ code: StatusCodes.BAD_REQUEST, message: '"publicationDate" must follow format: YYYY-MM-DD' });
    }

    return next();
}

const model = new PostModel();

export const editPostValidation = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const n = parseInt(id);
    const { title, author, category, publicationDate } = req.body;

    const exist = await model.getPostById(n);
    if (!exist) {
        return next({ code: StatusCodes.NOT_FOUND, message: 'post not found.' });
    }

    const nameV = authorValidation(author);
    if (nameV.error) return next(nameV.error);
    const categoryV = categoryValidation(category);
    if (categoryV.error) return next(categoryV.error);

    if (!title) {
        return next({ code: StatusCodes.BAD_REQUEST, message: `field "title" can't be null or empty.` });
    }

    if (!publicationDate) {
        return next({ code: StatusCodes.BAD_REQUEST, message: `field "publicationDate" can't be null or empty.` });
    }

    if (!testDate(publicationDate)) {
        return next({ code: StatusCodes.BAD_REQUEST, message: '"publicationDate" must follow format: YYYY-MM-DD' });
    }

    return next();
}