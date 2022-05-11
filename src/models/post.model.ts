import { ResultSetHeader } from "mysql2";
import connection from "../database/connection";
import IPost from "../interfaces/post.interface";

export default class PostModel {
    public async getAllPosts(): Promise <IPost[]> {
        const [result] = await connection.execute('SELECT * FROM Posts');
        return result as IPost[];
    }

    public async getPostById(id: number): Promise<IPost[]> {
        const [result] = await connection.execute('SELECT * FROM Posts WHERE id = ?', [id]);
        return result as IPost[];
    }

    public async createPost(title: string, author: string, category: string, publicationDate: string): Promise<IPost> {
        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO Posts (title, author, category, publicationDate)',
            [title, author, category, publicationDate]);
        return { id: result.insertId, title, author, category, publicationDate };
    }

    public async editPost(id: number, author: string, category: string, publicationDate: string): Promise<void> {
        await connection.execute(
            'UPDATE Posts SET title = ?, author = ?, category = ?, publicationDate = ? WHERE id = ?',
            [title, author, category, publicationDate, id])
    }
}