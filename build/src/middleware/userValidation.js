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
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const properties = ['name', 'email', 'password'];
const validateProperties = (post) => {
    for (let i = 0; i < properties.length; i += 1) {
        if (!Object.prototype.hasOwnProperty.call(post, properties[i])) {
            return [false, properties[i]];
        }
    }
    return [true, null];
};
const validateValues = (post) => {
    const entries = Object.entries(post);
    for (let i = 0; i < entries.length; i += 1) {
        const [property, value] = entries[i];
        if (!value) {
            return [false, property];
        }
    }
    return [true, null];
};
const userValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const [valid, property] = validateProperties(user);
    if (!valid) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(`the field ${property} is necessary.`);
    }
    const [v, p] = validateValues(user);
    if (!valid) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(`the field ${p} can't be null or empty.`);
    }
    return next();
});
exports.default = userValidation;