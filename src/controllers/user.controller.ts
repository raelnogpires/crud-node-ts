import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "../services/userService";

export default class UserController {
    private service = new UserService();

    public getAllUsers = async (_req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const users = await this.service.getAllUsers();
        if (!users) {
            return next({ code: StatusCodes.INTERNAL_SERVER_ERROR, message: 'internal server error.' });
        }

        return res.status(StatusCodes.OK).json(users);
    }

    public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const { id } = req.params;
        const n = parseInt(id);
        const user = await this.service.getUserById(n);
        if (!user) {
            return next({ code: StatusCodes.NOT_FOUND, message: 'user not found.' });
        }

        return res.status(StatusCodes.OK).json(user);
    }

    public createUser = async (req: Request, res: Response): Promise<Response> => {
        const newUser = req.body;
        const created = await this.service.createUser(newUser);
        return res.status(StatusCodes.CREATED).json(created);
    }

    public editUser = async (req: Request, res: Response): Promise<Response> => {
        const edit = req.body;
        const { id } = req.params;
        const n = parseInt(id);
        await this.service.editUser({ id: n, ...edit });
        return res.status(StatusCodes.OK).json({ message: 'user edited sucessfully.' })
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const { id } = req.params;
        const n = parseInt(id);
        const user = this.service.getUserById(n);
        if (!user) {
            return next({ code: 404, message: 'user not found.' });
        }

        await this.service.deleteUser(n);
        return res.status(StatusCodes.NO_CONTENT).json({ message: 'user deleted.' });
    }
}