"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../../../controllers/projectController");
const jwt_1 = require("../../../middlewares/jwt");
exports.projectRouter = express_1.default.Router();
exports.projectRouter.get("/", projectController_1.getProjects);
exports.projectRouter.post("/", jwt_1.verifyAccessToken, projectController_1.createProject);
exports.projectRouter.delete("/:projectId", jwt_1.verifyAccessToken, projectController_1.deleteProject);
