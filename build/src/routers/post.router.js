"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const postValidation_1 = __importDefault(require("../middleware/postValidation"));
const router = (0, express_1.Router)();
const controller = new post_controller_1.default();
router
    .get('/search', controller.searchByQuery)
    .get('/', controller.getAllPosts)
    .get('/:id', controller.getPostById)
    .post('/', postValidation_1.default, controller.createPost)
    .put('/:id', postValidation_1.default, controller.editPost)
    .delete('/:id', controller.deletePost);
exports.default = router;
