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
class UserModel {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connection_1.default.execute('SELECT * FROM Users');
            return result;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connection_1.default.execute('SELECT id, name, email FROM Users WHERE id = ?', [id]);
            const [final] = result;
            return final;
        });
    }
    createUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connection_1.default.execute('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
            return { id: result.insertId, name, email, password };
        });
    }
    editUser(id, name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default.execute('UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id]);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default.execute('DELETE FROM Users WHERE id = ?', [id]);
        });
    }
}
exports.default = UserModel;
