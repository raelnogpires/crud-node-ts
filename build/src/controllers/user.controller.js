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
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    constructor() {
        this.service = new userService_1.default();
        this.getAllUsers = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.service.getAllUsers();
            if (!users) {
                return next({ code: 500, message: 'internal server error.' });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json(users);
        });
        this.getUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const n = parseInt(id);
            const user = yield this.service.getUserById(n);
            if (!user) {
                return next({ code: 404, message: 'user not found.' });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json(user);
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            const created = yield this.service.createUser(newUser);
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(created);
        });
        this.editUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const edit = req.body;
            const { id } = req.params;
            const n = parseInt(id);
            yield this.service.editUser(Object.assign({ id: n }, edit));
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'user edited sucessfully.' });
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const n = parseInt(id);
            const user = this.service.getUserById(n);
            if (!user) {
                return next({ code: 404, message: 'user not found.' });
            }
            yield this.service.deleteUser(n);
            return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ message: 'user deleted.' });
        });
    }
}
exports.default = UserController;
