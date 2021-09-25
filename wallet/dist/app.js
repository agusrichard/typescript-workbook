"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const models_1 = __importDefault(require("./models"));
const configs_1 = require("./configs");
const controllers_1 = __importDefault(require("./controllers"));
const middlewares_1 = __importDefault(require("./middlewares"));
// Application Initialization
const app = (0, express_1.default)();
// Initialize Databse
const db = (0, configs_1.initializeDatabase)(configs_1.Configs);
// Middlewares Initializations
const authMiddleware = middlewares_1.default.initializeAuthMiddleware(configs_1.Configs);
// Models Initializations
const usersModel = models_1.default.initializeUsersModel(db);
// Controllers Initializations
const usersController = controllers_1.default.initializeUsersController(usersModel);
// Routers Initializations
const usersRouters = routers_1.default.initializeUsersRouter(usersController, authMiddleware);
app.use(body_parser_1.default.json());
app.use('/users', usersRouters);
app.listen(configs_1.Configs.PORT, () => {
    console.log(`Server listening on port ${configs_1.Configs.PORT}`);
});
//# sourceMappingURL=app.js.map