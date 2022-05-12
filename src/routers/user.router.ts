import { Router } from "express";
import UserController from "../controllers/user.controller";
import userValidation from "../middleware/userValidation";

const router = Router();
const controller = new UserController()

router
    .get('/', controller.getAllUsers)
    .get('/:id', controller.getUserById)
    .post('/', userValidation, controller.createUser)
    .put('/:id', userValidation, controller.editUser)
    .delete('/:id', controller.deleteUser)

export default router
