"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const initializeUsersRouter = (usersController) => {
    const router = (0, express_1.Router)();
    router.post('/login', usersController.login);
    router.post('/register', usersController.register);
    return router;
};
exports.default = initializeUsersRouter;
//# sourceMappingURL=users.js.map