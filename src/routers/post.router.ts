import { Router } from "express";
import PostController from "../controllers/post.controller";
import postValidation from "../middleware/postValidation";
import { registerPostValidation, editPostValidation } from "../middleware/post.fieldValidation";

const router = Router();
const controller = new PostController();

router
    .get('/search', controller.searchByQuery)
    .get('/', controller.getAllPosts)
    .get('/:id', controller.getPostById)
    .post('/', registerPostValidation, postValidation, controller.createPost)
    .put('/:id', editPostValidation, postValidation, controller.editPost)
    .delete('/:id', controller.deletePost)

export default router;
