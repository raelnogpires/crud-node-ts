import { NextFunction, Request, Response } from "express";

interface IError {
    code: number,
    message: string,
}

export default (err: IError, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err.message, err);
    return res.status(err.code).json({ message: err.message });
};