import { ResultSetHeader } from "mysql2";
import connection from "../database/connection";
import IPost from "../interfaces/post.interface";

export default class PostModel {
    public async getAllPosts(): Promise <IPost[]> {
        const [result] = await connection.execute('SELECT * FROM Posts');
        return result as IPost[];
    }

    public async getPostById(id: number): Promise<IPost> {
        const [result] = await connection.execute('SELECT * FROM Posts WHERE id = ?', [id]);
        const [final] = result as IPost[];
        return final;
    }

    public async createPost(title: string, author: string, category: string, publicationDate: string): Promise<IPost> {
        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO Posts (title, author, category, publicationDate) VALUES (?, ?, ?, ?)',
            [title, author, category, publicationDate]);
        return { id: result.insertId, title, author, category, publicationDate };
    }

    public async editPost(id: number, title: string, author: string, category: string, publicationDate: string): Promise<void> {
        await connection.execute(
            'UPDATE Posts SET title = ?, author = ?, category = ?, publicationDate = ? WHERE id = ?',
            [title, author, category, publicationDate, id])
    }

    public async deletePost(id: number): Promise<void> {
        await connection.execute('DELETE FROM Posts WHERE id = ?', [id]);
    }

    public async searchByQuery(query?: string): Promise<IPost[]> {
        const s = 'SELECT * FROM Posts WHERE author LIKE ? OR category LIKE ? OR publicationDate LIKE ?';
        const terms = [`%${query}$`, `%${query}$`, `%${query}$`];
        const [result] = await connection.execute(s, terms);
        return result as IPost[];
    }
}