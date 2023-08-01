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
const mongoose_1 = require("mongoose");
const validators_1 = require("../utils/validators");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createError_1 = __importDefault(require("../utils/createError"));
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        validate: {
            validator: validators_1.isEmail,
            message: "Invalid email.",
        },
        required: true,
        unique: true,
    },
    password: {
        type: String,
        validate: {
            validator: validators_1.isStrongPassword,
            message: "The password must be strong with at least 8 characters, a lowercase letter, an uppercase letter, a number and a symbol.",
        },
        required: true,
        unique: true,
    },
}, { timestamps: true });
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(this.password, salt);
                this.password = hashedPassword;
                return next();
            }
            catch (error) {
                return next(new createError_1.default(500, "An internal server error occurred."));
            }
        }
    });
});
const User = (0, mongoose_1.model)("user", UserSchema);
exports.default = User;
