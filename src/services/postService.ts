import { InternalServerError, NotFoundError } from "restify-errors";
import IPost from "../interfaces/post.interface";
import PostModel from "../models/post.model";

export default class PostService {
    private model = new PostModel();

    public getAllPosts = async (): Promise<IPost[]> => {
        const posts = this.model.getAllPosts();
        if (!posts) {
            throw new InternalServerError('internal server error');
        }

        return posts;
    }

    public getPostById = async (id: number): Promise<IPost> => {
        const post = this.model.getPostById(id);
        if (!post) {
            throw new NotFoundError('post not found');
        }

        return post;
    }
}