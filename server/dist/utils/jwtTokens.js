"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config/config"));
const generateAccessToken = (userId) => {
    const ACCESS_TOKEN_SECRET = config_1.default.ACCESS_TOKEN_SECRET;
    const accessToken = (0, jsonwebtoken_1.sign)({ _id: userId }, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    const REFRESH_TOKEN_SECRET = config_1.default.REFRESH_TOKEN_SECRET;
    const refreshToken = (0, jsonwebtoken_1.sign)({ _id: userId }, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
