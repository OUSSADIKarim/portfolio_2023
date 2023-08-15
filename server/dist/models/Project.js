"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    link: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    images: [
        {
            url: {
                type: mongoose_1.Schema.Types.String,
            },
            publicId: {
                type: mongoose_1.Schema.Types.String,
            },
        },
    ],
}, { timestamps: true });
exports.Project = (0, mongoose_1.model)("project", projectSchema);
