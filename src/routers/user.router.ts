import { Router } from "express";
import UserController from "../controllers/user.controller";
import userValidation from "../middleware/userValidation";
import { registerUserValidation, editUserValidation } from "../middleware/user.fieldValidation";

const router = Router();
const controller = new UserController()

router
    .get('/', controller.getAllUsers)
    .get('/:id', controller.getUserById)
    .post('/', registerUserValidation, userValidation, controller.createUser)
    .put('/:id', editUserValidation, userValidation, controller.editUser)
    .delete('/:id', controller.deleteUser)

export default router
