import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
require('dotenv').config()

import userRouter from './routers/user.router';
import postRouter from './routers/post.router';
import errorMiddleware from './middleware/errorMiddleware';

const app = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response): Response => {
    return res.status(StatusCodes.OK).json({ message: 'working' })
});

app.use('/user', userRouter);
app.use('/post', postRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, (): void => {
    console.log(`Running at port ${process.env.PORT}`);
});
