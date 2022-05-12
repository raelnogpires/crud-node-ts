import { InternalServerError, NotFoundError } from 'restify-errors';
import IPost from '../interfaces/post.interface';
import IUser from "../interfaces/user.interface";
import UserModel from "../models/user.model";

export default class UserService {
    private model = new UserModel();

    public getAll = async (): Promise<IUser[]> => {
        const users = await this.model.getAllUsers();
        if (!users) throw new InternalServerError('internal server error');

        return users;
    }

    public getUserById = async (id: number): Promise<IUser> => {
        const user = await this.model.getUserById(id);
        if (!user) throw new NotFoundError('user not found');

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
        if (!exist) throw new NotFoundError('user not found')

        await this.model.deleteUser(id);
    }
}