"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initializeUsersController = (usersModel) => {
    return {
        login: (req, res) => {
            res.json({ message: 'Login' });
        },
        register: (req, res) => {
            res.json({ message: 'Register' });
        }
    };
};
exports.default = initializeUsersController;
//# sourceMappingURL=users.js.map