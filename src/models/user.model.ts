import connection from "../database/connection";
import IUser from "../interfaces/user.interface";

export default class UserModel {
    public async getAllUsers(): Promise<IUser[]> {
        const [result] = await connection.execute('SELECT * FROM Users');
        return result as IUser[];
    }

    public async getUserById(id: number): Promise<IUser[]> {
        const [result] = await connection.execute(
            'SELECT id, name, email FROM Users WHERE id = ?', [id]
        );
        return result as IUser[];
    }
}