"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginResolver = void 0;
const UserMutationResponse_1 = require("../../types/response/UserMutationResponse");
const type_graphql_1 = require("type-graphql");
const LoginInput_1 = require("../../types/auth/LoginInput");
const User_1 = require("../../entities/User");
const argon2_1 = __importDefault(require("argon2"));
const internalServerError_1 = require("../../utils/internalServerError");
let UserLoginResolver = class UserLoginResolver {
    async login(loginInput, context) {
        try {
            const { usernameOrEmail, password } = loginInput;
            const existingUser = await User_1.User.findOneBy(usernameOrEmail.includes('@')
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail });
            if (!existingUser)
                return {
                    code: 400,
                    success: false,
                    message: 'User not found',
                    errors: [
                        {
                            field: 'usernameOrPassword',
                            message: 'User name or/and email or/and password in correct'
                        }
                    ]
                };
            const verifyPassword = await argon2_1.default.verify(existingUser.password, password);
            if (!verifyPassword)
                return {
                    code: 400,
                    success: false,
                    message: 'Password wrong',
                    errors: [
                        {
                            field: 'password',
                            message: 'User name or/and email or/and password in correct'
                        }
                    ]
                };
            const { req } = context;
            req.session.userId = existingUser.id;
            return {
                code: 200,
                success: true,
                message: 'User loged in successfully',
                user: existingUser
            };
        }
        catch (error) {
            throw (0, internalServerError_1.internalServerError)(error);
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(_return => UserMutationResponse_1.UserMutationResponse),
    __param(0, (0, type_graphql_1.Arg)('loginInput')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserLoginResolver.prototype, "login", null);
UserLoginResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserLoginResolver);
exports.UserLoginResolver = UserLoginResolver;
//# sourceMappingURL=UserLogin.js.map