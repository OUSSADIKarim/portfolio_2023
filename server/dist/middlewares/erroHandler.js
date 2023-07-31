"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erroHandler = void 0;
const erroHandler = (error, req, res, next) => {
    return res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || "Something went wrong",
    });
};
exports.erroHandler = erroHandler;
