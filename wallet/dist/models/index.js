"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const income_expense_type_1 = __importDefault(require("./income_expense_type"));
exports.default = {
    initializeUsersModel: users_1.default,
    initilizeIncomeExpenseTypeModel: income_expense_type_1.default,
};
//# sourceMappingURL=index.js.map