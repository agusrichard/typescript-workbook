"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const initializeDatabase = (configs) => new pg_1.Pool({
    user: configs.DB_USER,
    host: configs.DB_HOST,
    database: configs.DB_NAME,
    password: configs.DB_PASSWORD,
    port: configs.DB_PORT,
});
exports.default = initializeDatabase;
//# sourceMappingURL=db.js.map