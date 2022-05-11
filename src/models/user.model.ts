import { ResultSetHeader } from "mysql2";
import connection from "../database/connection";
import IUser from "../interfaces/user.interface";

export default class UserModel {
    public async getAllUsers(): Promise<IUser[]> {
        const [result] = await connection.execute('SELECT * FROM Users');
        return result as IUser[];
    }

    public async getUserById(id: number): Promise<IUser> {
        const [result] = await connection.execute(
            'SELECT id, name, email FROM Users WHERE id = ?', [id]);
        const [final] = result as IUser[];
        return final;
    }

    public async createUser(name: string, email: string, password: string ): Promise<IUser> {
        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]);
        return { id: result.insertId, name, email };
    }

    public async editUser(id: number, name: string, email: string, password: string): Promise<void> {
        await connection.execute(
            'UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?',
            [name, email, password, id]);
    }

    public async deleteUser(id: number): Promise<void> {
        await connection.execute('DELETE FROM Users WHERE id = ?', [id]);
    }
}