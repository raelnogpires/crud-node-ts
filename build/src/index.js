"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
require('dotenv').config();
const user_router_1 = __importDefault(require("./routers/user.router"));
const post_router_1 = __importDefault(require("./routers/post.router"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'working' });
});
app.use('/user', user_router_1.default);
app.use('/post', post_router_1.default);
app.use(errorMiddleware_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Running at port ${process.env.PORT}`);
});
