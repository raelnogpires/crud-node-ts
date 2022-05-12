import { InternalServerError, NotFoundError } from "restify-errors";
import IPost from "../interfaces/post.interface";
import PostModel from "../models/post.model";

export default class PostService {
    private model = new PostModel();

    public getAllPosts = async (): Promise<IPost[]> => {
        const posts = await this.model.getAllPosts();
        if (!posts) throw new InternalServerError('internal server error');

        return posts;
    }

    public getPostById = async (id: number): Promise<IPost> => {
        const post = await this.model.getPostById(id);
        if (!post) throw new NotFoundError('post not found');

        return post;
    }

    public createPost = async (p: IPost): Promise<IPost> => {
        const { title, author, category, publicationDate } = p;
        const newPost = await this.model.createPost(title, author, category, publicationDate);

        return newPost;
    }

    public editPost = async (p: IPost): Promise<void> => {
        const { id, title, author, category, publicationDate } = p;
        await this.model.editPost(id, title, author, category, publicationDate);
    }

    public deletePost = async (id: number): Promise<void> => {
        const exist = await this.model.getPostById(id);
        if (!exist) throw new NotFoundError('post not found')

        await this.model.deletePost(id);
    }

    public searchByQuery = async (query: string): Promise<IPost | IPost[]> => {
        const all = await this.model.getAllPosts();
        // not the best way to do it
        const result = all.filter((p) => {
            p.title.includes(query) || p.author.includes(query) || p.publicationDate.includes(query);
        });

        return result;
    }
}