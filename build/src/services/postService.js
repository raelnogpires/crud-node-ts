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
const post_model_1 = __importDefault(require("../models/post.model"));
class PostService {
    constructor() {
        this.model = new post_model_1.default();
        this.getAllPosts = () => __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.model.getAllPosts();
            if (!posts)
                return false;
            return posts;
        });
        this.getPostById = (id) => __awaiter(this, void 0, void 0, function* () {
            const post = yield this.model.getPostById(id);
            if (!post)
                return false;
            return post;
        });
        this.createPost = (p) => __awaiter(this, void 0, void 0, function* () {
            const { title, author, category, publicationDate } = p;
            const newPost = yield this.model.createPost(title, author, category, publicationDate);
            return newPost;
        });
        this.editPost = (p) => __awaiter(this, void 0, void 0, function* () {
            const { id, title, author, category, publicationDate } = p;
            yield this.model.editPost(id, title, author, category, publicationDate);
        });
        this.deletePost = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.model.deletePost(id);
        });
        this.searchByQuery = (query) => __awaiter(this, void 0, void 0, function* () {
            const all = yield this.model.getAllPosts();
            if (query === undefined) {
                return all;
            }
            // not the best way to do it
            const result = all.filter((p) => {
                p.title.includes(query) || p.author.includes(query) || p.publicationDate.includes(query);
            });
            return result;
        });
    }
}
exports.default = PostService;
