import IUser from "../interfaces/user.interface";
import UserModel from "../models/user.model";

export default class UserService {
    private model = new UserModel();

    public getAll = async (): Promise<IUser[] | object> => {
        const users = await this.model.getAllUsers();
        return users;
    }
}