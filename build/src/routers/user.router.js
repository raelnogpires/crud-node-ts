"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userValidation_1 = __importDefault(require("../middleware/userValidation"));
const router = (0, express_1.Router)();
const controller = new user_controller_1.default();
router
    .get('/', controller.getAllUsers)
    .get('/:id', controller.getUserById)
    .post('/', userValidation_1.default, controller.createUser)
    .put('/:id', userValidation_1.default, controller.editUser)
    .delete('/:id', controller.deleteUser);
exports.default = router;
