import connection from "../database/connection";
import IUser from "../interfaces/user.interface";

export default class UserModel {
    public async getAllUsers(): Promise<IUser[]> {
        const [result] = await connection.execute('SELECT * FROM Users');
        return result as IUser[];
    }
}