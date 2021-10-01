"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const income_expense_type_1 = __importDefault(require("./income_expense_type"));
const income_expense_1 = __importDefault(require("./income_expense"));
exports.default = {
    initializeUsersController: users_1.default,
    initializeIncomeExpenseContoller: income_expense_1.default,
    initializeIncomeExpenseTypeController: income_expense_type_1.default,
};
//# sourceMappingURL=index.js.map