"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.name = `CustomError`;
        this.status = status;
    }
}
exports.default = CustomError;
