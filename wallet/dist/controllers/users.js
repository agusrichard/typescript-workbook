"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const initializeUsersController = (usersModel) => ({
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userFound = yield usersModel.findByEmail(req.body.email);
            if (userFound) {
                return utils_1.ResponseTemplate.badRequestError(res, 'User has been registered');
            }
            const hashedPassword = yield (0, utils_1.generatePassword)(req.body.password);
            const user = Object.assign(Object.assign({}, req.body), { password: hashedPassword });
            const newUser = yield usersModel.create(user);
            return utils_1.ResponseTemplate.successResponse(res, 'Success to register user', newUser);
        }
        catch (error) {
            return utils_1.ResponseTemplate.internalServerError(res);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userFound = yield usersModel.findByEmail(req.body.email);
            if (!userFound) {
                return utils_1.ResponseTemplate.badRequestError(res, 'Wrong email or password');
            }
            const isPasswordValid = yield (0, utils_1.comparePassword)(req.body.password, userFound.password);
            if (!isPasswordValid) {
                return utils_1.ResponseTemplate.badRequestError(res, 'Wrong email or password');
            }
            const token = (0, utils_1.generateToken)({ id: userFound.id });
            const userWithToken = Object.assign(Object.assign({}, userFound), { token });
            return utils_1.ResponseTemplate.successResponse(res, 'Success to login user', Object.assign(Object.assign({}, userWithToken), { password: undefined }));
        }
        catch (error) {
            return utils_1.ResponseTemplate.internalServerError(res);
        }
    }),
    profile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = res.locals.userData;
            const user = yield usersModel.findById(id);
            return utils_1.ResponseTemplate.successResponse(res, 'Success to get user profile', Object.assign(Object.assign({}, user), { password: undefined }));
        }
        catch (error) {
            return utils_1.ResponseTemplate.internalServerError(res);
        }
    }),
});
exports.default = initializeUsersController;
//# sourceMappingURL=users.js.map