"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const configs_1 = __importDefault(require("./configs"));
const pool = new pg_1.Pool({
    user: configs_1.default.DB_USER,
    host: configs_1.default.DB_HOST,
    database: configs_1.default.DB_NAME,
    password: configs_1.default.DB_PASSWORD,
    port: configs_1.default.DB_PORT,
});
exports.default = pool;
//# sourceMappingURL=db.js.map