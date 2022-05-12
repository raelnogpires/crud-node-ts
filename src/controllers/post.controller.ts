import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import PostService from "../services/postService";

export default class PostController {
    private service = new PostService();

    public getAllPosts = async (req: Request, res: Response): Promise<Response> => {
        const posts = await this.service.getAllPosts();
        return res.status(StatusCodes.OK).json(posts);
    }

    public getPostById = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const n = parseInt(id);
        const user = await this.service.getPostById(n);
        return res.status(StatusCodes.OK).json(user);
    }

    public createPost = async (req: Request, res: Response): Promise<Response> => {
        const post = req.body;
        const created = await this.service.createPost(post);
        return res.status(StatusCodes.CREATED).json(created);
    }

    public editPost = async (req: Request, res: Response): Promise<Response> => {
        const post = req.body;
        const { id } = req.params;
        const n = parseInt(id);
        await this.service.editPost({ id: n, ...post });
        return res.status(StatusCodes.OK).json({ message: 'post edited sucessfully' });
    }

    public deletePost = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const n = parseInt(id);
        await this.service.deletePost(n);
        return res.status(StatusCodes.NO_CONTENT).json({ message: 'post deleted' });
    }

    public searchByQuery = async (req: Request, res: Response): Promise<Response> => {
        const { q } = req.query;
        const search = q?.toString();
        const result = await this.service.searchByQuery(search);
        return res.status(StatusCodes.OK).json(result);
    }
}