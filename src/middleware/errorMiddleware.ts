import { NextFunction, Request, Response } from "express";
import INextError from "../interfaces/error.interface";


export default (err: INextError, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err.message, err);
    return res.status(err.code).json({ message: err.message });
};