"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configs = {
    PORT: parseInt(process.env.PORT || '3000'),
    DB_PORT: parseInt(process.env.DB_PORT),
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
};
exports.default = Configs;
//# sourceMappingURL=configs.js.map