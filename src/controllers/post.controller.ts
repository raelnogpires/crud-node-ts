import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import PostService from "../services/postService";

export default class PostController {
    private service = new PostService();

    public getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const posts = await this.service.getAllPosts();
        if (!posts) {
            return next({ code: 500, message: 'internal server error.' });
        }
        return res.status(StatusCodes.OK).json(posts);
    }

    public getPostById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const { id } = req.params;
        const n = parseInt(id);
        const post = await this.service.getPostById(n);
        if (!post) {
            return next({ code: 404, message: 'post not found.' });
        }
        return res.status(StatusCodes.OK).json(post);
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
        return res.status(StatusCodes.OK).json({ message: 'post edited sucessfully.' });
    }

    public deletePost = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const { id } = req.params;
        const n = parseInt(id);
        const exist = await this.service.getPostById(n);
        if (!n) {
            return next({ code: 404, message: 'post not found.'})
        }

        await this.service.deletePost(n);
        return res.status(StatusCodes.OK).json({ message: 'post deleted.' });
    }

    public searchByQuery = async (req: Request, res: Response): Promise<Response> => {
        const { q } = req.query;
        const search = q?.toString();
        const result = await this.service.searchByQuery(search);
        return res.status(StatusCodes.OK).json(result);
    }
}