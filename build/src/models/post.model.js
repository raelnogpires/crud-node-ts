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
const connection_1 = __importDefault(require("../database/connection"));
class PostModel {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connection_1.default.execute('SELECT * FROM Posts');
            return result;
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connection_1.default.execute('SELECT * FROM Posts WHERE id = ?', [id]);
            const [final] = result;
            return final;
        });
    }
    createPost(title, author, category, publicationDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connection_1.default.execute('INSERT INTO Posts (title, author, category, publicationDate)', [title, author, category, publicationDate]);
            return { id: result.insertId, title, author, category, publicationDate };
        });
    }
    editPost(id, title, author, category, publicationDate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default.execute('UPDATE Posts SET title = ?, author = ?, category = ?, publicationDate = ? WHERE id = ?', [title, author, category, publicationDate, id]);
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default.execute('DELETE FROM Posts WHERE id = ?', [id]);
        });
    }
    searchByQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connection_1.default.execute('SELECT * FROM Posts WHERE author = ? OR category = ? OR publicationDate = ?', [query, query, query]);
            return result;
        });
    }
}
exports.default = PostModel;
