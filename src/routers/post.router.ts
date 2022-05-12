import { Router } from "express";
import PostController from "../controllers/post.controller";
import postValidation from "../middleware/postValidation";

const router = Router();
const controller = new PostController();

router
    .get('/search', controller.searchByQuery)
    .get('/', controller.getAllPosts)
    .get('/:id', controller.getPostById)
    .post('/', postValidation, controller.createPost)
    .put('/:id', postValidation, controller.editPost)
    .delete('/:id', controller.deletePost)

export default router;
