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
exports.deleteRefreshTokenService = exports.createRefreshTokenService = void 0;
const RefreshToken_1 = require("../models/RefreshToken");
const createRefreshTokenService = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRefreshToken = yield RefreshToken_1.RefreshToken.create({
            userId,
            refreshToken,
        });
        return newRefreshToken;
    }
    catch (error) {
        throw error;
    }
});
exports.createRefreshTokenService = createRefreshTokenService;
const deleteRefreshTokenService = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield RefreshToken_1.RefreshToken.deleteOne({ refreshToken });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteRefreshTokenService = deleteRefreshTokenService;
