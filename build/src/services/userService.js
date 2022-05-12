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
const restify_errors_1 = require("restify-errors");
const user_model_1 = __importDefault(require("../models/user.model"));
class UserService {
    constructor() {
        this.model = new user_model_1.default();
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.model.getAllUsers();
            if (!users)
                throw new restify_errors_1.InternalServerError('internal server error.');
            return users;
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.getUserById(id);
            if (!user)
                throw new restify_errors_1.NotFoundError('user not found.');
            return user;
        });
        this.createUser = (u) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = u;
            const newUser = yield this.model.createUser(name, email, password);
            return newUser;
        });
        this.editUser = (u) => __awaiter(this, void 0, void 0, function* () {
            const { id, name, email, password } = u;
            yield this.model.editUser(id, name, email, password);
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const exist = yield this.model.getUserById(id);
            if (!exist)
                throw new restify_errors_1.NotFoundError('user not found.');
            yield this.model.deleteUser(id);
        });
    }
}
exports.default = UserService;
