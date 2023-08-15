"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../../../middlewares/jwt");
const userController_1 = require("../../../controllers/userController");
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/", jwt_1.verifyAccessToken, userController_1.getUsers);
exports.userRouter.get("/:userId", userController_1.getUserById);
exports.userRouter.post("/", userController_1.createUser);
