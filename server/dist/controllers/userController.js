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
exports.createUser = exports.getUserById = exports.getUsers = void 0;
const createError_1 = __importDefault(require("../utils/createError"));
const userServices_1 = require("./../services/userServices");
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userServices_1.getAllUserService)();
        res.status(200).json(users);
    }
    catch (error) {
        next(new createError_1.default(error.status, error.message));
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield (0, userServices_1.getUserByIdService)(userId);
        res.status(200).json(user || null);
    }
    catch (error) {
        next(new createError_1.default(error.status, error.message));
    }
});
exports.getUserById = getUserById;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        next(new createError_1.default(400, "Missing required data."));
        return;
    }
    try {
        const newUser = yield (0, userServices_1.createUserService)(firstName, lastName, email, password);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(new createError_1.default(error.status, error.message));
    }
});
exports.createUser = createUser;
