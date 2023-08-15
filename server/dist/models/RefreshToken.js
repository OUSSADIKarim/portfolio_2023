"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const mongoose_1 = require("mongoose");
const refreshTokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
});
exports.RefreshToken = (0, mongoose_1.model)("refreshToken", refreshTokenSchema);
