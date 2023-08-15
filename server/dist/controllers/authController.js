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
exports.logout = exports.login = void 0;
const createError_1 = __importDefault(require("../utils/createError"));
const userServices_1 = require("../services/userServices");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtTokens_1 = require("../utils/jwtTokens");
const refreshTokenServices_1 = require("../services/refreshTokenServices");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        next(new createError_1.default(400, "Missing required data."));
        return;
    }
    try {
        const user = yield (0, userServices_1.getUserByEmailService)(email);
        if (!user) {
            next(new createError_1.default(404, "incorrect credentials."));
            return;
        }
        const passwordCompare = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordCompare) {
            next(new createError_1.default(404, "incorrect credentials."));
            return;
        }
        const accessToken = (0, jwtTokens_1.generateAccessToken)(user._id);
        const refreshToken = (0, jwtTokens_1.generateRefreshToken)(user._id);
        yield (0, refreshTokenServices_1.createRefreshTokenService)(user._id, refreshToken);
        res.cookie("refreshToken", { refreshToken }, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 * 1000, // 7days
        });
        res.json({
            accessToken,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    }
    catch (error) {
        next(new createError_1.default(error.status, error.message));
        return;
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshCookie = req.cookies["refreshToken"];
    if (!refreshCookie) {
        next(new createError_1.default(400, "Something went wrong."));
        return;
    }
    const refreshToken = refreshCookie.refreshToken;
    if (!refreshToken) {
        next(new createError_1.default(400, "Something went wrong."));
        return;
    }
    try {
        yield (0, refreshTokenServices_1.deleteRefreshTokenService)(refreshToken);
        res.clearCookie("refreshToken");
        // res.clearCookie("_csrf")
        res.status(200).json("Logged out.");
    }
    catch (error) {
        next(new createError_1.default(error.status, error.message));
        return;
    }
});
exports.logout = logout;
