"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./routes/userRoutes");
const authRoutes_1 = require("./routes/authRoutes");
const projectRoutes_1 = require("./routes/projectRoutes");
exports.v1Router = express_1.default.Router();
exports.v1Router.use("/users", userRoutes_1.userRouter);
exports.v1Router.use("/projects", projectRoutes_1.projectRouter);
exports.v1Router.use("/auth", authRoutes_1.authRouter);
