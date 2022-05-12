"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, _req, res, _next) => {
    console.log(err.message, err);
    return res.status(500).json({ message: err.message });
};
