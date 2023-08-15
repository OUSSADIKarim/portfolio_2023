"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPhoneNumber = exports.isURL = exports.isStrongPassword = exports.isEmail = void 0;
const validator_1 = __importDefault(require("validator"));
const isEmail = (value) => {
    return validator_1.default.isEmail(value);
};
exports.isEmail = isEmail;
const isStrongPassword = (value) => {
    return validator_1.default.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
    });
};
exports.isStrongPassword = isStrongPassword;
const isURL = (value) => {
    return validator_1.default.isURL(value);
};
exports.isURL = isURL;
const isPhoneNumber = (value) => {
    return validator_1.default.matches(String(`+213${value}`), /^(00213|\+213|0)(5|6|7)[0-9]{8}$/);
};
exports.isPhoneNumber = isPhoneNumber;
