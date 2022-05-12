import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import IUser from "../interfaces/user.interface";

const properties = ['name', 'email', 'password'];

const validateProperties = (post: IUser): [boolean, boolean | string | null] => {
    for (let i = 0; i < properties.length; i += 1) {
        if (!Object.prototype.hasOwnProperty.call(post, properties[i])) {
          return [false, properties[i]];
        }
      }
      return [true, null];
};

const validateValues = (post: IUser): [boolean, boolean | string | null] => {
    const entries = Object.entries(post);
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];
      if (!value) {
        return [false, property];
      }
    }
    return [true, null];
};

const userValidation = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const user = req.body;

    const [valid, property] = validateProperties(user);
    if (!valid) {
        return res.status(StatusCodes.BAD_REQUEST).send(`the field ${property} is necessary.`);
    }

    const [v, p] = validateValues(user);
    if (!valid) {
        return res.status(StatusCodes.BAD_REQUEST).send(`the field ${p} can't be null or empty.`);
    }

    return next();
};

export default userValidation;