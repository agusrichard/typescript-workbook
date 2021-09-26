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
const initializeUsersModel = (db) => ({
    register: (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `
        INSERT INTO users (
          email,
          password,
          fullname
        )
        VALUES (
          $1,
          $2,
          $3
        )
        RETURNING id;
      `;
            const { rows } = yield db.query(query, [user.email, user.password, user.fullname]);
            const newUser = Object.assign({}, rows[0]);
            return Promise.resolve(newUser);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
});
exports.default = initializeUsersModel;
//# sourceMappingURL=users.js.map