"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const postService_1 = __importDefault(require("../services/postService"));
class PostController {
    constructor() {
        this.service = new postService_1.default();
        this.getAllPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.service.getAllPosts();
            return res.status(http_status_codes_1.StatusCodes.OK).json(posts);
        });
        this.getPostById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const n = parseInt(id);
            const user = yield this.service.getPostById(n);
            return res.status(http_status_codes_1.StatusCodes.OK).json(user);
        });
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const post = req.body;
            const created = yield this.service.createPost(post);
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(created);
        });
        this.editPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const post = req.body;
            const { id } = req.params;
            const n = parseInt(id);
            yield this.service.editPost(Object.assign({ id: n }, post));
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'post edited sucessfully' });
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const n = parseInt(id);
            yield this.service.deletePost(n);
            return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ message: 'post deleted' });
        });
        this.searchByQuery = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { q } = req.query;
            const search = q === null || q === void 0 ? void 0 : q.toString();
            const result = yield this.service.searchByQuery(search);
            return res.status(http_status_codes_1.StatusCodes.OK).json(result);
        });
    }
}
exports.default = PostController;
