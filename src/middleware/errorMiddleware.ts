import { NextFunction, Request, Response } from "express";

export default (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err.message, err);
    return res.status(500).json({ message: err.message });
};