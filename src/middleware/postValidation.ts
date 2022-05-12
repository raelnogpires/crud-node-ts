import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import IPost from "../interfaces/post.interface";

const properties = ['title', 'author', 'category', 'publicationDate'];

const validateProperties = (post: IPost): [boolean, boolean | string | null] => {
    for (let i = 0; i < properties.length; i += 1) {
        if (!Object.prototype.hasOwnProperty.call(post, properties[i])) {
          return [false, properties[i]];
        }
      }
      return [true, null];
};

const validateValues = (post: IPost): [boolean, boolean | string | null] => {
    const entries = Object.entries(post);
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];
      if (!value) {
        return [false, property];
      }
    }
    return [true, null];
};

const postValidation = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const post = req.body;

    const [valid, property] = validateProperties(post);
    if (!valid) {
        return res.status(StatusCodes.BAD_REQUEST).send(`the field ${property} is necessary.`);
    }

    const [v, p] = validateValues(post);
    if (!valid) {
        return res.status(StatusCodes.BAD_REQUEST).send(`the field ${p} can't be null or empty.`);
    }

    return next();
};

export default postValidation;