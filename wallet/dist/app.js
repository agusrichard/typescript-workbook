"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const configs_1 = require("./configs");
const middlewares_1 = __importDefault(require("./middlewares"));
const models_1 = __importDefault(require("./models"));
const controllers_1 = __importDefault(require("./controllers"));
// Application Initialization
const app = (0, express_1.default)();
// Initialize Databse
const db = (0, configs_1.initializeDatabase)(configs_1.Configs);
// Middlewares Initializations
const authMiddleware = middlewares_1.default.initializeAuthMiddleware();
// Models Initializations
const usersModel = models_1.default.initializeUsersModel(db);
const incomeExpenseModel = models_1.default.initializeIncomeExpenseModel(db);
const incomeExpenseTypeModel = models_1.default.initilizeIncomeExpenseTypeModel(db);
// Controllers Initializations
const usersController = controllers_1.default.initializeUsersController(usersModel);
const incomeExpenseController = controllers_1.default.initializeIncomeExpenseContoller(incomeExpenseModel);
const incomeExpenseTypeController = controllers_1.default.initializeIncomeExpenseTypeController(incomeExpenseTypeModel);
// Routers Initializations
const usersRouters = routers_1.default.initializeUsersRouter(usersController, authMiddleware);
const incomeExpenseRouters = routers_1.default.initializeIncomeExpenseRouter(incomeExpenseController, authMiddleware);
const incomeExpenseTypeRouters = routers_1.default.initializeIncomeExpenseTypeRouter(incomeExpenseTypeController, authMiddleware);
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms'));
app.use('/users', usersRouters);
app.use('/income-expense', incomeExpenseRouters);
app.use('/income-expense-type', incomeExpenseTypeRouters);
app.listen(configs_1.Configs.PORT, () => {
    console.log(`Server listening on port ${configs_1.Configs.PORT}`);
});
//# sourceMappingURL=app.js.map