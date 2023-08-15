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
exports.updateProjectService = exports.deleteProjectService = exports.createProjectService = exports.getProjectByIdService = exports.getAllProjectsService = void 0;
const Project_1 = require("../models/Project");
const createError_1 = __importDefault(require("../utils/createError"));
const getAllProjectsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project_1.Project.find({});
        return projects;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllProjectsService = getAllProjectsService;
const getProjectByIdService = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.Project.findById(projectId);
        return project;
    }
    catch (error) {
        throw error;
    }
});
exports.getProjectByIdService = getProjectByIdService;
const createProjectService = (userId, name, description, link, images) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProject = yield Project_1.Project.create({
            userId,
            name,
            description,
            link,
            images,
        });
        return newProject;
    }
    catch (error) {
        throw error;
    }
});
exports.createProjectService = createProjectService;
const deleteProjectService = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProject = yield Project_1.Project.findOneAndRemove({ _id: projectId });
        if (!deletedProject) {
            throw new createError_1.default(404, "Project not found.");
        }
        return deletedProject;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteProjectService = deleteProjectService;
const updateProjectService = (projectId, name, description, link, images) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Project_1.Project.findByIdAndUpdate(projectId, {
            name,
            description,
            link,
            images,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateProjectService = updateProjectService;
