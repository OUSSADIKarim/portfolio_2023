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
exports.verifyAccessToken = void 0;
const createError_1 = __importDefault(require("../utils/createError"));
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config/config"));
const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        next(new createError_1.default(401, "You don't have auth for this action"));
        return;
    }
    const accessToken = authHeader.split(" ")[1];
    (0, jsonwebtoken_1.verify)(accessToken, config_1.default.ACCESS_TOKEN_SECRET, (error, decodeedToken) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            next(new createError_1.default(403, error.message));
            return;
        }
        ;
        req.user = decodeedToken;
        next();
    }));
};
exports.verifyAccessToken = verifyAccessToken;
