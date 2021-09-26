"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Configs = {
    PORT: parseInt(process.env.PORT || '3000', 10),
    DB_PORT: parseInt(process.env.DB_PORT, 10),
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SECRET_KEY: process.env.SECRET_KEY,
};
exports.default = Configs;
//# sourceMappingURL=configs.js.map