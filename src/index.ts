import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// bad practice, should be at .env
const PORT = 5000;

const app = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response): Response => {
    return res.status(StatusCodes.OK).json({ message: 'working' })
});

app.listen(PORT, (): void => {
    console.log(`Running at port ${PORT}`);
});
