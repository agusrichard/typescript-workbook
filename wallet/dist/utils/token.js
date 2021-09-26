"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, configs_1.Configs.SECRET_KEY, { expiresIn: '12h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, configs_1.Configs.SECRET_KEY);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.js.map