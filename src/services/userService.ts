import { InternalServerError, NotFoundError } from 'restify-errors';
import IUser from "../interfaces/user.interface";
import UserModel from "../models/user.model";

export default class UserService {
    private model = new UserModel();

    public getAllUsers = async (): Promise<IUser[] | boolean> => {
        const users = await this.model.getAllUsers();
        if (!users) return false;

        return users;
    }

    public getUserById = async (id: number): Promise<IUser | boolean> => {
        const user = await this.model.getUserById(id);
        if (!user) return false;

        return user;
    }

    public createUser = async (u: IUser): Promise<IUser> => {
        const { name, email, password } = u;
        const newUser = await this.model.createUser(name, email, password);
        return newUser;
    }

    public editUser = async (u: IUser): Promise<void> => {
        const { id, name, email, password } = u;
        await this.model.editUser(id, name, email, password);
    }

    public deleteUser = async (id: number): Promise<void> => {
        const exist = await this.model.getUserById(id);
        await this.model.deleteUser(id);
    }
}