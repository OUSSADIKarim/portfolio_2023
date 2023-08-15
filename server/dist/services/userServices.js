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
exports.createUserService = exports.getUserByEmailService = exports.getUserByIdService = exports.getAllUserService = void 0;
const User_1 = require("../models/User");
const getAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({});
        return users;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUserService = getAllUserService;
const getUserByIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(userId);
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserByIdService = getUserByIdService;
const getUserByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ email });
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserByEmailService = getUserByEmailService;
const createUserService = (firstName, lastName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield User_1.User.create({
            firstName,
            lastName,
            email,
            password,
        });
        return newUser;
    }
    catch (error) {
        throw error;
    }
});
exports.createUserService = createUserService;
