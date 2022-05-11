import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
require('dotenv').config()

const app = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response): Response => {
    return res.status(StatusCodes.OK).json({ message: 'working' })
});

app.listen(process.env.PORT, (): void => {
    console.log(`Running at port ${process.env.PORT}`);
});
