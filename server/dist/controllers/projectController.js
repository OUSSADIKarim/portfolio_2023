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
exports.updateProject = exports.deleteProject = exports.createProject = exports.getProjectById = exports.getProjects = void 0;
const projectServices_1 = require("../services/projectServices");
const createError_1 = __importDefault(require("../utils/createError"));
const getProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const porjects = yield (0, projectServices_1.getAllProjectsService)();
        res.status(200).json(porjects);
    }
    catch (error) {
        next(new createError_1.default(error.status, error.message));
    }
});
exports.getProjects = getProjects;
const getProjectById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    try {
        const project = yield (0, projectServices_1.getProjectByIdService)(projectId);
        res.status(200).json(project || null);
    }
    catch (error) {
        next(new createError_1.default(error.status, error.message));
    }
});
exports.getProjectById = getProjectById;
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, link } = req.body;
    const user = req.user;
    if (!name || !description || !link) {
        next(new createError_1.default(400, "Missing required data."));
        return;
    }
    try {
        const newProject = yield (0, projectServices_1.createProjectService)(user._id, name, description, link);
        res.status(201).json(newProject);
    }
    catch (error) {
        next(new createError_1.default(error.status, error.message));
    }
});
exports.createProject = createProject;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    try {
        yield (0, projectServices_1.deleteProjectService)(projectId);
        res.status(200).json({ message: "Project deleted successfully." });
    }
    catch (error) {
        next(new createError_1.default(error.status, error.message));
    }
});
exports.deleteProject = deleteProject;
const updateProject = (req, res, next) => {
    const { projectId } = req.params;
};
exports.updateProject = updateProject;
