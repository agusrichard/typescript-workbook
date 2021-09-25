"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const initializeUsersRouter = (usersController, authMiddleWare) => {
    const router = (0, express_1.Router)();
    router.post('/login', usersController.login);
    router.post('/register', usersController.register);
    router.get('/profile', authMiddleWare.authenticate, usersController.profile);
    return router;
};
exports.default = initializeUsersRouter;
//# sourceMappingURL=users.js.map