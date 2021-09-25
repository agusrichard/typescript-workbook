"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Configs 
const configs_1 = require("./configs");
// Models 
const models_1 = __importDefault(require("./models"));
// Controllers 
const controllers_1 = __importDefault(require("./controllers"));
// Routes 
const routers_1 = __importDefault(require("./routers"));
// Application Initialization
const app = (0, express_1.default)();
// Models Initializations
const usersModel = models_1.default.initializeUsersModel(configs_1.DB);
// Controllers Initializations
const usersController = controllers_1.default.initializeUsersController(usersModel);
app.use('/users', routers_1.default.initializeUsersRouter(usersController));
app.listen(configs_1.Configs.PORT, () => {
    console.log(`Server listening on port ${configs_1.Configs.PORT}`);
});
//# sourceMappingURL=app.js.map